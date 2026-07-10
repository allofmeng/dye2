# Figma Integration Rules — DYE2

Rules for using Figma MCP to design-to-code / code-to-design in this repo. Read this before any `use_figma`, `get_design_context`, or asset import.

## TL;DR for Figma work

- **No React/Vue/JSX.** UI ships as HTML strings + browser-native Web Components. Translate Figma frames into HTML strings + CSS, not components props.
- **Two token systems** depending on which page family you touch (see below). Bind Figma variables to whichever applies; never hardcode hex.
- **Two page shells** = two visual languages: a **dark** plugin theme and a **light** REA-native theme. Match the target file's shell.
- **Tailwind is available only in the light/dev shell**, via CDN, with arbitrary-value classes (`bg-[var(--mimoja-blue)]`, `rounded-[68px]`). The dark shell has no Tailwind — plain CSS classes only.
- Icons are **inline SVG** (Lucide path data) or **base64 PNG data-URIs**. No icon font, no `<img src>` to files, no sprite.

---

## 1. Token Definitions

Two separate token sets. Pick by page shell.

### A. Dark plugin theme — hardcoded in CSS, NOT variables
`dye2-plugin/src/pages/layout.ts` → `sharedStyles()`. Raw hex literals, no CSS custom properties:

| Role | Value |
|---|---|
| bg (page) | `#1a1a2e` |
| surface / card / input | `#16213e` |
| border | `#0f3460` |
| text primary | `#e0e0e0` / `#fff` |
| text muted | `#888` / `#ccc` |
| primary action | `#533483` (hover `#6a42a0`) |
| danger | `#6b2737` (hover `#8b3a4a`) |
| error text | `#ff6b6b` |

Spacing scale: `4 / 8 / 12 / 16 px`. Radius: `4px` (controls), `8px` (cards), `12px` (tags). Type: `1.4rem` h1, `1.1rem` h2, `0.9rem` body, `0.8rem`/`0.75rem` small.

> When a Figma design maps to the dark plugin pages, **add the matching hex inline** in `sharedStyles()`. There is no token transform — these are literals.

### B. Light REA-native theme — CSS custom properties
`dye2-plugin/src/utils/dev-shell.ts` → `cssVarFallbacks()`. The REA host injects real values in production; these are dev fallbacks. **Bind Figma variables to these names:**

```
--bgmain-color: #f5f7fa;      --box-color: #ffffff;
--mimoja-blue: #385a92;       /* brand / primary accent */
--text-primary: #1e293b;      --text-primary-disabled: #94a3b8;
--low-contrast-white: #94a3b8;
--profile-button-outline-color: #e2e8f0;
--profile-button-background-color: #f8fafc;
--fav-button-wait: #e2e8f0;
/* DYE2 redesign extras */
--dye-chart-red:#C0392B; --dye-chart-blue:#2F6BD1;
--dye-chart-green:#2E8B57; --dye-chart-pink:#E89AB0;
--dye-surface:#F8FAFC; --dye-border:#E5E9EE;
```

Font: `'Inter'` then system fallbacks. Sizes in this theme are large (touch tablet): labels `24px`, buttons `82px` tall etc.

**Rule:** new colors from Figma in the light theme → add a `--var` to `cssVarFallbacks()` and reference via `var(--name)` or Tailwind `[var(--name)]`. Don't inline raw hex.

---

## 2. Component Library

- **No framework components.** UI components are browser-native **Web Components** (`customElements.define`), authored as **template-literal string exports** in `dye2-plugin/src/components/*.ts`.
- Pattern: each file exports `export const fooComponent = \`class FooEl extends HTMLElement {...} customElements.define('dye2-foo', FooEl);\``. The string is inlined as a `<script>` by a page shell — it is **not** imported/executed in the plugin runtime.
- Naming: custom element tags are `dye2-*` (e.g. `dye2-bean-list`). Class names `Dye2*`.
- Reusable HTML/CSS snippet helpers (steppers, cards, toggles, segmented controls, star rating) live in `dye2-plugin/src/utils/shared-components.ts` as functions returning HTML strings.
- Components fetch their own data (`fetch('/api/v1/...')`) and communicate up via `dispatchEvent(new CustomEvent('name', { bubbles: true, detail }))`. Pages wire `document`-level listeners.
- **No Storybook / no component docs.** Source strings are the spec.

**Figma → component:** translate a Figma component into either (a) a new `dye2-*` Web Component string, or (b) a helper in `shared-components.ts`. Use existing class names (`.card`, `.dye-card`, `.dye-stepper-*`, `.tag`, `.dye-toggle-track`, etc.) before inventing new ones — search `shared-components.ts` and `sharedStyles()` first.

---

## 3. Frameworks & Libraries

- **UI framework:** none. Vanilla Web Components + DOM.
- **Styling:** dark shell = plain hand-written CSS in `sharedStyles()`. Light shell = **Tailwind via CDN** (`https://cdn.tailwindcss.com`) plus CSS custom properties. Tailwind here is runtime CDN — **arbitrary value classes are the norm** (`w-[240px]`, `text-[24px]`, `rounded-[68px]`, `bg-[var(--mimoja-blue)]`). No `tailwind.config`, no purge, no design-token plugin.
- **Build:** Vite, IIFE lib build (`vite.config.ts`), entry `src/plugin.ts` → `../../assets/plugins/dye2.reaplugin/plugin.js`, `minify: false`. `npm run build` / `dev` (watch) / `serve` (dev server :4444, proxies `/api/v1/*` to bridge).
- `dev/` folder = plain JS/HTML for REA's native pages, **no build step**.

> Do not introduce React, a CSS-in-JS lib, or a local Tailwind build to satisfy a Figma import. Match the existing string/Tailwind-CDN approach.

## 4. Asset Management

- No CDN for own assets, no image pipeline. Assets are **inlined**.
- Raster icons: base64 PNG **data-URIs** as `export const` strings in `dye2-plugin/src/utils/icons.ts` (sourced from `dev/dye/icons/lucide_*.png`).
- Third-party libs (Tailwind, Plotly) loaded from public CDNs in the light shell `<head>` only.
- **Importing assets from Figma:** prefer regenerating as inline SVG (see §5). If a raster is unavoidable, base64-encode it and add to `icons.ts` as a data-URI const — match existing naming (`iconHistory`, `iconArrowLeft`).

## 5. Icon System

- Primary system: **inline Lucide SVG** via `dye2-plugin/src/utils/lucide.ts`. Path data lives in the `PATHS` record keyed by Lucide name (`search`, `chevron-left`, `star`, `pencil`, `trash`, …). `lucideIcon(name, size=36, color='currentColor', strokeWidth=2, fill='none')` returns an `<svg>` string. `starIcon(filled)` is a helper.
- Secondary: legacy base64 PNG icons in `icons.ts`.
- **Naming convention:** kebab-case Lucide icon names. Unknown name falls back to a circle.
- **Figma → icon:** if the design uses a Lucide icon (it mostly does), add its path data to `PATHS` keyed by the exact Lucide name and call `lucideIcon('name')`. Default stroke color `currentColor`; brand accent uses `var(--mimoja-blue)`. Do not download icon PNGs from Figma when a Lucide equivalent exists.

## 6. Styling Approach

- **Methodology:** global utility/semantic CSS classes (no CSS Modules, no Styled Components). Dark shell defines a small utility set: `.card .flex .flex-between .grid .grid-2 .mt-8 .mt-16 .mb-8 .text-muted .text-small .hidden .icon-btn .tag` plus element selectors. Light shell adds `.dye-*` classes in `shared-components.ts` and uses Tailwind utilities.
- **Global styles:** injected per-page via the shell's `<style>` block (`sharedStyles()` or `cssVarFallbacks()` + page styles). No external stylesheet file.
- **HTML safety:** interpolated user data MUST be escaped — `escapeHtml()` from `src/utils/html.ts` (plugin side) or the per-component `_esc()` method (browser side). The `` html`` `` tagged template does **not** escape.
- **Responsive:** none in the traditional sense — fixed-size tablet WebView. Sizes are absolute px tuned to the device. Don't add breakpoints unless asked.

## 7. Project Structure

```
dye2-plugin/src/
  plugin.ts            # entry; PluginInstance + __httpRequestHandler (server-side HTML renderer)
  pages/*.ts           # page orchestrators → call pageShell()/devPageShell(); wire CustomEvent listeners
  components/*.ts       # browser Web Components, exported as template-literal STRINGS
  api/client.ts        # plugin-side REST client
  utils/
    html.ts            # html`` template + escapeHtml()
    icons.ts           # base64 PNG data-URI icons
    lucide.ts          # inline Lucide SVG (PATHS + lucideIcon())
    shared-components.ts # reusable .dye-* HTML/CSS snippet builders
    dev-shell.ts       # devPageShell() — light/Tailwind/CSS-var shell
    chart.ts, dev-api.ts
dev/                   # REA-native plain JS/HTML pages, no build
```

- Feature organization is by resource: beans, grinders, batches, roasters, workflow/recipe/shot.
- **Two runtimes** — keep them separate: plugin-runtime code (`plugin.ts`, `pages/`, `api/`, most `utils/`) runs in **flutter_js, no DOM**; component strings + inlined scripts run in the **WebView browser**. Never import browser APIs into plugin-runtime files, and never `import` a component string expecting it to execute server-side.

## Decision: which shell for a Figma design?

- Dark, compact, dense admin/list UI → `pageShell()` + `sharedStyles()` hex literals.
- Light, large-touch, brand-blue REA-native UI (the "DYE2 redesign") → `devPageShell()` + `--var` tokens + Tailwind arbitrary classes. **Default to this for new designs** unless the design is clearly dark.
- Confirm with the user if a Figma frame's theme doesn't obviously match either.

---

## 8. Redesign Screen & Navigation Map

Source: Figma `Streamline_Decent (Copy)`, page node **`2345:493`** ("DYE Redesign"). 15 screens, laid out as a flow board with connector lines. This section is the map of *how the screens link*, so page code (`pages/*.ts`) and route wiring in `plugin.ts` match the intended flow.

### 8.1 Screen inventory

| Screen | Figma node | Role | Code page |
|---|---|---|---|
| **DYE Dashboard v5** | `2345:495`, `2345:1227`, `2386:2312`, `2386:1419` | Hub. Two panes: *Last Shot* (review) ‖ *Next Shot Planning* (compose). Variants only differ by recipe-tab / open-menu state. | `pages/dashboard.ts` |
| **DYE_Edit Shot v4** | `2345:2021` | Edit a recorded shot's data (dose/drink/TDS/EY, beans, grinder, barista, rating). | `pages/edit-shot.ts` |
| **DYE_Select Coffee Beans** | `2345:2457`, `2345:2577` | Bean list picker (search + sort rail + 3-col cards). | `pages/bean-picker.ts` |
| **DYE_Add New Bean** | `2345:2721` | New-bean form (Beans, Roaster, Roast Date, Notes). | `pages/add-bean.ts` |
| **DYE_Select Roaster** | `2345:2216`, `2345:2337` | Roaster list picker (step 2 of bean→roaster wizard). | `pages/roasters.ts` |
| **DYE_View All Auto Favourites** | `2386:669` | Grid of saved auto-favourites; sort rail + group-by tabs. | `pages/auto-favs.ts` |
| **Edit DYE Auto Favourite** | `2386:1723` | Edit one favourite: title, slot, "data to copy" toggles. | `pages/auto-fav-edit.ts` |
| **Edit Recipes** | `2386:1873` | Define the 5 recipe presets shown as dashboard chips. | `pages/recipe-edit.ts` |
| **Fullscreen Visualizer** | `2386:824` (auto-fav tabs), `2386:1121` (recipe tabs) | REA-native profile-runner view with live curve + step readout. Two tab modes. | host-side / deferred |

### 8.2 Navigation flow

```
                        ┌───────────────────────────────────────────┐
                        │            DYE DASHBOARD (hub)             │
                        │   Last Shot  ‖  Next Shot Planning         │
                        └───────────────────────────────────────────┘
  LEFT pane (Last Shot: review)              RIGHT pane (Next Shot Planning: compose)
   • search           → shot search           • history icon  → recall a past shot
   • ‹ Same Beans ›   → cycle shots, same bean • clipboard     → paste last-shot values in
   • Edit Shot ▾      → EDIT SHOT              • recipe chips  → select recipe (defined in EDIT RECIPES)
   • DYE Settings ▾   → menu:                  • grinder chips → select grinder
   │     Auto Favourites → VIEW ALL AUTO FAV   • ± steppers    → Dose/Drink/Grind/RPM
   │     Recipes         → EDIT RECIPES        • Add Note
   • ✓ Visualizer ▾   → FULLSCREEN VISUALIZER  • Clear / CANCEL / DONE(→ PUT workflow, back to hub)

EDIT SHOT
   • Beans card ─────────────────► BEAN PICKER wizard
   • Grinder / Barista fields ───► respective pickers
   • Read From ▴ (auto-fav / prior shot) · Delete Shot · Clear all
   • CANCEL / SAVE SHOT DATA ────► back to hub

BEAN PICKER wizard  (modal chain; entered from dashboard bean slot, Edit Shot "Beans", Edit Recipes "See All Beans")
   SELECT BEANS (list) ──ADD NEW BEANS+──► ADD NEW BEAN (form) ──CONFIRM──► back to list
   SELECT BEANS ──SELECT ROASTER ▸──► SELECT ROASTER (list) ──ADD NEW ROASTER+ / pick──► SELECT ROASTER (selected) ──CONFIRM──► back
   CONFIRM ──► returns selection to the invoking screen

FULLSCREEN VISUALIZER   (tabs = on-dashboard auto-fav beans  OR  the 5 recipes)
   • VIEW ALL AUTO FAV ──► VIEW ALL AUTO FAVOURITES
   • DYE ──► back to DASHBOARD   • Settings   • Sleep

VIEW ALL AUTO FAVOURITES  (grid picker)
   • sort rail + group-by tabs: Beans / Recipe / Profile / Grinder
   • tap a card ──► EDIT AUTO FAVOURITE
   • CANCEL / CONFIRM ──► back

EDIT AUTO FAVOURITE
   • Favourite Title · Beverage · Always-on-dashboard (Yes/No) · Assign Fav # (1–5)
   • "Data to Copy": 10 toggles — Profile, Beans, Roast Date, Grinder, Grind Setting,
     Dose, Drink, Barista, Drinker, Note  (off = value greyed but still editable)
   • SAVE FAVOURITE ──► back to list

EDIT RECIPES   (5 tabs: Cappucino Recipe, Recipe 2–5)
   • Recipe Name · Assign Bean chips (+See All Beans → BEAN PICKER)
   • Assign Profile chips (+See All Profiles → profile picker)
   • Beverage · Barista · Drinker
   • Dashboard Variables: Dose/Drink/Brew°C/Steam/Flush/Hot-Water steppers + preset strips, grinder chips, Grind/RPM
   • ✓ Show on Streamline Dashboard  → governs whether this recipe appears as a dashboard chip
   • Clear all · Read From ▴ · CANCEL / SAVE RECIPE
```

### 8.3 Navigation rules that matter for code

- **Dashboard is the hub.** Every other screen is reached from it (directly, or via the `DYE Settings ▾` menu) and returns to it on CANCEL/DONE/SAVE. There is no deep back-stack; think modal-over-hub.
- **Pickers are reusable and context-agnostic.** `bean-picker`, `roasters`, `grinder-picker` are opened from several places (dashboard, edit-shot, edit-recipes) and must return the selection to whoever invoked them — not hard-navigate to a fixed screen.
- **Bean→Roaster is a 2-step wizard.** The Select Beans screen's primary CTA reads `SELECT ROASTER ▸` (not "confirm") when a new bean needs a roaster; roaster selection then returns to bean confirm.
- **Recipes and Auto Favourites are the two "config" branches** off `DYE Settings`. Recipes populate the Next-Shot recipe chips (`Show on Streamline Dashboard` gates each); Auto Favourites populate the fullscreen Visualizer tabs and the (deferred) Streamline chip strip.
- **Fullscreen Visualizer is REA-native**, not a plugin page — the `Visualizer ▾` action hands off to the host runner. `VIEW ALL AUTO FAV` is the one link back into plugin territory.
