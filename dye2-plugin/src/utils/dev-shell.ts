import { html } from "./html";
// Tailwind compiled at build time (scanned from src/**/*.ts) and inlined below,
// so pages style themselves with no network — the offline tablet has no CDN.
// Regenerate via `npm run build:css` (runs automatically as part of `npm run build`).
import tailwindCss from "../styles/tailwind.generated.css?inline";

interface DevShellOptions {
  plotly?: boolean;
}

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
    /* Pages are built at the tablet's fixed 1280x800. On the real tablet nothing
       overflows. On smaller windows (e.g. a Mac browser) let the page scroll
       instead of clipping unreachable content. */
    body { width: 100%; min-height: 100%; overflow-x: hidden; overflow-y: auto; }
    /* When the viewport is shorter/narrower than the design, release the fixed
       100vh/100vw root so it grows to its content and the body scrolls.
       Media queries keep the real tablet (>=1280x800) byte-for-byte unchanged. */
    @media (max-height: 799px) {
      body > div[class*="h-screen"] { height: auto !important; min-height: 100vh; }
    }
    @media (max-width: 1279px) {
      body > div[class*="w-screen"] { width: auto !important; min-width: 100vw; }
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
  ${scripts.map((s) => `<script>${s}</script>`).join("\n")}
</body>
</html>`;
}
