import { getShots, deleteShot, updateShot, getBeans, getBeanBatches, getGrinders, getWorkflow, updateWorkflow, API_BASE_URL } from './api.js';
import { loadPage } from './router.js';
import { initChart, plotHistoricalShot } from './chart.js';

// --- State ---
let shots = [];
let currentShotIndex = 0;
let sameBeanFilter = false;
let allShots = []; // unfiltered
let grinders = [];
let currentGrinderIndex = 0;
let currentWorkflow = null;
let currentStarRating = 0;
let currentShotNote = '';

// --- Helpers ---

function formatShotDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let label;
    if (diffDays === 0) label = 'Today';
    else if (diffDays === 1) label = 'Yesterday';
    else label = `${diffDays} days ago`;

    const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return { label, full: `${dateStr}, ${timeStr}` };
}

function formatCurrentDate() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${dateStr}, ${timeStr}`;
}

function calcRatio(doseIn, doseOut) {
    if (!doseIn || doseIn === 0) return '—';
    return `1:${(doseOut / doseIn).toFixed(1)}`;
}

// --- Left Panel ---

async function renderLastShot() {
    let shot = shots[currentShotIndex];
    const labelEl = document.getElementById('dye-last-shot-label');
    const dateEl = document.getElementById('dye-last-shot-date');
    const profileEl = document.getElementById('dye-shot-profile');
    const statsEl = document.getElementById('dye-shot-stats');
    const beansEl = document.getElementById('dye-shot-beans');
    const grinderEl = document.getElementById('dye-shot-grinder');
    const baristaEl = document.getElementById('dye-shot-barista');
    if (!shot) {
        if (labelEl) labelEl.textContent = 'Last Shot: —';
        if (dateEl) dateEl.textContent = 'No shots recorded';
        const chartEl2 = document.getElementById('plotly-chart');
        if (chartEl2) chartEl2.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--low-contrast-white);font-size:24px;">No shot data</div>';
        if (profileEl) profileEl.textContent = '—';
        if (statsEl) statsEl.textContent = '—';
        if (beansEl) beansEl.textContent = '—';
        if (grinderEl) grinderEl.textContent = '—';
        if (baristaEl) baristaEl.textContent = '—';
        currentShotNote = '';
        return;
    }

    // Header
    const { label, full } = formatShotDate(shot.timestamp);
    if (labelEl) labelEl.textContent = `Last Shot: ${label}`;
    if (dateEl) dateEl.textContent = full;

    // Lazy-load measurements if not included in list response
    if (!shot.measurements) {
        try {
            const response = await fetch(`${API_BASE_URL}/shots/${shot.id}`);
            if (response.ok) {
                const fullShot = await response.json();
                shots[currentShotIndex] = { ...shot, ...fullShot };
                shot = shots[currentShotIndex];
            }
        } catch (e) {
            console.warn('DYE Dashboard: Could not fetch full shot data:', e);
        }
    }

    // Chart — use existing chart.js module (plotHistoricalShot targets #plotly-chart)
    if (shot.measurements && shot.measurements.length > 0) {
        plotHistoricalShot(shot.measurements, shot.workflow);
    }

    // Shot info
    const wf = shot.workflow || {};
    const ctx = wf.context || {};
    const doseData = wf.doseData || {};
    const grinderData = wf.grinderData || {};
    const profile = wf.profile || {};

    if (profileEl) profileEl.textContent = profile.title || '—';

    // Stats: extract from doseData
    const doseIn = doseData.doseIn ? `${doseData.doseIn}g` : '—';
    const doseOut = doseData.doseOut ? `${doseData.doseOut}g` : '—';
    const ratio = (doseData.doseIn && doseData.doseOut) ? calcRatio(doseData.doseIn, doseData.doseOut) : '—';
    // Compute shot time from measurements
    const measurements = shot.measurements || [];
    let shotTimeStr = '—';
    if (measurements.length > 0) {
        let start = null, end = null;
        for (const dp of measurements) {
            const m = dp.machine;
            if (m && m.state && (m.state.substate === 'preinfusion' || m.state.substate === 'pouring')) {
                if (!start) start = new Date(m.timestamp);
                end = new Date(m.timestamp);
            }
        }
        if (start && end) {
            const secs = Math.round((end - start) / 1000);
            shotTimeStr = `${secs}s`;
        }
    }

    if (statsEl) {
        statsEl.innerHTML = `Drink <strong>${doseIn}:${doseOut}</strong> &nbsp; Time <strong>${shotTimeStr}</strong> &nbsp; Ratio <strong>${ratio}</strong>`;
    }

    // Bean info
    const roaster = ctx.coffeeRoaster || '';
    const coffeeName = ctx.coffeeName || '';
    if (beansEl) {
        if (roaster || coffeeName) {
            beansEl.innerHTML = roaster ? `<strong>${roaster}</strong> &bull; ${coffeeName}` : coffeeName;
        } else {
            beansEl.textContent = '—';
        }
    }

    // Grinder info
    const grinderModel = grinderData.model || grinderData.name || '—';
    const grindSetting = grinderData.setting !== undefined ? grinderData.setting : '—';
    if (grinderEl) {
        grinderEl.innerHTML = `Grinder <strong>${grinderModel}</strong> &bull; Setting <strong>${grindSetting}</strong>`;
    }

    // Barista
    const barista = ctx.barista || '';
    const drinker = ctx.drinker || '';
    if (baristaEl) {
        let html = '';
        if (barista) html += `Barista <strong>${barista}</strong>`;
        if (barista && drinker) html += ' &nbsp; ';
        if (drinker) html += `Drinker <strong>${drinker}</strong>`;
        if (!barista && !drinker) html = '—';
        baristaEl.innerHTML = html;
    }

    // Star rating
    const rating = (shot.extras && shot.extras.rating) ? parseInt(shot.extras.rating) : 0;
    currentStarRating = rating;
    updateStarDisplay(rating);

    // Read Note: drinker note (annotations.espressoNotes), else pre-shot workflow note.
    const wfNote = ctx.extras && ctx.extras.note;
    currentShotNote = (shot.annotations && shot.annotations.espressoNotes) || wfNote || '';
    const noteBtn = document.getElementById('dye-read-note-btn');
    if (noteBtn) noteBtn.style.opacity = currentShotNote.trim() ? '' : '0.4';
}

function setupReadNote() {
    const btn = document.getElementById('dye-read-note-btn');
    const overlay = document.getElementById('dye-note-overlay');
    const body = document.getElementById('dye-note-body');
    const closeBtn = document.getElementById('dye-note-close');
    if (btn && overlay && body) {
        btn.addEventListener('click', () => {
            body.textContent = currentShotNote.trim() || 'No note for this shot.';
            overlay.classList.add('open');
        });
    }
    closeBtn?.addEventListener('click', () => overlay?.classList.remove('open'));
    overlay?.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.dye-star');
    stars.forEach(star => {
        const idx = parseInt(star.getAttribute('data-index'));
        if (idx <= rating) {
            star.setAttribute('fill', 'var(--mimoja-blue)');
            star.setAttribute('stroke', 'var(--mimoja-blue)');
        } else {
            star.setAttribute('fill', 'none');
            star.setAttribute('stroke', 'var(--profile-button-outline-color)');
        }
    });
}

function setupStarRating() {
    const stars = document.querySelectorAll('.dye-star');
    stars.forEach(star => {
        star.addEventListener('click', async () => {
            const idx = parseInt(star.getAttribute('data-index'));
            currentStarRating = idx;
            updateStarDisplay(idx);
            // Persist rating to shot extras
            const shot = shots[currentShotIndex];
            if (shot) {
                try {
                    await updateShot(shot.id, { extras: { ...(shot.extras || {}), rating: idx } });
                    shot.extras = { ...(shot.extras || {}), rating: idx };
                } catch (e) {
                    console.warn('Could not save star rating:', e);
                }
            }
        });
    });
}

function setupShotNavigation() {
    const prevBtn = document.getElementById('dye-prev-shot-btn');
    const nextBtn = document.getElementById('dye-next-shot-btn');
    const sameBeansBtn = document.getElementById('dye-same-beans-btn');

    if (prevBtn) {
        const prev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(prev, prevBtn);
        prev.addEventListener('click', () => {
            if (currentShotIndex < shots.length - 1) {
                currentShotIndex++;
                renderLastShot().catch(e => console.warn('renderLastShot failed:', e));
            }
        });
    }

    if (nextBtn) {
        const next = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(next, nextBtn);
        next.addEventListener('click', () => {
            if (currentShotIndex > 0) {
                currentShotIndex--;
                renderLastShot().catch(e => console.warn('renderLastShot failed:', e));
            }
        });
    }

    if (sameBeansBtn) {
        const sb = sameBeansBtn.cloneNode(true);
        sameBeansBtn.parentNode.replaceChild(sb, sameBeansBtn);
        sb.addEventListener('click', () => {
            sameBeanFilter = !sameBeanFilter;
            if (sameBeanFilter) {
                const shot = shots[currentShotIndex];
                const coffeeName = shot && shot.workflow && shot.workflow.context && shot.workflow.context.coffeeName;
                if (coffeeName) {
                    shots = allShots.filter(s => s.workflow && s.workflow.context && s.workflow.context.coffeeName === coffeeName);
                }
                sb.querySelector('span').textContent = 'All Shots';
            } else {
                shots = [...allShots];
                sb.querySelector('span').textContent = 'Same Beans';
            }
            currentShotIndex = 0;
            renderLastShot().catch(e => console.warn('renderLastShot failed:', e));
        });
    }
}

function setupEditShotDropdown() {
    const btn = document.getElementById('dye-edit-shot-btn');
    const dropdown = document.getElementById('dye-edit-shot-dropdown');
    if (!btn || !dropdown) return;

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        document.getElementById('dye-settings-dropdown')?.classList.remove('open');
        document.getElementById('dye-visualizer-dropdown')?.classList.remove('open');
    });

    const deleteBtn = document.getElementById('dye-delete-shot');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            dropdown.classList.remove('open');
            const shot = shots[currentShotIndex];
            if (!shot) return;
            if (!confirm('Delete this shot? This cannot be undone.')) return;
            try {
                await deleteShot(shot.id);
                allShots = allShots.filter(s => s.id !== shot.id);
                shots = shots.filter(s => s.id !== shot.id);
                currentShotIndex = Math.min(currentShotIndex, shots.length - 1);
                renderLastShot().catch(e => console.warn('renderLastShot failed:', e));
            } catch (e) {
                console.error('Failed to delete shot:', e);
            }
        });
    }
}

function setupDyeSettingsDropdown() {
    const btn = document.getElementById('dye-settings-btn');
    const dropdown = document.getElementById('dye-settings-dropdown');
    if (!btn || !dropdown) return;

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        document.getElementById('dye-edit-shot-dropdown')?.classList.remove('open');
        document.getElementById('dye-visualizer-dropdown')?.classList.remove('open');
    });
}

function setupVisualizerDropdown() {
    const btn = document.getElementById('dye-visualizer-btn');
    const dropdown = document.getElementById('dye-visualizer-dropdown');
    if (!btn || !dropdown) return;

    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        document.getElementById('dye-edit-shot-dropdown')?.classList.remove('open');
        document.getElementById('dye-settings-dropdown')?.classList.remove('open');
    });
}

// --- Right Panel ---

function renderNextShot() {
    if (!currentWorkflow) return;

    const dateEl = document.getElementById('dye-next-date');
    if (dateEl) dateEl.textContent = formatCurrentDate();

    const wf = currentWorkflow;
    const ctx = wf.context || {};
    const doseData = wf.doseData || {};
    const grinderData = wf.grinderData || {};
    const profile = wf.profile || {};

    // Profile name
    const profileEl = document.getElementById('dye-profile-name');
    if (profileEl) profileEl.textContent = profile.title || '—';

    // Dose / Drink
    const doseVal = document.getElementById('dye-dose-value');
    const drinkVal = document.getElementById('dye-drink-value');
    const ratioVal = document.getElementById('dye-drink-ratio');
    if (doseVal) doseVal.textContent = doseData.doseIn !== undefined ? `${doseData.doseIn}g` : '—';
    if (drinkVal) drinkVal.textContent = doseData.doseOut !== undefined ? `${doseData.doseOut}g` : '—';
    if (ratioVal) {
        const r = calcRatio(doseData.doseIn, doseData.doseOut);
        ratioVal.textContent = r !== '—' ? `(${r})` : '';
    }

    // Grind / RPM
    const grindVal = document.getElementById('dye-grind-value');
    const rpmVal = document.getElementById('dye-rpm-value');
    if (grindVal) grindVal.textContent = grinderData.setting !== undefined ? grinderData.setting : '—';
    if (rpmVal) rpmVal.textContent = grinderData.rpm !== undefined ? grinderData.rpm : '—';

    // Grinder tabs
    renderGrinderTabs();

    // Bean info
    const beanNameEl = document.getElementById('dye-bean-name-display');
    const roastInfoEl = document.getElementById('dye-bean-roast-info');
    const coffeeName = ctx.coffeeName || '';
    const coffeeRoaster = ctx.coffeeRoaster || '';
    const roastDate = ctx.roastDate || '';

    if (beanNameEl) beanNameEl.textContent = coffeeName || '— Select Beans';
    if (roastInfoEl) {
        if (coffeeRoaster || roastDate) {
            let info = coffeeRoaster ? `Roasted by ${coffeeRoaster}` : '';
            if (roastDate) {
                const rd = new Date(roastDate);
                const diffDays = Math.floor((new Date() - rd) / (1000 * 60 * 60 * 24));
                const dateStr = rd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                info += info ? ` on ${dateStr} (${diffDays} days off-roast)` : `${dateStr} (${diffDays} days off-roast)`;
            }
            roastInfoEl.textContent = info;
        } else {
            roastInfoEl.textContent = '';
        }
    }

    // Barista / Drinker
    const baristaEl = document.getElementById('dye-next-barista');
    const drinkerEl = document.getElementById('dye-next-drinker');
    if (baristaEl) baristaEl.textContent = ctx.barista || '—';
    if (drinkerEl) drinkerEl.textContent = ctx.drinker || '—';

    // Recipe pills (use favourites from workflow if available)
    renderRecipePills(wf);
}

function renderGrinderTabs() {
    const container = document.getElementById('dye-grinder-tabs');
    if (!container || grinders.length === 0) return;

    container.innerHTML = '';
    grinders.forEach((g, i) => {
        const tab = document.createElement('button');
        tab.className = 'dye-grinder-tab' + (i === currentGrinderIndex ? ' active' : '');
        tab.textContent = g.model || g.name || `Grinder ${i + 1}`;
        tab.addEventListener('click', () => {
            currentGrinderIndex = i;
            document.querySelectorAll('.dye-grinder-tab').forEach((t, j) => {
                t.classList.toggle('active', j === i);
            });
            // Update grind value if the selected grinder has a setting in workflow
            const grindVal = document.getElementById('dye-grind-value');
            if (grindVal && currentWorkflow && currentWorkflow.grinderData) {
                grindVal.textContent = currentWorkflow.grinderData.setting !== undefined ? currentWorkflow.grinderData.setting : '—';
            }
        });
        container.appendChild(tab);
    });
}

function renderRecipePills(workflow) {
    const container = document.getElementById('dye-recipe-pills');
    if (!container) return;

    // Favourites from workflow.favorites or workflow.recipes
    const items = workflow.favorites || workflow.recipes || [];
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<span style="color:var(--low-contrast-white);font-size:21px;">No recipes yet</span>';
        return;
    }

    const activeTitle = workflow.profile && workflow.profile.title;
    items.forEach((item, i) => {
        const title = (typeof item === 'string') ? item : (item.title || item.name || `Recipe ${i + 1}`);
        const pill = document.createElement('button');
        pill.className = 'dye-recipe-pill' + (title === activeTitle ? ' active' : '');
        pill.textContent = title;
        pill.addEventListener('click', () => {
            document.querySelectorAll('.dye-recipe-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
        container.appendChild(pill);
    });
}

// --- Value adjusters ---

function wireAdjuster(minusId, plusId, valueId, step, min, max, formatter, onChange) {
    const minusBtn = document.getElementById(minusId);
    const plusBtn = document.getElementById(plusId);
    if (!minusBtn || !plusBtn) return;

    let debounceTimer = null;

    minusBtn.addEventListener('click', () => {
        const valueEl = document.getElementById(valueId);
        if (!valueEl) return;
        const raw = parseFloat(valueEl.textContent);
        if (isNaN(raw) || raw <= min) return;
        const val = Math.max(min, parseFloat((raw - step).toFixed(2)));
        valueEl.textContent = formatter(val);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => onChange(val), 500);
    });

    plusBtn.addEventListener('click', () => {
        const valueEl = document.getElementById(valueId);
        if (!valueEl) return;
        const raw = parseFloat(valueEl.textContent);
        if (isNaN(raw)) return;
        const val = max !== null ? Math.min(max, parseFloat((raw + step).toFixed(2))) : parseFloat((raw + step).toFixed(2));
        valueEl.textContent = formatter(val);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => onChange(val), 500);
    });
}

function setupDoseControls() {
    // Dose In
    wireAdjuster('dye-dose-minus', 'dye-dose-plus', 'dye-dose-value', 0.5, 0, null,
        val => `${val}g`,
        val => {
            if (!currentWorkflow) return;
            currentWorkflow.doseData = currentWorkflow.doseData || {};
            currentWorkflow.doseData.doseIn = val;
            updateRatioDisplay();
            updateWorkflow(currentWorkflow).catch(e => console.warn('updateWorkflow failed:', e));
        }
    );

    // Dose Out / Drink
    wireAdjuster('dye-drink-minus', 'dye-drink-plus', 'dye-drink-value', 1, 0, null,
        val => `${val}g`,
        val => {
            if (!currentWorkflow) return;
            currentWorkflow.doseData = currentWorkflow.doseData || {};
            currentWorkflow.doseData.doseOut = val;
            updateRatioDisplay();
            updateWorkflow(currentWorkflow).catch(e => console.warn('updateWorkflow failed:', e));
        }
    );

    // Grind
    wireAdjuster('dye-grind-minus', 'dye-grind-plus', 'dye-grind-value', 0.1, 0, null,
        val => val.toFixed(1),
        val => {
            if (!currentWorkflow) return;
            currentWorkflow.grinderData = currentWorkflow.grinderData || {};
            currentWorkflow.grinderData.setting = val;
            updateWorkflow(currentWorkflow).catch(e => console.warn('updateWorkflow failed:', e));
        }
    );

    // RPM
    wireAdjuster('dye-rpm-minus', 'dye-rpm-plus', 'dye-rpm-value', 1, 1, null,
        val => `${val}`,
        val => {
            if (!currentWorkflow) return;
            currentWorkflow.grinderData = currentWorkflow.grinderData || {};
            currentWorkflow.grinderData.rpm = val;
            updateWorkflow(currentWorkflow).catch(e => console.warn('updateWorkflow failed:', e));
        }
    );
}

function updateRatioDisplay() {
    const ratioEl = document.getElementById('dye-drink-ratio');
    if (!ratioEl || !currentWorkflow || !currentWorkflow.doseData) return;
    const { doseIn, doseOut } = currentWorkflow.doseData;
    const r = calcRatio(doseIn, doseOut);
    ratioEl.textContent = r !== '—' ? `(${r})` : '';
}

function setupBeanCard() {
    const card = document.getElementById('dye-bean-card');
    if (!card) return;
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    newCard.addEventListener('click', () => {
        loadPage('src/dye/dye_beans.html');
    });
}

function setupBottomButtons() {
    const cancelBtn = document.getElementById('dye-cancel-btn');
    const doneBtn = document.getElementById('dye-done-btn');
    const clearBtn = document.getElementById('dye-clear-btn');

    if (cancelBtn) {
        const btn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(btn, cancelBtn);
        btn.addEventListener('click', () => window.history.back());
    }

    if (doneBtn) {
        const btn = doneBtn.cloneNode(true);
        doneBtn.parentNode.replaceChild(btn, doneBtn);
        btn.addEventListener('click', async () => {
            if (currentWorkflow) {
                try {
                    await updateWorkflow(currentWorkflow);
                } catch (e) {
                    console.warn('updateWorkflow on DONE failed:', e);
                }
            }
            window.history.back();
        });
    }

    if (clearBtn) {
        const btn = clearBtn.cloneNode(true);
        clearBtn.parentNode.replaceChild(btn, clearBtn);
        btn.addEventListener('click', () => {
            if (!currentWorkflow) return;
            currentWorkflow.context = {};
            currentWorkflow.doseData = {};
            currentWorkflow.grinderData = {};
            renderNextShot();
        });
    }
}

function setupClickOutsideDropdowns() {
    document.addEventListener('click', () => {
        document.querySelectorAll('.dye-dash-dropdown.open').forEach(dd => dd.classList.remove('open'));
    });
}

// --- Main entry ---

export async function initializeDyeDashboard() {
    try {
        const [shotsResult, workflowResult, grindersResult] = await Promise.all([
            getShots({ limit: 50, order: 'desc' }).catch(() => ({ items: [] })),
            getWorkflow().catch(() => null),
            getGrinders().catch(() => []),
        ]);

        allShots = (shotsResult && shotsResult.items) ? shotsResult.items : (Array.isArray(shotsResult) ? shotsResult : []);
        shots = [...allShots];
        currentShotIndex = 0;
        currentWorkflow = workflowResult;
        grinders = Array.isArray(grindersResult) ? grindersResult : (grindersResult && grindersResult.items ? grindersResult.items : []);

    } catch (e) {
        console.error('DYE Dashboard: Failed to load data:', e);
        allShots = [];
        shots = [];
        currentWorkflow = null;
        grinders = [];
    }

    // Init Plotly chart container, then render both panels
    initChart();
    await renderLastShot();
    renderNextShot();

    // Wire up interactivity
    setupShotNavigation();
    setupStarRating();
    setupReadNote();
    setupEditShotDropdown();
    setupDyeSettingsDropdown();
    setupVisualizerDropdown();
    setupDoseControls();
    setupBeanCard();
    setupBottomButtons();
    setupClickOutsideDropdowns();
}
