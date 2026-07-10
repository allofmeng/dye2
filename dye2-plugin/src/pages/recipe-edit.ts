import { devPageShell } from "../utils/dev-shell";
import { devApiScript } from "../utils/dev-api";
import { lucideIcon } from "../utils/lucide";
import {
  stepperCss, stepperHtml,
  presetStripCss, presetStripHtml, presetStripScript,
  segmentControlScript,
} from "../utils/shared-components";

const NUM_RECIPES = 5;

const styles = `
  ${stepperCss()}
  ${presetStripCss()}
  .re-tab {
    padding: 14px 28px; border-radius: 23px;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 21px;
    border: 2px solid var(--profile-button-outline-color);
    background: transparent; color: var(--text-primary-disabled);
    cursor: pointer; white-space: nowrap;
  }
  .re-tab.active { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }
  .re-label { font-size: 24px; font-weight: 600; color: var(--mimoja-blue); margin-bottom: 8px; }
  .re-input {
    width: 100%; border: 1px solid var(--profile-button-outline-color);
    border-radius: 12px; padding: 0 20px; height: 72px;
    font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 400;
    color: var(--text-primary); background: var(--box-color);
    outline: none; display: flex; align-items: center;
  }
  input.re-input:focus { border-color: var(--mimoja-blue); }
  .re-input-row { display: flex; align-items: center; gap: 12px; }
  .re-input-pencil { flex-shrink: 0; opacity: 0.55; cursor: pointer; }
  .re-input-pencil:hover { opacity: 1; }
  .re-chip-grid { display: flex; flex-wrap: wrap; gap: 12px; }
  .re-chip {
    padding: 12px 22px; border-radius: 15px;
    font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 600;
    border: 2px solid var(--profile-button-outline-color);
    background: var(--box-color); color: var(--text-primary);
    cursor: pointer; white-space: nowrap;
  }
  .re-chip.active { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }
  .re-see-all { font-size: 22px; font-weight: 600; color: var(--mimoja-blue); cursor: pointer; padding: 12px 4px; }
  .re-divider { height: 1px; background: var(--profile-button-outline-color); }
  .re-var-block { display: flex; flex-direction: column; gap: 8px; }
  .re-var-label { font-size: 22px; font-weight: 700; color: var(--mimoja-blue); margin-bottom: 2px; }
  /* Figma: grinder options are plain text (no box) — active bold blue, inactive grey, wide gaps */
  .re-grinder-chips { display: flex; align-items: center; gap: 32px; overflow-x: auto; padding-bottom: 4px; }
  .re-grinder-chip {
    background: none; border: none; padding: 0;
    font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 600;
    color: var(--text-primary-disabled);
    cursor: pointer; white-space: nowrap; flex-shrink: 0;
  }
  .re-grinder-chip.active { color: var(--mimoja-blue); font-weight: 700; }
  .footer-btn-ghost {
    border: 2px solid var(--mimoja-blue); color: var(--mimoja-blue); border-radius: 23px;
    padding: 0 28px; height: 60px; font-size: 21px; font-weight: 600; cursor: pointer;
    font-family: 'Inter', sans-serif; white-space: nowrap; display: flex; align-items: center; gap: 8px;
  }
  .re-show-streamline {
    display: flex; align-items: center; gap: 14px;
    font-family: 'Inter', sans-serif; font-size: 21px; font-weight: 600;
    color: var(--mimoja-blue); cursor: pointer;
  }
  .re-show-streamline-icon { flex-shrink: 0; }
  .read-from-dropdown {
    display: none; position: absolute; bottom: calc(100% + 4px); left: 0;
    min-width: 220px; background: var(--box-color);
    border: 2px solid var(--profile-button-outline-color);
    border-radius: 15px; overflow: hidden;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.12); z-index: 50;
  }
  .read-from-dropdown.open { display: block; }
  .read-from-item {
    padding: 16px 23px; font-family: 'Inter', sans-serif;
    font-size: 21px; font-weight: 600; color: var(--text-primary);
    cursor: pointer; white-space: nowrap;
  }
  .read-from-item + .read-from-item { border-top: 1px solid var(--profile-button-outline-color); }
  .read-from-item:hover { background: var(--mimoja-blue); color: #fff; }
  /* Steam / Hot Water mode: compact inline text toggle under the label (matches Figma) */
  .re-mode-toggle { display: flex; align-items: center; gap: 10px; margin: 4px 0 0 0; font-size: 19px; font-weight: 600; }
  .re-mode-seg { background: none; border: none; padding: 0; font: inherit; cursor: pointer; color: var(--text-primary-disabled); }
  .re-mode-seg.active { color: var(--mimoja-blue); }
  .re-mode-sep { color: var(--profile-button-outline-color); }
`;

function buildContent(): string {
  const chevUpSvg      = lucideIcon('chevron-up',    24, 'var(--mimoja-blue)', 2.5);
  const checkCircleSvg = lucideIcon('check-circle',  28, 'var(--mimoja-blue)', 2);
  const pencilSvg      = lucideIcon('pencil',        26, 'var(--text-primary-disabled)', 2);

  const tabs = Array.from({ length: NUM_RECIPES }, (_, i) =>
    `<button class="re-tab${i === 0 ? ' active' : ''}" data-recipe="${i}">Recipe ${i + 1}</button>`
  ).join('');

  return `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex flex-col w-screen h-screen font-['Inter',sans-serif]">

  <!-- Header: title + recipe tabs -->
  <div class="flex items-center gap-[28px] px-[38px] h-[110px] shrink-0 bg-[var(--box-color)] border-b border-[var(--profile-button-outline-color)]">
    <span class="text-[30px] font-bold text-[var(--text-primary)] shrink-0">Edit Recipes</span>
    <div id="re-tabs" class="flex gap-[12px] overflow-x-auto">
      ${tabs}
    </div>
  </div>

  <!-- Two-column body -->
  <div class="flex flex-1 overflow-hidden">

    <!-- LEFT: recipe metadata -->
    <div id="re-left" class="flex flex-col w-[720px] shrink-0 bg-white border-r border-[var(--profile-button-outline-color)] overflow-y-auto px-[38px] py-[28px] gap-[24px]">

      <div>
        <div class="re-label">Recipe Name</div>
        <div class="re-input-row">
          <input id="re-name-input" class="re-input" type="text" placeholder="Recipe name…" />
          <button class="re-input-pencil" id="re-name-pencil">${pencilSvg}</button>
        </div>
      </div>

      <div class="re-divider"></div>

      <div>
        <div class="re-label">Assign Bean</div>
        <div class="re-chip-grid" id="re-bean-chips"></div>
      </div>

      <div class="re-divider"></div>

      <div>
        <div class="re-label">Assign Profile</div>
        <div class="re-chip-grid" id="re-profile-chips"></div>
      </div>

      <div class="re-divider"></div>

      <div>
        <div class="re-label">Beverage</div>
        <div class="re-input-row">
          <input id="re-beverage-input" class="re-input" type="text" placeholder="e.g. Cappucino" />
          <button class="re-input-pencil">${pencilSvg}</button>
        </div>
      </div>

      <div class="re-divider"></div>

      <div class="flex gap-[24px]">
        <div class="flex-1">
          <div class="re-label">Barista</div>
          <div class="re-input-row">
            <input id="re-barista-input" class="re-input" type="text" placeholder="Barista" />
            <button class="re-input-pencil">${pencilSvg}</button>
          </div>
        </div>
        <div class="flex-1">
          <div class="re-label">Drinker</div>
          <div class="re-input-row">
            <input id="re-drinker-input" class="re-input" type="text" placeholder="Drinker" />
            <button class="re-input-pencil">${pencilSvg}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: Dashboard Variables (2-column, matches Figma) -->
    <div id="re-right" class="flex flex-col flex-1 bg-white overflow-y-auto px-[38px] py-[28px] gap-[24px]">
      <div class="text-[26px] font-bold text-[var(--text-primary)]">Dashboard Variables</div>

      <!-- Row: Dose | Drink -->
      <div class="flex gap-[40px]">
        <div class="re-var-block flex-1">
          ${stepperHtml('re-dose', 'Dose', '120px')}
          ${presetStripHtml('re-dose', ['20g', '18g', '19g', '15g'])}
        </div>
        <div class="re-var-block flex-1">
          ${stepperHtml('re-drink', 'Drink', '120px', true)}
          ${presetStripHtml('re-drink', ['1:2.3', '1:2.5', '1:5', '1:15'])}
        </div>
      </div>

      <div class="re-divider"></div>

      <!-- Row: Brew °c | Steam (Flow | Time) -->
      <div class="flex gap-[40px]">
        <div class="re-var-block flex-1">
          ${stepperHtml('re-brew-c', 'Brew °c', '120px')}
          ${presetStripHtml('re-brew-c', ['75°c', '80°c', '92°c', '85°c'])}
        </div>
        <div class="re-var-block flex-1">
          ${stepperHtml('re-steam', 'Steam', '120px', true, `
            <div class="re-mode-toggle">
              <button class="re-steam-mode re-mode-seg active" data-mode="flow">Flow</button>
              <span class="re-mode-sep">|</span>
              <button class="re-steam-mode re-mode-seg" data-mode="time">Time</button>
            </div>`)}
          ${presetStripHtml('re-steam', ['29s', '15s', '31s', '28s'])}
        </div>
      </div>

      <div class="re-divider"></div>

      <!-- Row: Flush | Hot Water (Temp | Vol) -->
      <div class="flex gap-[40px]">
        <div class="re-var-block flex-1">
          ${stepperHtml('re-flush', 'Flush', '120px')}
          ${presetStripHtml('re-flush', ['5s', '2s', '10s', '15s'])}
        </div>
        <div class="re-var-block flex-1">
          ${stepperHtml('re-hotwater', 'Hot Water', '120px', true, `
            <div class="re-mode-toggle">
              <button class="re-hotwater-mode re-mode-seg" data-mode="temp">Temp</button>
              <span class="re-mode-sep">|</span>
              <button class="re-hotwater-mode re-mode-seg active" data-mode="vol">Vol</button>
            </div>`)}
          ${presetStripHtml('re-hotwater', ['75ml', '120ml', '180ml', '200ml'])}
        </div>
      </div>

      <div class="re-divider"></div>

      <!-- Grinder chips -->
      <div>
        <div class="re-var-label">Grinder</div>
        <div class="re-grinder-chips" id="re-grinder-chips">
          <!-- populated by JS -->
        </div>
      </div>

      <!-- Grind + RPM -->
      <div class="flex items-center gap-[60px]">
        <div class="re-var-block flex-1">
          ${stepperHtml('re-grind', 'Grind', '80px')}
          ${presetStripHtml('re-grind', ['1.5', '1.2', '1.8', '2.0'])}
        </div>
        <div class="re-var-block flex-1">
          ${stepperHtml('re-rpm', 'RPM', '80px')}
          ${presetStripHtml('re-rpm', ['2', '4', '6', '8'])}
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="flex items-center px-[38px] h-[90px] shrink-0 bg-[var(--box-color)] border-t border-[var(--profile-button-outline-color)] gap-[18px]">
    <button id="re-clear-btn" class="footer-btn-ghost">Clear all</button>
    <div class="relative">
      <button id="re-read-from-btn" class="footer-btn-ghost">Read From ${chevUpSvg}</button>
      <div id="re-read-from-dropdown" class="read-from-dropdown">
        <div class="read-from-item" id="re-read-from-workflow">Current Workflow</div>
        <div class="read-from-item" id="re-read-from-fav">From Favourite</div>
      </div>
    </div>
    <button id="re-show-streamline-btn" class="re-show-streamline">
      <span id="re-show-streamline-icon" class="re-show-streamline-icon">${checkCircleSvg}</span>
      <span>Show on Streamline Dashboard</span>
    </button>
    <div class="flex-1"></div>
    <button id="re-cancel-btn" class="text-[24px] font-bold text-[var(--text-primary)] px-[30px] h-[62px]">CANCEL</button>
    <button id="re-save-btn" class="bg-[var(--mimoja-blue)] text-white rounded-[68px] h-[62px] px-[40px] text-[24px] font-bold cursor-pointer">SAVE RECIPE</button>
  </div>
</div>
`;
}

const pageScript = `
${presetStripScript}
${segmentControlScript}

const NUM_RECIPES = ${NUM_RECIPES};
let recipes = [];
let currentRecipeIdx = 0;
let grinders = [];
let showOnStreamline = true;
let selectedGrinderId = null;
let selectedBeanId = null;
let selectedBeanName = null;
let selectedProfileId = null;
let selectedProfileTitle = null;
let beans = [];
let profiles = [];

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val ?? '—';
}
function setInput(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function wireAdjuster(minusId, plusId, valueId, step, min, max, formatter) {
  [minusId, plusId].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    let t = null;
    btn.addEventListener('click', () => {
      const el = document.getElementById(valueId);
      if (!el) return;
      const raw = parseFloat(el.textContent);
      // Empty field shows "—" → start from min (or 0) so + / − begin working.
      const base = isNaN(raw) ? (min != null ? min : 0) : raw;
      const delta = btnId === minusId ? -step : step;
      let val = parseFloat((base + delta).toFixed(3));
      if (min != null) val = Math.max(min, val);
      if (max != null) val = Math.min(max, val);
      el.textContent = formatter(val);
      syncPresetActive(valueId.replace('-value', ''), formatter(val));
    });
  });
  makeValueEditable(valueId, min, max, formatter);
}

// Tap the number to type a value directly (tablet-friendly).
function makeValueEditable(valueId, min, max, formatter) {
  const valEl = document.getElementById(valueId);
  if (!valEl || valEl.dataset.editable) return;
  valEl.dataset.editable = '1';
  valEl.style.cursor = 'text';
  valEl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (valEl.querySelector('input')) return;
    const cur = parseFloat(valEl.textContent);
    const prev = valEl.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.value = isNaN(cur) ? '' : String(cur);
    input.style.cssText = 'width:90px;font:inherit;text-align:center;border:1px solid var(--mimoja-blue);border-radius:8px;background:#fff;color:inherit;outline:none;padding:2px 4px';
    valEl.textContent = '';
    valEl.appendChild(input);
    input.focus(); input.select();
    let done = false;
    const commit = (apply) => {
      if (done) return; done = true;
      let v = parseFloat(input.value);
      if (apply && !isNaN(v)) {
        if (min != null) v = Math.max(min, v);
        if (max != null) v = Math.min(max, v);
        valEl.textContent = formatter(v);
        syncPresetActive(valueId.replace('-value', ''), formatter(v));
      } else {
        valEl.textContent = prev;
      }
    };
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') { ev.preventDefault(); commit(true); }
      else if (ev.key === 'Escape') { ev.preventDefault(); commit(false); }
    });
    input.addEventListener('blur', () => commit(true));
  });
}

function renderRecipe(recipe) {
  if (!recipe) return;
  const dv = recipe.dashboardVariables || {};
  setInput('re-name-input',     recipe.name || '');
  setInput('re-beverage-input', recipe.beverage || '');
  setInput('re-barista-input',  recipe.barista || '');
  setInput('re-drinker-input',  recipe.drinker || '');

  set('re-dose-value',  dv.dose     != null ? dv.dose + 'g'          : '—');
  set('re-drink-value', dv.drink    != null ? dv.drink + 'g'         : '—');
  set('re-drink-sub',   dv.ratio    != null ? '(1:' + dv.ratio + ')' : '');
  set('re-brew-c-value',dv.brewC    != null ? dv.brewC + '°c'        : '—');
  set('re-steam-value', dv.steamTimeS  != null ? dv.steamTimeS + 's' : dv.steamFlowMls != null ? dv.steamFlowMls + 'ml/s' : '—');
  set('re-flush-value', dv.flushS   != null ? dv.flushS + 's'        : '—');
  set('re-hotwater-value', dv.hotWaterMl != null ? dv.hotWaterMl + 'ml' : (dv.hotWaterTempC != null ? dv.hotWaterTempC + '°C' : '—'));
  set('re-hotwater-sub',   dv.hotWaterTempC != null ? dv.hotWaterTempC + '°C' : '');
  set('re-grind-value', dv.grind    != null ? String(dv.grind)       : '—');
  set('re-rpm-value',   dv.rpm      != null ? String(dv.rpm)         : '—');

  showOnStreamline = recipe.showOnStreamlineDashboard !== false;
  updateStreamlineBtn();

  selectedBeanId      = recipe.beanId || null;
  selectedBeanName    = recipe.beanName || null;
  selectedProfileId   = recipe.profileId || null;
  selectedProfileTitle = recipe.profileTitle || null;
  renderBeanChips();
  renderProfileChips();

  if (dv.grinderId) selectedGrinderId = dv.grinderId;
  renderGrinderChips();

  syncPresetActive('re-dose',   set => {});
}

// Build a recipe-shaped patch from the live workflow.
async function readFromWorkflow() {
  const wf = await getWorkflow().catch(() => null);
  const ctx = (wf && wf.context) || {};
  const g = grinders.find(x => (x.model || x.name) === ctx.grinderModel);
  return {
    barista: ctx.baristaName || ctx.barista || '',
    drinker: ctx.drinkerName || ctx.drinker || '',
    dashboardVariables: {
      dose:  ctx.targetDoseWeight,
      drink: ctx.targetYield,
      grind: ctx.grinderSetting,
      rpm:   ctx.extras && ctx.extras.rpm,
      grinderId: g ? g.id : undefined,
    },
  };
}

// Build a recipe-shaped patch from a saved favourite's snapshot.
async function readFromFavourite() {
  const favs = await getAutoFavourites().catch(() => []);
  if (!favs.length) return null;
  // ponytail: use most-recent favourite; add a favourite picker if users need to choose one
  const fav = favs.slice().sort((a, b) =>
    (b.capturedAt || b.createdAt || '').localeCompare(a.capturedAt || a.createdAt || ''))[0];
  const s = fav.snapshot || {};
  return {
    beverage: fav.beverage || '',
    barista:  s.barista || '',
    drinker:  s.drinker || '',
    dashboardVariables: {
      dose:  s.dose,
      drink: s.drink,
      grind: s.grindSetting,
      rpm:   s.rpm,
      grinderId: s.grinderId,
    },
  };
}

// Merge a patch into the current recipe (keep id/name), then re-render.
function applyToCurrentRecipe(src) {
  if (!src) return;
  const cur = recipes[currentRecipeIdx] || {};
  const merged = {
    ...cur, ...src, id: cur.id, name: cur.name,
    dashboardVariables: { ...(cur.dashboardVariables || {}), ...(src.dashboardVariables || {}) },
  };
  recipes[currentRecipeIdx] = merged;
  if (merged.dashboardVariables.grinderId) selectedGrinderId = merged.dashboardVariables.grinderId;
  renderRecipe(merged);
}

// Show the assigned item first (so it is always visible + active), then fill up to the limit.
function orderedChips(list, selectedId, limit) {
  const sel = list.find(x => String(x.id) === String(selectedId));
  const rest = list.filter(x => x !== sel);
  return (sel ? [sel, ...rest] : rest).slice(0, limit);
}

function renderChipGrid(containerId, items, isActive, labelOf, onPick, seeAllRoute) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const chip = document.createElement('div');
    chip.className = 're-chip' + (isActive(item) ? ' active' : '');
    chip.textContent = labelOf(item);
    chip.addEventListener('click', () => { onPick(item); });
    container.appendChild(chip);
  });
  const seeAll = document.createElement('div');
  seeAll.className = 're-see-all';
  seeAll.textContent = seeAllRoute.beans ? 'See All Beans' : 'See All Profiles';
  seeAll.addEventListener('click', () => goToPicker(seeAllRoute.url));
  container.appendChild(seeAll);
}

function renderBeanChips() {
  renderChipGrid(
    're-bean-chips',
    orderedChips(beans, selectedBeanId, 5),
    b => String(b.id) === String(selectedBeanId),
    b => b.name || 'Unnamed bean',
    b => { selectedBeanId = b.id; selectedBeanName = b.name || ''; renderBeanChips(); },
    { beans: true, url: '/api/v1/plugins/dye2.reaplugin/bean-picker?return=/api/v1/plugins/dye2.reaplugin/recipe-edit' }
  );
}

// Bridge profiles nest the title under profile.title (not a top-level field).
function profileLabel(p) {
  return (p.profile && p.profile.title) || p.title || p.name || 'Untitled';
}

function renderProfileChips() {
  renderChipGrid(
    're-profile-chips',
    orderedChips(profiles, selectedProfileId, 5),
    p => String(p.id) === String(selectedProfileId),
    p => profileLabel(p),
    p => { selectedProfileId = p.id; selectedProfileTitle = profileLabel(p); renderProfileChips(); },
    { beans: false, url: '/api/v1/plugins/dye2.reaplugin/profile-picker?return=/api/v1/plugins/dye2.reaplugin/recipe-edit' }
  );
}

function renderGrinderChips() {
  const container = document.getElementById('re-grinder-chips');
  if (!container) return;
  container.innerHTML = '';
  if (grinders.length === 0) {
    container.innerHTML = '<span style="color:var(--text-primary-disabled);font-size:20px">No grinders</span>';
    return;
  }
  grinders.forEach(g => {
    const chip = document.createElement('button');
    chip.className = 're-grinder-chip' + (g.id === selectedGrinderId ? ' active' : '');
    chip.textContent = g.model || g.name || 'Grinder';
    chip.addEventListener('click', () => {
      container.querySelectorAll('.re-grinder-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedGrinderId = g.id;
    });
    container.appendChild(chip);
  });
}

function updateStreamlineBtn() {
  const btn = document.getElementById('re-show-streamline-btn');
  if (btn) btn.style.opacity = showOnStreamline ? '1' : '0.4';
}

function getCurrentRecipeData() {
  const num = id => parseFloat(document.getElementById(id)?.textContent) || 0;
  const steamMode = document.querySelector('.re-steam-mode.active')?.dataset.mode || 'flow';
  const steamVal  = num('re-steam-value');
  const hwMode    = document.querySelector('.re-hotwater-mode.active')?.dataset.mode || 'vol';
  const hwVal     = num('re-hotwater-value');
  return {
    name:      document.getElementById('re-name-input')?.value || '',
    beverage:  document.getElementById('re-beverage-input')?.value || '',
    barista:   document.getElementById('re-barista-input')?.value || '',
    drinker:   document.getElementById('re-drinker-input')?.value || '',
    beanId:    selectedBeanId,
    beanName:  selectedBeanName,
    profileId: selectedProfileId,
    profileTitle: selectedProfileTitle,
    showOnStreamlineDashboard: showOnStreamline,
    dashboardVariables: {
      dose:    num('re-dose-value'),
      drink:   num('re-drink-value'),
      brewC:   num('re-brew-c-value') || 93,
      steamMode,
      steamTimeS:   steamMode === 'time' ? steamVal : undefined,
      steamFlowMls: steamMode === 'flow' ? steamVal : undefined,
      flushS:  num('re-flush-value'),
      hotWaterMode:  hwMode,
      hotWaterMl:    hwMode === 'vol'  ? hwVal : undefined,
      hotWaterTempC: hwMode === 'temp' ? hwVal : undefined,
      grind:   num('re-grind-value'),
      rpm:     num('re-rpm-value'),
      grinderId: selectedGrinderId,
    },
  };
}

function setupTabs() {
  document.getElementById('re-tabs')?.querySelectorAll('.re-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.re-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRecipeIdx = parseInt(btn.dataset.recipe);
      const recipe = recipes[currentRecipeIdx];
      if (recipe) renderRecipe(recipe);
    });
  });
}

// Persist the in-progress form (full-page nav to the picker would otherwise lose it),
// then open the picker. initRecipeEdit restores the draft and folds in the pick on return.
function goToPicker(route) {
  const cur = recipes[currentRecipeIdx] || {};
  recipes[currentRecipeIdx] = { ...cur, ...getCurrentRecipeData(), id: cur.id };
  sessionStorage.setItem('dye_recipeDraft', JSON.stringify({ idx: currentRecipeIdx, recipes }));
  window.location.href = route;
}

function setupModeToggle(cls) {
  document.querySelectorAll('.' + cls).forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.' + cls).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function setupStreamlineToggle() {
  document.getElementById('re-show-streamline-btn')?.addEventListener('click', () => {
    showOnStreamline = !showOnStreamline;
    updateStreamlineBtn();
  });
}

function setupFooter() {
  const rfBtn  = document.getElementById('re-read-from-btn');
  const rfDrop = document.getElementById('re-read-from-dropdown');
  rfBtn?.addEventListener('click', e => { e.stopPropagation(); rfDrop?.classList.toggle('open'); });
  document.addEventListener('click', () => rfDrop?.classList.remove('open'));

  document.getElementById('re-read-from-workflow')?.addEventListener('click', async () => {
    applyToCurrentRecipe(await readFromWorkflow());
    rfDrop?.classList.remove('open');
  });
  document.getElementById('re-read-from-fav')?.addEventListener('click', async () => {
    applyToCurrentRecipe(await readFromFavourite());
    rfDrop?.classList.remove('open');
  });

  document.getElementById('re-name-pencil')?.addEventListener('click', () => {
    const inp = document.getElementById('re-name-input');
    if (inp) { inp.focus(); inp.select(); }
  });

  document.getElementById('re-clear-btn')?.addEventListener('click', () => {
    recipes[currentRecipeIdx] = {};
    renderRecipe({});
  });

  document.getElementById('re-cancel-btn')?.addEventListener('click', () => window.history.back());

  document.getElementById('re-save-btn')?.addEventListener('click', async () => {
    const data = getCurrentRecipeData();
    const recipe = recipes[currentRecipeIdx];
    try {
      if (recipe && recipe.id) {
        await updateRecipe(recipe.id, data);
      }
      window.history.back();
    } catch (e) { console.error('Failed to save recipe:', e); }
  });
}

async function initRecipeEdit() {
  setupTabs();
  setupModeToggle('re-steam-mode');
  setupModeToggle('re-hotwater-mode');
  setupStreamlineToggle();
  setupPresetStrips();
  setupFooter();

  wireAdjuster('re-dose-minus',  're-dose-plus',  're-dose-value',  0.5, 0, null, v => v + 'g');
  wireAdjuster('re-drink-minus', 're-drink-plus', 're-drink-value', 1,   0, null, v => v + 'g');
  wireAdjuster('re-brew-c-minus','re-brew-c-plus','re-brew-c-value',1, 60, 100,  v => v + '°c');
  wireAdjuster('re-steam-minus', 're-steam-plus', 're-steam-value', 1,   0, null, v => v + 's');
  wireAdjuster('re-flush-minus', 're-flush-plus', 're-flush-value', 1,   0, null, v => v + 's');
  wireAdjuster('re-hotwater-minus','re-hotwater-plus','re-hotwater-value', 5, 0, null, v => v + 'ml');
  wireAdjuster('re-grind-minus', 're-grind-plus', 're-grind-value', 0.1, 0, null, v => v.toFixed(1));
  wireAdjuster('re-rpm-minus',   're-rpm-plus',   're-rpm-value',   1,   1, null, v => String(v));

  let loadedRecipes = [];
  try {
    const result = await getRecipes();
    loadedRecipes = Array.isArray(result) ? result : (result && result.items ? result.items : []);
  } catch (e) {
    console.warn('Could not load recipes from KV store:', e);
  }
  // Normalize to NUM_RECIPES fixed slots with stable ids ("1".."5") so save() always upserts.
  recipes = Array.from({ length: NUM_RECIPES }, (_, i) => {
    const id = String(i + 1);
    const existing = loadedRecipes.find(r => r && r.id === id);
    return existing ? { ...existing, id } : { id, name: 'Recipe ' + (i + 1) };
  });
  document.querySelectorAll('.re-tab').forEach((btn, i) => {
    if (recipes[i] && recipes[i].name) btn.textContent = recipes[i].name;
  });

  try {
    const gs = await getGrinders().catch(() => []);
    grinders = Array.isArray(gs) ? gs : (gs && gs.items ? gs.items : []);
  } catch (e) { grinders = []; }

  const bs = await getBeans().catch(() => []);
  beans = Array.isArray(bs) ? bs : (bs && bs.items ? bs.items : []);
  const ps = await getProfiles().catch(() => []);
  profiles = Array.isArray(ps) ? ps : (ps && ps.items ? ps.items : []);

  const storedIdx = parseInt(sessionStorage.getItem('dye_editRecipeIdx') || '0');
  currentRecipeIdx = isNaN(storedIdx) ? 0 : Math.min(storedIdx, NUM_RECIPES - 1);

  // Returning from a See-All picker: restore the draft we stashed, then fold in the pick.
  // Gated on the draft so stray picker keys from other flows are never adopted here.
  const draftRaw = sessionStorage.getItem('dye_recipeDraft');
  sessionStorage.removeItem('dye_recipeDraft');
  if (draftRaw) {
    try {
      const draft = JSON.parse(draftRaw);
      if (Array.isArray(draft.recipes) && draft.recipes.length === NUM_RECIPES) recipes = draft.recipes;
      if (draft.idx != null) currentRecipeIdx = Math.min(draft.idx, NUM_RECIPES - 1);
      const cur = recipes[currentRecipeIdx] || (recipes[currentRecipeIdx] = { id: String(currentRecipeIdx + 1) });
      const beanId = sessionStorage.getItem('dye_selectedBeanId');
      if (beanId) {
        cur.beanId = beanId;
        cur.beanName = sessionStorage.getItem('dye_selectedBeanName') || '';
        ['dye_selectedBeanId','dye_selectedBeanName','dye_selectedBeanRoaster','dye_selectedBatchId','dye_selectedRoastDate']
          .forEach(k => sessionStorage.removeItem(k));
      }
      const profileId = sessionStorage.getItem('dye_selectedProfileId');
      if (profileId) {
        cur.profileId = profileId;
        cur.profileTitle = sessionStorage.getItem('dye_selectedProfileTitle') || '';
        ['dye_selectedProfileId','dye_selectedProfileTitle'].forEach(k => sessionStorage.removeItem(k));
      }
    } catch (e) { console.warn('recipe draft restore failed:', e); }
  }
  const activeTab = document.querySelectorAll('.re-tab')[currentRecipeIdx];
  if (activeTab) {
    document.querySelectorAll('.re-tab').forEach(b => b.classList.remove('active'));
    activeTab.classList.add('active');
  }
  renderRecipe(recipes[currentRecipeIdx] || {});
  renderGrinderChips();
}

initRecipeEdit().catch(e => console.error('initRecipeEdit failed:', e));
`;

export function renderRecipeEditPage(request: HttpRequest): HttpResponse {
  return {
    requestId: request.requestId,
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: devPageShell("Edit Recipes", buildContent(), styles, [devApiScript, pageScript]),
  };
}
