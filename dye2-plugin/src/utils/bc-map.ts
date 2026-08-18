/**
 * Beanconqueror → DYE2 mapping.
 *
 * Exported as a browser-side script string (same pattern as dev-api.ts): the import
 * page inlines it as a <script> block, and test/bc-map.test.mjs evals it. One source,
 * no duplicated mapping table.
 *
 * Input is the `Beanconqueror.json` from a Beanconqueror backup ZIP — top-level keys
 * BEANS, BREWS, MILL, PREPARATION, SETTINGS (plus others we ignore). Beanconqueror has
 * no server and no API, so a re-run of the file import IS the sync mechanism.
 *
 * Shape difference that drives all of this: one Beanconqueror "bean" is one physical
 * bag, while DYE2 splits Bean (identity) from BeanBatch (bag). So BC beans are grouped
 * by roaster+name into one Bean with N batches — which is also how repeat purchases and
 * frozen splits (frozenGroupId) land in the right place for free.
 */
export const bcMapScript = `
function bcTxt(v) { if (v == null) return null; var s = String(v).trim(); return s ? s : null; }
function bcNum(v) { var n = parseFloat(v); return isFinite(n) ? n : null; }
function bcIso(v) { if (!v) return null; var d = new Date(v); return isNaN(d.getTime()) ? null : d.toISOString(); }
function bcSplit(v) { return String(v == null ? '' : v).split(/[,/;]+/).map(function (s) { return s.trim(); }).filter(Boolean); }
function bcUniq(arr) { return [...new Set(arr.filter(Boolean))]; }
function bcJoin(arr) { return bcUniq(arr).join(', ') || null; }

/** Beanconqueror stores elevation free-text ("1800", "1800-2000 m") — pull the numbers out. */
function bcAltitude(infos) {
  var nums = [];
  infos.forEach(function (i) {
    (String(i.elevation == null ? '' : i.elevation).match(/\\d+/g) || []).forEach(function (n) {
      var v = parseInt(n, 10);
      if (v > 0) nums.push(v);
    });
  });
  if (!nums.length) return null;
  return [Math.min.apply(null, nums), Math.max.apply(null, nums)];
}

function bcBeanKey(roaster, name) {
  return (String(roaster == null ? '' : roaster).trim() + '||' + String(name == null ? '' : name).trim()).toLowerCase();
}

/** Bean identity fields — everything that is true of the coffee, not of one bag. */
function bcBeanFields(b) {
  var infos = Array.isArray(b.bean_information) ? b.bean_information : [];
  var varieties = [];
  infos.forEach(function (i) { varieties = varieties.concat(bcSplit(i.variety)); });
  varieties = bcUniq(varieties);
  return {
    roaster: bcTxt(b.roaster) || 'Unknown',
    name: bcTxt(b.name) || 'Unnamed',
    decaf: !!b.decaffeinated,
    country: bcJoin(infos.map(function (i) { return bcTxt(i.country); })),
    region: bcJoin(infos.map(function (i) { return bcTxt(i.region); })),
    producer: bcJoin(infos.map(function (i) { return bcTxt(i.farm) || bcTxt(i.farmer); })),
    processing: bcJoin(infos.map(function (i) { return bcTxt(i.processing); })),
    variety: varieties.length ? varieties : null,
    altitude: bcAltitude(infos),
    notes: bcTxt(b.aromatics),
  };
}

/** Bag fields — one BC bean record becomes one DYE2 batch. */
function bcBatchFields(b, usedGrams, currency) {
  var infos = Array.isArray(b.bean_information) ? b.bean_information : [];
  var roast = bcTxt(b.roast);
  // Real exports store the enum key ('UNKNOWN'), the docs the value ('Unknown') — drop both.
  var level = roast === 'Custom' ? bcTxt(b.roast_custom)
    : (roast && roast.toLowerCase() === 'unknown' ? null : roast);
  var weight = bcNum(b.weight);
  var freeze = bcIso(b.frozenDate);
  var unfreeze = bcIso(b.unfrozenDate);
  var storage = bcTxt(b.frozenStorageType);
  var notes = [
    bcTxt(b.note),
    bcTxt(b.frozenNote),
    (storage && storage !== 'UNKNOWN') ? 'Frozen in: ' + storage.toLowerCase().replace(/_/g, ' ') : null,
  ].filter(Boolean).join('\\n') || null;
  var uuid = (b.config && b.config.uuid) || (bcBeanKey(b.roaster, b.name) + '@' + (b.roastingDate || ''));
  var batch = {
    roastDate: bcIso(b.roastingDate),
    roastLevel: level,
    harvestDate: bcJoin(infos.map(function (i) { return bcTxt(i.harvest_time); })),
    qualityScore: bcNum(b.cupping_points),
    price: bcNum(b.cost),
    weight: weight,
    // BC has no "remaining" field — it derives it from logged brews. Do the same sum here.
    weightRemaining: weight == null ? null : Math.round(Math.max(0, weight - (usedGrams || 0)) * 10) / 10,
    buyDate: bcIso(b.buyDate),
    openDate: bcIso(b.openDate),
    bestBeforeDate: bcIso(b.bestDate),
    freezeDate: freeze,
    unfreezeDate: unfreeze,
    frozen: !!freeze && !unfreeze,
    archived: !!b.finished,
    notes: notes,
    extras: {
      bcUuid: uuid,
      bcFrozenId: bcTxt(b.frozenId),
      bcFrozenGroupId: bcTxt(b.frozenGroupId),
      bcRating: bcNum(b.rating),
      bcUrl: bcTxt(b.url),
      bcEan: bcTxt(b.ean_article_number),
    },
  };
  if (currency && batch.price != null) batch.currency = currency;
  return batch;
}

/** BEANS + BREWS → [{ key, bean, batches }], newest roast first within each group. */
function bcMapBeans(json) {
  var beans = Array.isArray(json.BEANS) ? json.BEANS : [];
  var brews = Array.isArray(json.BREWS) ? json.BREWS : [];
  var settings = Array.isArray(json.SETTINGS) ? json.SETTINGS[0] : json.SETTINGS;
  var currency = bcTxt(settings && settings.currency);

  var used = {};
  brews.forEach(function (br) {
    var g = parseFloat(br.grind_weight);
    if (br.bean && isFinite(g)) used[br.bean] = (used[br.bean] || 0) + g;
  });

  var groups = new Map();
  beans.slice()
    .sort(function (a, b) { return new Date(b.roastingDate || 0) - new Date(a.roastingDate || 0); })
    .forEach(function (b) {
      var fields = bcBeanFields(b);
      var key = bcBeanKey(fields.roaster, fields.name);
      var group = groups.get(key);
      // Newest bag wins for identity fields (sorted above), older bags only add batches.
      if (!group) { group = { key: key, bean: fields, batches: [] }; groups.set(key, group); }
      group.batches.push(bcBatchFields(b, used[b.config && b.config.uuid], currency));
    });
  return [...groups.values()];
}

/** MILL → grinders. Beanconqueror mills carry no burr or step data, so those stay empty. */
function bcMapMills(json) {
  return (Array.isArray(json.MILL) ? json.MILL : []).map(function (m) {
    return {
      model: bcTxt(m.name) || 'Unnamed grinder',
      notes: bcTxt(m.note),
      archived: !!m.finished,
      settingType: 'numeric',
      extras: { bcUuid: (m.config && m.config.uuid) || null },
    };
  });
}

/** PREPARATION + tools (portafilters, baskets, drippers). The bridge has no equipment
    resource, so this is parked in the DYE2 KV store as reference data. */
function bcMapEquipment(json) {
  return (Array.isArray(json.PREPARATION) ? json.PREPARATION : []).map(function (p) {
    return {
      name: bcTxt(p.name) || 'Unnamed',
      style: bcTxt(p.style_type),
      note: bcTxt(p.note),
      archived: !!p.finished,
      tools: (Array.isArray(p.tools) ? p.tools : [])
        .filter(function (t) { return t && !t.finished; })
        .map(function (t) { return bcTxt(t.name); })
        .filter(Boolean),
      bcUuid: (p.config && p.config.uuid) || null,
    };
  });
}
`;
