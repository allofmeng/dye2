import { devPageShell } from "../utils/dev-shell";
import { devApiScript } from "../utils/dev-api";

const styles = `
  .dye-form-label {
    width: 135px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: var(--mimoja-blue);
    flex-shrink: 0;
    line-height: 1.2;
  }
  .dye-form-input-wrap {
    flex: 1;
    border: 2px solid var(--profile-button-outline-color);
    display: flex;
    align-items: center;
    padding: 23px 15px 23px 23px;
    position: relative;
  }
  .dye-form-input {
    flex: 1;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
    background: transparent;
    border: none;
    outline: none;
    line-height: 1.2;
    width: 100%;
  }
  .dye-form-input::placeholder { color: var(--low-contrast-white); }
  .dye-form-icon { flex-shrink: 0; margin-left: 8px; }

  .dye-dropdown-wrap { position: relative; }
  .dye-dropdown-toggle { cursor: pointer; transition: transform 0.2s; }
  .dye-dropdown-wrap.dye-dropdown-open .dye-dropdown-toggle { transform: rotate(180deg); }

  .dye-dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: -2px;
    right: -2px;
    max-height: 360px;
    overflow-y: auto;
    background: var(--profile-button-background-color);
    border: 2px solid var(--profile-button-outline-color);
    border-top: none;
    z-index: 50;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
  .dye-dropdown-wrap.dye-dropdown-open .dye-dropdown-menu { display: block; }
  .dye-dropdown-item {
    padding: 18px 23px;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dye-dropdown-item:hover, .dye-dropdown-item.dye-dropdown-highlight { background: var(--mimoja-blue); color: #fff; }
  .dye-dropdown-item + .dye-dropdown-item { border-top: 1px solid var(--profile-button-outline-color); }
  .dye-dropdown-empty { padding: 18px 23px; font-family: 'Inter', sans-serif; font-size: 22px; color: var(--low-contrast-white); font-style: italic; }
  .dye-dropdown-menu::-webkit-scrollbar { width: 12px; }
  .dye-dropdown-menu::-webkit-scrollbar-track { background: transparent; }
  .dye-dropdown-menu::-webkit-scrollbar-thumb { background: var(--profile-button-outline-color); border-radius: 6px; border: 3px solid transparent; background-clip: padding-box; }

  .dye-form-textarea-wrap { align-items: flex-start; }
  .dye-form-textarea {
    flex: 1;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
    background: transparent;
    border: none;
    outline: none;
    line-height: 1.2;
    width: 100%;
    min-height: 479px;
    resize: vertical;
  }
  .dye-form-textarea::placeholder { color: var(--low-contrast-white); }
`;

const content = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col w-screen h-screen">
  <div class="flex justify-between items-center px-[37px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[165px]">
    <h1 class="text-[38px] font-bold text-[var(--text-primary)] no-select">Add New Beans</h1>
    <div class="flex items-center gap-[16px]">
      <button id="dye-cancel-btn" class="flex justify-center items-center w-[240px] h-[82px] py-[27px] rounded-[68px] font-bold text-[24px] text-[var(--text-primary)]">
        CANCEL
      </button>
      <button id="dye-confirm-btn" class="bg-[var(--mimoja-blue)] text-white flex items-center justify-center w-[240px] h-[82px] py-[27px] rounded-[68px] font-bold text-[24px]">
        CONFIRM
      </button>
    </div>
  </div>
  <div class="flex-1 flex items-center justify-center overflow-y-auto">
    <div id="dye-add-bean-form" class="flex flex-col gap-[30px] w-[1200px]">
      <div class="flex gap-[30px] items-center">
        <label class="dye-form-label">Beans</label>
        <div class="dye-form-input-wrap dye-dropdown-wrap">
          <input id="dye-bean-name" type="text" class="dye-form-input" placeholder="Enter bean name..." autocomplete="off">
          <svg class="dye-form-icon dye-dropdown-toggle" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          <div id="dye-bean-name-dropdown" class="dye-dropdown-menu"></div>
        </div>
      </div>
      <div class="flex gap-[30px] items-center">
        <label class="dye-form-label">Roaster</label>
        <div class="dye-form-input-wrap dye-dropdown-wrap">
          <input id="dye-bean-roaster" type="text" class="dye-form-input" placeholder="Enter or select roaster..." autocomplete="off">
          <svg class="dye-form-icon dye-dropdown-toggle" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          <div id="dye-bean-roaster-dropdown" class="dye-dropdown-menu"></div>
        </div>
      </div>
      <div class="flex gap-[30px] items-center">
        <label class="dye-form-label">Roast Date</label>
        <div class="dye-form-input-wrap">
          <input id="dye-bean-roast-date" type="date" class="dye-form-input">
          <svg class="dye-form-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
        </div>
      </div>
      <div class="flex gap-[30px] items-start">
        <label class="dye-form-label pt-[23px]">Bean Notes</label>
        <div class="dye-form-input-wrap dye-form-textarea-wrap">
          <textarea id="dye-bean-notes" class="dye-form-textarea" placeholder="Enter tasting notes, description..." rows="12"></textarea>
        </div>
      </div>
    </div>
  </div>
</div>
`;

const pageScript = `
let beansCache = null;

function setupDropdown(inputId, dropdownId, items) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  const wrap = input && input.closest('.dye-dropdown-wrap');
  if (!input || !dropdown || !wrap) return;

  const chevron = wrap.querySelector('.dye-dropdown-toggle');
  let highlightIndex = -1;

  function renderOptions(filter) {
    const filtered = filter
      ? items.filter(v => v.toLowerCase().includes(filter.toLowerCase()))
      : items;
    dropdown.innerHTML = '';
    highlightIndex = -1;
    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'dye-dropdown-empty';
      empty.textContent = filter ? 'No matches found' : 'No items available';
      dropdown.appendChild(empty);
      return;
    }
    filtered.forEach((value, i) => {
      const item = document.createElement('div');
      item.className = 'dye-dropdown-item';
      item.textContent = value;
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        input.value = value;
        closeDropdown();
        input.dispatchEvent(new Event('change'));
      });
      item.addEventListener('mouseenter', () => { clearHighlight(); highlightIndex = i; item.classList.add('dye-dropdown-highlight'); });
      item.addEventListener('mouseleave', () => { item.classList.remove('dye-dropdown-highlight'); highlightIndex = -1; });
      dropdown.appendChild(item);
    });
  }

  function clearHighlight() { dropdown.querySelectorAll('.dye-dropdown-highlight').forEach(el => el.classList.remove('dye-dropdown-highlight')); }
  function openDropdown() { wrap.classList.add('dye-dropdown-open'); renderOptions(input.value); }
  function closeDropdown() { wrap.classList.remove('dye-dropdown-open'); highlightIndex = -1; }
  function isOpen() { return wrap.classList.contains('dye-dropdown-open'); }

  if (chevron) {
    chevron.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isOpen() ? closeDropdown() : (input.focus(), openDropdown());
    });
  }

  input.addEventListener('focus', () => openDropdown());
  input.addEventListener('blur', () => setTimeout(closeDropdown, 150));
  input.addEventListener('input', () => { if (!isOpen()) openDropdown(); renderOptions(input.value); });
  input.addEventListener('keydown', (e) => {
    if (!isOpen()) { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { openDropdown(); e.preventDefault(); } return; }
    const visibleItems = dropdown.querySelectorAll('.dye-dropdown-item');
    if (visibleItems.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); clearHighlight(); highlightIndex = (highlightIndex + 1) % visibleItems.length; visibleItems[highlightIndex].classList.add('dye-dropdown-highlight'); visibleItems[highlightIndex].scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); clearHighlight(); highlightIndex = highlightIndex <= 0 ? visibleItems.length - 1 : highlightIndex - 1; visibleItems[highlightIndex].classList.add('dye-dropdown-highlight'); visibleItems[highlightIndex].scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter') { e.preventDefault(); if (highlightIndex >= 0 && visibleItems[highlightIndex]) { input.value = visibleItems[highlightIndex].textContent; closeDropdown(); input.dispatchEvent(new Event('change')); } else { closeDropdown(); } }
    else if (e.key === 'Escape') { closeDropdown(); }
  });
}

async function initializeDyeAddBean() {
  const cancelBtn = document.getElementById('dye-cancel-btn');
  const confirmBtn = document.getElementById('dye-confirm-btn');
  const nameInput = document.getElementById('dye-bean-name');
  const roasterInput = document.getElementById('dye-bean-roaster');
  const roastDateInput = document.getElementById('dye-bean-roast-date');
  const notesInput = document.getElementById('dye-bean-notes');

  if (!nameInput) return;

  if (!beansCache) {
    try { beansCache = await getBeans(); }
    catch (e) { console.error('Failed to load beans:', e); beansCache = []; }
  }

  const beanNames = [...new Set(beansCache.map(b => b.name).filter(Boolean))].sort();
  const roasters = [...new Set(beansCache.map(b => b.roaster).filter(Boolean))].sort();

  setupDropdown('dye-bean-name', 'dye-bean-name-dropdown', beanNames);
  setupDropdown('dye-bean-roaster', 'dye-bean-roaster-dropdown', roasters);

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => { window.location.href = '/api/v1/plugins/dye2.reaplugin/bean-picker'; });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      const name = nameInput.value.trim();
      const roaster = roasterInput.value.trim();

      if (!name || !roaster) {
        const nameWrap = nameInput.closest('.dye-form-input-wrap');
        const roasterWrap = roasterInput.closest('.dye-form-input-wrap');
        if (nameWrap) nameWrap.style.borderColor = name ? '' : '#DA515E';
        if (roasterWrap) roasterWrap.style.borderColor = roaster ? '' : '#DA515E';
        return;
      }

      try {
        const bean = await createBean({ roaster, name, notes: notesInput.value.trim() || null });
        if (roastDateInput.value && bean.id) {
          await createBeanBatch(bean.id, { roastDate: new Date(roastDateInput.value).toISOString() });
        }
        beansCache = null;
        window.location.href = '/api/v1/plugins/dye2.reaplugin/bean-picker';
      } catch (e) {
        console.error('Failed to create bean:', e);
      }
    });
  }
}

initializeDyeAddBean().catch(e => console.error('initializeDyeAddBean failed:', e));
`;

export function renderAddBeanPage(request: HttpRequest): HttpResponse {
  return {
    requestId: request.requestId,
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: devPageShell("Add New Beans", content, styles, [devApiScript, pageScript]),
  };
}
