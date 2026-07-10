import { getBeans, getBeanBatches, createBean, createBeanBatch, updateWorkflow } from './api.js';
import { loadPage } from './router.js';

let beansCache = null;
let beanBatchesCache = {}; // beanId -> batches[]
let selectedBeanId = null;
let selectedRoaster = null;

function getBeanDisplayName(bean) {
    const parts = [bean.name];
    if (bean.variety && bean.variety.length) parts.push(bean.variety.join(', '));
    if (bean.country) parts.push(bean.country);
    if (bean.processing) parts.push(bean.processing);
    return parts.join(', ');
}

function getLatestBatch(beanId) {
    const batches = beanBatchesCache[beanId];
    if (!batches || batches.length === 0) return null;
    return batches.reduce((latest, b) => {
        if (!latest) return b;
        const ld = b.roastDate ? new Date(b.roastDate) : new Date(0);
        const cd = latest.roastDate ? new Date(latest.roastDate) : new Date(0);
        return ld > cd ? b : latest;
    }, null);
}

function formatRoastDate(batch) {
    if (!batch || !batch.roastDate) return '';
    const roastDate = new Date(batch.roastDate);
    const now = new Date();
    const diffDays = Math.floor((now - roastDate) / (1000 * 60 * 60 * 24));
    const dateStr = roastDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${dateStr} (${diffDays} days off-roast)`;
}

async function fetchAllBatches(beans) {
    const promises = beans.map(async (bean) => {
        if (beanBatchesCache[bean.id]) return;
        try {
            beanBatchesCache[bean.id] = await getBeanBatches(bean.id);
        } catch (e) {
            beanBatchesCache[bean.id] = [];
        }
    });
    await Promise.all(promises);
}

function sortItems(items, sortKey, nameField = 'name') {
    const sorted = [...items];
    switch (sortKey) {
        case 'recent':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'az':
            sorted.sort((a, b) => (a[nameField] || '').localeCompare(b[nameField] || ''));
            break;
        case 'za':
            sorted.sort((a, b) => (b[nameField] || '').localeCompare(a[nameField] || ''));
            break;
        case 'most-used':
        case 'least-used':
            // No usage data yet — fall back to alphabetical
            sorted.sort((a, b) => (a[nameField] || '').localeCompare(b[nameField] || ''));
            break;
    }
    return sorted;
}

function setupSortButtons(onSort) {
    const sidebar = document.getElementById('dye-sort-sidebar');
    if (!sidebar) return;

    const buttons = sidebar.querySelectorAll('.dye-sort-btn');
    buttons.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
            newBtn.classList.add('dye-sort-active');
            onSort(newBtn.dataset.sort);
        });
    });
}

function renderCards(grid, items, nameField, selectedValue, onSelect, addLabel, onAdd) {
    grid.innerHTML = '';

    // Add New card
    const addCard = document.createElement('div');
    addCard.className = 'dye-card dye-card-add';
    addCard.innerHTML = `
        <span>${addLabel}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    `;
    if (onAdd) {
        addCard.addEventListener('click', onAdd);
    }
    
    grid.appendChild(addCard);

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dye-card';
        const value = typeof item === 'string' ? item : item[nameField];
        const id = typeof item === 'string' ? item : item.id;
        card.textContent = value;

        if (id === selectedValue || value === selectedValue) {
            card.classList.add('dye-card-selected');
        }

        card.addEventListener('click', () => {
            grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
            card.classList.add('dye-card-selected');
            onSelect(item);
        });

        grid.appendChild(card);
    });
}

function renderBeanCards(grid, beans, selectedValue, onSelect, onAdd) {
    grid.innerHTML = '';

    // Add New card (full width)
    const addCard = document.createElement('div');
    addCard.className = 'dye-card dye-card-add';
    addCard.innerHTML = `
        <span>ADD NEW BEANS</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    `;
    if (onAdd) addCard.addEventListener('click', onAdd);
    grid.appendChild(addCard);

    beans.forEach(bean => {
        const card = document.createElement('div');
        card.className = 'dye-card';

        const batch = getLatestBatch(bean.id);
        const dateStr = formatRoastDate(batch);

        card.innerHTML = `
            <div class="dye-card-name">${getBeanDisplayName(bean)}</div>
            <div class="dye-card-roaster">${bean.roaster || ''}</div>
            <hr class="dye-card-divider">
            <div class="dye-card-date">${dateStr}</div>
        `;

        if (bean.id === selectedValue) {
            card.classList.add('dye-card-selected');
        }

        card.addEventListener('click', () => {
            grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
            card.classList.add('dye-card-selected');
            onSelect(bean);
        });

        grid.appendChild(card);
    });
}

// ── Beans Page ──────────────────────────────────────────────

export async function initializeDyeBeans() {
    const grid = document.getElementById('dye-cards-grid');
    const cancelBtn = document.getElementById('dye-cancel-btn');
    const confirmBtn = document.getElementById('dye-confirm-btn');
    if (!grid) return;

    // Reset selection
    selectedBeanId = sessionStorage.getItem('dye_selectedBeanId') || null;
    let currentSort = 'recent';

    // Load beans + batches
    try {
        beansCache = await getBeans();
    } catch (e) {
        console.error('Failed to load beans:', e);
        beansCache = [];
    }

    await fetchAllBatches(beansCache);

    function render() {
        const sorted = sortItems(beansCache, currentSort, 'name');
        renderBeanCards(grid, sorted, selectedBeanId, (bean) => {
            selectedBeanId = bean.id;
            sessionStorage.setItem('dye_selectedBeanId', bean.id);
            sessionStorage.setItem('dye_selectedBeanName', bean.name);
            sessionStorage.setItem('dye_selectedBeanRoaster', bean.roaster);
        }, () => {
            loadPage('src/dye/dye_add_bean.html');
        });
    }

    render();

    setupSortButtons((sort) => {
        currentSort = sort;
        render();
    });

    // Cancel → back to main
    if (cancelBtn) {
        const newBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newBtn, cancelBtn);
        newBtn.addEventListener('click', () => {
            sessionStorage.removeItem('dye_selectedBeanId');
            sessionStorage.removeItem('dye_selectedBeanName');
            sessionStorage.removeItem('dye_selectedBeanRoaster');
            sessionStorage.removeItem('dye_selectedRoaster');
            loadPage('index.html');
        });
    }

    // Confirm → update workflow with selected bean and go to roaster page
    if (confirmBtn) {
        const newBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
        newBtn.addEventListener('click', () => {
            if (!selectedBeanId) return;
            loadPage('src/dye/dye_roasters.html');
        });
    }
}

// ── Roasters Page ───────────────────────────────────────────

export async function initializeDyeRoasters() {
    const grid = document.getElementById('dye-cards-grid');
    const cancelBtn = document.getElementById('dye-cancel-btn');
    const confirmBtn = document.getElementById('dye-confirm-btn');
    if (!grid) return;

    selectedRoaster = sessionStorage.getItem('dye_selectedRoaster') || null;
    let currentSort = 'recent';

    // Load beans if not cached
    if (!beansCache) {
        try {
            beansCache = await getBeans();
        } catch (e) {
            console.error('Failed to load beans:', e);
            beansCache = [];
        }
    }

    // Extract unique roasters with metadata for sorting
    function getRoasterItems() {
        const roasterMap = new Map();
        beansCache.forEach(bean => {
            if (!bean.roaster) return;
            if (!roasterMap.has(bean.roaster)) {
                roasterMap.set(bean.roaster, {
                    name: bean.roaster,
                    createdAt: bean.createdAt,
                    updatedAt: bean.updatedAt
                });
            } else {
                // Keep the most recent date
                const existing = roasterMap.get(bean.roaster);
                if (new Date(bean.createdAt) > new Date(existing.createdAt)) {
                    existing.createdAt = bean.createdAt;
                }
                if (new Date(bean.updatedAt) > new Date(existing.updatedAt)) {
                    existing.updatedAt = bean.updatedAt;
                }
            }
        });
        return Array.from(roasterMap.values());
    }

    function updateConfirmButton() {
        if (!confirmBtn) return;
        if (selectedRoaster) {
            confirmBtn.disabled = false;
            confirmBtn.classList.remove('dye-confirm-disabled');
            confirmBtn.classList.add('dye-confirm-enabled');
        } else {
            confirmBtn.disabled = true;
            confirmBtn.classList.add('dye-confirm-disabled');
            confirmBtn.classList.remove('dye-confirm-enabled');
        }
    }

    function render() {
        const roasters = getRoasterItems();
        const sorted = sortItems(roasters, currentSort, 'name');
        renderCards(grid, sorted, 'name', selectedRoaster, (roaster) => {
            selectedRoaster = roaster.name;
            sessionStorage.setItem('dye_selectedRoaster', roaster.name);
            updateConfirmButton();
        }, 'ADD NEW ROASTER', () => {
            loadPage('src/dye/dye_add_bean.html');
        });
    }

    render();
    updateConfirmButton();

    setupSortButtons((sort) => {
        currentSort = sort;
        render();
    });

    // Cancel → back to main, clear state
    if (cancelBtn) {
        const newBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newBtn, cancelBtn);
        newBtn.addEventListener('click', () => {
            sessionStorage.removeItem('dye_selectedBeanId');
            sessionStorage.removeItem('dye_selectedBeanName');
            sessionStorage.removeItem('dye_selectedBeanRoaster');
            sessionStorage.removeItem('dye_selectedRoaster');
            loadPage('index.html');
        });
    }

    // Confirm → update workflow and return to main
    if (confirmBtn) {
        const newBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
        // Re-apply state after clone
        if (selectedRoaster) {
            newBtn.disabled = false;
            newBtn.classList.remove('dye-confirm-disabled');
            newBtn.classList.add('dye-confirm-enabled');
        }
        newBtn.addEventListener('click', async () => {
            if (!selectedRoaster) return;

            const beanName = sessionStorage.getItem('dye_selectedBeanName') || '';
            const beanRoaster = selectedRoaster;

            try {
                await updateWorkflow({
                    doseData: {
                        coffeeName: beanName,
                        coffeeRoaster: beanRoaster
                    }
                });
            } catch (e) {
                console.error('Failed to update workflow:', e);
            }

            // Clear session state
            sessionStorage.removeItem('dye_selectedBeanId');
            sessionStorage.removeItem('dye_selectedBeanName');
            sessionStorage.removeItem('dye_selectedBeanRoaster');
            sessionStorage.removeItem('dye_selectedRoaster');

            loadPage('index.html');
        });
    }
}

// ── Custom Dropdown ──────────────────────────────────────────

function setupDropdown(inputId, dropdownId, items) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    const wrap = input?.closest('.dye-dropdown-wrap');
    if (!input || !dropdown || !wrap) return;

    const chevron = wrap.querySelector('.dye-dropdown-toggle');
    let highlightIndex = -1;

    function renderOptions(filter = '') {
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
            item.addEventListener('mouseenter', () => {
                clearHighlight();
                highlightIndex = i;
                item.classList.add('dye-dropdown-highlight');
            });
            item.addEventListener('mouseleave', () => {
                item.classList.remove('dye-dropdown-highlight');
                highlightIndex = -1;
            });
            dropdown.appendChild(item);
        });
    }

    function clearHighlight() {
        dropdown.querySelectorAll('.dye-dropdown-highlight').forEach(el =>
            el.classList.remove('dye-dropdown-highlight')
        );
    }

    function openDropdown() {
        wrap.classList.add('dye-dropdown-open');
        renderOptions(input.value);
    }

    function closeDropdown() {
        wrap.classList.remove('dye-dropdown-open');
        highlightIndex = -1;
    }

    function isOpen() {
        return wrap.classList.contains('dye-dropdown-open');
    }

    // Chevron toggle
    if (chevron) {
        chevron.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (isOpen()) {
                closeDropdown();
            } else {
                input.focus();
                openDropdown();
            }
        });
    }

    // Input events
    input.addEventListener('focus', () => openDropdown());
    input.addEventListener('blur', () => {
        // Small delay so mousedown on item fires first
        setTimeout(closeDropdown, 150);
    });
    input.addEventListener('input', () => {
        if (!isOpen()) openDropdown();
        renderOptions(input.value);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
        if (!isOpen()) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                openDropdown();
                e.preventDefault();
            }
            return;
        }

        const visibleItems = dropdown.querySelectorAll('.dye-dropdown-item');
        if (visibleItems.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            clearHighlight();
            highlightIndex = (highlightIndex + 1) % visibleItems.length;
            visibleItems[highlightIndex].classList.add('dye-dropdown-highlight');
            visibleItems[highlightIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            clearHighlight();
            highlightIndex = highlightIndex <= 0 ? visibleItems.length - 1 : highlightIndex - 1;
            visibleItems[highlightIndex].classList.add('dye-dropdown-highlight');
            visibleItems[highlightIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightIndex >= 0 && visibleItems[highlightIndex]) {
                input.value = visibleItems[highlightIndex].textContent;
                closeDropdown();
                input.dispatchEvent(new Event('change'));
            } else {
                closeDropdown();
            }
        } else if (e.key === 'Escape') {
            closeDropdown();
        }
    });
}

// ── Add New Bean Page ───────────────────────────────────────

export async function initializeDyeAddBean() {
    const cancelBtn = document.getElementById('dye-cancel-btn');
    const confirmBtn = document.getElementById('dye-confirm-btn');
    const nameInput = document.getElementById('dye-bean-name');
    const roasterInput = document.getElementById('dye-bean-roaster');
    const roastDateInput = document.getElementById('dye-bean-roast-date');
    const notesInput = document.getElementById('dye-bean-notes');

    if (!nameInput) return;

    // Load beans for dropdown suggestions
    if (!beansCache) {
        try {
            beansCache = await getBeans();
        } catch (e) {
            console.error('Failed to load beans:', e);
            beansCache = [];
        }
    }

    // Setup custom dropdowns
    const beanNames = [...new Set(beansCache.map(b => b.name).filter(Boolean))].sort();
    const roasters = [...new Set(beansCache.map(b => b.roaster).filter(Boolean))].sort();

    setupDropdown('dye-bean-name', 'dye-bean-name-dropdown', beanNames);
    setupDropdown('dye-bean-roaster', 'dye-bean-roaster-dropdown', roasters);

    // Cancel → back to beans page
    if (cancelBtn) {
        const newBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newBtn, cancelBtn);
        newBtn.addEventListener('click', () => {
            loadPage('src/dye/dye_beans.html');
        });
    }

    // Confirm → create bean + optional batch, then go back to beans
    if (confirmBtn) {
        const newBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
        newBtn.addEventListener('click', async () => {
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
                const bean = await createBean({
                    roaster,
                    name,
                    notes: notesInput.value.trim() || null
                });

                // If roast date provided, create a batch
                if (roastDateInput.value && bean.id) {
                    await createBeanBatch(bean.id, {
                        roastDate: new Date(roastDateInput.value).toISOString()
                    });
                }

                // Invalidate caches so beans list refreshes
                beansCache = null;
                beanBatchesCache = {};

                loadPage('src/dye/dye_beans.html');
            } catch (e) {
                console.error('Failed to create bean:', e);
            }
        });
    }
}
