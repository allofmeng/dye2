import { html } from "./html";
// Tailwind compiled at build time (scanned from src/**/*.ts) and inlined below,
// so pages style themselves with no network — the offline tablet has no CDN.
// Regenerate via `npm run build:css` (runs automatically as part of `npm run build`).
import tailwindCss from "../styles/tailwind.generated.css?inline";

interface DevShellOptions {
  plotly?: boolean;
}

// Pages are authored at a fixed 1920x1200 design reference (the Figma canvas at 75%,
// 16:10 like the tablet). A uniform "contain" zoom scales the whole 1920x1200 canvas
// to fit inside the viewport — using whichever axis is tighter — so proportions stay
// exact AND the page never scrolls vertically. On a screen whose aspect differs from
// 16:10 (e.g. a 16:9 monitor) the extra space becomes a thin letterbox margin around
// the centred canvas, filled by the body background. On the real 16:10 tablet the fit
// is exact with no letterbox. Zoom is on <html> so fixed-position modals scale too.
// Roots must NOT carry w-screen/h-screen — this script owns their size.
const fitScript = `
(function () {
  var DESIGN_W = 1920, DESIGN_H = 1200;
  function fit() {
    var z = Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H);
    document.documentElement.style.zoom = z;
    // Under zoom, CSS space is viewport/z. Size the (flex-centring) body to that in
    // design px so the extra axis becomes an even letterbox around the fixed canvas;
    // vw/vh can't express this once zoom is applied, so the script sets it explicitly.
    document.body.style.width  = (window.innerWidth  / z) + 'px';
    document.body.style.height = (window.innerHeight / z) + 'px';
    var root = document.body.firstElementChild;
    if (root) {
      root.style.width = DESIGN_W + 'px';
      root.style.height = DESIGN_H + 'px';
      // Pin the canvas so the centring flex body can't stretch it — some page roots
      // carry a flex-grow class that would otherwise fill the width and defeat the
      // fixed-proportion contain-fit. Keeps every page's letterbox identical.
      root.style.flex = '0 0 auto';
    }
  }
  fit();
  window.addEventListener('resize', fit);
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
    html { width: 100%; height: 100%; }
    /* Pages are authored at the fixed 1920x1200 design reference and contain-fit into
       the viewport by the fit script — the body never scrolls. Flex centres the design
       canvas so any leftover space on a non-16:10 screen becomes an even letterbox
       margin (in the --bgmain-color, so it reads as intentional page chrome). */
    /* width/height set by the fit script (design px); flex centres the canvas. */
    body {
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      background: var(--bgmain-color);
    }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    button { font-family: inherit; cursor: pointer; background: none; border: none; }
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
  ${opts.plotly ? '<script src="https://cdn.plot.ly/plotly-3.4.0.min.js" charset="utf-8"></script>' : ""}
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
