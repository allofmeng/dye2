import { devPageShell } from "../utils/dev-shell";
import { devApiScript } from "../utils/dev-api";
import { chartScript } from "../utils/chart";
import { iconHistory, iconClipboard } from "../utils/icons";

const styles = `
  /* Navy popup menu, matches Figma 2345:1613 */
  .dye-dash-dropdown {
    display: none;
    position: absolute;
    bottom: calc(100% + 4px);
    left: 0;
    min-width: 220px;
    background: var(--mimoja-blue);
    border: none;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    z-index: 50;
  }
  .dye-dash-dropdown.open { display: block; }
  .dye-dash-dropdown-item {
    padding: 18px 24px;
    font-family: 'Inter', sans-serif;
    font-size: 21px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    white-space: nowrap;
  }
  .dye-dash-dropdown-item + .dye-dash-dropdown-item { border-top: 1px solid rgba(255,255,255,0.28); }
  .dye-dash-dropdown-item:hover { background: rgba(255,255,255,0.14); }
  .dye-dash-dropdown-item-danger:hover { background: rgba(229,57,53,0.85); }

  .dye-grinder-tab {
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #B6C3D7;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .dye-grinder-tab.active { color: var(--mimoja-blue); }

  .dye-recipe-pill {
    width: 225px;
    height: 60px;
    border-radius: 15px;
    font-family: 'Inter', sans-serif;
    font-size: 21px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 2px solid #C5CDDA;
    background: white;
    color: #5F7BA8;
    transition: background 0.15s, color 0.15s;
  }
  .dye-recipe-pill.active { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }

  #dye-grinder-tabs::-webkit-scrollbar { display: none; }

  /* ── Visualizer connected state ──────────────────────── */
  #dye-visualizer-btn.viz-connected svg:first-child {
    stroke: #0ca581;
  }

  /* ── Visualizer modal ────────────────────────────────── */
  .viz-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.45); z-index: 200;
    align-items: center; justify-content: center;
  }
  .viz-overlay.open { display: flex; }
  .viz-modal {
    background: var(--box-color); border-radius: 24px;
    padding: 44px 52px; width: 680px;
    font-family: 'Inter', sans-serif;
  }
  .viz-modal h2 {
    font-size: 28px; font-weight: 700; color: var(--text-primary); margin-bottom: 28px;
  }
  .viz-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 22px; }
  .viz-field label { font-size: 22px; font-weight: 600; color: var(--text-primary); }
  .viz-input {
    border: 1px solid var(--profile-button-outline-color);
    border-radius: 12px; padding: 0 18px; height: 64px;
    font-family: 'Inter', sans-serif; font-size: 22px;
    color: var(--text-primary); background: var(--profile-button-background-color);
    outline: none; width: 100%;
  }
  .viz-input:focus { border-color: var(--mimoja-blue); }
  .viz-checkbox-row {
    display: flex; align-items: center; gap: 14px;
    font-size: 22px; color: var(--text-primary); margin-bottom: 22px;
  }
  .viz-checkbox { width: 28px; height: 28px; cursor: pointer; accent-color: var(--mimoja-blue); }
  .viz-status {
    font-size: 20px; min-height: 24px; margin-bottom: 16px;
    color: var(--text-primary-disabled);
  }
  .viz-status.error { color: #E53935; }
  .viz-status.success { color: #2E8B57; }
  .viz-footer { display: flex; justify-content: flex-end; gap: 14px; margin-top: 8px; }
  .viz-btn-cancel {
    padding: 0 30px; height: 60px; border-radius: 9999px;
    font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700;
    color: var(--text-primary); cursor: pointer;
  }
  .viz-btn-save {
    padding: 0 36px; height: 60px; border-radius: 9999px;
    background: var(--mimoja-blue); color: #fff;
    font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700;
    cursor: pointer;
  }
  .viz-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
  .viz-logged-in-row {
    display: flex; align-items: center; gap: 12px;
    font-size: 22px; color: var(--text-primary); margin-bottom: 22px;
  }
  .viz-logged-in-user { font-weight: 700; color: var(--mimoja-blue); }
`;

function buildContent(): string { return `
<div id="dye-dash-root" class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col relative font-['Inter',sans-serif]">
  <div class="flex flex-1 overflow-hidden">

    <!-- LEFT PANEL: Last Shot Review -->
    <div class="flex flex-col w-1/2 shrink-0 bg-white border-r border-[var(--profile-button-outline-color)] overflow-hidden">
      <div class="flex flex-col gap-[27px] px-[38px] pt-[32px] pb-[24px] flex-1 overflow-hidden">

        <!-- Header row -->
        <div class="flex items-center justify-between shrink-0 h-[90px]">
          <div class="flex flex-col gap-[8px]">
            <div id="dye-last-shot-label" class="text-[var(--mimoja-blue)] font-semibold text-[30px] leading-[1.2]">Last Shot: —</div>
            <div id="dye-last-shot-date" class="text-[var(--text-primary)] font-normal text-[24px] leading-[1.2]">—</div>
          </div>
          <div class="flex items-center gap-[30px]">
            <button id="dye-search-btn" class="text-[var(--mimoja-blue)] cursor-pointer">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <div class="flex items-center border-2 border-[var(--mimoja-blue)] rounded-[23px] overflow-hidden">
              <button id="dye-prev-shot-btn" class="flex items-center justify-center w-[60px] h-[54px] shrink-0 cursor-pointer">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div class="w-[2px] h-[54px] bg-[var(--profile-button-outline-color)]"></div>
              <button id="dye-same-beans-btn" class="px-[20px] h-[54px] flex items-center justify-center cursor-pointer">
                <span class="text-[var(--mimoja-blue)] font-semibold text-[24px] whitespace-nowrap">All Shots</span>
              </button>
              <div class="w-[2px] h-[54px] bg-[var(--profile-button-outline-color)]"></div>
              <button id="dye-next-shot-btn" class="flex items-center justify-center w-[60px] h-[54px] shrink-0 cursor-pointer">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>
        <div id="plotly-chart" class="shrink-0 w-full h-[330px]"></div>
        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>

        <div class="flex flex-col gap-[14px] shrink-0">
          <div id="dye-shot-profile" class="text-[var(--text-primary)] font-semibold text-[24px] leading-[1.2] truncate">—</div>
          <div id="dye-shot-stats" class="text-[var(--text-primary)] font-normal text-[24px] leading-[1.2]">—</div>
          <div id="dye-shot-beans" class="text-[var(--text-primary)] font-normal text-[24px] leading-[1.2] truncate">—</div>
        </div>

        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>

        <div class="flex flex-col gap-[14px] shrink-0">
          <div id="dye-shot-grinder" class="text-[var(--text-primary)] font-normal text-[24px] leading-[1.2]">—</div>
          <div class="flex items-center gap-[24px]">
            <div id="dye-shot-barista" class="text-[var(--text-primary)] font-normal text-[24px] leading-[1.2]">—</div>
            <div class="flex items-center gap-[8px]" id="dye-star-rating">
              <svg class="dye-star cursor-pointer" data-index="1" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg class="dye-star cursor-pointer" data-index="2" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg class="dye-star cursor-pointer" data-index="3" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg class="dye-star cursor-pointer" data-index="4" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <svg class="dye-star cursor-pointer" data-index="5" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <button id="dye-read-note-btn" class="text-[var(--text-primary)] font-semibold text-[24px] cursor-pointer">Read Note</button>
          </div>
        </div>

        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>

        <div class="flex items-center gap-[18px] shrink-0 pb-[8px] mt-auto">
          <div class="relative">
            <div id="dye-edit-shot-btn" class="flex items-center gap-0 bg-[var(--mimoja-blue)] text-white rounded-[23px] h-[54px] cursor-pointer overflow-hidden">
              <span id="dye-edit-shot-go" class="px-[20px] h-full flex items-center font-semibold text-[21px] whitespace-nowrap">Edit Shot</span>
              <div class="w-[1px] h-[40px] bg-white opacity-40"></div>
              <span id="dye-edit-shot-chevron" class="px-[14px] h-full flex items-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg></span>
            </div>
            <div id="dye-edit-shot-dropdown" class="dye-dash-dropdown">
              <div class="dye-dash-dropdown-item" id="dye-export-shot">Export Shot</div>
              <div class="dye-dash-dropdown-item" id="dye-view-profile">View Text Profile</div>
              <div class="dye-dash-dropdown-item dye-dash-dropdown-item-danger" id="dye-delete-shot">Delete Shot</div>
            </div>
          </div>
          <div class="relative">
            <button id="dye-settings-btn" class="flex items-center gap-[10px] border-2 border-[var(--mimoja-blue)] text-[var(--mimoja-blue)] rounded-[23px] h-[54px] px-[20px] cursor-pointer">
              <span class="font-semibold text-[21px] whitespace-nowrap">DYE Settings</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
            <div id="dye-settings-dropdown" class="dye-dash-dropdown">
              <div class="dye-dash-dropdown-item" id="dye-settings-favourites">Favourites</div>
              <div class="dye-dash-dropdown-item" id="dye-settings-recipes">Recipes</div>
            </div>
          </div>
          <div class="relative">
            <button id="dye-visualizer-btn" class="flex items-center gap-[10px] border-2 border-[var(--mimoja-blue)] text-[var(--mimoja-blue)] rounded-[23px] h-[54px] px-[20px] cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span class="font-semibold text-[21px] whitespace-nowrap">Visualizer</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
            <div id="dye-visualizer-dropdown" class="dye-dash-dropdown">
              <div class="dye-dash-dropdown-item" id="dye-visualizer-upload">Upload to Visualizer</div>
              <div class="dye-dash-dropdown-item" id="dye-visualizer-settings">Visualizer Settings</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- RIGHT PANEL: Next Shot Planning -->
    <div class="flex flex-col flex-1 bg-[var(--bgmain-color)] overflow-hidden">
      <div class="flex flex-col gap-[22px] px-[38px] pt-[32px] pb-[24px] flex-1 overflow-hidden">

        <div class="flex items-center justify-between shrink-0 h-[90px]">
          <div class="flex flex-col gap-[8px]">
            <div class="text-[var(--mimoja-blue)] font-semibold text-[30px] leading-[1.2]">Next Shot Planning</div>
            <div id="dye-next-date" class="text-[var(--text-primary)] font-normal text-[24px] leading-[1.2]">—</div>
          </div>
          <div class="flex items-center gap-[27px]">
            <button id="dye-history-btn" class="cursor-pointer">
              <img src="${iconHistory}" width="42" height="42" alt="History" />
            </button>
            <button id="dye-clipboard-btn" class="cursor-pointer">
              <img src="${iconClipboard}" width="42" height="42" alt="Clipboard" />
            </button>
          </div>
        </div>

        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>

        <div class="flex items-center gap-[18px] shrink-0">
          <button id="dye-recipe-prev" class="flex items-center justify-center shrink-0 cursor-pointer text-[var(--mimoja-blue)]">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div id="dye-recipe-pills" class="flex flex-nowrap gap-[12px] flex-1 overflow-x-auto max-h-[152px]" style="scrollbar-width:none"></div>
          <button id="dye-recipe-next" class="flex items-center justify-center shrink-0 cursor-pointer text-[var(--mimoja-blue)]">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>

        <div class="flex flex-col gap-[18px] shrink-0">
          <div id="dye-profile-name" class="text-[var(--mimoja-blue)] font-semibold text-[24px] leading-[1.2] text-center truncate">—</div>
          <div class="flex items-center gap-[18px]">
            <button id="dye-dose-drink-prev" class="flex items-center justify-center shrink-0 cursor-pointer">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="flex items-center gap-[45px] flex-1 justify-center">
              <div class="flex items-center gap-[18px]">
                <span class="font-bold text-[24px] text-[var(--mimoja-blue)] w-[75px]">Dose</span>
                <div class="flex items-center gap-[24px]">
                  <button id="dye-dose-minus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                  <span id="dye-dose-value" class="font-bold text-[26px] text-[var(--text-primary)] w-[72px] text-center">—</span>
                  <button id="dye-dose-plus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                </div>
              </div>
              <div class="flex items-center gap-[18px]">
                <span class="font-bold text-[24px] text-[var(--mimoja-blue)] w-[75px]">Drink</span>
                <div class="flex items-center gap-[24px]">
                  <button id="dye-drink-minus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                  <div class="flex flex-col items-center w-[72px]">
                    <span id="dye-drink-value" class="font-bold text-[26px] text-[var(--text-primary)] text-center">—</span>
                    <span id="dye-drink-ratio" class="font-semibold text-[18px] text-[var(--text-primary)] text-center"></span>
                  </div>
                  <button id="dye-drink-plus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                </div>
              </div>
            </div>
            <button id="dye-dose-drink-next" class="flex items-center justify-center shrink-0 cursor-pointer">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>

        <div class="flex flex-col gap-[18px] shrink-0">
          <div id="dye-grinder-tabs" class="flex gap-[27px] overflow-x-auto"></div>
          <div class="flex items-center gap-[68px]">
            <div class="flex items-center gap-[18px]">
              <span class="font-bold text-[24px] text-[var(--mimoja-blue)] w-[75px]">Grind</span>
              <div class="flex items-center gap-[24px]">
                <button id="dye-grind-minus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                <span id="dye-grind-value" class="font-bold text-[26px] text-[var(--text-primary)] w-[72px] text-center">—</span>
                <button id="dye-grind-plus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
              </div>
            </div>
            <div class="flex items-center gap-[18px]">
              <span class="font-bold text-[24px] text-[var(--mimoja-blue)] w-[75px]">RPM</span>
              <div class="flex items-center gap-[24px]">
                <button id="dye-rpm-minus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
                <span id="dye-rpm-value" class="font-bold text-[26px] text-[var(--text-primary)] w-[72px] text-center">—</span>
                <button id="dye-rpm-plus" class="flex items-center justify-center w-[72px] h-[72px] bg-[#EDEDED] rounded-[15px] cursor-pointer"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
              </div>
            </div>
          </div>
        </div>

        <div class="h-[2px] bg-[var(--profile-button-outline-color)] shrink-0"></div>

        <div class="flex flex-col gap-[27px] shrink-0">
          <div id="dye-bean-card" class="flex flex-col gap-[8px] cursor-pointer">
            <div class="flex items-baseline gap-[15px]">
              <span class="font-bold text-[24px] text-[var(--mimoja-blue)] w-[69px] shrink-0">Beans</span>
              <span id="dye-bean-name-display" class="font-semibold text-[24px] text-[var(--text-primary)] truncate">—</span>
            </div>
            <div id="dye-bean-roast-info" class="text-[var(--text-primary)] font-normal text-[24px] leading-[1.2]"></div>
          </div>
          <div class="flex items-center gap-[30px]">
            <div class="flex items-center gap-[12px]">
              <span class="font-bold text-[24px] text-[var(--mimoja-blue)]">Barista</span>
              <span id="dye-next-barista" class="font-normal text-[24px] text-[var(--text-primary)]">—</span>
            </div>
            <div class="flex items-center gap-[12px]">
              <span class="font-bold text-[24px] text-[var(--mimoja-blue)]">Drinker</span>
              <span id="dye-next-drinker" class="font-normal text-[24px] text-[var(--text-primary)]">—</span>
            </div>
            <button id="dye-add-note-btn" class="border-2 border-[var(--mimoja-blue)] text-[var(--mimoja-blue)] rounded-[12px] px-[24px] h-[45px] font-semibold text-[21px] cursor-pointer whitespace-nowrap ml-auto">
              Add Note
            </button>
          </div>
        </div>

        <div class="flex-1"></div>

        <div class="flex items-center justify-between shrink-0 pb-[8px]">
          <button id="dye-clear-btn" class="border-2 border-[var(--mimoja-blue)] text-[var(--mimoja-blue)] rounded-[23px] px-[30px] h-[54px] font-semibold text-[21px] cursor-pointer">Clear</button>
          <div class="flex items-center gap-[12px]">
            <button id="dye-cancel-btn" class="flex items-center justify-center w-[240px] h-[62px] rounded-[68px] font-bold text-[24px] text-[var(--text-primary)] cursor-pointer">CANCEL</button>
            <button id="dye-done-btn" class="flex items-center justify-center w-[240px] h-[62px] bg-[var(--mimoja-blue)] text-white rounded-[68px] font-bold text-[24px] cursor-pointer">DONE</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<!-- Visualizer modal (login / settings) -->
<div id="viz-overlay" class="viz-overlay">
  <div class="viz-modal">
    <h2 id="viz-modal-title">Visualizer Login</h2>

    <!-- Logged-in state (shown when credentials already saved) -->
    <div id="viz-loggedin-section" style="display:none">
      <div class="viz-logged-in-row">
        Logged in as <span id="viz-loggedin-user" class="viz-logged-in-user">—</span>
      </div>
    </div>

    <!-- Login form -->
    <div id="viz-form-section">
      <div class="viz-field">
        <label for="viz-username">Username</label>
        <input id="viz-username" class="viz-input" type="text" placeholder="visualizer.coffee username" autocomplete="username" />
      </div>
      <div class="viz-field">
        <label for="viz-password">Password</label>
        <input id="viz-password" class="viz-input" type="password" placeholder="Password" autocomplete="current-password" />
      </div>
      <div class="viz-checkbox-row">
        <input id="viz-auto-upload" class="viz-checkbox" type="checkbox" checked />
        <label for="viz-auto-upload">Auto-upload shots to Visualizer</label>
      </div>
      <div class="viz-checkbox-row">
        <label for="viz-min-duration">Minimum shot duration (s):</label>
        <input id="viz-min-duration" class="viz-input" type="number" min="1" value="5" style="width:100px;height:48px;font-size:20px" />
      </div>
    </div>

    <div id="viz-status" class="viz-status"></div>

    <div class="viz-footer">
      <button id="viz-cancel-btn" class="viz-btn-cancel">Cancel</button>
      <button id="viz-logout-btn" class="viz-btn-cancel" style="display:none;color:#E53935">Log Out</button>
      <button id="viz-save-btn" class="viz-btn-save">Save &amp; Login</button>
    </div>
  </div>
</div>

<!-- Read Note modal (read-only) -->
<div id="dye-note-overlay" class="viz-overlay">
  <div class="viz-modal">
    <h2>Shot Note</h2>
    <div id="dye-note-body" style="font-size:22px;line-height:1.5;color:var(--text-primary);white-space:pre-wrap;max-height:50vh;overflow-y:auto;margin-bottom:28px;">—</div>
    <div class="viz-footer">
      <button id="dye-note-close" class="viz-btn-cancel">Close</button>
    </div>
  </div>
</div>
`; }

const pageScript = `
let shots = [];
let currentShotIndex = 0;
let sameBeanFilter = false;
let allShots = [];
let grinders = [];
let recipes = [];
let currentGrinderIndex = 0;
let currentWorkflow = null;
let currentStarRating = 0;
let currentShotNote = '';
let vizLoggedIn = false;
let vizUsername = '';
let lastEditSnapshot = null;

// One-level undo for Next Shot Planning: every edit first saves the state it is
// replacing, and the history button swaps back to it (press again to re-apply).
// ponytail: single snapshot, not a stack — add an array if multi-step undo is wanted.
function snapshotWorkflow() {
  if (!currentWorkflow) return;
  lastEditSnapshot = JSON.stringify({ context: currentWorkflow.context || {}, profile: currentWorkflow.profile || null });
  const btn = document.getElementById('dye-history-btn');
  if (btn) btn.style.opacity = '';
}

function setupHistoryRevert() {
  const btn = document.getElementById('dye-history-btn');
  if (!btn) return;
  btn.style.opacity = lastEditSnapshot ? '' : '0.4';
  btn.addEventListener('click', () => {
    if (!lastEditSnapshot || !currentWorkflow) return;
    const prev = JSON.parse(lastEditSnapshot);
    snapshotWorkflow(); // current state becomes the new snapshot, so history toggles
    currentWorkflow.context = prev.context;
    if (prev.profile) currentWorkflow.profile = prev.profile;
    renderNextShot();
    updateWorkflow(currentWorkflow).catch(e => console.warn(e));
  });
}

function updateVisualizerButtonState() {
  const btn = document.getElementById('dye-visualizer-btn');
  if (!btn) return;
  if (vizLoggedIn) btn.classList.add('viz-connected');
  else btn.classList.remove('viz-connected');
}

async function checkVisualizerLoggedIn() {
  try {
    const settings = await getVisualizerSettings();
    vizLoggedIn = !!(settings && settings.Username);
    vizUsername = (settings && settings.Username) || '';
  } catch (e) {
    vizLoggedIn = false;
    vizUsername = '';
  }
  updateVisualizerButtonState();
}

function openVisualizerModal() {
  const overlay = document.getElementById('viz-overlay');
  const loggedinSection = document.getElementById('viz-loggedin-section');
  const loggedinUser = document.getElementById('viz-loggedin-user');
  const formSection = document.getElementById('viz-form-section');
  const logoutBtn = document.getElementById('viz-logout-btn');
  const saveBtn = document.getElementById('viz-save-btn');
  const titleEl = document.getElementById('viz-modal-title');
  const statusEl = document.getElementById('viz-status');
  const usernameInput = document.getElementById('viz-username');
  const passwordInput = document.getElementById('viz-password');

  if (!overlay) return;
  if (statusEl) { statusEl.textContent = ''; statusEl.className = 'viz-status'; }

  if (vizLoggedIn) {
    if (titleEl) titleEl.textContent = 'Visualizer Settings';
    if (loggedinSection) { loggedinSection.style.display = 'flex'; if (loggedinUser) loggedinUser.textContent = vizUsername; }
    if (usernameInput) usernameInput.value = vizUsername;
    if (passwordInput) passwordInput.value = '';
    if (logoutBtn) logoutBtn.style.display = '';
    if (saveBtn) saveBtn.textContent = 'Save Settings';
  } else {
    if (titleEl) titleEl.textContent = 'Visualizer Login';
    if (loggedinSection) loggedinSection.style.display = 'none';
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (saveBtn) { saveBtn.textContent = 'Save & Login'; saveBtn.disabled = false; }
  }

  overlay.classList.add('open');
}

function setupVisualizerModal() {
  const overlay = document.getElementById('viz-overlay');
  const cancelBtn = document.getElementById('viz-cancel-btn');
  const logoutBtn = document.getElementById('viz-logout-btn');
  const saveBtn = document.getElementById('viz-save-btn');

  if (cancelBtn) cancelBtn.addEventListener('click', () => { if (overlay) overlay.classList.remove('open'); });

  if (logoutBtn) logoutBtn.addEventListener('click', async () => {
    const statusEl = document.getElementById('viz-status');
    try {
      await saveVisualizerSettings('', '', false, 5);
      vizLoggedIn = false;
      vizUsername = '';
      updateVisualizerButtonState();
      if (overlay) overlay.classList.remove('open');
    } catch (e) {
      if (statusEl) { statusEl.textContent = 'Logout failed: ' + e.message; statusEl.className = 'viz-status error'; }
    }
  });

  if (saveBtn) saveBtn.addEventListener('click', async () => {
    const statusEl = document.getElementById('viz-status');
    const usernameInput = document.getElementById('viz-username');
    const passwordInput = document.getElementById('viz-password');
    const autoUploadInput = document.getElementById('viz-auto-upload');
    const minDurationInput = document.getElementById('viz-min-duration');

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const autoUpload = autoUploadInput ? autoUploadInput.checked : false;
    const minDuration = minDurationInput ? (parseInt(minDurationInput.value) || 5) : 5;

    if (!username || !password) {
      if (statusEl) { statusEl.textContent = 'Username and password required.'; statusEl.className = 'viz-status error'; }
      return;
    }
    saveBtn.disabled = true;
    if (statusEl) { statusEl.textContent = 'Verifying credentials…'; statusEl.className = 'viz-status'; }

    try {
      const valid = await verifyVisualizerCredentials(username, password);
      if (!valid) {
        if (statusEl) { statusEl.textContent = 'Invalid username or password.'; statusEl.className = 'viz-status error'; }
        saveBtn.disabled = false;
        return;
      }
      await saveVisualizerSettings(username, password, autoUpload, minDuration);
      vizLoggedIn = true;
      vizUsername = username;
      updateVisualizerButtonState();
      if (statusEl) { statusEl.textContent = 'Saved!'; statusEl.className = 'viz-status success'; }
      setTimeout(() => { if (overlay) overlay.classList.remove('open'); }, 800);
    } catch (e) {
      if (statusEl) { statusEl.textContent = 'Error: ' + e.message; statusEl.className = 'viz-status error'; }
      saveBtn.disabled = false;
    }
  });
}

function setupVisualizerDropdown() {
  const btn = document.getElementById('dye-visualizer-btn');
  const dropdown = document.getElementById('dye-visualizer-dropdown');
  const uploadItem = document.getElementById('dye-visualizer-upload');
  const settingsItem = document.getElementById('dye-visualizer-settings');

  if (!btn || !dropdown) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    document.querySelectorAll('.dye-dash-dropdown').forEach(dd => { if (dd !== dropdown) dd.classList.remove('open'); });
  });

  if (uploadItem) uploadItem.addEventListener('click', async () => {
    dropdown.classList.remove('open');
    if (!vizLoggedIn) { openVisualizerModal(); return; }
    const shot = shots[currentShotIndex];
    if (!shot) return;
    const uploadItem2 = document.getElementById('dye-visualizer-upload');
    if (uploadItem2) uploadItem2.textContent = 'Uploading…';
    try {
      await uploadShotToVisualizer(shot.id);
      if (uploadItem2) uploadItem2.textContent = 'Uploaded!';
      setTimeout(() => { if (uploadItem2) uploadItem2.textContent = 'Upload to Visualizer'; }, 2000);
    } catch (e) {
      if (uploadItem2) uploadItem2.textContent = 'Upload failed';
      setTimeout(() => { if (uploadItem2) uploadItem2.textContent = 'Upload to Visualizer'; }, 2000);
    }
  });

  if (settingsItem) settingsItem.addEventListener('click', () => {
    dropdown.classList.remove('open');
    openVisualizerModal();
  });
}

function formatShotDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  let label = diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : diffDays + ' days ago';
  const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  return { label, full: dateStr + ', ' + timeStr };
}

function formatCurrentDate() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  return dateStr + ', ' + timeStr;
}

function calcRatio(doseIn, doseOut) {
  if (!doseIn || doseIn === 0) return '—';
  return '1:' + (doseOut / doseIn).toFixed(1);
}

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
    const chartEl = document.getElementById('plotly-chart');
    if (chartEl) chartEl.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--low-contrast-white);font-size:24px;">No shot data</div>';
    if (profileEl) profileEl.textContent = '—';
    if (statsEl) statsEl.textContent = '—';
    if (beansEl) beansEl.textContent = '—';
    if (grinderEl) grinderEl.textContent = '—';
    if (baristaEl) baristaEl.textContent = '—';
    currentShotNote = '';
    return;
  }

  const { label, full } = formatShotDate(shot.timestamp);
  // Show position so a single-shot "Same Beans" view is obviously why prev/next don't move.
  const pos = shots.length > 1 ? ' (' + (currentShotIndex + 1) + '/' + shots.length + ')' : '';
  if (labelEl) labelEl.textContent = 'Last Shot: ' + label + pos;
  if (dateEl) dateEl.textContent = full;

  if (!shot.measurements) {
    try {
      const full = await getShot(shot.id);
      shots[currentShotIndex] = { ...shot, ...full };
      shot = shots[currentShotIndex];
    } catch (e) { console.warn('Could not fetch full shot data:', e); }
  }

  if (shot.measurements && shot.measurements.length > 0) {
    plotHistoricalShot(shot.measurements, shot.workflow);
  }

  const wf = shot.workflow || {};
  const ctx = wf.context || {};
  const doseData = wf.doseData || {};
  const grinderData = wf.grinderData || {};
  const profile = wf.profile || {};

  if (profileEl) profileEl.textContent = profile.title || '—';

  // Dose: from context.targetDoseWeight
  // Drink: last scale.weight value in measurements
  const measurements = shot.measurements || [];
  const doseInRaw = ctx.targetDoseWeight != null ? ctx.targetDoseWeight : (doseData.doseIn != null ? doseData.doseIn : null);
  let doseOutRaw = null;
  for (let mi = measurements.length - 1; mi >= 0; mi--) {
    const sc = measurements[mi].scale;
    if (sc && sc.weight != null) { doseOutRaw = sc.weight; break; }
  }

  const doseIn = doseInRaw != null ? doseInRaw + 'g' : '—';
  const doseOut = doseOutRaw != null ? doseOutRaw.toFixed(1) + 'g' : '—';
  const ratio = (doseInRaw && doseOutRaw) ? calcRatio(doseInRaw, doseOutRaw) : '—';

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
    if (start && end) shotTimeStr = Math.round((end - start) / 1000) + 's';
  }

  if (statsEl) {
    const ann = shot.annotations || {};
    const tds = ann.drinkTds != null ? ann.drinkTds + '%' : null;
    const ey  = ann.drinkEy  != null ? ann.drinkEy  + '%' : null;
    let statsHtml = 'Drink <strong>' + doseIn + ':' + doseOut + '</strong> &nbsp; Time <strong>' + shotTimeStr + '</strong> &nbsp; Ratio <strong>' + ratio + '</strong>';
    if (tds || ey) {
      statsHtml += ' &nbsp;&bull;&nbsp; ';
      if (tds) statsHtml += 'TDS <strong>' + tds + '</strong>';
      if (tds && ey) statsHtml += ' &nbsp; ';
      if (ey) statsHtml += 'EY <strong>' + ey + '</strong>';
    }
    statsEl.innerHTML = statsHtml;
  }

  const roaster = ctx.coffeeRoaster || '';
  const coffeeName = ctx.coffeeName || '';
  if (beansEl) {
    if (roaster || coffeeName) beansEl.innerHTML = roaster ? '<strong>' + roaster + '</strong> &bull; ' + coffeeName : coffeeName;
    else beansEl.textContent = '—';
  }

  const grinderModel = ctx.grinderModel || grinderData.model || grinderData.name || '—';
  const grindSetting = ctx.grinderSetting != null ? ctx.grinderSetting : (grinderData.setting !== undefined ? grinderData.setting : '—');
  // RPM is saved onto the shot by the edit-shot page at annotations.extras.rpm
  const shotAnn = shot.annotations || {};
  const grindRpm = (shotAnn.extras && shotAnn.extras.rpm != null) ? shotAnn.extras.rpm : (grinderData.rpm != null ? grinderData.rpm : null);
  if (grinderEl) {
    let grinderHtml = 'Grinder <strong>' + grinderModel + '</strong> &bull; Setting <strong>' + grindSetting + '</strong>';
    if (grindRpm != null) grinderHtml += ' &bull; RPM <strong>' + grindRpm + '</strong>';
    grinderEl.innerHTML = grinderHtml;
  }

  const barista = ctx.baristaName || ctx.barista || '';
  const drinker = ctx.drinkerName || ctx.drinker || '';
  if (baristaEl) {
    let html = '';
    if (barista) html += 'Barista <strong>' + barista + '</strong>';
    if (barista && drinker) html += ' &nbsp; ';
    if (drinker) html += 'Drinker <strong>' + drinker + '</strong>';
    if (!barista && !drinker) html = '—';
    baristaEl.innerHTML = html;
  }

  const rating = (shot.annotations && shot.annotations.enjoyment) ? parseInt(shot.annotations.enjoyment) : 0;
  currentStarRating = rating;
  updateStarDisplay(rating);

  // Read Note reflects the shot's drinker note (annotations.espressoNotes),
  // falling back to a note attached pre-shot via the workflow (context.extras.note).
  const wfNote = ctx.extras && ctx.extras.note;
  currentShotNote = (shot.annotations && shot.annotations.espressoNotes) || wfNote || '';
  const noteBtn = document.getElementById('dye-read-note-btn');
  if (noteBtn) noteBtn.style.opacity = currentShotNote.trim() ? '' : '0.4';
}

function updateStarDisplay(rating) {
  document.querySelectorAll('.dye-star').forEach(star => {
    const idx = parseInt(star.getAttribute('data-index'));
    if (idx <= rating) { star.setAttribute('fill', 'var(--mimoja-blue)'); star.setAttribute('stroke', 'var(--mimoja-blue)'); }
    else { star.setAttribute('fill', 'none'); star.setAttribute('stroke', 'var(--profile-button-outline-color)'); }
  });
}

function setupStarRating() {
  document.querySelectorAll('.dye-star').forEach(star => {
    star.addEventListener('click', async () => {
      const idx = parseInt(star.getAttribute('data-index'));
      currentStarRating = idx;
      updateStarDisplay(idx);
      const shot = shots[currentShotIndex];
      if (shot) {
        try { const ann = { ...(shot.annotations || {}), enjoyment: idx }; await updateShot(shot.id, { annotations: ann }); shot.annotations = ann; }
        catch (e) { console.warn('Could not save star rating:', e); }
      }
    });
  });
}

function setupShotNavigation() {
  const prevBtn = document.getElementById('dye-prev-shot-btn');
  const nextBtn = document.getElementById('dye-next-shot-btn');
  const sameBeansBtn = document.getElementById('dye-same-beans-btn');

  // Wrap around so the ends are never dead: prev past oldest → newest, next past newest → oldest.
  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (shots.length < 2) return;
    currentShotIndex = (currentShotIndex + 1) % shots.length;
    renderLastShot().catch(e => console.warn(e));
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (shots.length < 2) return;
    currentShotIndex = (currentShotIndex - 1 + shots.length) % shots.length;
    renderLastShot().catch(e => console.warn(e));
  });

  if (sameBeansBtn) sameBeansBtn.addEventListener('click', () => {
    const shot = shots[currentShotIndex];
    const coffeeName = shot && shot.workflow && shot.workflow.context && shot.workflow.context.coffeeName;
    // Can't filter "same beans" if the current shot has no bean — stay in All Shots.
    sameBeanFilter = !sameBeanFilter && !!coffeeName;
    // Label shows the CURRENT state being viewed, not the action.
    if (sameBeanFilter) {
      shots = allShots.filter(s => s.workflow && s.workflow.context && s.workflow.context.coffeeName === coffeeName);
      sameBeansBtn.querySelector('span').textContent = 'Same Beans';
    } else {
      shots = [...allShots];
      sameBeansBtn.querySelector('span').textContent = 'All Shots';
    }
    currentShotIndex = 0;
    renderLastShot().catch(e => console.warn(e));
  });
}

function setupDropdownToggle(btnId, dropdownId) {
  const btn = document.getElementById(btnId);
  const dropdown = document.getElementById(dropdownId);
  if (!btn || !dropdown) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    document.querySelectorAll('.dye-dash-dropdown').forEach(dd => { if (dd !== dropdown) dd.classList.remove('open'); });
  });
}

function renderNextShot() {
  if (!currentWorkflow) return;
  const dateEl = document.getElementById('dye-next-date');
  if (dateEl) dateEl.textContent = formatCurrentDate();

  const wf = currentWorkflow;
  const ctx = wf.context || {};
  // Show the selected/active profile title (set by an applied fav/recipe, clipboard, or the live workflow).
  const profileNameEl = document.getElementById('dye-profile-name');
  if (profileNameEl) profileNameEl.textContent = (wf.profile && wf.profile.title) || '—';

  const doseVal = document.getElementById('dye-dose-value');
  const drinkVal = document.getElementById('dye-drink-value');
  const ratioVal = document.getElementById('dye-drink-ratio');
  if (doseVal) doseVal.textContent = ctx.targetDoseWeight != null ? ctx.targetDoseWeight + 'g' : '—';
  if (drinkVal) drinkVal.textContent = ctx.targetYield != null ? ctx.targetYield + 'g' : '—';
  if (ratioVal) { const r = calcRatio(ctx.targetDoseWeight, ctx.targetYield); ratioVal.textContent = r !== '—' ? '(' + r + ')' : ''; }

  const grindVal = document.getElementById('dye-grind-value');
  const rpmVal = document.getElementById('dye-rpm-value');
  if (grindVal) grindVal.textContent = ctx.grinderSetting != null ? ctx.grinderSetting : '—';
  if (rpmVal) rpmVal.textContent = (ctx.extras && ctx.extras.rpm != null) ? ctx.extras.rpm : '—';

  renderGrinderTabs();

  const beanNameEl = document.getElementById('dye-bean-name-display');
  const roastInfoEl = document.getElementById('dye-bean-roast-info');
  const coffeeName = ctx.coffeeName || '';
  const coffeeRoaster = ctx.coffeeRoaster || '';
  const roastDate = ctx.roastDate || '';
  if (beanNameEl) beanNameEl.textContent = coffeeName || '— Select Beans';
  if (roastInfoEl) {
    if (coffeeRoaster || roastDate) {
      let info = coffeeRoaster ? 'Roasted by ' + coffeeRoaster : '';
      if (roastDate) {
        const rd = new Date(roastDate);
        const diffDays = Math.floor((new Date() - rd) / (1000 * 60 * 60 * 24));
        const dateStr = rd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        info += info ? ' on ' + dateStr + ' (' + diffDays + ' days off-roast)' : dateStr + ' (' + diffDays + ' days off-roast)';
      }
      roastInfoEl.textContent = info;
    } else { roastInfoEl.textContent = ''; }
  }

  const baristaEl = document.getElementById('dye-next-barista');
  const drinkerEl = document.getElementById('dye-next-drinker');
  if (baristaEl) baristaEl.textContent = ctx.baristaName || ctx.barista || '—';
  if (drinkerEl) drinkerEl.textContent = ctx.drinkerName || ctx.drinker || '—';

  renderRecipePills(wf);
}

function renderGrinderTabs() {
  const container = document.getElementById('dye-grinder-tabs');
  if (!container || grinders.length === 0) return;
  container.innerHTML = '';
  grinders.forEach((g, i) => {
    const tab = document.createElement('button');
    tab.className = 'dye-grinder-tab' + (i === currentGrinderIndex ? ' active' : '');
    tab.textContent = g.model || g.name || ('Grinder ' + (i + 1));
    tab.addEventListener('click', () => {
      currentGrinderIndex = i;
      document.querySelectorAll('.dye-grinder-tab').forEach((t, j) => t.classList.toggle('active', j === i));
    });
    container.appendChild(tab);
  });
}

function renderRecipePills(workflow) {
  const container = document.getElementById('dye-recipe-pills');
  if (!container) return;
  // Prefer KV-store recipes (clickable/applicable); fall back to workflow strings (label-only).
  const items = recipes.length ? recipes : (workflow.favorites || workflow.recipes || []);
  container.innerHTML = '';
  if (items.length === 0) { container.innerHTML = '<span style="color:var(--low-contrast-white);font-size:21px;">No recipes yet</span>'; return; }
  const activeTitle = workflow.profile && workflow.profile.title;
  items.forEach((item, i) => {
    const title = typeof item === 'string' ? item : (item.name || item.title || ('Recipe ' + (i + 1)));
    const pill = document.createElement('button');
    pill.className = 'dye-recipe-pill' + (title === activeTitle ? ' active' : '');
    pill.textContent = title;
    pill.addEventListener('click', () => {
      document.querySelectorAll('.dye-recipe-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (typeof item === 'object') applyRecipe(item);
    });
    container.appendChild(pill);
  });
}

// Map a recipe's dashboardVariables/metadata into currentWorkflow.context, then re-render.
// PUT /workflow only accepts context/profile (see setupClipboardPaste), so everything lands in context.
function applyRecipe(recipe) {
  snapshotWorkflow();
  const dv = recipe.dashboardVariables || {};
  currentWorkflow = currentWorkflow || {};
  const ctx = { ...(currentWorkflow.context || {}) };
  if (dv.dose != null)  ctx.targetDoseWeight = dv.dose;
  if (dv.drink != null) ctx.targetYield = dv.drink;
  else if (dv.ratio != null && dv.dose != null) ctx.targetYield = Math.round(dv.dose * dv.ratio * 10) / 10;
  if (dv.grind != null) ctx.grinderSetting = dv.grind;
  if (dv.rpm != null)   ctx.extras = { ...(ctx.extras || {}), rpm: dv.rpm };
  const grinder = dv.grinderId ? grinders.find(g => g.id === dv.grinderId) : null;
  if (grinder) ctx.grinderModel = grinder.model || grinder.name;
  if (recipe.barista) ctx.baristaName = recipe.barista;
  if (recipe.drinker) ctx.drinkerName = recipe.drinker;
  currentWorkflow.context = ctx;
  // Steam / hot-water / flush: override only the recipe's fields on the live sub-objects
  // (which already carry the required targetTemperature/flow). Guarded so we never send a partial.
  if (currentWorkflow.steamSettings && (dv.steamTimeS != null || dv.steamFlowMls != null)) {
    const ss = { ...currentWorkflow.steamSettings };
    if (dv.steamMode === 'time' && dv.steamTimeS != null)  ss.duration = dv.steamTimeS;
    if (dv.steamMode === 'flow' && dv.steamFlowMls != null) ss.flow = dv.steamFlowMls;
    currentWorkflow.steamSettings = ss;
  }
  if (currentWorkflow.hotWaterData && (dv.hotWaterMl != null || dv.hotWaterTempC != null)) {
    const hw = { ...currentWorkflow.hotWaterData };
    if (dv.hotWaterMode === 'vol'  && dv.hotWaterMl != null)    hw.volume = dv.hotWaterMl;
    if (dv.hotWaterMode === 'temp' && dv.hotWaterTempC != null) hw.targetTemperature = dv.hotWaterTempC;
    currentWorkflow.hotWaterData = hw;
  }
  if (currentWorkflow.rinseData && dv.flushS != null) {
    currentWorkflow.rinseData = { ...currentWorkflow.rinseData, duration: dv.flushS };
  }
  renderNextShot();
}

// Apply a saved auto-favourite's snapshot into currentWorkflow, honouring its copyMask
// (a field with mask === false is skipped; absent mask defaults to on). Mirrors applyRecipe.
function applyAutoFavourite(fav) {
  if (!fav) return;
  snapshotWorkflow();
  const snp = fav.snapshot || {};
  const mask = fav.copyMask || {};
  const on = k => mask[k] !== false;
  currentWorkflow = currentWorkflow || {};
  const ctx = { ...(currentWorkflow.context || {}) };
  if (on('dose')  && snp.dose  != null) ctx.targetDoseWeight = snp.dose;
  if (on('drink') && snp.drink != null) ctx.targetYield = snp.drink;
  if (on('grindSetting')) {
    if (snp.grindSetting != null) ctx.grinderSetting = String(snp.grindSetting);
    if (snp.rpm != null) ctx.extras = { ...(ctx.extras || {}), rpm: snp.rpm };
  }
  if (on('grinder')) {
    if (snp.grinderId) ctx.grinderId = snp.grinderId;
    if (snp.grinderModel) ctx.grinderModel = snp.grinderModel;
  }
  if (on('beans')) {
    if (snp.beanBatchId) ctx.beanBatchId = snp.beanBatchId;
    if (snp.coffeeName) ctx.coffeeName = snp.coffeeName;
    if (snp.coffeeRoaster) ctx.coffeeRoaster = snp.coffeeRoaster;
  }
  if (on('roastDate') && snp.roastDate) ctx.roastDate = snp.roastDate;
  if (on('barista')   && snp.barista)   ctx.baristaName = snp.barista;
  if (on('drinker')   && snp.drinker)   ctx.drinkerName = snp.drinker;
  if (on('note')      && snp.note)      ctx.extras = { ...(ctx.extras || {}), note: snp.note };
  currentWorkflow.context = ctx;
  if (on('profile') && (snp.profileId || snp.profileTitle)) {
    currentWorkflow.profile = { id: snp.profileId, title: snp.profileTitle };
  }
  renderNextShot();
}

function wireAdjuster(minusId, plusId, valueId, step, min, max, formatter, onChange) {
  const minusBtn = document.getElementById(minusId);
  const plusBtn = document.getElementById(plusId);
  if (!minusBtn || !plusBtn) return;
  let debounceTimer = null;
  minusBtn.addEventListener('click', () => {
    const valueEl = document.getElementById(valueId);
    if (!valueEl) return;
    const raw = parseFloat(valueEl.textContent);
    // Empty field shows "—" → start from min so − begins working.
    const base = isNaN(raw) ? min : raw;
    if (base <= min) { valueEl.textContent = formatter(min); clearTimeout(debounceTimer); debounceTimer = setTimeout(() => onChange(min), 500); return; }
    const val = Math.max(min, parseFloat((base - step).toFixed(2)));
    valueEl.textContent = formatter(val);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => onChange(val), 500);
  });
  plusBtn.addEventListener('click', () => {
    const valueEl = document.getElementById(valueId);
    if (!valueEl) return;
    const raw = parseFloat(valueEl.textContent);
    const base = isNaN(raw) ? min : raw;
    const val = max !== null ? Math.min(max, parseFloat((base + step).toFixed(2))) : parseFloat((base + step).toFixed(2));
    valueEl.textContent = formatter(val);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => onChange(val), 500);
  });
  makeValueEditable(valueId, min, max, formatter, onChange);
}

// Tap the number to type a value directly (tablet-friendly).
function makeValueEditable(valueId, min, max, formatter, onChange) {
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
        onChange(v);
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

function setupDoseControls() {
  wireAdjuster('dye-dose-minus', 'dye-dose-plus', 'dye-dose-value', 0.5, 0, null,
    val => val + 'g',
    val => { if (!currentWorkflow) return; snapshotWorkflow(); currentWorkflow.context = currentWorkflow.context || {}; currentWorkflow.context.targetDoseWeight = val; updateRatioDisplay(); updateWorkflow(currentWorkflow).catch(e => console.warn(e)); }
  );
  wireAdjuster('dye-drink-minus', 'dye-drink-plus', 'dye-drink-value', 1, 0, null,
    val => val + 'g',
    val => { if (!currentWorkflow) return; snapshotWorkflow(); currentWorkflow.context = currentWorkflow.context || {}; currentWorkflow.context.targetYield = val; updateRatioDisplay(); updateWorkflow(currentWorkflow).catch(e => console.warn(e)); }
  );
  wireAdjuster('dye-grind-minus', 'dye-grind-plus', 'dye-grind-value', 0.1, 0, null,
    val => val.toFixed(1),
    val => { if (!currentWorkflow) return; snapshotWorkflow(); currentWorkflow.context = currentWorkflow.context || {}; currentWorkflow.context.grinderSetting = String(val); updateWorkflow(currentWorkflow).catch(e => console.warn(e)); }
  );
  wireAdjuster('dye-rpm-minus', 'dye-rpm-plus', 'dye-rpm-value', 1, 1, null,
    val => String(val),
    val => { if (!currentWorkflow) return; snapshotWorkflow(); currentWorkflow.context = currentWorkflow.context || {}; currentWorkflow.context.extras = { ...(currentWorkflow.context.extras || {}), rpm: val }; updateWorkflow(currentWorkflow).catch(e => console.warn(e)); }
  );
}

function updateRatioDisplay() {
  const ratioEl = document.getElementById('dye-drink-ratio');
  if (!ratioEl || !currentWorkflow) return;
  const ctx = currentWorkflow.context || {};
  const r = calcRatio(ctx.targetDoseWeight, ctx.targetYield);
  ratioEl.textContent = r !== '—' ? '(' + r + ')' : '';
}

function setupDeleteShot() {
  const deleteBtn = document.getElementById('dye-delete-shot');
  const dropdown = document.getElementById('dye-edit-shot-dropdown');
  if (!deleteBtn) return;
  deleteBtn.addEventListener('click', async () => {
    if (dropdown) dropdown.classList.remove('open');
    const shot = shots[currentShotIndex];
    if (!shot) return;
    if (!confirm('Delete this shot? This cannot be undone.')) return;
    try {
      await deleteShot(shot.id);
      allShots = allShots.filter(s => s.id !== shot.id);
      shots = shots.filter(s => s.id !== shot.id);
      currentShotIndex = Math.min(currentShotIndex, shots.length - 1);
      renderLastShot().catch(e => console.warn(e));
    } catch (e) { console.error('Failed to delete shot:', e); }
  });
}

function setupBeanCard() {
  const card = document.getElementById('dye-bean-card');
  if (!card) return;
  card.addEventListener('click', () => { window.location.href = '/api/v1/plugins/dye2.reaplugin/bean-picker'; });
}

function setupClipboardPaste() {
  const btn = document.getElementById('dye-clipboard-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const shot = shots[currentShotIndex];
    if (!shot) return;
    snapshotWorkflow();
    const wf = shot.workflow || {};
    const srcCtx = wf.context || {};
    const dd = wf.doseData || {};      // legacy shape, only on old shots
    const gd = wf.grinderData || {};
    const ann = shot.annotations || {};
    const srcRpm = (srcCtx.extras && srcCtx.extras.rpm != null) ? srcCtx.extras.rpm
      : (ann.extras && ann.extras.rpm != null) ? ann.extras.rpm
      : (gd.rpm != null ? gd.rpm : undefined);
    currentWorkflow = currentWorkflow || {};
    // PUT /workflow only accepts context/profile as of v0.5.2 (doseData/grinderData rejected),
    // so map everything into context, falling back to legacy fields for old shots.
    currentWorkflow.context = {
      ...srcCtx,
      targetDoseWeight: srcCtx.targetDoseWeight != null ? srcCtx.targetDoseWeight : dd.doseIn,
      targetYield:      srcCtx.targetYield      != null ? srcCtx.targetYield      : dd.doseOut,
      grinderModel:     srcCtx.grinderModel  || gd.model || gd.name,
      grinderSetting:   srcCtx.grinderSetting != null ? srcCtx.grinderSetting : (gd.setting != null ? String(gd.setting) : undefined),
      extras:           srcRpm != null ? { ...(srcCtx.extras || {}), rpm: srcRpm } : srcCtx.extras,
    };
    if (wf.profile) currentWorkflow.profile = { ...wf.profile };
    renderNextShot();
    // Show the copied shot's profile name (only revealed on clipboard copy).
    const profileEl = document.getElementById('dye-profile-name');
    if (profileEl) profileEl.textContent = (wf.profile && wf.profile.title) || '—';
  });
}

// Leave the dashboard back to whatever launched it. The dashboard is often the
// entry page of the REA webview, so history.back() has nothing to pop — hence the
// fallback chain: explicit ?return= URL (skin should pass its own), then real
// history, then the REA Web UI. The Web UI runs on :3000 (this plugin is served
// from :8080); ?_=Date.now() cache-busts, matching settings.reaplugin's back link.
// Guarantees Cancel returns to REA, never a dead button.
function leaveDashboard() {
  const ret = new URLSearchParams(location.search).get('return');
  if (ret) { window.location.href = ret; return; }
  if (window.history.length > 1) { window.history.back(); return; }
  window.location.href = 'http://' + window.location.hostname + ':3000/?_=' + Date.now();
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

function setupBottomButtons() {
  const cancelBtn = document.getElementById('dye-cancel-btn');
  const doneBtn = document.getElementById('dye-done-btn');
  const clearBtn = document.getElementById('dye-clear-btn');
  if (cancelBtn) cancelBtn.addEventListener('click', () => leaveDashboard());
  if (doneBtn) doneBtn.addEventListener('click', async () => {
    if (currentWorkflow) { try { await updateWorkflow(currentWorkflow); } catch (e) { console.warn(e); } }
    leaveDashboard();
  });
  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (!currentWorkflow) return;
    snapshotWorkflow();
    currentWorkflow.context = {};
    renderNextShot();
  });
}

async function initializeDyeDashboard() {
  try {
    const [shotsResult, workflowResult, grindersResult, recipesResult] = await Promise.all([
      getShots({ limit: 50, order: 'desc' }).catch(() => ({ items: [] })),
      getWorkflow().catch(() => null),
      getGrinders().catch(() => []),
      getRecipes().catch(() => []),
    ]);
    allShots = (shotsResult && shotsResult.items) ? shotsResult.items : (Array.isArray(shotsResult) ? shotsResult : []);
    shots = [...allShots];
    // Returning from edit-shot: land back on the shot they were editing, not the newest.
    const editedId = sessionStorage.getItem('dye_editShotId');
    sessionStorage.removeItem('dye_editShotId');
    const editedIdx = editedId ? shots.findIndex(s => String(s.id) === editedId) : -1;
    currentShotIndex = editedIdx >= 0 ? editedIdx : 0;
    currentWorkflow = workflowResult;
    grinders = Array.isArray(grindersResult) ? grindersResult : (grindersResult && grindersResult.items ? grindersResult.items : []);
    recipes = Array.isArray(recipesResult) ? recipesResult : [];
  } catch (e) {
    console.error('DYE Dashboard: Failed to load data:', e);
    allShots = []; shots = []; currentWorkflow = null; grinders = [];
  }

  // Returning from the Auto Favourites picker: apply the chosen favourite to Next Shot.
  const selFavId = sessionStorage.getItem('dye_selectedAutoFavId');
  if (selFavId) {
    sessionStorage.removeItem('dye_selectedAutoFavId');
    try {
      const fav = await getAutoFavourite(selFavId);
      if (fav) { applyAutoFavourite(fav); await updateWorkflow(currentWorkflow).catch(e => console.warn(e)); }
    } catch (e) { console.warn('Could not apply selected auto-favourite:', e); }
  }

  initChart();
  await renderLastShot();
  renderNextShot();

  setupShotNavigation();
  setupStarRating();
  setupDropdownToggle('dye-edit-shot-chevron', 'dye-edit-shot-dropdown');
  document.getElementById('dye-edit-shot-go')?.addEventListener('click', () => {
    const shot = shots[currentShotIndex];
    if (shot) sessionStorage.setItem('dye_editShotId', shot.id);
    window.location.href = '/api/v1/plugins/dye2.reaplugin/edit-shot';
  });
  setupDropdownToggle('dye-settings-btn', 'dye-settings-dropdown');
  document.getElementById('dye-settings-favourites')?.addEventListener('click', () => { window.location.href = '/api/v1/plugins/dye2.reaplugin/auto-favs'; });
  document.getElementById('dye-settings-recipes')?.addEventListener('click', () => { sessionStorage.setItem('dye_editRecipeIdx', '0'); window.location.href = '/api/v1/plugins/dye2.reaplugin/recipe-edit'; });
  setupVisualizerDropdown();
  setupVisualizerModal();
  await checkVisualizerLoggedIn();
  setupDeleteShot();
  setupDoseControls();
  setupBeanCard();
  setupClipboardPaste();
  setupBottomButtons();
  setupReadNote();
  setupHistoryRevert();
  const pills = document.getElementById('dye-recipe-pills');
  document.getElementById('dye-recipe-prev')?.addEventListener('click', () => pills?.scrollBy({ left: -pills.clientWidth, behavior: 'smooth' }));
  document.getElementById('dye-recipe-next')?.addEventListener('click', () => pills?.scrollBy({ left: pills.clientWidth, behavior: 'smooth' }));
  document.addEventListener('click', () => {
    document.querySelectorAll('.dye-dash-dropdown.open').forEach(dd => dd.classList.remove('open'));
  });
}

initializeDyeDashboard().catch(e => console.error('initializeDyeDashboard failed:', e));

// Returning here via history.back() can restore the page frozen from bfcache, so init
// (and the apply-selected-auto-favourite step) never re-runs — reload to re-fetch + apply.
window.addEventListener('pageshow', function(e) { if (e.persisted) window.location.reload(); });
`;

export function renderDashboardPage(request: HttpRequest): HttpResponse {
  return {
    requestId: request.requestId,
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: devPageShell("Dashboard", buildContent(), styles, [devApiScript, chartScript, pageScript], { plotly: true }),
  };
}
