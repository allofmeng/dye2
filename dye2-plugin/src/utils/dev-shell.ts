import { html } from "./html";
// Tailwind compiled at build time (scanned from src/**/*.ts) and inlined below,
// so pages style themselves with no network — the offline tablet has no CDN.
// Regenerate via `npm run build:css` (runs automatically as part of `npm run build`).
import tailwindCss from "../styles/tailwind.generated.css?inline";

interface DevShellOptions {
  plotly?: boolean;
}

// Pages are authored at a fixed 1920x1200 design reference (the Figma canvas at 75%,
// 16:10 like the tablet). Ported from streamline_project/src/modules/scaling.js:
// scale x and y independently instead of a uniform min(w,h) zoom, so a non-16:10
// screen (e.g. an 8" tablet at 1340x800) fills edge-to-edge instead of leaving thick
// letterbox gutters. The stretch ratio is clamped at 1.15 so round controls don't
// become visible ellipses on far-off aspects; 16:10 screens are unaffected either way.
// Transform (not zoom) is applied to <body> itself — a transformed element becomes the
// containing block for its position:fixed descendants, so modal overlays (which are
// siblings of the page's root div, both direct children of body) scale correctly too.
const fitScript = `
(function () {
  var DESIGN_W = 1920, DESIGN_H = 1200;
  var MAX_STRETCH = 1.15;
  function fit() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var sx = vw / DESIGN_W, sy = vh / DESIGN_H;
    var stretch = Math.max(sx, sy) / Math.min(sx, sy);
    if (stretch > MAX_STRETCH) {
      var k = MAX_STRETCH / stretch;
      if (sx > sy) { sx *= k; } else { sy *= k; }
    }
    var offsetX = (vw - DESIGN_W * sx) / 2;
    var offsetY = (vh - DESIGN_H * sy) / 2;
    document.body.style.width = DESIGN_W + 'px';
    document.body.style.height = DESIGN_H + 'px';
    document.body.style.transformOrigin = 'top left';
    document.body.style.transform =
      'translate(' + offsetX + 'px, ' + offsetY + 'px) scale(' + sx + ', ' + sy + ')';
    // body is no longer a flex container, so its root child (a plain block div) won't
    // auto-fill body's height on its own the way it auto-fills width — pin it explicitly.
    var root = document.body.firstElementChild;
    if (root) { root.style.width = '100%'; root.style.height = '100%'; }
  }
  fit();

  // Android's soft keyboard shrinks the viewport height (interactive-widget only lands
  // on newer WebViews, so we can't rely on it). Refitting then recomputes sy against a
  // keyboard-sized height and visibly squashes the page mid-edit, so hold the last fit
  // while a field has focus and re-fit once it blurs. Width changes (rotation) still
  // apply immediately — the keyboard never changes width.
  function isEditing() {
    var a = document.activeElement;
    if (!a) return false;
    var t = a.tagName;
    return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || a.isContentEditable;
  }
  var lastW = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth === lastW && isEditing()) return;
    lastW = window.innerWidth;
    fit();
  });
  // Blur fires before the keyboard finishes animating away; refit after it settles.
  window.addEventListener('focusout', function () { setTimeout(fit, 250); });
})();
`;

/** CSS variable fallbacks for dev server (REA host injects real values in production) */
function cssVarFallbacks(): string {
  return `
    :root {
      --bgmain-color: #f5f7fa;
      --mimoja-blue: #385a92;
      --profile-button-outline-color: #e2e8f0;
      --box-color: #ffffff;
      --text-primary: #1e293b;
      --text-primary-disabled: #94a3b8;
      --low-contrast-white: #94a3b8;
      --fav-button-wait: #e2e8f0;
      --profile-button-background-color: #f8fafc;
      /* DYE2 redesign extras */
      --dye-chart-red:   #C0392B;
      --dye-chart-blue:  #2F6BD1;
      --dye-chart-green: #2E8B57;
      --dye-chart-pink:  #E89AB0;
      --dye-surface:     #F8FAFC;
      --dye-border:      #E5E9EE;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    /* Pages are authored at the fixed 1920x1200 design reference and fit into the
       viewport by the fit script, which scales+positions <body> directly (see
       fitScript) — the page never scrolls. Any leftover space on a non-16:10 screen
       becomes an even letterbox margin filled by this background, so it reads as
       intentional page chrome rather than empty space. */
    html {
      width: 100%; height: 100%;
      background: var(--bgmain-color);
    }
    /* width/height/transform set by the fit script (design px + computed scale). */
    body {
      overflow: hidden;
      background: var(--bgmain-color);
    }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    /* No border:none here — Tailwind preflight already zeroes border-width by
       default, and this used to win on specificity over button.border-2 etc.,
       silencing every bordered button (Add Note, Clear, Settings, Visualizer). */
    button { font-family: inherit; cursor: pointer; background: none; }
    input, textarea, select { font-family: inherit; }
    .no-select { user-select: none; -webkit-user-select: none; }
  `;
}

/**
 * Page shell for dev-style pages (Tailwind + REA CSS variables).
 * Use this instead of pageShell() for pages ported from dev/.
 */
export function devPageShell(
  title: string,
  content: string,
  styles: string = "",
  scripts: string[] = [],
  opts: DevShellOptions = {}
): string {
  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <!-- interactive-widget=overlays-content: on-screen keyboard overlays the page instead of resizing/shrinking it -->
  <meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=overlays-content" />
  <title>DYE2 - ${title}</title>
  ${/* Served by our own "plotly" route, never a CDN — the tablet is offline. Deliberately
        page-relative so it resolves under both runtimes: /api/v1/plugins/dye2.reaplugin/
        dashboard -> .../plotly on the tablet, and /dashboard -> /plotly on the dev server. */
    opts.plotly ? '<script src="plotly" charset="utf-8"></script>' : ""}
  <style>${tailwindCss}</style>
  <style>${cssVarFallbacks()}${styles}</style>
</head>
<body>
  ${content}
  <script>${fitScript}</script>
  ${scripts.map((s) => `<script>${s}</script>`).join("\n")}
</body>
</html>`;
}
