/**
 * Serves Plotly from the plugin itself instead of cdn.plot.ly — the tablet is offline, so
 * a CDN <script> leaves the dashboard chart permanently blank.
 *
 * REA has no static-asset endpoint for plugins (see rea_restapi.yml), so the only way to
 * hand the WebView a .js file is an `http` route of our own, which means the bytes ride
 * along inside plugin.js. That is why this is the `basic` build (~1 MB, not 4.5 MB): every
 * trace in chart.ts is `type: 'scatter', mode: 'lines'`, which basic covers in full.
 *
 * Bumping the version means replacing src/vendor/plotly-basic.min.js — keep it a `basic`
 * build unless chart.ts starts using 3D/geo/finance traces.
 */
import plotlySource from "../vendor/plotly-basic.min.js?raw";

export function renderPlotlyAsset(request: HttpRequest): HttpResponse {
  return {
    requestId: request.requestId,
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      // Pinned to a version-specific file, so the WebView may keep it forever rather
      // than re-fetching a megabyte on every dashboard open.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
    body: plotlySource,
  };
}
