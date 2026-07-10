# DYE2 Redesign — Action Plan

Source: Figma `Streamline_Decent (Copy)` — node `2345:493` ("DYE Redesign").
Target viewport: **1920 × 1200** (Figma frames are 2560 × 1600 — apply scale factor **0.75** to every spec below).

---

## 0. Viewport & scaling rules

| Figma (px @ 2560) | Implementation (px @ 1920) |
|---|---|
| 2560 × 1600 frame | 1920 × 1200 frame |
| 1280 column | 960 column |
| 1180 content | 885 content |
| 50 outer padding | 38 |
| 80 button height | 60 |
| 72 stepper height | 54 |
| 48 H1 / large text | 36 |
| 44 sub-heading | 33 |
| 38 body-large | 28 |
| 34 body | 26 |
| 24 small | 18 |
| 114 large icon | 86 |
| 48 standard icon | 36 |
| 34 small icon | 26 |

All numeric specs that follow are **post-scale (1920-space)**. Use CSS pixel units. Prefer CSS variables (`--col`, `--pad`, `--step-h`) over hard-coded values.

---

## 1. Design tokens (new)

Add to a single file (e.g. `dye2-plugin/src/styles/tokens.css` injected via `pageShell`).

```css
:root {
  /* color */
  --bg:            #FFFFFF;
  --bg-muted:      #F4F6F8;
  --surface:       #F8FAFC;
  --border:        #E5E9EE;
  --text:          #0B1320;
  --text-muted:    #5A6678;
  --label:         #1E3A5F;   /* dark navy labels */
  --primary:       #1E3A5F;   /* deep navy */
  --primary-ink:   #FFFFFF;
  --primary-hover: #16314F;
  --accent:        #2F6BD1;   /* blue links / chart line */
  --warn:          #C0392B;
  --chart-red:     #C0392B;
  --chart-blue:    #2F6BD1;
  --chart-green:   #2E8B57;
  --chart-pink:    #E89AB0;

  /* radius */
  --r-pill: 9999px;
  --r-lg:   18px;
  --r-md:   12px;
  --r-sm:   8px;

  /* spacing scale (1920-space) */
  --s-1: 6px;  --s-2: 10px; --s-3: 14px;
  --s-4: 20px; --s-5: 28px; --s-6: 38px; --s-7: 54px;

  /* type */
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --t-h1: 700 36px/1.15 var(--font-sans);
  --t-h2: 700 28px/1.2  var(--font-sans);
  --t-body: 500 22px/1.35 var(--font-sans);
  --t-label: 600 22px/1 var(--font-sans);
  --t-stat: 700 28px/1 var(--font-sans);

  /* layout */
  --col-w:  960px;   /* half viewport */
  --pad-x:  38px;
  --step-h: 54px;
  --btn-h:  60px;
}
```

Component primitives expected (build once, reuse everywhere):
- `dye-stepper` — label · minus · value · plus · (optional unit). 54px tall, gray 8px-radius squares for ±.
- `dye-chip` — pill toggle. Variants: `selected` (filled navy), `default` (outlined), `disabled` (muted).
- `dye-toggle` — switch. Variants `on` (navy w/ check), `off` (gray w/ ×).
- `dye-grid-picker` — left sort rail + 3-column responsive card grid. Used by Roaster / Beans / Auto Favs.
- `dye-pill-button` — primary / ghost / text variants. 60px tall, pill radius.
- `dye-stars` — 5-star rating, lucide outline + filled.
- `dye-icon` — lucide-name → inline SVG (search, arrow-right, arrow-left, history, clipboard-paste, star, chevron-down, circle-check-big, pencil, calendar, maximize-2, plus, minus).

---

## 2. Screen inventory (Figma → code)

| # | Figma frame | Node ID | Target page | Status |
|---|---|---|---|---|
| 1 | DYE Dashboard v5 | `2345:495` | `pages/dashboard.ts` (rewrite) | ✅ built — two-column layout, steppers, recipe pills, visualizer modal |
| 2 | DYE_Edit Shot v4 | `2345:2021` | `pages/edit-shot.ts` (new) | ✅ built |
| 3 | DYE_Select Roaster | `2345:2216` | `pages/roasters.ts` (rewrite as picker) | ✅ built — grid picker |
| 4 | DYE_Select Coffee Beans_Selected | `2345:2457` | `pages/bean-picker.ts` | ✅ built — grid picker + rich 3-line cards + search (the live picker; all bean-select flows route here) |
| 5 | DYE_Add New Bean (picker) | `2345:2577` | ~~`pages/beans.ts`~~ folded into `pages/bean-picker.ts` | ✅ folded — rich cards from 3.5 added to the live picker. `beans.ts` **deleted** (legacy dark-theme CRUD removed) |
| 6 | DYE_Add New Bean (form) | `2345:2721` | `pages/add-bean.ts` | ✅ built |
| 7 | DYE_View All Auto Favourites | `2386:669` | `pages/auto-favs.ts` (new) | ✅ built |
| 8 | Edit DYE Auto Favourite | `2386:1723` | `pages/auto-fav-edit.ts` (new) | ✅ built |
| 9 | DYE Settings_Recipes_Edit Recipes | `2386:1873` | `pages/recipe-edit.ts` (new) | ✅ built |
| 10 | Streamline + DYE chips | `2386:824`, `2386:1121` | host-side (REA shot screen) — chip strip injected | deferred — needs REA hook |

---

## 3. Per-screen specs

### 3.1 Dashboard — `pages/dashboard.ts`

Layout: two equal columns (960 px each), divider at `x = 960`. No outer chrome — fills the viewport.

**Left column — Last Shot (review)**
1. **Header row** (`y=32` → `y=180`, h=148):
   - H1 "Last Shot: Yesterday" — `--t-h1`, color `--label`.
   - Subtitle "04 Feb 2025, 12:43pm" — `--t-body`, color `--text-muted`.
   - Right-aligned: search icon (86px), `← Same Beans →` group (2 nav arrows around a chip).
2. **Divider** white line, 1px `--border`.
3. **Graph block** (`h=380`): SVG pressure / temp / flow / cup-flow curves. Y-axis 0–12, X-axis 0–50 (seconds). Legend bottom-right (Pressure / Temp / Flow / Cup Flow) with color swatches. Reuse the curve renderer from the current REA shot — render as inline SVG, not canvas, so it scales with viewport.
4. **Profile name** (`h=36`): "Adaptive for Medium Roasts or a long profile name here" — single line ellipsis.
5. **Stats row** (`h=36`): `Drink 20:42.6g`  `Time 32s`  `Ratio 1:2.1`  •  `TDS 10.23%`  `EY 26.45%` — labels muted, values `--t-stat`.
6. **Bean row** (`h=36`): `Dak Amsterdam · Juniper, Nov 2024 Harvest, Colombia, Natural, Caturra`.
7. **Grinder row** (`h=36`): `Grinder Lagom01 w/ 102mizen · Setting 1.5 · RPM 2`.
8. **Barista row** (`h=36`): `Barista Pulak`  `Drinker Enrique`  •  ★★★☆☆  `Read Note`.
9. **Footer action row** (`h=100`, fixed bottom): three pill buttons sharing the left column width — `Edit Shot ▼` · `DYE Settings ▼` · `✓ Visualizer ▼`. Use ghost-style outline; the chevron-down opens a dropdown menu (Edit Shot history list, settings sub-menu, visualizer connect/disconnect).

**Right column — Next Shot Planning**
1. **Header row**: H1 "Next Shot Planning", subtitle date+time. Right-aligned icons: `history` (recall) · `clipboard-paste` (copy all values from the currently-viewed shot history into Next Shot Planning fields — maps `context`, `doseData`, `grinderData`, `profile` from the left panel shot into `currentWorkflow`, then re-renders).
2. **Recipe chip strip** (`h=135`): chevron-down (open recipe sheet) + six recipe chips in two rows of 3 — `DYE Recipe 1`, `Espresso Recipe`, `Latte Recipe`, `Filter Recipe`, `Americano Recipe`, `DYE Recipe 5`. Selected = filled navy.
3. **Profile preview**: "Gentle & Sweet 8mlps long profile name can fit here".
4. **Variable grid** (2×2):
   - **Dose**: ± stepper, value 20g, with unit "g" small after.
   - **Drink**: ± stepper, value 46g, sub-line "(1:2.3)".
   - **Grind**: Lagom 01 w/ 102 Mizens header chip + stepper value 1.8.
   - **RPM**: stepper value 6.
5. **Bean readout**: roaster line + bean varietal + days-off-roast (e.g. "Roasted by Dak Amsterdam on 12 Jan 2025 (42 days off-roast)").
6. **Drinker row**: `Barista Pulak · Drinker John & Bugs · Add Note`.
7. **Footer**: `Clear` (text) · `CANCEL` (ghost) · `DONE` (filled navy, primary) — DONE PUTs `currentWorkflow` to `PUT /api/v1/workflow` then navigates back.

**Plugin runtime contract**
- Render is server-side (`__httpRequestHandler`). All data fetched via `client.ts` from `/api/v1/workflow`, `/api/v1/beans/:id`, `/api/v1/beans/:id/batches`, `/api/v1/grinders/:id`.
- Browser-side: `<dye-dashboard>` Web Component subscribes to step events; ± steppers emit `CustomEvent('dye:update', { detail: { field, value } })` that bubbles to a top-level handler that PUTs `/api/v1/workflow`.

### 3.2 Edit Shot — `pages/edit-shot.ts` (new)

Two-column form, no graph.
- **Header**: "Editing  · Last Shot: Yesterday" with date + profile sub-line. Right: search + `← →` shot nav arrows.
- **Left top**: four ± steppers in 2×2 — Dose · Drink (with ratio sub-line) · TDS (%) · EY (%).
- **Left bottom — Beans card** (`--bg-muted` fill, 12px radius, padded):
  - Bean varietal H2.
  - Roaster name.
  - Roast date "12 Jan 2025 (42 days off-roast)".
  - Bean notes — 3-paragraph clamp, `READ MORE` button (opens modal w/ full text).
- **Right column**:
  - Grinder field (text + maximize icon to open picker).
  - Setting stepper · RPM stepper (paired row).
  - Barista field (text + maximize icon).
  - Drinker field (text + maximize icon).
  - Drinker Notes — single-line preview + pencil edit.
  - Rating — 5 stars w/ outline empties.
- **Footer**: `Delete Shot` (ghost, danger) · `Clear all` (ghost) · `Read From ▲` (ghost menu — pulls from Auto Fav or previous shot) · `CANCEL` (text) · `SAVE SHOT DATA` (primary).

API: `PUT /api/v1/bean-batches/:id` for batch fields, plus extend OpenAPI to include a `shots` resource (or write to `/api/v1/workflow` history if that's where REA stores it — confirm w/ bridge).

### 3.3 Select Roaster — `pages/roasters.ts` (rewrite)

- **Top bar** (`--bg-muted`, 134 px tall): H1 "Select Roaster" left · `CANCEL` text + `SELECT ROASTER ▸` pill (right). Primary CTA disabled until one card selected.
- **Body**: `dye-grid-picker`.
  - **Sort rail** (left, 110 px): vertical stack of pill toggles — `Recent` (selected by default), `Oldest`, `A-Z`, `Z-A`, `Most Used`, `Least Used`. Outlined when inactive, filled navy when active.
  - **Grid** (right, 3 cols, gap 20 px, card h = 80 px): first card is the **Add New Roaster +** affordance (outlined, primary text). All others are roaster names. Selected card = filled navy + white text.
- Vertical scrollbar visible (slim).

### 3.4 Select Beans (Selected) — `pages/bean-picker.ts`

Same chrome as 3.3. Header reads "Select Beans" but primary CTA still reads "SELECT ROASTER ▸" — wizard step indicator (this is the second step of a 2-step roaster→bean flow). On confirm, return to whatever screen invoked picker.

### 3.5 Add New Bean (picker) — `pages/beans.ts`

Same picker chrome. Each card has 3 lines: bean varietal (H2), roaster (small), `21 Aug 2025, 2:30pm  ·  XX days off-roast` (smaller, muted). First card = `Add New Beans +`. Header CTA: `CANCEL` + `CONFIRM`.

### 3.6 Add New Bean (form) — `pages/add-bean.ts` (redesign)

- **Top bar**: H1 "Add New Beans" · `CANCEL` + `CONFIRM` pill (right, filled navy).
- **Form** (single column, max-width 1140 px, labels left, fields right):
  - `Beans` — dropdown w/ chevron-down. Free-text fallback if "Add new" option chosen.
  - `Roaster` — dropdown w/ chevron-down. Same fallback.
  - `Roast Date` — text input + calendar icon (opens date picker).
  - `Bean Notes` — large textarea (8 lines visible), multi-paragraph, no rich text.
- POST → `/api/v1/beans` then `/api/v1/beans/:id/batches`.

### 3.7 View All Auto Favourites — `pages/auto-favs.ts` (new)

Same picker chrome as 3.3.
- Header: H1 "DYE Auto Favourites" + `CANCEL` + `CONFIRM`.
- **Sort rail** + a **filter tab strip** above the grid: `Beans` / `Recipe` / `Profile` / `Grinder` — controls which dimension determines "recent favourites by" grouping (e.g. show favs grouped by recipe).
- Cards: bean varietal H2, roaster, date + "X days off-roast". Same as 3.5 but represents a saved favourite.
- API: new endpoint required — `GET/POST/PUT/DELETE /api/v1/auto-favourites`. Add to `rea_restapi.yml`.

### 3.8 Edit Auto Favourite — `pages/auto-fav-edit.ts` (new)

Two columns.
- **Header**: H1 "Edit Auto Favourite" + sub "4 Feb 2025, 1:30pm  ·  Golden Bean, Feb 2025 Harvest". Right: `CANCEL` + `SAVE FAVOURITE` (primary).
- **Left**:
  - `Favourite Title` — text input.
  - `Beverage` — text input.
  - `Always display on Dashboard` — 2-segment toggle Yes / No (Yes filled navy).
  - `Assign Fav number` — 5 numbered circles (1 outline, 2 selected filled navy, 3–5 outline). Single-select.
- **Right — "Data to Copy"**: 10 rows. Each row: `dye-toggle` (on/off) · field label · current value · pencil edit. Fields: Profile, Beans, Roast Date, Grinder, Grind Setting, Dose, Drink, Barista, Drinker, Note. When toggle = off, value text is muted/grayed; pencil still works to edit underlying snapshot.

### 3.9 Edit Recipes — `pages/recipe-edit.ts` (new)

- **Header tab strip**: H1 "Edit Recipes" + 5 pill tabs `Cappucino Recipe`, `Recipe 2`–`Recipe 5`. Selected tab filled navy.
- **Left column**:
  - `Recipe Name` — text input + pencil.
  - `Assign Bean` — 5 bean chips (3 cols × 2 rows) + `See All Beans` text link → opens 3.5 picker.
  - `Assign Profile` — 5 profile chips + `See All Profiles` text link → opens profile picker (TBD).
  - `Beverage` — text input + pencil.
  - `Barista` + `Drinker` — text inputs + pencil.
- **Right column — "Dashboard Variables"**: each row is a ± stepper with a preset row of values directly beneath (selected preset filled navy, others muted text).
  - `Dose` (g) — presets 20g, 18g, 19g, 15g.
  - `Drink` (g + ratio) — presets 1:2.3, 1:2.5, 1:5, 1:15.
  - `Brew °c` — 75, 80, 92, 85.
  - `Steam` — Flow | Time toggle, value 31s / 0.8ml/s — presets 29s, 15s, 31s, 28s.
  - `Flush` (s) — 5, 2, 10, 15.
  - `Hot Water` — Temp | Vol toggle, value 75ml / 45°C — presets 75ml, 120ml, 180ml, 200ml. (Hot Water section is grayed out unless beverage allows it.)
  - **Grinder picker row**: 4 grinder chips (Lagom 01 w/ 102 Mizens selected, 1Zpresso ZP6, DF64 Gen, EK43 Omnia).
  - `Grind` + `RPM` — paired ± steppers.
- **Footer**: `Clear all` · `Read From ▲` · `✓ Show on Streamline Dashboard` toggle · `CANCEL` · `SAVE RECIPE` (primary).
- API: new endpoint required — `GET/POST/PUT/DELETE /api/v1/recipes`. Add to `rea_restapi.yml`.

### 3.10 Streamline shot screen integration

The user-facing Decent shot screen (rendered by REA, not by this plugin) must show a strip of DYE auto-fav chips above the existing controls (see `2386:824`):
- Up to **4 chips** worth of auto-favs (Nicaragua Jinotega · Ethiopian Yirgacheffe · Rwanda Bourbon · `VIEW ALL AUTO FAV`).
- + DYE / Settings / Sleep buttons in top-right (already exists in REA, confirm placement).
- Selecting a chip emits `dye:apply-favourite` with the favourite id; the plugin handles it by PUTting `/api/v1/workflow` w/ the snapshot's selected fields (the toggles from 3.8).

This may require a REA-side change; if the host doesn't expose a hook for chip injection, the plugin renders the chip strip itself via its dashboard route and REA embeds it.

---

## 4. Data model additions

Extend `rea_restapi.yml`:

```yaml
/api/v1/recipes:               # 1–5 slots
  GET:  list
  POST: create
/api/v1/recipes/{id}:
  GET / PUT / DELETE

/api/v1/auto-favourites:       # snapshots
  GET:  list (filterable by ?groupBy=beans|recipe|profile|grinder)
  POST: create from current/last shot
/api/v1/auto-favourites/{id}:
  GET / PUT / DELETE
```

Recipe shape:
```ts
interface Recipe {
  id: string;
  name: string;
  beanId?: string;
  profileId?: string;
  beverage: string;
  barista?: string;
  drinker?: string;
  dashboardVariables: {
    dose: number;
    drinkMode: "weight" | "ratio";
    drink: number;        // grams when mode=weight
    ratio?: number;       // x.x when mode=ratio
    brewC: number;
    steamMode: "flow" | "time";
    steamFlowMls?: number;
    steamTimeS?: number;
    flushS: number;
    hotWaterMode: "temp" | "vol";
    hotWaterTempC?: number;
    hotWaterMl?: number;
    grinderId?: string;
    grind: number;
    rpm: number;
  };
  showOnStreamlineDashboard: boolean;
}
```

AutoFavourite shape:
```ts
interface AutoFavourite {
  id: string;
  capturedAt: string;            // ISO
  sourceShotId?: string;
  title: string;
  beverage: string;
  alwaysOnDashboard: boolean;
  favSlot?: 1 | 2 | 3 | 4 | 5;
  snapshot: {
    profileId?: string;
    beanId?: string;
    roastDate?: string;
    grinderId?: string;
    grindSetting?: number;
    dose?: number;
    drink?: number;
    barista?: string;
    drinker?: string;
    note?: string;
  };
  copyMask: {                    // toggle state from 3.8
    profile: boolean;
    beans: boolean;
    roastDate: boolean;
    grinder: boolean;
    grindSetting: boolean;
    dose: boolean;
    drink: boolean;
    barista: boolean;
    drinker: boolean;
    note: boolean;
  };
}
```

---

## 5. Implementation order

**Phase 1 — foundation** ✅ complete
1. ✅ Tokens inlined via `src/utils/dev-shell.ts` (`--mimoja-*` / `--dye-*` vars in `:root`), not a separate `tokens.css` file.
2. ✅ Primitives built as HTML/CSS/script factories in `src/utils/shared-components.ts` (stepper, sort rail, preset strip, toggle row, segment control, stars, expand field) rather than standalone `src/components/*` Web Components — same coverage, less boilerplate.
3. ✅ Add lucide SVG helpers (`src/utils/lucide.ts` — 17 icons, `lucideIcon()` + `starIcon()` builders).
4. ✅ Add shared CSS/HTML/script factories (`src/utils/shared-components.ts` — sort sidebar, stepper, preset strip, toggle row, segment control, star rating, expand field).
5. ✅ Add DYE2 color tokens to `devPageShell` fallbacks (`src/utils/dev-shell.ts` — `--dye-chart-*`, `--dye-surface`, `--dye-border`).
6. ✅ Extend browser-side API client (`src/utils/dev-api.ts` — recipes, auto-favs, bean-batches, profiles, visualizer endpoints).

**Phase 2 — port existing screens** ✅ complete
7. ✅ Restyled `pages/roasters.ts` → grid picker (screen 3.3).
8. ✅ Restyled `pages/bean-picker.ts` — 3.4 chrome + 3.5 rich 3-line cards (varietal+harvest / roaster / roast date + days-off-roast) + search box. `beans.ts` left as legacy/orphaned (replace its `/beans` route or delete if REA no longer needs the dark-theme CRUD).
9. ✅ Redesigned `pages/add-bean.ts` form (3.6).
10. ✅ Full redesign `pages/dashboard.ts` two-column layout (3.1). Visualizer modal done.

**Phase 3 — new screens** ✅ complete
11. ✅ Built `pages/edit-shot.ts` (3.2) — two-column shot editor, steppers, beans card, star rating, footer actions.
12. ✅ Built `pages/auto-favs.ts` (3.7) — sort sidebar, filter tabs, card grid, graceful 404 fallback.
13. ✅ Built `pages/auto-fav-edit.ts` (3.8) — metadata + 10-field copy-mask toggles, fav slot picker.
14. ✅ Built `pages/recipe-edit.ts` (3.9) — 5-tab editor, dashboard variables with preset strips, grinder chips.
15. ✅ Registered all 4 routes in `plugin.ts`.
16. ✅ Dashboard actions — **clipboard-paste** (`setupClipboardPaste` maps viewed shot's `context`/`profile` into `currentWorkflow`, re-renders) and **recipe chip strip** (`renderRecipePills` loads KV recipes via `getRecipes()`; clicking a pill runs `applyRecipe()` → maps `dashboardVariables` (dose/drink/ratio/grind/rpm/grinderId) + barista/drinker into `currentWorkflow.context`, then `renderNextShot()`). Falls back to `workflow.favorites` strings (label-only) when no KV recipes exist.
18b. ✅ Redesigned `pages/grinder-picker.ts` to match bean-picker chrome (top bar + CANCEL/CONFIRM, search + sort rail, 3-col card grid, Add New Grinder card). Old dark-theme `<dye2-grinder-picker>` Web Component deleted. Confirm PUTs `grinderId`/`grinderModel` into `/api/v1/workflow` context, then returns.
18c. ✅ Redesigned `pages/grinders.ts` (management/CRUD) to roaster grid layout — top bar + DONE, search + sort rail, 3-col card grid, Add New Grinder card. Add/edit now via a light-themed modal overlay (POST/PUT `/api/v1/grinders`, reload on save). Old dark-theme `<dye2-grinder-list>` + `<dye2-grinder-form>` Web Components deleted.

**Phase 4 — host integration** (deferred)
17. ⬜ Confirm chip-strip injection mechanism with REA. Likely approach: KV store in REA holds saved auto-favs; Streamline index page reads KV and renders chips. If host-driven, register routes. If plugin-driven, expose a dashboard-strip mini-page.
18. ⬜ End-to-end: capture shot → save as auto-fav → apply to next shot via Streamline chip.

---

## 6. Open questions

1. ✅ Shots resource — confirmed in `rea_restapi.yml`. `GET /api/v1/shots`, `GET /api/v1/shots/:id`, etc.
2. ✅ Profiles API — confirmed in `rea_restapi.yml`. `GET /api/v1/profiles` with `?visibility=` filter.
3. ✅ Visualizer button — prompts login form when not logged in (mirrors `settings.js` flow). Uses `visualizer.reaplugin` endpoints: `/verifyCredentials`, `/settings` (GET/POST), `/upload` (POST `{shotId}`). After login, check icon turns `#0ca581` green.
4. ⬜ Chip-strip on Streamline shot screen — host injection or plugin route? Agreed approach: use KV store in REA to persist saved auto-favs; Streamline index page reads KV and renders chips. Deferred to Phase 4.
5. ⬜ "Same Beans" arrows on dashboard — paginates through previous shots that share the bean. Already implemented client-side (filters `allShots` by `coffeeName`). No additional bridge work needed.
6. ⬜ Shot graph — does bridge expose full curve data per shot, or is it streamed via `PluginHost.emit`? Current impl fetches full shot via `GET /api/v1/shots/:id` and renders with Plotly client-side. Confirm `measurements` array is always populated on shot detail response.

---

## 7. Validation checklist (per screen)

- [ ] Renders correctly at 1920 × 1200.
- [ ] All ± steppers POST/PUT to bridge within 200 ms of tap.
- [ ] Primary navy matches `--primary` token across screens.
- [ ] Pill button height = 60 px everywhere.
- [ ] Sort rail order matches Figma (Recent, Oldest, A-Z, Z-A, Most Used, Least Used).
- [ ] No browser-API code leaked into plugin runtime files.
- [ ] All HTML interpolation uses `escapeHtml()` for user-provided data.
- [ ] Dev server (`npm run serve`) proxies `/api/v1/*` correctly for new endpoints.

---

## 8. Gap analysis — current app vs redesign (code review 2026-07-09)

Reviewed the actual source (`dye2-plugin/src/*`, `plugin.ts`, `utils/dev-api.ts`, `dev/*`). The §2 status table above reads "✅ built" for nearly everything — **accurate for the UI shells, optimistic for behaviour.** All 10 routes are wired in `plugin.ts` and every screen renders, but several flows are data-less or stubbed. Distinguish **UI-complete** (renders, matches Figma) from **functionally-complete** (wired to data + does the thing).

### 8.1 Reality vs the status table

| Screen | UI shell | Functional gap |
|---|---|---|
| Dashboard | ✅ | Recipe chips apply KV recipes; clipboard-paste + Same-Beans work. OK. |
| Edit Shot | ✅ | Saves via `PUT /shots/:id` (partial). OK. Beans/grinder open pickers. |
| Bean / Roaster / Grinder pickers | ✅ | Return via `history.back()`; selection passed implicitly through `sessionStorage`. OK but fragile (§8.4). |
| Add Bean | ✅ | OK. |
| **Auto Favourites list** | ✅ | **Empty in practice** — `getAutoFavourites()` has no working backend; on failure `favsCache = []` (`"endpoint not available yet"`). Group-by tabs (Beans/Recipe/Profile/Grinder) are **cosmetic** — `currentTab` changes but `render()` only sorts, never groups. Card opens edit on **dblclick**, not the single-tap Figma implies. CONFIRM only stashes `dye_selectedAutoFavId`; nothing consumes it. |
| Edit Auto Favourite | ✅ | Saves to KV, but nothing **creates** a favourite to edit (§8.2 A). |
| Edit Recipes | ✅ | "See All Beans" wired → `/bean-picker`. **"See All Profiles" is a dead div** — no click handler, no picker (§8.2 B). |
| Fullscreen Visualizer / Streamline chips | ⬜ | Not started (Phase 4). This is the remaining bulk (§8.2 D). |

### 8.2 Concrete gaps (ranked)

**A. The core auto-favourite loop is stubbed end-to-end.** This is the headline gap — the feature the redesign is named for barely functions:
- No "save current/last shot as Auto Favourite" action exists **anywhere** (not on dashboard, not on edit-shot). The capture entry point is missing, so the list has nothing to show.
- `getAutoFavourites()` resolves to `[]` — no KV read or endpoint behind it (unlike recipes, which do read KV). `auto-favs.ts` renders empty.
- Selecting a favourite → `sessionStorage['dye_selectedAutoFavId']` + `history.back()`, but **no consumer applies the snapshot** to `/api/v1/workflow`.
- Group-by tabs don't group; single-tap-to-edit is dblclick.
→ Fix order: (1) capture action + KV write, (2) `getAutoFavourites()` reads KV, (3) apply-on-select → workflow, (4) real group-by, (5) tap-to-edit.

**B. Profile selection is incomplete.** "See All Profiles" (recipe-edit.ts:143) is a bare `<div>` with no listener and no target page. Only the 5 preset profile chips work. `getProfiles()` (`/api/v1/profiles`) exists in `dev-api.ts` but nothing consumes it. There is no profile picker anywhere — dashboard and edit-shot can't browse the profile library either. Build a `profile-picker` page/route (mirror `bean-picker` chrome) and wire both "See All Profiles" and a dashboard/edit-shot profile field to it.

**C. Persistence diverged from this plan and is unvalidated.** §4/§5 specify `/api/v1/recipes` and `/api/v1/auto-favourites` REST resources + typed shapes. Reality: both go through the **generic KV store** (`/store/dye/*` in `dev-api.ts`). Consequence — this plan is internally stale (§4 OpenAPI additions never made), and there's **no server-side schema/validation**; all sort/group/filter is client-side over opaque blobs. Decide and record: either (a) adopt KV officially and rewrite §4/§5 to describe the KV keys + blob shapes, or (b) add the REST endpoints as originally planned. Right now the doc and the code disagree.

**D. Phase 4 host integration untouched (as planned, but it's the remaining bulk).** No plugin surface for the fullscreen Visualizer (`2386:824` / `2386:1121`) — the `Visualizer ▾` action only drives `visualizer.reaplugin` login/upload, not the profile-runner tab view. No Streamline shot-screen auto-fav chip strip. The end-to-end capture→save→apply loop (ties to gap A) is unbuilt. Still blocked on the same open question: host-injected chips vs plugin-rendered strip (§6 Q4).

**E. Two parallel implementations coexist.** `dev/` native pages (`dye.js` 575 LOC, `dyeDashboard.js` 616 LOC) are a separate REA-native workflow — already partly restyled to `--dye-*`/Tailwind but **not** the plugin redesign. Two dashboards now exist. Decide the shipping path: retire `dev/`, or keep it as the host shell that embeds plugin routes. Until then it's duplicate surface area drifting out of sync.

### 8.3 What's genuinely done (not gaps)

Dashboard two-column layout, steppers/chips/pickers, edit-shot save, bean/roaster/grinder pickers with grid+sort+search, add-bean form, recipe editor + KV-backed recipe chips on the dashboard, clipboard-paste, Same-Beans pagination, Plotly shot curves, Visualizer login flow. Phases 1–3 UI is real.

### 8.4 Correctness nits worth a pass

- **Implicit picker return.** Pickers return with `history.back()` and hand selection back through ad-hoc `sessionStorage` keys (`dye_selectedAutoFavId`, `dye_editRecipeIdx`, `dye_editAutoFavId`). Works for modal-over-hub, but there's no invoker/return contract — a picker opened from two callers relies on `back()` landing right and each caller reading the correct key. Fragile as flows deepen; consider a small `?return=<route>&slot=<key>` convention.
- **Silent-empty failure modes.** `auto-favs` and `recipes` both swallow load errors to `[]` and render an empty screen with only a `console.warn`. Fine for dev, but there's no user-visible "not available yet" state.

### 8.5 Suggested next-step order

1. Auto-fav **capture** action (dashboard/edit-shot "Save as Favourite") + KV write.
2. `getAutoFavourites()` KV read + **apply-on-select** to `/api/v1/workflow` (closes loop A).
3. `profile-picker` page + wire "See All Profiles" and a profile field (gap B).
4. Reconcile §4/§5 with the KV reality — rewrite the data-model section to match code (gap C).
5. Real group-by on the auto-fav tabs; tap-to-edit.
6. Phase 4 host integration (gap D) — needs the §6 Q4 decision first.
7. Decide `dev/` vs plugin as the shipping surface (gap E).

---

## 9. Implemented + corrections (2026-07-09)

Closer reading of `utils/dev-api.ts` and `pages/auto-favs.ts` corrected two overstatements in §8.2 A:
- **`getAutoFavourites()` *does* have a backend** — it reads the generic KV store (`/store/dye2.reaplugin/autoFavourites`), alongside `createAutoFavourite` / `updateAutoFavourite`. The `"endpoint not available yet"` warning in `auto-favs.ts` is stale defensiveness, not a missing backend.
- **The capture entry *exists*** — `auto-favs.ts` already renders an "ADD NEW FAVOURITE" card that clears `dye_editAutoFavId` and opens `/auto-fav-edit`, which snapshots the current workflow (`snapshotFromWorkflow`) and creates on save.

So the real gaps were narrower. Fixed this session:

| Gap | Fix |
|---|---|
| **Apply-on-select was unconsumed** (`dye_selectedAutoFavId` set, never read) | `dashboard.ts`: new `applyAutoFavourite(fav)` (mirrors `applyRecipe`, honours `copyMask`); init now reads `dye_selectedAutoFavId` on return from the picker, applies the snapshot to `currentWorkflow`, and PUTs `/workflow`. |
| **Dashboard could not reach auto-favs / recipes** — `dye-settings-favourites` / `-recipes` menu items had no handlers | `dashboard.ts`: wired Favourites → `/auto-favs`, Recipes → `/recipe-edit`. |
| **Group-by tabs were cosmetic** (only sorted) | `auto-favs.ts`: `groupKeyOf(fav)` groups by the active tab (Beans/Recipe/Profile/Grinder) with full-width group headers; card fields realigned to the real snapshot shape (`coffeeName` / `coffeeRoaster`, not `beans.name`). |
| **"See All Profiles" was a dead div; no profile picker anywhere** (gap B) | New `pages/profile-picker.ts` (mirrors grinder-picker chrome: search + sort rail + 3-col grid); route registered in `plugin.ts`; `recipe-edit.ts` "See All Profiles" → `/profile-picker`. Confirm PUTs `{ profile:{id,title} }` to `/workflow` and stashes `dye_selectedProfileId/Title`. |

Build: `npm run build` clean (19 modules → `assets/plugins/dye2.reaplugin/plugin.js`).

### 9.1 Data model — actual (supersedes §4/§5 as-built)

Recipes and auto-favourites are **not** REST resources. Both persist as a single JSON array under one generic-KV key (see the comment block in `utils/dev-api.ts`):

| Collection | KV key (`/api/v1/store/dye2.reaplugin/<key>`) | Helpers |
|---|---|---|
| Recipes | `recipes` | `getRecipes`, `updateRecipe` |
| Auto-favourites | `autoFavourites` | `getAutoFavourites`, `getAutoFavourite`, `createAutoFavourite`, `updateAutoFavourite` |

The `Recipe` / `AutoFavourite` shapes in §4 still describe the intended blob; the auto-fav snapshot as-written is flat/denormalized (`snapshotFromWorkflow`): `profileId/profileTitle`, `beanBatchId/coffeeName/coffeeRoaster/roastDate`, `grinderId/grinderModel/grindSetting/rpm`, `dose/drink/barista/drinker/note`, plus `copyMask`. Treat §4's OpenAPI additions as **not planned** unless the KV approach is abandoned. There is no server-side schema/validation; all sort/group/filter is client-side.

### 9.2 Still open (not done this session)

- **Auto-fav card edit is still dblclick** (single-tap selects, for CONFIRM). Kept the dual interaction; a per-card pencil affordance would be clearer but is low value.
- **Gaps D (host integration) and E (`dev/` vs plugin)** — untouched; both need the product/host decisions noted in §8.2 and §6 Q4.

### 9.3 Implemented (2026-07-09, session 2) — recipe bean/profile assignment now works

Closed the last unblocked engineering gap from §9.2: the `recipe-edit` "See All" pickers now round-trip a real selection back into the recipe form. Before this, recipe bean/profile assignment was **entirely non-functional** — `selectedBeanId`/`selectedProfileId` were declared but never set (the 5 "Assign Bean/Profile" chips are hardcoded Figma placeholders, e.g. "Bean name 1"), so every saved recipe stored `beanId: null`, and "See All Beans" navigated to `/roasters` losing all form state.

| Gap | Fix |
|---|---|
| Pickers always wrote the active workflow, never returned a pick to a caller | **`?return=<route>` convention** (the §8.4 return-target idea, adopted for these callers). `bean-picker.ts` / `profile-picker.ts`: when `?return=` is present, CONFIRM skips the workflow PUT / `/roasters` detour and navigates to the route, leaving the pick in the existing `dye_selected*` sessionStorage keys. |
| Full-page nav to the picker lost the recipe form's unsaved edits | `recipe-edit.ts` `goToPicker()` stashes `{ idx, recipes }` to `dye_recipeDraft` before navigating; `initRecipeEdit` restores it on return. |
| Picked bean/profile never landed on the recipe | init consumes `dye_selectedBeanId`/`dye_selectedProfileId` **gated on the draft** (so stray picker keys from dashboard/edit-shot flows are never wrongly adopted), writes `beanId/beanName` + `profileId/profileTitle` onto the current slot, and `getCurrentRecipeData()` now persists all four to KV on SAVE. |
| Assignment was invisible (mock chips only) | `reflectAssigned()` shows the real pick as a dedicated active chip and hides the placeholders; reversible, so each recipe tab shows its own assignment. |

Verified: `npm run build` clean (19 modules); Node self-check of the draft-restore + pick-consume reducer (right slot, edits preserved, stray-key rejection, profile-only path). No bridge available in this environment for full E2E.

**Still deferred** (unchanged): "See All" from dashboard/edit-shot still writes the active workflow (correct there); the return convention is only wired for the recipe-edit callers. Auto-fav dblclick, and gaps D/E, remain as noted in §9.2.
