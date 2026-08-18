/**
 * One runnable check for the Beanconqueror mapping.
 * Run: npm test   (node --experimental-strip-types, so the .ts import works)
 */
import assert from 'node:assert/strict';
import { bcMapScript } from '../src/utils/bc-map.ts';

const { bcMapBeans, bcMapMills, bcMapEquipment } = new Function(
  bcMapScript + '\nreturn { bcMapBeans, bcMapMills, bcMapEquipment };'
)();

const backup = {
  SETTINGS: [{ currency: 'EUR' }],
  BEANS: [
    // Same coffee, two bags: an older finished one and a frozen newer one.
    {
      config: { uuid: 'u-old' },
      name: 'Red Brick', roaster: 'Square Mile',
      roastingDate: '2026-01-05T00:00:00.000Z',
      weight: 250, cost: 18.5, finished: true, note: 'first bag',
      roast: 'City roast', cupping_points: '87.5',
      bean_information: [{ country: 'Brazil', region: 'Cerrado', variety: 'Yellow Bourbon', processing: 'natural', elevation: '1100 - 1300 m', farm: 'Fazenda X' }],
    },
    {
      config: { uuid: 'u-new' },
      name: 'Red Brick', roaster: 'Square Mile',
      roastingDate: '2026-06-01T00:00:00.000Z',
      weight: 1000, cost: 55, decaffeinated: false,
      frozenDate: '2026-06-03T00:00:00.000Z', frozenStorageType: 'VACUUM_SEALED', frozenGroupId: 'g1',
      roast: 'Custom', roast_custom: 'Filter+',
      bean_information: [
        { country: 'Brazil', variety: 'Yellow Bourbon' },
        { country: 'Ethiopia', variety: 'Heirloom, 74110', elevation: '2000' },
      ],
    },
  ],
  BREWS: [
    { bean: 'u-old', grind_weight: 18 },
    { bean: 'u-old', grind_weight: 20 },
    { bean: 'u-other', grind_weight: 99 },
  ],
  MILL: [{ config: { uuid: 'm1' }, name: 'Niche Zero', note: 'red', finished: false }],
  PREPARATION: [{
    config: { uuid: 'p1' }, name: 'Decent', style_type: 'ESPRESSO',
    tools: [{ name: 'IMS 18g basket', finished: false }, { name: 'old basket', finished: true }],
  }],
};

const groups = bcMapBeans(backup);
assert.equal(groups.length, 1, 'two bags of one coffee collapse into one bean');

const [g] = groups;
assert.equal(g.bean.roaster, 'Square Mile');
// Newest bag wins for identity fields, and multi-origin info is merged.
assert.equal(g.bean.country, 'Brazil, Ethiopia');
assert.deepEqual(g.bean.variety, ['Yellow Bourbon', 'Heirloom', '74110']);
assert.deepEqual(g.bean.altitude, [2000, 2000]);
assert.equal(g.batches.length, 2);

const [newer, older] = g.batches;
assert.equal(newer.extras.bcUuid, 'u-new');
assert.equal(newer.roastLevel, 'Filter+', 'Custom roast falls back to roast_custom');
assert.equal(newer.frozen, true);
assert.match(newer.notes, /Frozen in: vacuum sealed/);
assert.equal(newer.currency, 'EUR');
assert.equal(newer.weightRemaining, 1000, 'no brews logged against this bag');

assert.equal(older.extras.bcUuid, 'u-old');
assert.equal(older.archived, true, 'BC "finished" means the bag is done');
assert.equal(older.weightRemaining, 250 - 38, 'remaining = weight minus logged doses');
assert.equal(bcMapBeans({ BEANS: [{ name: 'x', roaster: 'y', roast: 'UNKNOWN' }] })[0].batches[0].roastLevel, null,
  'the enum key UNKNOWN is not a roast level');
assert.equal(older.qualityScore, 87.5);
assert.deepEqual(older.roastDate, '2026-01-05T00:00:00.000Z');
assert.equal(older.roastLevel, 'City roast');
assert.equal(older.price, 18.5);

const [mill] = bcMapMills(backup);
assert.equal(mill.model, 'Niche Zero');
assert.equal(mill.settingType, 'numeric');
assert.equal(mill.extras.bcUuid, 'm1');

const [prep] = bcMapEquipment(backup);
assert.deepEqual(prep.tools, ['IMS 18g basket'], 'finished tools are dropped');

// Empty / junk input must not throw.
assert.deepEqual(bcMapBeans({}), []);
assert.deepEqual(bcMapMills({ MILL: null }), []);

console.log('bc-map: ok');
