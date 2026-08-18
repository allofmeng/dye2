# DYE2

DYE2 (Describe Your Espresso) is a plugin for Decaid (formerly ReaPrime/Streamline), the tablet software for Decent Espresso machines. It manages coffee beans, roast batches, grinders, and equipment, and adds a shot dashboard, auto-favorites, and recipe editing on top of the stock DYE workflow.

This repo is the source of truth for DYE2 — [allofmeng/dye2](https://github.com/allofmeng/dye2). Decaid's own repo pulls a pinned release of it as a build asset (see "Reference Implementation: DYE2 Plugin" in Decaid's `doc/Plugins.md`).

## For users

Grab a release archive (`dye2.reaplugin-vX.Y.Z.zip`) from the [Releases](../../releases) page and install it through Decaid's plugin settings UI, or drop the unzipped `dye2.reaplugin/` folder into Decaid's `plugins/` directory and enable it.

Decaid embeds a pinned DYE2 release automatically via `scripts/fetch_dye2_plugin.sh`, so most users won't need to install this manually — it only matters if you want a newer/older version than what's currently pinned.

## User manual

New to DYE2? Read this section. It covers what the plugin does, every screen it adds, and
the handful of gestures that aren't obvious.

### What DYE2 is for

Decaid records your shots and stores your beans and grinders, but gives you no screen to
manage them. DYE2 is that screen. It lets you:

- **Review the shot you just pulled** — graph, dose, yield, beans, grinder, rating, notes.
- **Plan the next shot** — dose, yield, grind, RPM, beans, profile, barista, drinker.
- **Keep a bean library** — roaster, origin, roast date, batch weight, price, notes.
- **Keep a grinder library** — burrs, setting type, step sizes, RPM steps.
- **Save recipes and favourites** — one tap re-applies a whole set of shot settings.
- **Send shots to Visualizer** — if the Visualizer plugin is installed and logged in.

Everything DYE2 shows is stored by Decaid itself, so any other Decaid screen sees the same
data. DYE2 keeps no private copy of your shots or beans.

### Getting in

Install the plugin (see "For users" above) and enable it, then open the DYE2 **Dashboard**.
That dashboard is the entry point — every other DYE2 screen is reached from it. Its direct
address, if you ever need it, is `/api/v1/plugins/dye2.reaplugin/dashboard`.

The pages are drawn for a tablet in landscape and scale to fit whatever screen they land
on, so a laptop browser pointed at the same address works fine for a look around.

### The dashboard

The dashboard is split down the middle. The **left half is the shot you already pulled**;
the **right half is the shot you're about to pull**.

#### Left — Last Shot

| What you see | What it does |
| --- | --- |
| `Last Shot: Today` + date | Which shot you're looking at. Says "Today", "Yesterday", or "N days ago". |
| The graph | Pressure, flow, temperature and weight for that shot. Dotted lines are the targets the profile asked for. Temperature is drawn at one tenth scale so it fits the same axis. |
| `‹` and `›` | Step back and forward through your last 50 shots. They wrap around, so you can't get stuck at either end. |
| `All Shots` / `Same Beans` | Tap to switch. `Same Beans` narrows the list to shots pulled with the same coffee as the one on screen. The button shows the mode you're *in*, not the one you'd switch to. |
| Profile, dose/yield, beans, grinder, barista, drinker | Read-only summary of that shot. |
| The five stars | Tap a star to rate the shot. It saves straight away — no confirm step. |
| `Read Note` | Shows the tasting note attached to that shot. Dimmed when the shot has no note. |
| `Edit Shot` | Opens the shot editor (below). |
| The `⌃` beside `Edit Shot` | `Export Shot`, `View Text Profile`, `Delete Shot`. Delete asks first and can't be undone. |
| `DYE Settings ⌃` | `Favourites` and `Recipes` — the two editors described further down. |
| `Visualizer ⌃` | `Upload to Visualizer` sends the shot on screen. `Visualizer Settings` opens the login box. The tick on the button turns green once you're logged in. |

#### Right — Next Shot Planning

Everything on this side writes into Decaid's live workflow, which is what the machine uses
for your next shot. Changes save as you make them.

| What you see | What it does |
| --- | --- |
| Recipe pills | Your saved recipes. Tap one to load its dose, yield, grind, RPM, profile, barista and drinker into the next shot. `‹ ›` scroll the strip. Says "No recipes yet" until you save one. |
| Profile name | Tap it to open the profile picker. |
| `Dose` / `Drink` | Grams in and grams out, with the brew ratio under the drink weight. Use `−` / `+`, or tap the number itself and type a value. |
| Grinder names | A strip of your grinders. Tapping one highlights it so you can see which grinder the numbers belong to. The highlight itself isn't saved — the `Grind` and `RPM` values are. |
| `Grind` / `RPM` | Grind setting (steps of 0.1) and grinder RPM (steps of 1). |
| `Beans` card | Shows the coffee, its roaster, and how many days it is off-roast. Tap it to open the bean picker. |
| `Barista` / `Drinker` | Tap either to type a name. Names you've used before drop down; tap one, or keep typing and press Enter. |
| `Add Note` | Attaches a note to the *next* shot. Once that shot is pulled, `Read Note` on the left shows it. |
| History icon (top right) | One-step undo for this panel. Tap to go back to the values before your last change; tap again to bring them back. Dimmed until you change something. |
| Clipboard icon (top right) | Copies every setting from the shot showing on the left into the next-shot panel. Quickest way to repeat a shot you liked. |
| `Clear` | Empties the next-shot panel. |
| `CANCEL` / `DONE` | Both leave the dashboard. `DONE` saves the panel first. |

### Adding beans

Open the bean picker from the `Beans` card, then:

1. Pick a coffee from the cards, or tap **ADD NEW BEANS** to create one.
2. Tap **SELECT ROASTER**, choose the roaster, and confirm. The coffee, its roaster, its
   roast date and its batch are written into the next shot.

Use the search box and the sort buttons (`Recent`, `Oldest`, `A-Z`, `Z-A`, `Most Used`,
`Least Used`) when the list gets long. The small pencil on a bean card opens that bean for
editing instead of selecting it.

The bean form is one long page, grouped into sections:

- **Top** — bean name, roaster, roast date. Name and roaster both suggest what you already have.
- **Origin** — species, processing, country, region, producer, variety, altitude range, and
  decaf (turning decaf on reveals a decaf-process field).
- **Roast & Batch Details** — roast level, harvest date, quality score, frozen.
- **Purchase & Storage** — price and currency, total and remaining weight, and buy, open,
  best-before, freeze and unfreeze dates.
- **Notes** — bean notes (about the coffee) and batch notes (about this bag).

`CONFIRM` saves, `CANCEL` throws the form away.

### Adding grinders

The grinder screens work like the bean screens: cards, a search box, the same sort buttons,
and an **ADD NEW GRINDER +** card. A grinder records model (required), burr set, burr type
(flat or conical), burr size, setting type (numeric or preset), the small and big step sizes
for the setting, the same two step sizes for RPM, and free-text notes. Those step sizes are
what the `Grind` and `RPM` buttons on the dashboard move by.

### Editing a shot

`Edit Shot` opens a fuller editor for the shot on screen. On the left: dose, drink, TDS and
extraction yield, plus the bean card. On the right: grinder, grind setting, RPM, barista,
drinker, drinker notes and the star rating.

Along the bottom:

- `Delete Shot` — removes it, after a confirmation.
- `Clear all` — empties the form.
- `Read From ⌃` — fills the form from `Current Workflow` or from the `Previous Shot`, so you
  only correct what differs.
- `CANCEL` / `SAVE SHOT DATA`.

`‹ ›` in the header move to another shot without leaving the editor.

### Recipes

`DYE Settings → Recipes` opens **Edit Recipes**. There are five recipe slots, one per tab
across the top.

- **Left column** — recipe name, the bean it's for, the profile it uses, beverage type,
  barista and drinker.
- **Right column, "Dashboard Variables"** — dose, drink, brew temperature, steam (as flow
  *or* time), flush, hot water (as temperature *or* volume), grind and RPM.
- Under most of those numbers sits a strip of four preset chips. Tap a chip to jump to that
  value. **Press and hold a chip for half a second to overwrite it with whatever the number
  currently reads** — that's how you make the presets your own.

At the bottom: `Clear all`, `Read From ⌃` (`Current Workflow` or `From Favourite`),
`Show on Streamline Dashboard` (a toggle — off hides this recipe from the dashboard pills),
`CANCEL` and `SAVE RECIPE`.

### Favourites

`DYE Settings → Favourites` lists your saved favourites as cards, grouped by beans, recipe,
profile or grinder depending on the tab you pick, and sorted by the usual six sort buttons.

- **Tap** a card to select it, then `CONFIRM` — the favourite is applied to the next shot.
- **Press and hold** a card for half a second to edit it instead.
- **ADD NEW FAVOURITE** creates one.

In the favourite editor you set a title, a beverage, whether it always shows on the
dashboard, and a favourite number from 1 to 5. The right-hand side, **Data to Copy**, is the
interesting part: each row is a field (profile, beans, roast date, grinder, grind setting,
dose, drink, barista, drinker, note) with a switch. Only switched-on fields are copied when
you apply the favourite, so a favourite can carry a grind setting without dragging a bean
along with it. Profile, beans, grinder, grind setting, dose and drink start on.

### Visualizer

DYE2 doesn't talk to visualizer.coffee itself — it drives Decaid's separate Visualizer
plugin, which must be installed for these controls to do anything.

Open `Visualizer → Visualizer Settings`, enter your visualizer.coffee username and password,
and save. DYE2 checks the credentials before storing them and tells you if they're wrong.
You can also turn on auto-upload and set a minimum shot length in seconds, below which shots
aren't uploaded — useful for skipping flushes. Once logged in, the same box shows who you're
logged in as and offers `Log Out`, and `Upload to Visualizer` sends whichever shot is showing
on the left of the dashboard.

### Gestures and habits worth knowing

- **Long press means edit.** Half a second on a favourite card opens it for editing; half a
  second on a preset chip in the recipe editor rewrites that chip.
- **Tap a number to type it.** Dose, drink, grind and RPM all accept a typed value — tap the
  number, type, press Enter (Escape cancels). Faster than holding `+` when you're far off.
- **The next-shot panel saves as you go.** `DONE` is a save-and-leave, not the only save.
- **The history icon is a one-step undo**, and it toggles — press it twice and you're back
  where you started.
- **The clipboard icon repeats a shot.** Find the shot you liked with `‹ ›`, then tap the
  clipboard.
- **Shot navigation wraps around**, so tapping `‹` repeatedly cycles the whole list.
- **The dashboard holds your last 50 shots**; the pickers show your whole bean and grinder
  library.

### Not wired up yet

These controls are drawn but don't do anything yet, so you aren't doing it wrong:

- The magnifier on the dashboard and in the shot editor.
- `Export Shot` in the `Edit Shot` menu.
- `View Text Profile` in the same menu (shown greyed out on purpose).

## For plugin developers

This repo doubles as a worked example of a Decaid plugin. If you're building your own, start with Decaid's `doc/Plugins.md` for the general plugin contract (manifest shape, `host` API, HTTP request handler, lifecycle, sandboxing rules) — this README only covers what's specific to DYE2.

### Repo layout

```
dye2/
├── dye2-plugin/          # TypeScript plugin (has a build step)
│   ├── src/
│   │   ├── plugin.ts     # Entry point — implements PluginInstance
│   │   ├── host.d.ts     # flutter_js host API types
│   │   ├── pages/        # Page-level orchestrators (beans, grinders, pickers, dashboard...)
│   │   ├── components/   # Web Components exported as JS strings
│   │   ├── api/          # Browser-side REST client (client.ts)
│   │   └── utils/        # html`` template, escaping, chart, date picker, etc.
│   ├── dev-server.mjs    # Dev server: serves plugin pages, proxies /api/v1/* to bridge
│   ├── manifest.json     # Plugin metadata and permissions
│   └── vite.config.ts    # Builds to IIFE → ../dye2.reaplugin/plugin.js
│
├── dev/                  # Plain JS/HTML for REA's native DYE workflow pages (no build step)
│   ├── dye/              # HTML pages loaded by REA's webview router
│   ├── dye.js             # Bean/roaster picker logic + add-bean form
│   └── dyeDashboard.js    # Dashboard (shot history, grinder selection, workflow)
│
├── dye2.reaplugin/        # Build output (generated — do not edit directly)
└── rea_restapi.yml        # OpenAPI spec for the Decaid REST API
```

Two runtimes live side by side here:

- **Plugin runtime (`dye2-plugin/`, flutter_js):** runs on-device inside `flutter_js`, no DOM. Implements `PluginInstance` and answers `__httpRequestHandler` calls, acting as a server-side HTML renderer. Has `host.log` / `host.emit` / `host.storage`, nothing else.
- **Browser runtime (`dye2-plugin/src/components/`, and everything in `dev/`):** plain JS that runs in the tablet's WebView. Talks to Decaid over `fetch("/api/v1/...")` and wires itself up with `CustomEvent`.

`dev/` predates the TypeScript rewrite and is still what REA's native DYE workflow pages load directly — no build step, edit and reload.

### Building and running

```bash
cd dye2-plugin
npm install
npm run build    # one-shot build → dye2.reaplugin/plugin.js
npm run dev      # watch mode (run alongside serve)
npm run serve    # dev server at http://localhost:4444, proxies /api/v1/* to BRIDGE_URL
```

Run `npm run dev` and `npm run serve` in separate terminals; the dev server reloads when `plugin.js` changes on disk. Override the defaults with env vars: `PORT=4000 BRIDGE_URL=http://192.168.1.5:8080 npm run serve`.

`dev/` needs no install — open its HTML pages through the dev server or a browser pointed at a running bridge.

### Key patterns

- **Components as string exports** — each `src/components/*.ts` exports `const fooComponent = \`...\`\`, a string containing a Web Component class + `customElements.define(...)`. These are inlined as `<script>` tags by `pageShell()`, never executed by the plugin itself. Don't import browser APIs into plugin-runtime code.
- **Page assembly** — pages in `src/pages/` call `pageShell(title, content, [scripts])`; the scripts array holds component strings plus orchestration scripts.
- **Event flow** — components dispatch `CustomEvent({ bubbles: true })`; page-level scripts attach document-level listeners to show/hide siblings and trigger re-fetches.
- **HTML safety** — the `html` tagged template (`src/utils/html.ts`) does **not** escape values; wrap user-provided data in `escapeHtml()` yourself.
- **API base** — browser-side code hits `/api/v1/*` directly; the dev server proxies it to the bridge, REA handles routing in production.

See `rea_restapi.yml` for the full Decaid OpenAPI spec (beans, batches, grinders, workflow).

### Releasing

Version is driven entirely by the git tag — push a `vX.Y.Z` tag and the release workflow (`.github/workflows/release.yml`) syncs `manifest.json` and `package.json` to match, builds, validates the output, and publishes `dye2.reaplugin-vX.Y.Z.zip` to Releases. Don't hand-bump the version in `manifest.json`.
