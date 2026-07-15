import { devPageShell } from "../utils/dev-shell";
import { devApiScript } from "../utils/dev-api";

// Mirrors grinder-picker chrome (top bar + CANCEL/CONFIRM, search + sort rail, 3-col grid).
// Opened from "See All Profiles" in recipe-edit; returns the pick via sessionStorage and,
// in workflow mode, PUTs the chosen profile onto /workflow.
const styles = `
  .dye-sort-btn {
    width: 100%; padding: 12px 0;
    border: 2px solid var(--mimoja-blue); border-radius: 9999px;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 19px;
    text-align: center; color: var(--mimoja-blue); background: transparent;
    cursor: pointer; white-space: nowrap;
  }
  .dye-sort-btn.dye-sort-active { background: var(--mimoja-blue); color: #fff; border-color: var(--mimoja-blue); }

  .dye-card {
    width: 100%; min-height: 80px; border-radius: 15px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 14px 18px; font-family: 'Inter', sans-serif; cursor: pointer;
    background: var(--box-color); border: 1px solid var(--profile-button-outline-color);
    color: var(--text-primary); transition: background 0.15s, color 0.15s; user-select: none; gap: 8px;
  }
  .dye-card:hover { opacity: 0.85; }
  .dye-card.dye-card-selected { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }

  .dye-card-name  { font-size: 22px; font-weight: 600; line-height: 1.3; }
  .dye-card-sub   { font-size: 18px; font-weight: 400; opacity: 0.7; }
  .dye-card-date  { font-size: 17px; font-weight: 400; opacity: 0.6; margin-top: 4px; }
  .dye-card.dye-card-selected .dye-card-sub,
  .dye-card.dye-card-selected .dye-card-date { opacity: 0.85; }

  .dye-confirm-disabled { background: var(--fav-button-wait, #e0e0e0); color: var(--text-primary-disabled, #aaa); cursor: not-allowed; }
  .dye-confirm-enabled  { background: var(--mimoja-blue); color: #fff; cursor: pointer; }

  .dye-search-wrap { position: relative; width: 100%; margin-bottom: 10px; }
  .dye-search-input {
    width: 100%; height: 54px; border-radius: 12px; border: none; background: #EDF0F4;
    padding: 0 46px 0 16px; font-family: 'Inter', sans-serif; font-size: 19px;
    color: var(--text-primary); outline: none;
  }
  .dye-search-input::placeholder { color: var(--text-primary-disabled); }
  .dye-search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; }

  #dye-cards-container::-webkit-scrollbar { width: 36px; }
  #dye-cards-container::-webkit-scrollbar-track { background: transparent; }
  #dye-cards-container::-webkit-scrollbar-thumb {
    background: var(--profile-button-outline-color); border-radius: 9999px;
    border: 12px solid transparent; background-clip: padding-box;
  }
`;

const content = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">

  <div class="flex justify-between items-center px-[38px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[134px] shrink-0">
    <h1 class="text-[36px] font-bold text-[var(--text-primary)]">Select Profile</h1>
    <div class="flex items-center gap-[14px]">
      <button id="dye-cancel-btn" class="flex items-center justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] text-[var(--text-primary)] cursor-pointer">CANCEL</button>
      <button id="dye-confirm-btn" class="flex items-center gap-[10px] justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] dye-confirm-disabled" disabled>
        <span>CONFIRM</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>

  <div class="flex flex-1 overflow-hidden">
    <div id="dye-sort-sidebar" class="flex flex-col gap-[18px] items-stretch pt-[28px] px-[20px] shrink-0 w-[180px]">
      <div class="dye-search-wrap">
        <input id="dye-search-input" class="dye-search-input" type="text" placeholder="Search" />
        <svg class="dye-search-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary-disabled)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <button class="dye-sort-btn dye-sort-active" data-sort="az">A-Z</button>
      <button class="dye-sort-btn" data-sort="za">Z-A</button>
      <button class="dye-sort-btn" data-sort="recent">Recent</button>
      <button class="dye-sort-btn" data-sort="oldest">Oldest</button>
    </div>

    <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[28px] px-[38px] pb-[28px]">
      <div id="dye-cards-grid" class="grid grid-cols-3 gap-[20px]"></div>
    </div>
  </div>
</div>
`;

const pageScript = `
let profilesCache = [];
let searchQuery = '';
let selectedProfileId = null;

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// The bridge nests profile fields under p.profile; keep flat fallbacks for safety.
function profileName(p) { const pr = (p && p.profile) || {}; return pr.title || p.title || p.name || 'Untitled Profile'; }
function profileSub(p)  { const pr = (p && p.profile) || {}; return pr.author || pr.beverage_type || p.author || p.beverage_type || p.type || ''; }
function profileMeta(p) { const pr = (p && p.profile) || {}; return pr.notes || p.notes || p.description || ''; }

function matchesSearch(p) {
  if (!searchQuery) return true;
  const hay = profileName(p) + ' ' + profileSub(p) + ' ' + profileMeta(p);
  return hay.toLowerCase().includes(searchQuery);
}

function sortItems(items, sortKey) {
  const sorted = [...items];
  const name = (p) => profileName(p).toLowerCase();
  const ts = (p) => new Date(p.createdAt || p.updatedAt || 0);
  switch (sortKey) {
    case 'za':     sorted.sort((a, b) => name(b).localeCompare(name(a))); break;
    case 'recent': sorted.sort((a, b) => ts(b) - ts(a)); break;
    case 'oldest': sorted.sort((a, b) => ts(a) - ts(b)); break;
    default:       sorted.sort((a, b) => name(a).localeCompare(name(b))); break;
  }
  return sorted;
}

function setupSortButtons(onSort) {
  const sidebar = document.getElementById('dye-sort-sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('.dye-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
      btn.classList.add('dye-sort-active');
      onSort(btn.dataset.sort);
    });
  });
}

function updateConfirmButton(confirmBtn) {
  if (!confirmBtn) return;
  if (selectedProfileId) {
    confirmBtn.disabled = false;
    confirmBtn.classList.remove('dye-confirm-disabled');
    confirmBtn.classList.add('dye-confirm-enabled');
  } else {
    confirmBtn.disabled = true;
    confirmBtn.classList.add('dye-confirm-disabled');
    confirmBtn.classList.remove('dye-confirm-enabled');
  }
}

function renderProfileCards(grid, profiles, confirmBtn) {
  grid.innerHTML = '';
  profiles.forEach(p => {
    const card = document.createElement('div');
    card.className = 'dye-card';
    const sub = profileSub(p);
    const meta = profileMeta(p);
    card.innerHTML =
      '<div class="dye-card-name">' + esc(profileName(p)) + '</div>' +
      (sub ? '<div class="dye-card-sub">' + esc(sub) + '</div>' : '') +
      (meta ? '<div class="dye-card-date">' + esc(meta) + '</div>' : '');
    if (p.id === selectedProfileId) card.classList.add('dye-card-selected');
    card.addEventListener('click', () => {
      grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
      card.classList.add('dye-card-selected');
      selectedProfileId = p.id;
      sessionStorage.setItem('dye_selectedProfileId', p.id);
      sessionStorage.setItem('dye_selectedProfileTitle', profileName(p));
      updateConfirmButton(confirmBtn);
    });
    grid.appendChild(card);
  });
}

async function initializeDyeProfiles() {
  const grid = document.getElementById('dye-cards-grid');
  const cancelBtn = document.getElementById('dye-cancel-btn');
  const confirmBtn = document.getElementById('dye-confirm-btn');
  if (!grid) return;

  selectedProfileId = sessionStorage.getItem('dye_selectedProfileId') || null;
  // ?return=<route> → hand the pick back via dye_selectedProfile* keys instead of the workflow.
  const returnTo = new URLSearchParams(location.search).get('return');
  let currentSort = 'az';

  try {
    const result = await getProfiles();
    profilesCache = Array.isArray(result) ? result : (result.items || []);
  } catch (e) {
    console.error('Failed to load profiles:', e);
    profilesCache = [];
  }

  function render() {
    renderProfileCards(grid, sortItems(profilesCache.filter(matchesSearch), currentSort), confirmBtn);
  }

  render();
  updateConfirmButton(confirmBtn);
  setupSortButtons((sort) => { currentSort = sort; render(); });

  const searchInput = document.getElementById('dye-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => { searchQuery = searchInput.value.trim().toLowerCase(); render(); });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      ['dye_selectedProfileId','dye_selectedProfileTitle'].forEach(k => sessionStorage.removeItem(k));
      window.history.back();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!selectedProfileId) return;
      // Return-target flow (recipe-edit): leave the pick in sessionStorage, hand control back.
      if (returnTo) { window.location.href = returnTo; return; }
      const p = profilesCache.find(x => x.id === selectedProfileId);
      try {
        await updateWorkflow({ profile: { id: selectedProfileId, title: p ? profileName(p) : '' } });
      } catch (e) { console.warn('workflow update failed:', e); }
      window.history.back();
    });
  }
}

initializeDyeProfiles().catch(e => console.error('initializeDyeProfiles failed:', e));
`;

export function renderProfilePickerPage(request: HttpRequest): HttpResponse {
  return {
    requestId: request.requestId,
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: devPageShell("Select Profile", content, styles, [devApiScript, pageScript]),
  };
}
