import { devPageShell } from "../utils/dev-shell";
import { devApiScript } from "../utils/dev-api";
import {
  sortSidebarCss, sortSidebarHtml, sortSidebarScript,
  pickerCardCss, pickerHeaderHtml,
} from "../utils/shared-components";

const TAB_KEYS = ['beans', 'recipe', 'profile', 'grinder'];
const TAB_LABELS = ['Beans', 'Recipe', 'Profile', 'Grinder'];

const styles = `
  ${sortSidebarCss()}
  ${pickerCardCss()}
  .dye-tab-strip {
    display: flex; gap: 8px; padding: 18px 0 0;
  }
  .dye-tab-btn {
    padding: 10px 28px; border-radius: 23px;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 21px;
    border: 2px solid var(--profile-button-outline-color);
    background: transparent; color: var(--text-primary-disabled);
    cursor: pointer; white-space: nowrap;
  }
  .dye-tab-btn.active {
    background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff;
  }
  .fav-card-title { font-size: 22px; font-weight: 700; color: var(--text-primary); }
  .fav-card-date  { font-size: 18px; font-weight: 400; color: var(--low-contrast-white); margin-top: 4px; }
  .dye-card.dye-card-selected .fav-card-title { color: #fff; }
  .dye-card.dye-card-selected .fav-card-date  { color: rgba(255,255,255,0.7); }
  .fav-group-header {
    grid-column: 1 / -1;
    font-family: 'Inter', sans-serif; font-weight: 700; font-size: 22px;
    color: var(--mimoja-blue); padding: 10px 2px 0;
  }
`;

const content = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">
  ${pickerHeaderHtml('DYE Auto Favourites', 'CONFIRM')}
  <div class="flex flex-1 overflow-hidden">
    ${sortSidebarHtml()}
    <div class="flex flex-col flex-1 overflow-hidden px-[20px]">
      <div class="dye-tab-strip shrink-0" id="dye-tab-strip">
        ${TAB_KEYS.map((k, i) => `<button class="dye-tab-btn${i === 0 ? ' active' : ''}" data-tab="${k}">${TAB_LABELS[i]}</button>`).join('')}
      </div>
      <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[20px] pr-[20px]">
        <div id="dye-cards-grid" class="grid grid-cols-3 gap-[30px]"></div>
      </div>
    </div>
  </div>
</div>
`;

const pageScript = `
${sortSidebarScript}

let favsCache = [];
let selectedFavId = null;
let currentSort = 'recent';
let currentTab  = 'beans';

function sortFavs(favs, sortKey) {
  const s = [...favs];
  switch (sortKey) {
    case 'recent':    s.sort((a, b) => new Date(b.capturedAt || 0) - new Date(a.capturedAt || 0)); break;
    case 'oldest':    s.sort((a, b) => new Date(a.capturedAt || 0) - new Date(b.capturedAt || 0)); break;
    case 'az':        s.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
    case 'za':        s.sort((a, b) => (b.title || '').localeCompare(a.title || '')); break;
    case 'most-used': s.sort((a, b) => (b.useCount || 0) - (a.useCount || 0)); break;
    case 'least-used':s.sort((a, b) => (a.useCount || 0) - (b.useCount || 0)); break;
  }
  return s;
}

function formatFavDate(capturedAt) {
  if (!capturedAt) return '';
  const d = new Date(capturedAt);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  const time = d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit', hour12:false });
  const date = d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
  return date + ', ' + time + (diff > 0 ? '  ·  ' + diff + ' days off-roast' : '');
}

function renderCards(favs) {
  const grid = document.getElementById('dye-cards-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // ADD NEW auto-fav card
  const addCard = document.createElement('div');
  addCard.className = 'dye-card dye-card-add';
  addCard.innerHTML = '<span>ADD NEW FAVOURITE</span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
  addCard.addEventListener('click', () => {
    sessionStorage.removeItem('dye_editAutoFavId');
    window.location.href = '/api/v1/plugins/dye2.reaplugin/auto-fav-edit';
  });
  grid.appendChild(addCard);

  // Group by the active tab dimension; one full-width header per group.
  const groups = new Map();
  favs.forEach(fav => {
    const k = groupKeyOf(fav);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(fav);
  });

  groups.forEach((items, key) => {
    const header = document.createElement('div');
    header.className = 'fav-group-header';
    header.textContent = key;
    grid.appendChild(header);

    items.forEach(fav => {
      const card = document.createElement('div');
      card.className = 'dye-card' + (fav.id === selectedFavId ? ' dye-card-selected' : '');
      const title = fav.title || fav.snapshot?.coffeeName || 'Untitled Favourite';
      const sub = fav.snapshot?.coffeeRoaster || '';
      const dateStr = formatFavDate(fav.capturedAt);
      card.innerHTML =
        '<div class="fav-card-title">' + title + '</div>' +
        (sub ? '<div class="dye-card-sub">' + sub + '</div>' : '') +
        (dateStr ? '<hr class="dye-card-divider"><div class="fav-card-date">' + dateStr + '</div>' : '');
      card.addEventListener('click', () => {
        grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
        card.classList.add('dye-card-selected');
        selectedFavId = fav.id;
        const confirmBtn = document.getElementById('dye-confirm-btn');
        if (confirmBtn) confirmBtn.classList.remove('opacity-50');
      });
      card.addEventListener('dblclick', () => {
        sessionStorage.setItem('dye_editAutoFavId', fav.id);
        window.location.href = '/api/v1/plugins/dye2.reaplugin/auto-fav-edit';
      });
      grid.appendChild(card);
    });
  });
}

// Which snapshot field the tab strip groups by.
function groupKeyOf(fav) {
  const snp = fav.snapshot || {};
  switch (currentTab) {
    case 'beans':   return snp.coffeeName   || 'Other';
    case 'recipe':  return fav.beverage     || fav.title || 'Other';
    case 'profile': return snp.profileTitle || snp.profileId || 'Other';
    case 'grinder': return snp.grinderModel || snp.grinderId || 'Other';
    default:        return 'Other';
  }
}

function render() {
  const sorted = sortFavs(favsCache, currentSort);
  renderCards(sorted);
}

function setupTabs() {
  document.getElementById('dye-tab-strip')?.querySelectorAll('.dye-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dye-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      render();
    });
  });
}

async function initAutoFavs() {
  setupTabs();
  setupSortButtons(sort => { currentSort = sort; render(); });

  document.getElementById('dye-cancel-btn')?.addEventListener('click', () => window.history.back());
  document.getElementById('dye-confirm-btn')?.addEventListener('click', () => {
    if (!selectedFavId) return;
    sessionStorage.setItem('dye_selectedAutoFavId', selectedFavId);
    window.history.back();
  });

  try {
    const result = await getAutoFavourites().catch(() => []);
    favsCache = Array.isArray(result) ? result : (result && result.items ? result.items : []);
  } catch (e) {
    console.warn('Auto favourites endpoint not available yet:', e);
    favsCache = [];
  }
  render();
}

initAutoFavs().catch(e => console.error('initAutoFavs failed:', e));

// Returning via history.back() after saving a favourite can restore this list frozen
// from bfcache, so init never re-runs and a newly saved favourite is missing — reload
// to re-fetch. Mirrors the dashboard and recipe-edit pages.
window.addEventListener('pageshow', function(e) { if (e.persisted) window.location.reload(); });
`;

export function renderAutoFavsPage(request: HttpRequest): HttpResponse {
  return {
    requestId: request.requestId,
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: devPageShell("Auto Favourites", content, styles, [devApiScript, pageScript]),
  };
}
