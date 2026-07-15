var createPlugin = (function() {
	//#region src/utils/html.ts
	/**
	* Tagged template literal for HTML strings.
	* Provides a visual marker for syntax highlighting in editors.
	* Does NOT escape interpolated values — use escapeHtml() for user data.
	*/
	function html(strings, ...values) {
		return strings.reduce((result, str, i) => {
			const value = i < values.length ? String(values[i]) : "";
			return result + str + value;
		}, "");
	}
	//#endregion
	//#region src/styles/tailwind.generated.css?inline
	var tailwind_generated_default = "*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.19 | MIT License | https://tailwindcss.com*/*,:after,:before{box-sizing:border-box;border:0 solid #e5e7eb}:after,:before{--tw-content:\"\"}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.\\!container{width:100%!important}.container{width:100%}@media (min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.mb-8{margin-bottom:2rem}.mb-\\[14px\\]{margin-bottom:14px}.ml-auto{margin-left:auto}.mt-16{margin-top:4rem}.mt-8{margin-top:2rem}.mt-\\[4px\\]{margin-top:4px}.mt-\\[6px\\]{margin-top:6px}.mt-auto{margin-top:auto}.block{display:block}.inline{display:inline}.flex{display:flex}.\\!grid{display:grid!important}.grid{display:grid}.hidden{display:none}.h-\\[110px\\]{height:110px}.h-\\[120px\\]{height:120px}.h-\\[124px\\]{height:124px}.h-\\[134px\\]{height:134px}.h-\\[165px\\]{height:165px}.h-\\[2px\\]{height:2px}.h-\\[330px\\]{height:330px}.h-\\[40px\\]{height:40px}.h-\\[45px\\]{height:45px}.h-\\[54px\\]{height:54px}.h-\\[60px\\]{height:60px}.h-\\[62px\\]{height:62px}.h-\\[72px\\]{height:72px}.h-\\[76px\\]{height:76px}.h-\\[82px\\]{height:82px}.h-\\[90px\\]{height:90px}.h-full{height:100%}.max-h-\\[152px\\]{max-height:152px}.w-1\\/2{width:50%}.w-\\[1200px\\]{width:1200px}.w-\\[150px\\]{width:150px}.w-\\[180px\\]{width:180px}.w-\\[1px\\]{width:1px}.w-\\[240px\\]{width:240px}.w-\\[2px\\]{width:2px}.w-\\[300px\\]{width:300px}.w-\\[310px\\]{width:310px}.w-\\[60px\\]{width:60px}.w-\\[69px\\]{width:69px}.w-\\[720px\\]{width:720px}.w-\\[72px\\]{width:72px}.w-\\[75px\\]{width:75px}.w-\\[960px\\]{width:960px}.w-full{width:100%}.min-w-0{min-width:0}.flex-1{flex:1 1 0%}.flex-shrink{flex-shrink:1}.flex-shrink-0,.shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.resize{resize:both}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.flex-nowrap{flex-wrap:nowrap}.items-start{align-items:flex-start}.items-center{align-items:center}.items-baseline{align-items:baseline}.items-stretch{align-items:stretch}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0{gap:0}.gap-\\[10px\\]{gap:10px}.gap-\\[12px\\]{gap:12px}.gap-\\[14px\\]{gap:14px}.gap-\\[15px\\]{gap:15px}.gap-\\[16px\\]{gap:16px}.gap-\\[18px\\]{gap:18px}.gap-\\[20px\\]{gap:20px}.gap-\\[22px\\]{gap:22px}.gap-\\[24px\\]{gap:24px}.gap-\\[27px\\]{gap:27px}.gap-\\[28px\\]{gap:28px}.gap-\\[30px\\]{gap:30px}.gap-\\[40px\\]{gap:40px}.gap-\\[45px\\]{gap:45px}.gap-\\[48px\\]{gap:48px}.gap-\\[60px\\]{gap:60px}.gap-\\[68px\\]{gap:68px}.gap-\\[8px\\]{gap:8px}.gap-\\[90px\\]{gap:90px}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis}.truncate,.whitespace-nowrap{white-space:nowrap}.rounded-\\[12px\\]{border-radius:12px}.rounded-\\[15px\\]{border-radius:15px}.rounded-\\[23px\\]{border-radius:23px}.rounded-\\[68px\\]{border-radius:68px}.rounded-\\[9999px\\]{border-radius:9999px}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-\\[var\\(--mimoja-blue\\)\\]{border-color:var(--mimoja-blue)}.border-\\[var\\(--profile-button-outline-color\\)\\]{border-color:var(--profile-button-outline-color)}.bg-\\[\\#EDEDED\\]{--tw-bg-opacity:1;background-color:rgb(237 237 237/var(--tw-bg-opacity,1))}.bg-\\[var\\(--bgmain-color\\)\\]{background-color:var(--bgmain-color)}.bg-\\[var\\(--box-color\\)\\]{background-color:var(--box-color)}.bg-\\[var\\(--mimoja-blue\\)\\]{background-color:var(--mimoja-blue)}.bg-\\[var\\(--profile-button-outline-color\\)\\]{background-color:var(--profile-button-outline-color)}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity,1))}.px-\\[14px\\]{padding-left:14px;padding-right:14px}.px-\\[20px\\]{padding-left:20px;padding-right:20px}.px-\\[24px\\]{padding-left:24px;padding-right:24px}.px-\\[30px\\]{padding-left:30px;padding-right:30px}.px-\\[37px\\]{padding-left:37px;padding-right:37px}.px-\\[38px\\]{padding-left:38px;padding-right:38px}.px-\\[40px\\]{padding-left:40px;padding-right:40px}.px-\\[48px\\]{padding-left:48px;padding-right:48px}.py-\\[27px\\]{padding-top:27px;padding-bottom:27px}.py-\\[28px\\]{padding-top:28px;padding-bottom:28px}.py-\\[32px\\]{padding-top:32px;padding-bottom:32px}.py-\\[36px\\]{padding-top:36px;padding-bottom:36px}.pb-\\[24px\\]{padding-bottom:24px}.pb-\\[28px\\]{padding-bottom:28px}.pb-\\[8px\\]{padding-bottom:8px}.pl-\\[37px\\]{padding-left:37px}.pr-\\[20px\\]{padding-right:20px}.pr-\\[30px\\]{padding-right:30px}.pt-\\[20px\\]{padding-top:20px}.pt-\\[23px\\]{padding-top:23px}.pt-\\[28px\\]{padding-top:28px}.pt-\\[30px\\]{padding-top:30px}.pt-\\[32px\\]{padding-top:32px}.text-center{text-align:center}.font-\\[\\'Inter\\'\\2c sans-serif\\]{font-family:Inter,sans-serif}.text-\\[18px\\]{font-size:18px}.text-\\[21px\\]{font-size:21px}.text-\\[22px\\]{font-size:22px}.text-\\[24px\\]{font-size:24px}.text-\\[26px\\]{font-size:26px}.text-\\[30px\\]{font-size:30px}.text-\\[36px\\]{font-size:36px}.text-\\[38px\\]{font-size:38px}.font-bold{font-weight:700}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.leading-\\[1\\.2\\]{line-height:1.2}.text-\\[var\\(--mimoja-blue\\)\\]{color:var(--mimoja-blue)}.text-\\[var\\(--text-primary\\)\\]{color:var(--text-primary)}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity,1))}.underline{text-decoration-line:underline}.opacity-40{opacity:.4}.opacity-50{opacity:.5}.outline{outline-style:solid}.blur{--tw-blur:blur(8px)}.blur,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}";
	//#endregion
	//#region \0@oxc-project+runtime@0.124.0/helpers/taggedTemplateLiteral.js
	function _taggedTemplateLiteral(e, t) {
		return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
	}
	//#endregion
	//#region src/utils/dev-shell.ts
	var _templateObject;
	var fitScript = `
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
	function cssVarFallbacks() {
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
	function devPageShell(title, content, styles = "", scripts = [], opts = {}) {
		return html(_templateObject || (_templateObject = _taggedTemplateLiteral([
			"<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\" />\n  <!-- interactive-widget=overlays-content: on-screen keyboard overlays the page instead of resizing/shrinking it -->\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, interactive-widget=overlays-content\" />\n  <title>DYE2 - ",
			"</title>\n  ",
			"\n  <style>",
			"</style>\n  <style>",
			"",
			"</style>\n</head>\n<body>\n  ",
			"\n  <script>",
			"<\/script>\n  ",
			"\n</body>\n</html>"
		])), title, opts.plotly ? "<script src=\"https://cdn.plot.ly/plotly-3.4.0.min.js\" charset=\"utf-8\"><\/script>" : "", tailwind_generated_default, cssVarFallbacks(), styles, content, fitScript, scripts.map((s) => `<script>${s}<\/script>`).join("\n"));
	}
	//#endregion
	//#region src/utils/dev-api.ts
	/**
	* Browser-side API client for dev-style pages.
	* Exported as a string to be inlined as a <script> block in served HTML.
	* Covers all functions used by dye.js and dyeDashboard.js.
	*/
	var devApiScript = `
const API_BASE_URL = '/api/v1';

async function getBeans(includeArchived = false) {
  const params = includeArchived ? '?includeArchived=true' : '';
  const res = await fetch(API_BASE_URL + '/beans' + params);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function getBeanBatches(beanId) {
  const res = await fetch(API_BASE_URL + '/beans/' + beanId + '/batches');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function createBean(data) {
  const res = await fetch(API_BASE_URL + '/beans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function createBeanBatch(beanId, data) {
  const res = await fetch(API_BASE_URL + '/beans/' + beanId + '/batches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function getGrinders(includeArchived = false) {
  const params = includeArchived ? '?includeArchived=true' : '';
  const res = await fetch(API_BASE_URL + '/grinders' + params);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function getWorkflow() {
  const res = await fetch(API_BASE_URL + '/workflow');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function updateWorkflow(data) {
  const res = await fetch(API_BASE_URL + '/workflow', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function getShots(opts = {}) {
  const params = new URLSearchParams();
  if (opts.limit) params.set('limit', String(opts.limit));
  if (opts.order) params.set('order', opts.order);
  if (opts.grinderId) params.set('grinderId', opts.grinderId);
  if (opts.beanId) params.set('beanId', opts.beanId);
  if (opts.beanBatchId) params.set('beanBatchId', opts.beanBatchId);
  const query = params.toString() ? '?' + params.toString() : '';
  const res = await fetch(API_BASE_URL + '/shots' + query);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function getLatestShot() {
  const res = await fetch(API_BASE_URL + '/shots/latest');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function getShot(id) {
  const res = await fetch(API_BASE_URL + '/shots/' + id);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function deleteShot(id) {
  const res = await fetch(API_BASE_URL + '/shots/' + id, { method: 'DELETE' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
}

async function updateShot(id, data) {
  const res = await fetch(API_BASE_URL + '/shots/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

/* ── DYE2 plugin KV store: auto-favourites + recipes ──────────────────────────
   The bridge has no /recipes or /auto-favourites REST resource. DYE2 persists each
   collection as a JSON array under one key in the generic plugin KV store, which the
   Streamline dashboard also reads to render its P/F/R strip.
   ponytail: whole-array rewrite per mutation — fine for one tablet's dozens of items;
   move to key-per-item if it ever grows. */
const DYE_KV_NS = 'dye2.reaplugin';

async function kvGetArray(key) {
  const res = await fetch(API_BASE_URL + '/store/' + DYE_KV_NS + '/' + key);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const val = await res.json();
  return Array.isArray(val) ? val : [];
}

async function kvSetArray(key, arr) {
  const res = await fetch(API_BASE_URL + '/store/' + DYE_KV_NS + '/' + key, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arr),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
}

function kvUpsert(arr, item) {
  const i = arr.findIndex(x => x && x.id === item.id);
  if (i >= 0) arr[i] = { ...arr[i], ...item };
  else arr.push(item);
  return arr;
}

function newId(prefix) {
  return (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : prefix + '-' + Date.now();
}

/* ── Denormalised fields written for the Streamline dashboard (read-only consumer).
   Both builders return a ready-to-PUT WorkflowRequest body { context, profile? }.
   They mirror dashboard.ts applyAutoFavourite/applyRecipe, but build a fresh ctx
   and RETURN it instead of mutating currentWorkflow. Legacy fields are kept; these
   are additive and consumers MUST treat them as optional. See KV_CONTRACT.md. */
function buildFavouriteWorkflow(fav) {
  const snp = (fav && fav.snapshot) || {};
  const mask = (fav && fav.copyMask) || {};
  const on = k => mask[k] !== false;
  const ctx = {};
  const wf = { context: ctx };
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
  if (on('profile') && (snp.profileId || snp.profileTitle)) {
    wf.profile = { id: snp.profileId, title: snp.profileTitle };
  }
  return wf;
}

function buildRecipeWorkflow(recipe) {
  const dv = (recipe && recipe.dashboardVariables) || {};
  const ctx = {};
  const wf = { context: ctx };
  if (dv.dose != null)  ctx.targetDoseWeight = dv.dose;
  if (dv.drink != null) ctx.targetYield = dv.drink;
  else if (dv.ratio != null && dv.dose != null) ctx.targetYield = Math.round(dv.dose * dv.ratio * 10) / 10;
  if (dv.grind != null) ctx.grinderSetting = String(dv.grind);
  if (dv.rpm != null)   ctx.extras = { ...(ctx.extras || {}), rpm: dv.rpm };
  if (dv.grinderId) ctx.grinderId = dv.grinderId;
  if (recipe && recipe.beanName) ctx.coffeeName = recipe.beanName;
  if (recipe && recipe.barista) ctx.baristaName = recipe.barista;
  if (recipe && recipe.drinker) ctx.drinkerName = recipe.drinker;
  if (recipe && (recipe.profileId || recipe.profileTitle)) {
    wf.profile = { id: recipe.profileId, title: recipe.profileTitle };
  }
  return wf;
}

function favSubtitle(fav) {
  const snp = (fav && fav.snapshot) || {};
  return [snp.coffeeRoaster, snp.coffeeName].filter(Boolean).join(' · ') || (fav && fav.beverage) || '';
}

function recipeSubtitle(r) {
  return (r && r.beanName) || (r && r.beverage) || '';
}

// Recipes (R mode)
async function getRecipes() { return kvGetArray('recipes'); }

async function updateRecipe(id, data) {
  const arr = await kvGetArray('recipes');
  const item = { ...data, id, capturedAt: new Date().toISOString() };
  item.title = item.name || ('Recipe ' + id);
  item.subtitle = recipeSubtitle(item);
  item.workflow = buildRecipeWorkflow(item);
  kvUpsert(arr, item);
  await kvSetArray('recipes', arr);
  return item;
}

// Auto-favourites (F mode)
async function getAutoFavourites() { return kvGetArray('autoFavourites'); }

async function getAutoFavourite(id) {
  const arr = await kvGetArray('autoFavourites');
  return arr.find(x => x && x.id === id) || null;
}

async function createAutoFavourite(data) {
  const arr = await kvGetArray('autoFavourites');
  const fav = { ...data, id: newId('af'), capturedAt: new Date().toISOString() };
  fav.subtitle = favSubtitle(fav);
  fav.workflow = buildFavouriteWorkflow(fav);
  arr.push(fav);
  await kvSetArray('autoFavourites', arr);
  return fav;
}

async function updateAutoFavourite(id, data) {
  const arr = await kvGetArray('autoFavourites');
  const existing = arr.find(x => x && x.id === id);
  const item = { ...data, id, capturedAt: data.capturedAt ?? (existing && existing.capturedAt) ?? new Date().toISOString() };
  item.subtitle = favSubtitle(item);
  item.workflow = buildFavouriteWorkflow(item);
  kvUpsert(arr, item);
  await kvSetArray('autoFavourites', arr);
  return item;
}

async function getBeanBatch(batchId) {
  const res = await fetch(API_BASE_URL + '/bean-batches/' + batchId);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function getProfiles(opts = {}) {
  const params = new URLSearchParams();
  if (opts.visibility) params.set('visibility', opts.visibility);
  if (opts.includeHidden) params.set('includeHidden', 'true');
  const query = params.toString() ? '?' + params.toString() : '';
  const res = await fetch(API_BASE_URL + '/profiles' + query);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

/* ── Visualizer plugin helpers ────────────────────────────────────────────── */

async function getVisualizerSettings() {
  const res = await fetch('/api/v1/plugins/visualizer.reaplugin/settings');
  if (!res.ok) return null;
  return res.json();
}

async function verifyVisualizerCredentials(username, password) {
  const res = await fetch('/api/v1/plugins/visualizer.reaplugin/verifyCredentials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  return !!data.valid;
}

async function saveVisualizerSettings(username, password, autoUpload, minDuration) {
  const res = await fetch('/api/v1/plugins/visualizer.reaplugin/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Username: username, Password: password, AutoUpload: autoUpload, LengthThreshold: minDuration }),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function uploadShotToVisualizer(shotId) {
  const res = await fetch('/api/v1/plugins/visualizer.reaplugin/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shotId }),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}
`;
	//#endregion
	//#region src/pages/grinders.ts
	var styles$10 = `
  .dye-sort-btn {
    width: 100%;
    padding: 12px 0;
    border: 2px solid var(--mimoja-blue);
    border-radius: 9999px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 19px;
    text-align: center;
    color: var(--mimoja-blue);
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
  }
  .dye-sort-btn.dye-sort-active {
    background: var(--mimoja-blue);
    color: #fff;
    border-color: var(--mimoja-blue);
  }

  .dye-card {
    width: 100%;
    min-height: 80px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 14px 18px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    background: var(--box-color);
    border: 1px solid var(--profile-button-outline-color);
    color: var(--text-primary);
    transition: background 0.15s, color 0.15s;
    user-select: none;
    gap: 8px;
  }
  .dye-card:hover { opacity: 0.85; }
  .dye-card-add {
    border: 2px solid var(--mimoja-blue);
    color: var(--mimoja-blue);
    font-weight: 700;
    gap: 8px;
    background: var(--box-color);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 80px;
  }
  .dye-card-add svg { stroke: var(--mimoja-blue); }

  .dye-card-name  { font-size: 22px; font-weight: 600; line-height: 1.3; }
  .dye-card-sub   { font-size: 20px; font-weight: 400; opacity: 0.7; }
  .dye-card-date  { font-size: 19px; font-weight: 400; opacity: 0.6; margin-top: 4px; }

  .dye-search-wrap { position: relative; width: 100%; margin-bottom: 10px; }
  .dye-search-input {
    width: 100%; height: 54px; border-radius: 12px; border: none;
    background: #EDF0F4; padding: 0 46px 0 16px;
    font-family: 'Inter', sans-serif; font-size: 19px;
    color: var(--text-primary); outline: none;
  }
  .dye-search-input::placeholder { color: var(--text-primary-disabled); }
  .dye-search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; }

  #dye-cards-container::-webkit-scrollbar { width: 36px; }
  #dye-cards-container::-webkit-scrollbar-track { background: transparent; }
  #dye-cards-container::-webkit-scrollbar-thumb {
    background: var(--profile-button-outline-color);
    border-radius: 9999px;
    border: 12px solid transparent;
    background-clip: padding-box;
  }

  /* Add/edit modal */
  .dye-modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    display: none; align-items: center; justify-content: center; z-index: 50;
  }
  .dye-modal-backdrop.open { display: flex; }
  .dye-modal {
    background: var(--box-color); color: var(--text-primary);
    width: min(760px, 92vw); max-height: 90vh; overflow-y: auto;
    border-radius: 18px; padding: 32px 36px;
    font-family: 'Inter', sans-serif;
  }
  .dye-modal h2 { font-size: 28px; font-weight: 700; margin-bottom: 20px; }
  .dye-field { margin-bottom: 16px; }
  .dye-field label { display: block; font-size: 17px; font-weight: 600; color: var(--text-primary-disabled); margin-bottom: 6px; }
  .dye-field input, .dye-field select, .dye-field textarea {
    width: 100%; height: 50px; border-radius: 10px;
    border: 1px solid var(--profile-button-outline-color);
    background: #EDF0F4; padding: 0 14px; font-size: 19px;
    color: var(--text-primary); font-family: 'Inter', sans-serif; outline: none;
  }
  .dye-field textarea { height: auto; padding: 12px 14px; resize: vertical; }
  .dye-field-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .dye-modal-actions { display: flex; justify-content: flex-end; gap: 14px; margin-top: 24px; }
  .dye-btn {
    height: 56px; padding: 0 30px; border-radius: 9999px;
    font-weight: 700; font-size: 22px; cursor: pointer; border: none;
    font-family: 'Inter', sans-serif;
  }
  .dye-btn-primary { background: var(--mimoja-blue); color: #fff; }
  .dye-btn-ghost { background: transparent; color: var(--text-primary); }
  .dye-modal-error { color: #C0392B; font-size: 18px; margin-top: 12px; }
  .dye-hidden { display: none !important; }
`;
	var content$6 = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">

  <!-- Top bar -->
  <div class="flex justify-between items-center px-[38px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[134px] shrink-0">
    <h1 class="text-[36px] font-bold text-[var(--text-primary)]">Grinders</h1>
    <button id="dye-done-btn" class="flex items-center justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] bg-[var(--mimoja-blue)] text-white cursor-pointer">
      DONE
    </button>
  </div>

  <!-- Body: sort rail + grid -->
  <div class="flex flex-1 overflow-hidden">

    <!-- Sort rail -->
    <div id="dye-sort-sidebar" class="flex flex-col gap-[18px] items-stretch pt-[28px] px-[20px] shrink-0 w-[180px]">
      <div class="dye-search-wrap">
        <input id="dye-search-input" class="dye-search-input" type="text" placeholder="Search" />
        <svg class="dye-search-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary-disabled)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <button class="dye-sort-btn dye-sort-active" data-sort="recent">Recent</button>
      <button class="dye-sort-btn" data-sort="oldest">Oldest</button>
      <button class="dye-sort-btn" data-sort="az">A-Z</button>
      <button class="dye-sort-btn" data-sort="za">Z-A</button>
      <button class="dye-sort-btn" data-sort="most-used">Most Used</button>
      <button class="dye-sort-btn" data-sort="least-used">Least Used</button>
    </div>

    <!-- Card grid -->
    <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[28px] px-[38px] pb-[28px]">
      <div id="dye-cards-grid" class="grid grid-cols-3 gap-[20px]"></div>
    </div>

  </div>

  <!-- Add/edit modal -->
  <div id="dye-modal-backdrop" class="dye-modal-backdrop">
    <div class="dye-modal">
      <h2 id="dye-modal-title">New Grinder</h2>
      <form id="dye-grinder-form">
        <div class="dye-field">
          <label>Model *</label>
          <input name="model" required placeholder="Grinder model" />
        </div>
        <div class="dye-field dye-field-2">
          <div>
            <label>Burrs</label>
            <input name="burrs" placeholder="Burr set name" />
          </div>
          <div>
            <label>Burr Type</label>
            <select name="burrType">
              <option value="">-- Select --</option>
              <option value="flat">Flat</option>
              <option value="conical">Conical</option>
            </select>
          </div>
        </div>
        <div class="dye-field dye-field-2">
          <div>
            <label>Burr Size (mm)</label>
            <input name="burrSize" type="number" step="any" placeholder="e.g. 64" />
          </div>
          <div>
            <label>Setting Type</label>
            <select name="settingType">
              <option value="numeric">Numeric</option>
              <option value="preset">Preset</option>
            </select>
          </div>
        </div>
        <div id="dye-numeric-settings" class="dye-field dye-field-2">
          <div>
            <label>Setting Small Step</label>
            <input name="settingSmallStep" type="number" step="any" placeholder="e.g. 0.1" />
          </div>
          <div>
            <label>Setting Big Step</label>
            <input name="settingBigStep" type="number" step="any" placeholder="e.g. 1" />
          </div>
        </div>
        <div id="dye-preset-settings" class="dye-field dye-hidden">
          <label>Setting Values (comma-separated)</label>
          <input name="settingValues" placeholder="e.g. Fine, Medium, Coarse" />
        </div>
        <div class="dye-field dye-field-2">
          <div>
            <label>RPM Small Step</label>
            <input name="rpmSmallStep" type="number" step="any" placeholder="e.g. 10" />
          </div>
          <div>
            <label>RPM Big Step</label>
            <input name="rpmBigStep" type="number" step="any" placeholder="e.g. 100" />
          </div>
        </div>
        <div class="dye-field">
          <label>Notes</label>
          <textarea name="notes" rows="3" placeholder="Notes about this grinder..."></textarea>
        </div>
        <div id="dye-modal-error" class="dye-modal-error dye-hidden"></div>
        <div class="dye-modal-actions">
          <button type="button" id="dye-modal-cancel" class="dye-btn dye-btn-ghost">CANCEL</button>
          <button type="submit" id="dye-modal-save" class="dye-btn dye-btn-primary">SAVE</button>
        </div>
      </form>
    </div>
  </div>
</div>
`;
	var pageScript$10 = `
let grindersCache = [];
let searchQuery = '';
let editingId = null;
let currentSort = 'recent';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function grinderName(g) { return g.model || g.name || 'Unnamed'; }
function grinderSub(g) {
  const parts = [];
  if (g.burrs) parts.push(g.burrs);
  if (g.burrType) parts.push(g.burrType);
  if (g.burrSize) parts.push(g.burrSize + 'mm');
  return parts.join(' · ');
}
function grinderMeta(g) {
  const parts = [];
  if (g.settingType) parts.push(g.settingType);
  if (g.notes) parts.push(g.notes);
  return parts.join(' · ');
}

function matchesSearch(g) {
  if (!searchQuery) return true;
  return (grinderName(g) + ' ' + grinderSub(g) + ' ' + grinderMeta(g)).toLowerCase().includes(searchQuery);
}

function sortItems(items, sortKey) {
  const sorted = [...items];
  const name = (g) => grinderName(g).toLowerCase();
  switch (sortKey) {
    case 'recent':  sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    case 'oldest':  sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
    case 'az':      sorted.sort((a, b) => name(a).localeCompare(name(b))); break;
    case 'za':      sorted.sort((a, b) => name(b).localeCompare(name(a))); break;
    default:        sorted.sort((a, b) => name(a).localeCompare(name(b))); break;
  }
  return sorted;
}

function setupSortButtons(onSort) {
  const sidebar = document.getElementById('dye-sort-sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('.dye-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
      btn.classList.add('dye-sort-active');
      onSort(btn.dataset.sort);
    });
  });
}

function renderGrinderCards(grid) {
  grid.innerHTML = '';

  const addCard = document.createElement('div');
  addCard.className = 'dye-card dye-card-add';
  addCard.innerHTML = '<span>ADD NEW GRINDER +</span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  addCard.addEventListener('click', () => openModal(null));
  grid.appendChild(addCard);

  sortItems(grindersCache.filter(matchesSearch), currentSort).forEach(g => {
    const card = document.createElement('div');
    card.className = 'dye-card';
    const sub = grinderSub(g);
    const meta = grinderMeta(g);
    card.innerHTML =
      '<div class="dye-card-name">' + esc(grinderName(g)) + '</div>' +
      (sub ? '<div class="dye-card-sub">' + esc(sub) + '</div>' : '') +
      (meta ? '<div class="dye-card-date">' + esc(meta) + '</div>' : '');
    card.addEventListener('click', () => openModal(g));
    grid.appendChild(card);
  });
}

/* ── Modal ── */
function form() { return document.getElementById('dye-grinder-form'); }
function setField(name, val) { const el = form().elements[name]; if (el) el.value = val == null ? '' : val; }
function toggleSettingSections() {
  const isNumeric = form().elements['settingType'].value === 'numeric';
  document.getElementById('dye-numeric-settings').classList.toggle('dye-hidden', !isNumeric);
  document.getElementById('dye-preset-settings').classList.toggle('dye-hidden', isNumeric);
}

function openModal(g) {
  editingId = g ? g.id : null;
  document.getElementById('dye-modal-title').textContent = g ? 'Edit Grinder' : 'New Grinder';
  document.getElementById('dye-modal-error').classList.add('dye-hidden');
  form().reset();
  if (g) {
    ['model','burrs','burrType','burrSize','settingType','settingSmallStep','settingBigStep','rpmSmallStep','rpmBigStep','notes'].forEach(k => setField(k, g[k]));
    setField('settingValues', Array.isArray(g.settingValues) ? g.settingValues.join(', ') : (g.settingValues || ''));
    if (!g.settingType) setField('settingType', 'numeric');
  } else {
    setField('settingType', 'numeric');
  }
  toggleSettingSections();
  document.getElementById('dye-modal-backdrop').classList.add('open');
}

function closeModal() {
  document.getElementById('dye-modal-backdrop').classList.remove('open');
  editingId = null;
}

async function submitForm() {
  const fd = new FormData(form());
  const body = { model: fd.get('model') || '' };
  ['burrs','burrType','notes'].forEach(k => { const v = fd.get(k); if (v) body[k] = v; });
  ['burrSize','rpmSmallStep','rpmBigStep'].forEach(k => { const v = fd.get(k); if (v !== '' && v != null) body[k] = parseFloat(v); });
  const st = fd.get('settingType') || 'numeric';
  body.settingType = st;
  if (st === 'numeric') {
    ['settingSmallStep','settingBigStep'].forEach(k => { const v = fd.get(k); if (v !== '' && v != null) body[k] = parseFloat(v); });
  } else {
    const sv = fd.get('settingValues');
    if (sv) body.settingValues = sv.split(',').map(s => s.trim()).filter(Boolean);
  }

  try {
    const url = editingId ? '/api/v1/grinders/' + editingId : '/api/v1/grinders';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + await res.text());
    closeModal();
    await reload();
  } catch (err) {
    const errEl = document.getElementById('dye-modal-error');
    errEl.textContent = 'Save failed: ' + err.message;
    errEl.classList.remove('dye-hidden');
  }
}

async function reload() {
  try {
    const result = await getGrinders();
    grindersCache = Array.isArray(result) ? result : (result.items || []);
  } catch (e) {
    console.error('Failed to load grinders:', e);
    grindersCache = [];
  }
  renderGrinderCards(document.getElementById('dye-cards-grid'));
}

async function initializeDyeGrinders() {
  const grid = document.getElementById('dye-cards-grid');
  if (!grid) return;

  await reload();
  setupSortButtons((sort) => { currentSort = sort; renderGrinderCards(grid); });

  const searchInput = document.getElementById('dye-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => { searchQuery = searchInput.value.trim().toLowerCase(); renderGrinderCards(grid); });
  }

  document.getElementById('dye-done-btn')?.addEventListener('click', () => window.history.back());
  document.getElementById('dye-modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('dye-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  form().elements['settingType'].addEventListener('change', toggleSettingSections);
  form().addEventListener('submit', (e) => { e.preventDefault(); submitForm(); });
}

initializeDyeGrinders().catch(e => console.error('initializeDyeGrinders failed:', e));
`;
	function renderGrindersPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Grinders", content$6, styles$10, [devApiScript, pageScript$10])
		};
	}
	//#endregion
	//#region src/pages/bean-picker.ts
	var styles$9 = `
  .dye-sort-btn {
    width: 100%;
    padding: 12px 0;
    border: 2px solid var(--mimoja-blue);
    border-radius: 9999px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 19px;
    text-align: center;
    color: var(--mimoja-blue);
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
  }
  .dye-sort-btn.dye-sort-active {
    background: var(--mimoja-blue);
    color: #fff;
    border-color: var(--mimoja-blue);
  }

  .dye-card {
    width: 100%;
    min-height: 80px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 14px 18px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    background: var(--box-color);
    border: 1px solid var(--profile-button-outline-color);
    color: var(--text-primary);
    transition: background 0.15s, color 0.15s;
    user-select: none;
    gap: 8px;
  }
  .dye-card:hover { opacity: 0.85; }
  .dye-card.dye-card-selected {
    background: var(--mimoja-blue);
    border-color: var(--mimoja-blue);
    color: #fff;
  }
  .dye-card-add {
    border: 2px solid var(--mimoja-blue);
    color: var(--mimoja-blue);
    font-size: 22px;
    font-weight: 700;
    gap: 8px;
    background: var(--box-color);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 80px;
  }
  .dye-card-add svg { stroke: var(--mimoja-blue); }

  .dye-card-name  { font-size: 22px; font-weight: 600; line-height: 1.3; }
  .dye-card-sub   { font-size: 20px; font-weight: 400; opacity: 0.7; }
  .dye-card-date  { font-size: 19px; font-weight: 400; opacity: 0.6; margin-top: 4px; }
  .dye-card.dye-card-selected .dye-card-sub,
  .dye-card.dye-card-selected .dye-card-date { opacity: 0.85; }

  .dye-confirm-disabled {
    background: var(--fav-button-wait, #e0e0e0);
    color: var(--text-primary-disabled, #aaa);
    cursor: not-allowed;
  }
  .dye-confirm-enabled {
    background: var(--mimoja-blue);
    color: #fff;
    cursor: pointer;
  }

  .dye-search-wrap { position: relative; width: 100%; margin-bottom: 10px; }
  .dye-search-input {
    width: 100%; height: 54px; border-radius: 12px; border: none;
    background: #EDF0F4; padding: 0 46px 0 16px;
    font-family: 'Inter', sans-serif; font-size: 19px;
    color: var(--text-primary); outline: none;
  }
  .dye-search-input::placeholder { color: var(--text-primary-disabled); }
  .dye-search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; }

  #dye-cards-container::-webkit-scrollbar { width: 36px; }
  #dye-cards-container::-webkit-scrollbar-track { background: transparent; }
  #dye-cards-container::-webkit-scrollbar-thumb {
    background: var(--profile-button-outline-color);
    border-radius: 9999px;
    border: 12px solid transparent;
    background-clip: padding-box;
  }
`;
	var content$5 = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">

  <!-- Top bar -->
  <div class="flex justify-between items-center px-[38px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[134px] shrink-0">
    <h1 class="text-[36px] font-bold text-[var(--text-primary)]">Select Beans</h1>
    <div class="flex items-center gap-[14px]">
      <button id="dye-cancel-btn" class="flex items-center justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] text-[var(--text-primary)] cursor-pointer">
        CANCEL
      </button>
      <button id="dye-confirm-btn" class="flex items-center gap-[10px] justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] dye-confirm-disabled" disabled>
        <span>SELECT ROASTER</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>

  <!-- Body: sort rail + grid -->
  <div class="flex flex-1 overflow-hidden">

    <!-- Sort rail -->
    <div id="dye-sort-sidebar" class="flex flex-col gap-[18px] items-stretch pt-[28px] px-[20px] shrink-0 w-[180px]">
      <div class="dye-search-wrap">
        <input id="dye-search-input" class="dye-search-input" type="text" placeholder="Search" />
        <svg class="dye-search-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary-disabled)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <button class="dye-sort-btn dye-sort-active" data-sort="recent">Recent</button>
      <button class="dye-sort-btn" data-sort="oldest">Oldest</button>
      <button class="dye-sort-btn" data-sort="az">A-Z</button>
      <button class="dye-sort-btn" data-sort="za">Z-A</button>
      <button class="dye-sort-btn" data-sort="most-used">Most Used</button>
      <button class="dye-sort-btn" data-sort="least-used">Least Used</button>
    </div>

    <!-- Card grid -->
    <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[28px] px-[38px] pb-[28px]">
      <div id="dye-cards-grid" class="grid grid-cols-3 gap-[20px]"></div>
    </div>

  </div>
</div>
`;
	var pageScript$9 = `
let beansCache = [];
let batchMap = {};
let searchQuery = '';
let selectedBeanId = null;
let fromEditShot = false;

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function latestBatch(batches) {
  const arr = Array.isArray(batches) ? batches : (batches && batches.items ? batches.items : []);
  if (!arr.length) return null;
  return arr.slice().sort((a, b) => new Date(b.roastDate || 0) - new Date(a.roastDate || 0))[0];
}

function beanLine1(bean, batch) {
  const parts = [bean.name];
  if (batch && batch.harvestDate) parts.push(batch.harvestDate);
  if (bean.country) parts.push(bean.country);
  if (bean.processing) parts.push(bean.processing);
  if (bean.variety && bean.variety.length) parts.push(bean.variety.join(', '));
  return parts.filter(Boolean).join(', ');
}

function beanLine3(batch) {
  if (!batch || !batch.roastDate) return '';
  const rd = new Date(batch.roastDate);
  if (isNaN(rd.getTime())) return '';
  const dateStr = rd.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const days = Math.floor((Date.now() - rd.getTime()) / 86400000);
  return dateStr + ' (' + days + ' days off-roast)';
}

function matchesSearch(bean) {
  if (!searchQuery) return true;
  const hay = beanLine1(bean, batchMap[bean.id]) + ' ' + (bean.roaster || '');
  return hay.toLowerCase().includes(searchQuery);
}

function sortItems(items, sortKey) {
  const sorted = [...items];
  switch (sortKey) {
    case 'recent':  sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    case 'oldest':  sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
    case 'az':      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
    case 'za':      sorted.sort((a, b) => (b.name || '').localeCompare(a.name || '')); break;
    default:        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
  }
  return sorted;
}

function setupSortButtons(onSort) {
  const sidebar = document.getElementById('dye-sort-sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('.dye-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
      btn.classList.add('dye-sort-active');
      onSort(btn.dataset.sort);
    });
  });
}

function updateConfirmButton(confirmBtn) {
  if (!confirmBtn) return;
  const enabled = !!selectedBeanId;
  confirmBtn.disabled = !enabled;
  confirmBtn.classList.toggle('dye-confirm-disabled', !enabled);
  confirmBtn.classList.toggle('dye-confirm-enabled', enabled);
  // Only send to the roaster picker when the chosen bean has no roaster yet.
  const roaster = sessionStorage.getItem('dye_selectedBeanRoaster') || '';
  const label = confirmBtn.querySelector('span');
  if (label) label.textContent = (fromEditShot || roaster) ? 'CONFIRM' : 'SELECT ROASTER';
}

function renderBeanCards(grid, beans, confirmBtn) {
  grid.innerHTML = '';

  const addCard = document.createElement('div');
  addCard.className = 'dye-card dye-card-add';
  addCard.innerHTML = '<span>ADD NEW BEANS +</span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  addCard.addEventListener('click', () => { window.location.href = '/api/v1/plugins/dye2.reaplugin/add-bean'; });
  grid.appendChild(addCard);

  beans.forEach(bean => {
    const card = document.createElement('div');
    card.className = 'dye-card';
    const batch = batchMap[bean.id];
    const line3 = beanLine3(batch);
    card.innerHTML =
      '<div class="dye-card-name">' + esc(beanLine1(bean, batch) || 'Unnamed') + '</div>' +
      (bean.roaster ? '<div class="dye-card-sub">' + esc(bean.roaster) + '</div>' : '') +
      (line3 ? '<div class="dye-card-date">' + esc(line3) + '</div>' : '');
    if (bean.id === selectedBeanId) card.classList.add('dye-card-selected');
    card.addEventListener('click', () => {
      grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
      card.classList.add('dye-card-selected');
      selectedBeanId = bean.id;
      sessionStorage.setItem('dye_selectedBeanId', bean.id);
      sessionStorage.setItem('dye_selectedBeanName', bean.name || '');
      sessionStorage.setItem('dye_selectedBeanRoaster', bean.roaster || '');
      sessionStorage.setItem('dye_selectedBatchId', (batch && batch.id) || '');
      sessionStorage.setItem('dye_selectedRoastDate', (batch && batch.roastDate) || '');
      updateConfirmButton(confirmBtn);
    });
    grid.appendChild(card);
  });
}

async function initializeDyeBeans() {
  const grid = document.getElementById('dye-cards-grid');
  const cancelBtn = document.getElementById('dye-cancel-btn');
  const confirmBtn = document.getElementById('dye-confirm-btn');
  if (!grid) return;

  selectedBeanId = sessionStorage.getItem('dye_selectedBeanId') || null;
  // ?return=<route> → caller (e.g. recipe-edit) wants the pick handed back via the
  // dye_selectedBean* keys, not written to the active workflow. Navigate there on confirm.
  const returnTo = new URLSearchParams(location.search).get('return');
  let currentSort = 'recent';

  try {
    const result = await getBeans();
    beansCache = Array.isArray(result) ? result : (result.items || []);
  } catch (e) {
    console.error('Failed to load beans:', e);
    beansCache = [];
  }

  function render() {
    renderBeanCards(grid, sortItems(beansCache.filter(matchesSearch), currentSort), confirmBtn);
  }

  render();
  updateConfirmButton(confirmBtn);
  setupSortButtons((sort) => { currentSort = sort; render(); });

  const searchInput = document.getElementById('dye-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => { searchQuery = searchInput.value.trim().toLowerCase(); render(); });
  }

  // ponytail: N+1 batch fetch — fine for a bounded picker list; add ?include=latestBatch to /beans if it gets slow.
  Promise.all(beansCache.map(async (b) => {
    try { batchMap[b.id] = latestBatch(await getBeanBatches(b.id)); }
    catch (e) { batchMap[b.id] = null; }
  })).then(render).catch((e) => console.warn('batch load failed:', e));

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      ['dye_selectedBeanId','dye_selectedBeanName','dye_selectedBeanRoaster','dye_selectedBatchId']
        .forEach(k => sessionStorage.removeItem(k));
      window.history.back();
    });
  }

  // Came from edit-shot (via goToPicker) → return there with the pick instead of the
  // normal bean→roaster flow. Selection is already stashed in sessionStorage on card click.
  fromEditShot = sessionStorage.getItem('dye_editShotReturn') === '1';
  updateConfirmButton(confirmBtn);

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!selectedBeanId) return;
      // Return-target flow (recipe-edit): leave the pick in sessionStorage, hand control back.
      if (returnTo) { window.location.href = returnTo; return; }
      const roaster = sessionStorage.getItem('dye_selectedBeanRoaster') || '';
      // Edit-shot round-trips via its draft; just go back and it folds in the selection.
      if (fromEditShot) { window.history.back(); return; }
      // Bean already has a roaster → no roaster step; write the workflow ourselves (roasters.ts
      // is what normally does this) and return to whatever page opened the picker.
      if (roaster) {
        const coffeeName  = sessionStorage.getItem('dye_selectedBeanName') || '';
        const beanBatchId = sessionStorage.getItem('dye_selectedBatchId') || undefined;
        try { await updateWorkflow({ context: { coffeeName, coffeeRoaster: roaster, beanBatchId } }); }
        catch (e) { console.error('Failed to update workflow:', e); }
        ['dye_selectedBeanId','dye_selectedBeanName','dye_selectedBeanRoaster','dye_selectedBatchId','dye_selectedRoastDate']
          .forEach(k => sessionStorage.removeItem(k));
        window.history.back();
      } else {
        window.location.href = '/api/v1/plugins/dye2.reaplugin/roasters';
      }
    });
  }
}

initializeDyeBeans().catch(e => console.error('initializeDyeBeans failed:', e));

// Returning from /add-bean restores this page frozen from bfcache — reload to re-fetch.
window.addEventListener('pageshow', function(e) { if (e.persisted) window.location.reload(); });
`;
	function renderBeanPickerPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Select Beans", content$5, styles$9, [devApiScript, pageScript$9])
		};
	}
	//#endregion
	//#region src/pages/grinder-picker.ts
	var styles$8 = `
  .dye-sort-btn {
    width: 100%;
    padding: 12px 0;
    border: 2px solid var(--mimoja-blue);
    border-radius: 9999px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 19px;
    text-align: center;
    color: var(--mimoja-blue);
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
  }
  .dye-sort-btn.dye-sort-active {
    background: var(--mimoja-blue);
    color: #fff;
    border-color: var(--mimoja-blue);
  }

  .dye-card {
    width: 100%;
    min-height: 80px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 14px 18px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    background: var(--box-color);
    border: 1px solid var(--profile-button-outline-color);
    color: var(--text-primary);
    transition: background 0.15s, color 0.15s;
    user-select: none;
    gap: 8px;
  }
  .dye-card:hover { opacity: 0.85; }
  .dye-card.dye-card-selected {
    background: var(--mimoja-blue);
    border-color: var(--mimoja-blue);
    color: #fff;
  }
  .dye-card-add {
    border: 2px solid var(--mimoja-blue);
    color: var(--mimoja-blue);
    font-size: 22px;
    font-weight: 700;
    gap: 8px;
    background: var(--box-color);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 80px;
  }
  .dye-card-add svg { stroke: var(--mimoja-blue); }

  .dye-card-name  { font-size: 22px; font-weight: 600; line-height: 1.3; }
  .dye-card-sub   { font-size: 20px; font-weight: 400; opacity: 0.7; }
  .dye-card-date  { font-size: 19px; font-weight: 400; opacity: 0.6; margin-top: 4px; }
  .dye-card.dye-card-selected .dye-card-sub,
  .dye-card.dye-card-selected .dye-card-date { opacity: 0.85; }

  .dye-confirm-disabled {
    background: var(--fav-button-wait, #e0e0e0);
    color: var(--text-primary-disabled, #aaa);
    cursor: not-allowed;
  }
  .dye-confirm-enabled {
    background: var(--mimoja-blue);
    color: #fff;
    cursor: pointer;
  }

  .dye-search-wrap { position: relative; width: 100%; margin-bottom: 10px; }
  .dye-search-input {
    width: 100%; height: 54px; border-radius: 12px; border: none;
    background: #EDF0F4; padding: 0 46px 0 16px;
    font-family: 'Inter', sans-serif; font-size: 19px;
    color: var(--text-primary); outline: none;
  }
  .dye-search-input::placeholder { color: var(--text-primary-disabled); }
  .dye-search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; }

  #dye-cards-container::-webkit-scrollbar { width: 36px; }
  #dye-cards-container::-webkit-scrollbar-track { background: transparent; }
  #dye-cards-container::-webkit-scrollbar-thumb {
    background: var(--profile-button-outline-color);
    border-radius: 9999px;
    border: 12px solid transparent;
    background-clip: padding-box;
  }

  /* Add-grinder modal (shown inline instead of navigating to /grinders) */
  .dye-modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    display: none; align-items: center; justify-content: center; z-index: 50;
  }
  .dye-modal-backdrop.open { display: flex; }
  .dye-modal {
    background: var(--box-color); color: var(--text-primary);
    width: min(760px, 92vw); max-height: 90vh; overflow-y: auto;
    border-radius: 18px; padding: 32px 36px;
    font-family: 'Inter', sans-serif;
  }
  .dye-modal h2 { font-size: 28px; font-weight: 700; margin-bottom: 20px; }
  .dye-field { margin-bottom: 16px; }
  .dye-field label { display: block; font-size: 17px; font-weight: 600; color: var(--text-primary-disabled); margin-bottom: 6px; }
  .dye-field input, .dye-field select, .dye-field textarea {
    width: 100%; height: 50px; border-radius: 10px;
    border: 1px solid var(--profile-button-outline-color);
    background: #EDF0F4; padding: 0 14px; font-size: 19px;
    color: var(--text-primary); font-family: 'Inter', sans-serif; outline: none;
  }
  .dye-field textarea { height: auto; padding: 12px 14px; resize: vertical; }
  .dye-field-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .dye-modal-actions { display: flex; justify-content: flex-end; gap: 14px; margin-top: 24px; }
  .dye-btn {
    height: 56px; padding: 0 30px; border-radius: 9999px;
    font-weight: 700; font-size: 22px; cursor: pointer; border: none;
    font-family: 'Inter', sans-serif;
  }
  .dye-btn-primary { background: var(--mimoja-blue); color: #fff; }
  .dye-btn-ghost { background: transparent; color: var(--text-primary); }
  .dye-modal-error { color: #C0392B; font-size: 18px; margin-top: 12px; }
  .dye-hidden { display: none !important; }
`;
	var content$4 = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">

  <!-- Top bar -->
  <div class="flex justify-between items-center px-[38px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[134px] shrink-0">
    <h1 class="text-[36px] font-bold text-[var(--text-primary)]">Select Grinder</h1>
    <div class="flex items-center gap-[14px]">
      <button id="dye-cancel-btn" class="flex items-center justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] text-[var(--text-primary)] cursor-pointer">
        CANCEL
      </button>
      <button id="dye-confirm-btn" class="flex items-center gap-[10px] justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] dye-confirm-disabled" disabled>
        <span>CONFIRM</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>

  <!-- Body: sort rail + grid -->
  <div class="flex flex-1 overflow-hidden">

    <!-- Sort rail -->
    <div id="dye-sort-sidebar" class="flex flex-col gap-[18px] items-stretch pt-[28px] px-[20px] shrink-0 w-[180px]">
      <div class="dye-search-wrap">
        <input id="dye-search-input" class="dye-search-input" type="text" placeholder="Search" />
        <svg class="dye-search-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary-disabled)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <button class="dye-sort-btn dye-sort-active" data-sort="recent">Recent</button>
      <button class="dye-sort-btn" data-sort="oldest">Oldest</button>
      <button class="dye-sort-btn" data-sort="az">A-Z</button>
      <button class="dye-sort-btn" data-sort="za">Z-A</button>
      <button class="dye-sort-btn" data-sort="most-used">Most Used</button>
      <button class="dye-sort-btn" data-sort="least-used">Least Used</button>
    </div>

    <!-- Card grid -->
    <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[28px] px-[38px] pb-[28px]">
      <div id="dye-cards-grid" class="grid grid-cols-3 gap-[20px]"></div>
    </div>

  </div>

  <!-- Add grinder modal -->
  <div id="dye-modal-backdrop" class="dye-modal-backdrop">
    <div class="dye-modal">
      <h2 id="dye-modal-title">New Grinder</h2>
      <form id="dye-grinder-form">
        <div class="dye-field">
          <label>Model *</label>
          <input name="model" required placeholder="Grinder model" />
        </div>
        <div class="dye-field dye-field-2">
          <div>
            <label>Burrs</label>
            <input name="burrs" placeholder="Burr set name" />
          </div>
          <div>
            <label>Burr Type</label>
            <select name="burrType">
              <option value="">-- Select --</option>
              <option value="flat">Flat</option>
              <option value="conical">Conical</option>
            </select>
          </div>
        </div>
        <div class="dye-field dye-field-2">
          <div>
            <label>Burr Size (mm)</label>
            <input name="burrSize" type="number" step="any" placeholder="e.g. 64" />
          </div>
          <div>
            <label>Setting Type</label>
            <select name="settingType">
              <option value="numeric">Numeric</option>
              <option value="preset">Preset</option>
            </select>
          </div>
        </div>
        <div id="dye-numeric-settings" class="dye-field dye-field-2">
          <div>
            <label>Setting Small Step</label>
            <input name="settingSmallStep" type="number" step="any" placeholder="e.g. 0.1" />
          </div>
          <div>
            <label>Setting Big Step</label>
            <input name="settingBigStep" type="number" step="any" placeholder="e.g. 1" />
          </div>
        </div>
        <div id="dye-preset-settings" class="dye-field dye-hidden">
          <label>Setting Values (comma-separated)</label>
          <input name="settingValues" placeholder="e.g. Fine, Medium, Coarse" />
        </div>
        <div class="dye-field dye-field-2">
          <div>
            <label>RPM Small Step</label>
            <input name="rpmSmallStep" type="number" step="any" placeholder="e.g. 10" />
          </div>
          <div>
            <label>RPM Big Step</label>
            <input name="rpmBigStep" type="number" step="any" placeholder="e.g. 100" />
          </div>
        </div>
        <div class="dye-field">
          <label>Notes</label>
          <textarea name="notes" rows="3" placeholder="Notes about this grinder..."></textarea>
        </div>
        <div id="dye-modal-error" class="dye-modal-error dye-hidden"></div>
        <div class="dye-modal-actions">
          <button type="button" id="dye-modal-cancel" class="dye-btn dye-btn-ghost">CANCEL</button>
          <button type="submit" id="dye-modal-save" class="dye-btn dye-btn-primary">SAVE</button>
        </div>
      </form>
    </div>
  </div>
</div>
`;
	var pageScript$8 = `
let grindersCache = [];
let searchQuery = '';
let selectedGrinderId = null;
let currentSort = 'recent';
let confirmBtn = null;
let editingId = null;

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function grinderName(g) { return g.model || g.name || 'Unnamed'; }

function grinderSub(g) {
  const parts = [];
  if (g.burrs) parts.push(g.burrs);
  if (g.burrType) parts.push(g.burrType);
  if (g.burrSize) parts.push(g.burrSize + 'mm');
  return parts.join(' · ');
}

function grinderMeta(g) {
  const parts = [];
  if (g.settingType) parts.push(g.settingType);
  if (g.notes) parts.push(g.notes);
  return parts.join(' · ');
}

function matchesSearch(g) {
  if (!searchQuery) return true;
  const hay = grinderName(g) + ' ' + grinderSub(g) + ' ' + grinderMeta(g);
  return hay.toLowerCase().includes(searchQuery);
}

function sortItems(items, sortKey) {
  const sorted = [...items];
  const name = (g) => grinderName(g).toLowerCase();
  switch (sortKey) {
    case 'recent':  sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    case 'oldest':  sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
    case 'az':      sorted.sort((a, b) => name(a).localeCompare(name(b))); break;
    case 'za':      sorted.sort((a, b) => name(b).localeCompare(name(a))); break;
    default:        sorted.sort((a, b) => name(a).localeCompare(name(b))); break;
  }
  return sorted;
}

function setupSortButtons(onSort) {
  const sidebar = document.getElementById('dye-sort-sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('.dye-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
      btn.classList.add('dye-sort-active');
      onSort(btn.dataset.sort);
    });
  });
}

function updateConfirmButton(confirmBtn) {
  if (!confirmBtn) return;
  if (selectedGrinderId) {
    confirmBtn.disabled = false;
    confirmBtn.classList.remove('dye-confirm-disabled');
    confirmBtn.classList.add('dye-confirm-enabled');
  } else {
    confirmBtn.disabled = true;
    confirmBtn.classList.add('dye-confirm-disabled');
    confirmBtn.classList.remove('dye-confirm-enabled');
  }
}

function renderGrinderCards(grid, grinders, confirmBtn) {
  grid.innerHTML = '';

  const addCard = document.createElement('div');
  addCard.className = 'dye-card dye-card-add';
  addCard.innerHTML = '<span>ADD NEW GRINDER +</span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  addCard.addEventListener('click', () => openModal(null));
  grid.appendChild(addCard);

  grinders.forEach(g => {
    const card = document.createElement('div');
    card.className = 'dye-card';
    const sub = grinderSub(g);
    const meta = grinderMeta(g);
    card.innerHTML =
      '<div class="dye-card-name">' + esc(grinderName(g)) + '</div>' +
      (sub ? '<div class="dye-card-sub">' + esc(sub) + '</div>' : '') +
      (meta ? '<div class="dye-card-date">' + esc(meta) + '</div>' : '');
    if (g.id === selectedGrinderId) card.classList.add('dye-card-selected');
    card.addEventListener('click', () => {
      grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
      card.classList.add('dye-card-selected');
      selectedGrinderId = g.id;
      sessionStorage.setItem('dye_selectedGrinderId', g.id);
      sessionStorage.setItem('dye_selectedGrinderModel', grinderName(g));
      updateConfirmButton(confirmBtn);
    });
    grid.appendChild(card);
  });
}

function rerender() {
  const grid = document.getElementById('dye-cards-grid');
  if (!grid) return;
  renderGrinderCards(grid, sortItems(grindersCache.filter(matchesSearch), currentSort), confirmBtn);
}

/* ── Add-grinder modal ── */
function form() { return document.getElementById('dye-grinder-form'); }
function setField(name, val) { const el = form().elements[name]; if (el) el.value = val == null ? '' : val; }
function toggleSettingSections() {
  const isNumeric = form().elements['settingType'].value === 'numeric';
  document.getElementById('dye-numeric-settings').classList.toggle('dye-hidden', !isNumeric);
  document.getElementById('dye-preset-settings').classList.toggle('dye-hidden', isNumeric);
}

function openModal(g) {
  editingId = g ? g.id : null;
  document.getElementById('dye-modal-title').textContent = g ? 'Edit Grinder' : 'New Grinder';
  document.getElementById('dye-modal-error').classList.add('dye-hidden');
  form().reset();
  setField('settingType', 'numeric');
  toggleSettingSections();
  document.getElementById('dye-modal-backdrop').classList.add('open');
}

function closeModal() {
  document.getElementById('dye-modal-backdrop').classList.remove('open');
  editingId = null;
}

async function submitForm() {
  const fd = new FormData(form());
  const body = { model: fd.get('model') || '' };
  ['burrs','burrType','notes'].forEach(k => { const v = fd.get(k); if (v) body[k] = v; });
  ['burrSize','rpmSmallStep','rpmBigStep'].forEach(k => { const v = fd.get(k); if (v !== '' && v != null) body[k] = parseFloat(v); });
  const st = fd.get('settingType') || 'numeric';
  body.settingType = st;
  if (st === 'numeric') {
    ['settingSmallStep','settingBigStep'].forEach(k => { const v = fd.get(k); if (v !== '' && v != null) body[k] = parseFloat(v); });
  } else {
    const sv = fd.get('settingValues');
    if (sv) body.settingValues = sv.split(',').map(s => s.trim()).filter(Boolean);
  }

  try {
    const res = await fetch('/api/v1/grinders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + await res.text());
    const created = await res.json().catch(() => null);
    closeModal();
    try {
      const result = await getGrinders();
      grindersCache = Array.isArray(result) ? result : (result.items || []);
    } catch (e) { console.warn('reload grinders failed:', e); }
    // Adding a grinder here is in service of picking it — auto-select the new one.
    if (created && created.id) {
      selectedGrinderId = created.id;
      sessionStorage.setItem('dye_selectedGrinderId', created.id);
      sessionStorage.setItem('dye_selectedGrinderModel', grinderName(created));
    }
    rerender();
    updateConfirmButton(confirmBtn);
  } catch (err) {
    const errEl = document.getElementById('dye-modal-error');
    errEl.textContent = 'Save failed: ' + err.message;
    errEl.classList.remove('dye-hidden');
  }
}

async function initializeDyeGrinders() {
  const grid = document.getElementById('dye-cards-grid');
  const cancelBtn = document.getElementById('dye-cancel-btn');
  confirmBtn = document.getElementById('dye-confirm-btn');
  if (!grid) return;

  selectedGrinderId = sessionStorage.getItem('dye_selectedGrinderId') || null;

  try {
    const result = await getGrinders();
    grindersCache = Array.isArray(result) ? result : (result.items || []);
  } catch (e) {
    console.error('Failed to load grinders:', e);
    grindersCache = [];
  }

  rerender();
  updateConfirmButton(confirmBtn);
  setupSortButtons((sort) => { currentSort = sort; rerender(); });

  const searchInput = document.getElementById('dye-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => { searchQuery = searchInput.value.trim().toLowerCase(); rerender(); });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      ['dye_selectedGrinderId','dye_selectedGrinderModel'].forEach(k => sessionStorage.removeItem(k));
      window.history.back();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!selectedGrinderId) return;
      const g = grindersCache.find(x => x.id === selectedGrinderId);
      try {
        await updateWorkflow({ context: { grinderId: selectedGrinderId, grinderModel: g ? grinderName(g) : '' } });
      } catch (e) { console.warn('workflow update failed:', e); }
      window.history.back();
    });
  }

  // Modal wiring
  document.getElementById('dye-modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('dye-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  form().elements['settingType'].addEventListener('change', toggleSettingSections);
  form().addEventListener('submit', (e) => { e.preventDefault(); submitForm(); });
}

initializeDyeGrinders().catch(e => console.error('initializeDyeGrinders failed:', e));
`;
	function renderGrinderPickerPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Select Grinder", content$4, styles$8, [devApiScript, pageScript$8])
		};
	}
	//#endregion
	//#region src/pages/profile-picker.ts
	var styles$7 = `
  .dye-sort-btn {
    width: 100%; padding: 12px 0;
    border: 2px solid var(--mimoja-blue); border-radius: 9999px;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 19px;
    text-align: center; color: var(--mimoja-blue); background: transparent;
    cursor: pointer; white-space: nowrap;
  }
  .dye-sort-btn.dye-sort-active { background: var(--mimoja-blue); color: #fff; border-color: var(--mimoja-blue); }

  /* Fixed height so every card is the same size regardless of notes length. */
  .dye-card {
    width: 100%; height: 172px; border-radius: 15px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 14px 18px; font-family: 'Inter', sans-serif; cursor: pointer;
    background: var(--box-color); border: 1px solid var(--profile-button-outline-color);
    color: var(--text-primary); transition: background 0.15s, color 0.15s; user-select: none; gap: 6px;
    overflow: hidden;
  }
  .dye-card:hover { opacity: 0.85; }
  .dye-card.dye-card-selected { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }

  .dye-card-name  { font-size: 22px; font-weight: 600; line-height: 1.3; }
  .dye-card-sub   { font-size: 18px; font-weight: 400; opacity: 0.7; }
  /* Notes clamp to 2 lines; a "Read more" reveals the rest in a modal so cards stay uniform. */
  .dye-card-note  { font-size: 17px; font-weight: 400; opacity: 0.6; line-height: 1.3;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .dye-card-readmore { font-size: 16px; font-weight: 600; color: var(--mimoja-blue); cursor: pointer; }
  .dye-card.dye-card-selected .dye-card-sub,
  .dye-card.dye-card-selected .dye-card-note { opacity: 0.85; }
  .dye-card.dye-card-selected .dye-card-readmore { color: #fff; text-decoration: underline; }

  /* Full-note modal */
  .pp-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    display: none; align-items: center; justify-content: center; z-index: 1000; }
  .pp-modal-backdrop.open { display: flex; }
  .pp-modal { background: var(--box-color); color: var(--text-primary); border-radius: 18px;
    max-width: 640px; width: 86%; max-height: 74vh; overflow-y: auto; padding: 30px 34px;
    font-family: 'Inter', sans-serif; }
  .pp-modal-title { font-size: 26px; font-weight: 700; margin-bottom: 14px; }
  .pp-modal-body { font-size: 20px; line-height: 1.5; white-space: pre-wrap; }
  .pp-modal-close { margin-top: 22px; height: 56px; padding: 0 34px; border: none; border-radius: 9999px;
    background: var(--mimoja-blue); color: #fff; font-size: 20px; font-weight: 700; cursor: pointer; }

  .dye-confirm-disabled { background: var(--fav-button-wait, #e0e0e0); color: var(--text-primary-disabled, #aaa); cursor: not-allowed; }
  .dye-confirm-enabled  { background: var(--mimoja-blue); color: #fff; cursor: pointer; }

  .dye-search-wrap { position: relative; width: 100%; margin-bottom: 10px; }
  .dye-search-input {
    width: 100%; height: 54px; border-radius: 12px; border: none; background: #EDF0F4;
    padding: 0 46px 0 16px; font-family: 'Inter', sans-serif; font-size: 19px;
    color: var(--text-primary); outline: none;
  }
  .dye-search-input::placeholder { color: var(--text-primary-disabled); }
  .dye-search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; }

  #dye-cards-container::-webkit-scrollbar { width: 36px; }
  #dye-cards-container::-webkit-scrollbar-track { background: transparent; }
  #dye-cards-container::-webkit-scrollbar-thumb {
    background: var(--profile-button-outline-color); border-radius: 9999px;
    border: 12px solid transparent; background-clip: padding-box;
  }
`;
	var content$3 = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">

  <div class="flex justify-between items-center px-[38px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[134px] shrink-0">
    <h1 class="text-[36px] font-bold text-[var(--text-primary)]">Select Profile</h1>
    <div class="flex items-center gap-[14px]">
      <button id="dye-cancel-btn" class="flex items-center justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] text-[var(--text-primary)] cursor-pointer">CANCEL</button>
      <button id="dye-confirm-btn" class="flex items-center gap-[10px] justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] dye-confirm-disabled" disabled>
        <span>CONFIRM</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>

  <div class="flex flex-1 overflow-hidden">
    <div id="dye-sort-sidebar" class="flex flex-col gap-[18px] items-stretch pt-[28px] px-[20px] shrink-0 w-[180px]">
      <div class="dye-search-wrap">
        <input id="dye-search-input" class="dye-search-input" type="text" placeholder="Search" />
        <svg class="dye-search-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary-disabled)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <button class="dye-sort-btn dye-sort-active" data-sort="az">A-Z</button>
      <button class="dye-sort-btn" data-sort="za">Z-A</button>
      <button class="dye-sort-btn" data-sort="recent">Recent</button>
      <button class="dye-sort-btn" data-sort="oldest">Oldest</button>
    </div>

    <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[28px] px-[38px] pb-[28px]">
      <div id="dye-cards-grid" class="grid grid-cols-3 gap-[20px]"></div>
    </div>
  </div>

  <div id="pp-note-modal" class="pp-modal-backdrop">
    <div class="pp-modal">
      <div id="pp-note-title" class="pp-modal-title"></div>
      <div id="pp-note-body" class="pp-modal-body"></div>
      <button id="pp-note-close" class="pp-modal-close">Close</button>
    </div>
  </div>
</div>
`;
	var pageScript$7 = `
let profilesCache = [];
let searchQuery = '';
let selectedProfileId = null;

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// The bridge nests profile fields under p.profile; keep flat fallbacks for safety.
function profileName(p) { const pr = (p && p.profile) || {}; return pr.title || p.title || p.name || 'Untitled Profile'; }
function profileSub(p)  { const pr = (p && p.profile) || {}; return pr.author || pr.beverage_type || p.author || p.beverage_type || p.type || ''; }
function profileMeta(p) { const pr = (p && p.profile) || {}; return pr.notes || p.notes || p.description || ''; }

function matchesSearch(p) {
  if (!searchQuery) return true;
  const hay = profileName(p) + ' ' + profileSub(p) + ' ' + profileMeta(p);
  return hay.toLowerCase().includes(searchQuery);
}

function sortItems(items, sortKey) {
  const sorted = [...items];
  const name = (p) => profileName(p).toLowerCase();
  const ts = (p) => new Date(p.createdAt || p.updatedAt || 0);
  switch (sortKey) {
    case 'za':     sorted.sort((a, b) => name(b).localeCompare(name(a))); break;
    case 'recent': sorted.sort((a, b) => ts(b) - ts(a)); break;
    case 'oldest': sorted.sort((a, b) => ts(a) - ts(b)); break;
    default:       sorted.sort((a, b) => name(a).localeCompare(name(b))); break;
  }
  return sorted;
}

function setupSortButtons(onSort) {
  const sidebar = document.getElementById('dye-sort-sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('.dye-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
      btn.classList.add('dye-sort-active');
      onSort(btn.dataset.sort);
    });
  });
}

function updateConfirmButton(confirmBtn) {
  if (!confirmBtn) return;
  if (selectedProfileId) {
    confirmBtn.disabled = false;
    confirmBtn.classList.remove('dye-confirm-disabled');
    confirmBtn.classList.add('dye-confirm-enabled');
  } else {
    confirmBtn.disabled = true;
    confirmBtn.classList.add('dye-confirm-disabled');
    confirmBtn.classList.remove('dye-confirm-enabled');
  }
}

function renderProfileCards(grid, profiles, confirmBtn) {
  grid.innerHTML = '';
  profiles.forEach(p => {
    const card = document.createElement('div');
    card.className = 'dye-card';
    const sub = profileSub(p);
    const meta = profileMeta(p);
    card.innerHTML =
      '<div class="dye-card-name">' + esc(profileName(p)) + '</div>' +
      (sub ? '<div class="dye-card-sub">' + esc(sub) + '</div>' : '') +
      (meta ? '<div class="dye-card-note">' + esc(meta) + '</div>' : '');
    if (p.id === selectedProfileId) card.classList.add('dye-card-selected');
    card.addEventListener('click', () => {
      grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
      card.classList.add('dye-card-selected');
      selectedProfileId = p.id;
      sessionStorage.setItem('dye_selectedProfileId', p.id);
      sessionStorage.setItem('dye_selectedProfileTitle', profileName(p));
      updateConfirmButton(confirmBtn);
    });
    grid.appendChild(card);
    // Add "Read more" only when the note is actually clamped, so cards stay uniform height.
    if (meta) {
      const noteEl = card.querySelector('.dye-card-note');
      if (noteEl && noteEl.scrollHeight > noteEl.clientHeight + 2) {
        const rm = document.createElement('div');
        rm.className = 'dye-card-readmore';
        rm.textContent = 'Read more';
        rm.addEventListener('click', (e) => { e.stopPropagation(); openNoteModal(profileName(p), meta); });
        card.appendChild(rm);
      }
    }
  });
}

function openNoteModal(title, body) {
  const m = document.getElementById('pp-note-modal');
  const t = document.getElementById('pp-note-title');
  const b = document.getElementById('pp-note-body');
  if (t) t.textContent = title;
  if (b) b.textContent = body;
  if (m) m.classList.add('open');
}
function setupNoteModal() {
  const m = document.getElementById('pp-note-modal');
  document.getElementById('pp-note-close')?.addEventListener('click', () => m?.classList.remove('open'));
  m?.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('open'); });
}

async function initializeDyeProfiles() {
  const grid = document.getElementById('dye-cards-grid');
  const cancelBtn = document.getElementById('dye-cancel-btn');
  const confirmBtn = document.getElementById('dye-confirm-btn');
  if (!grid) return;

  selectedProfileId = sessionStorage.getItem('dye_selectedProfileId') || null;
  // ?return=<route> → hand the pick back via dye_selectedProfile* keys instead of the workflow.
  const returnTo = new URLSearchParams(location.search).get('return');
  let currentSort = 'az';

  try {
    const result = await getProfiles();
    profilesCache = Array.isArray(result) ? result : (result.items || []);
  } catch (e) {
    console.error('Failed to load profiles:', e);
    profilesCache = [];
  }

  function render() {
    renderProfileCards(grid, sortItems(profilesCache.filter(matchesSearch), currentSort), confirmBtn);
  }

  render();
  updateConfirmButton(confirmBtn);
  setupNoteModal();
  setupSortButtons((sort) => { currentSort = sort; render(); });

  const searchInput = document.getElementById('dye-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => { searchQuery = searchInput.value.trim().toLowerCase(); render(); });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      ['dye_selectedProfileId','dye_selectedProfileTitle'].forEach(k => sessionStorage.removeItem(k));
      window.history.back();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!selectedProfileId) return;
      // Return-target flow (recipe-edit): leave the pick in sessionStorage, hand control back.
      if (returnTo) { window.location.href = returnTo; return; }
      const p = profilesCache.find(x => x.id === selectedProfileId);
      try {
        await updateWorkflow({ profile: { id: selectedProfileId, title: p ? profileName(p) : '' } });
      } catch (e) { console.warn('workflow update failed:', e); }
      window.history.back();
    });
  }
}

initializeDyeProfiles().catch(e => console.error('initializeDyeProfiles failed:', e));
`;
	function renderProfilePickerPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Select Profile", content$3, styles$7, [devApiScript, pageScript$7])
		};
	}
	//#endregion
	//#region src/pages/roasters.ts
	var styles$6 = `
  .dye-sort-btn {
    width: 100%;
    padding: 12px 0;
    border: 2px solid var(--mimoja-blue);
    border-radius: 9999px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 19px;
    text-align: center;
    color: var(--mimoja-blue);
    background: transparent;
    cursor: pointer;
    white-space: nowrap;
  }
  .dye-sort-btn.dye-sort-active {
    background: var(--mimoja-blue);
    color: #fff;
    border-color: var(--mimoja-blue);
  }

  .dye-card {
    width: 100%;
    height: 80px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-weight: 500;
    cursor: pointer;
    background: var(--box-color);
    border: 1px solid var(--profile-button-outline-color);
    color: var(--text-primary);
    transition: background 0.15s, color 0.15s;
    user-select: none;
    padding: 0 16px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dye-card:hover { opacity: 0.85; }
  .dye-card.dye-card-selected {
    background: var(--mimoja-blue);
    border-color: var(--mimoja-blue);
    color: #fff;
  }
  .dye-card-add {
    border: 2px solid var(--mimoja-blue);
    color: var(--mimoja-blue);
    font-weight: 700;
    gap: 8px;
    background: var(--box-color);
  }
  .dye-card-add svg { stroke: var(--mimoja-blue); }

  .dye-confirm-disabled {
    background: var(--fav-button-wait, #e0e0e0);
    color: var(--text-primary-disabled, #aaa);
    cursor: not-allowed;
  }
  .dye-confirm-enabled {
    background: var(--mimoja-blue);
    color: #fff;
    cursor: pointer;
  }

  #dye-cards-container::-webkit-scrollbar { width: 36px; }
  #dye-cards-container::-webkit-scrollbar-track { background: transparent; }
  #dye-cards-container::-webkit-scrollbar-thumb {
    background: var(--profile-button-outline-color);
    border-radius: 9999px;
    border: 12px solid transparent;
    background-clip: padding-box;
  }
`;
	var content$2 = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">

  <!-- Top bar -->
  <div class="flex justify-between items-center px-[38px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[134px] shrink-0">
    <h1 class="text-[36px] font-bold text-[var(--text-primary)]">Select Roaster</h1>
    <div class="flex items-center gap-[14px]">
      <button id="dye-cancel-btn" class="flex items-center justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] text-[var(--text-primary)] cursor-pointer">
        CANCEL
      </button>
      <button id="dye-confirm-btn" class="flex items-center gap-[10px] justify-center h-[60px] px-[30px] rounded-[9999px] font-bold text-[24px] dye-confirm-disabled" disabled>
        <span>SELECT ROASTER</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>

  <!-- Body: sort rail + grid -->
  <div class="flex flex-1 overflow-hidden">

    <!-- Sort rail -->
    <div id="dye-sort-sidebar" class="flex flex-col gap-[18px] items-stretch pt-[28px] px-[20px] shrink-0 w-[150px]">
      <button class="dye-sort-btn dye-sort-active" data-sort="recent">Recent</button>
      <button class="dye-sort-btn" data-sort="oldest">Oldest</button>
      <button class="dye-sort-btn" data-sort="az">A-Z</button>
      <button class="dye-sort-btn" data-sort="za">Z-A</button>
      <button class="dye-sort-btn" data-sort="most-used">Most Used</button>
      <button class="dye-sort-btn" data-sort="least-used">Least Used</button>
    </div>

    <!-- Card grid -->
    <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[28px] px-[38px] pb-[28px]">
      <div id="dye-cards-grid" class="grid grid-cols-3 gap-[20px]"></div>
    </div>

  </div>
</div>
`;
	var pageScript$6 = `
let beansCache = null;
let selectedRoaster = null;

function sortItems(items, sortKey, nameField) {
  const sorted = [...items];
  switch (sortKey) {
    case 'recent':  sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    case 'oldest':  sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
    case 'az':      sorted.sort((a, b) => (a[nameField] || '').localeCompare(b[nameField] || '')); break;
    case 'za':      sorted.sort((a, b) => (b[nameField] || '').localeCompare(a[nameField] || '')); break;
    default:        sorted.sort((a, b) => (a[nameField] || '').localeCompare(b[nameField] || '')); break;
  }
  return sorted;
}

function setupSortButtons(onSort) {
  const sidebar = document.getElementById('dye-sort-sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('.dye-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
      btn.classList.add('dye-sort-active');
      onSort(btn.dataset.sort);
    });
  });
}

function renderCards(grid, items, nameField, selectedValue, onSelect, addLabel, onAdd) {
  grid.innerHTML = '';

  const addCard = document.createElement('div');
  addCard.className = 'dye-card dye-card-add';
  addCard.innerHTML = '<span>' + addLabel + '</span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  if (onAdd) addCard.addEventListener('click', onAdd);
  grid.appendChild(addCard);

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'dye-card';
    const value = typeof item === 'string' ? item : item[nameField];
    card.textContent = value;
    if (value === selectedValue) card.classList.add('dye-card-selected');
    card.addEventListener('click', () => {
      grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
      card.classList.add('dye-card-selected');
      onSelect(item);
    });
    grid.appendChild(card);
  });
}

async function initializeDyeRoasters() {
  const grid = document.getElementById('dye-cards-grid');
  const cancelBtn = document.getElementById('dye-cancel-btn');
  const confirmBtn = document.getElementById('dye-confirm-btn');
  if (!grid) return;

  // Pre-select roaster from the bean chosen in step 1
  const beanRoaster = sessionStorage.getItem('dye_selectedBeanRoaster') || '';
  selectedRoaster = sessionStorage.getItem('dye_selectedRoaster') || beanRoaster || null;
  if (selectedRoaster) sessionStorage.setItem('dye_selectedRoaster', selectedRoaster);
  let currentSort = 'recent';

  if (!beansCache) {
    try { beansCache = await getBeans(); }
    catch (e) { console.error('Failed to load beans:', e); beansCache = []; }
  }

  function getRoasterItems() {
    const roasterMap = new Map();
    (Array.isArray(beansCache) ? beansCache : (beansCache.items || [])).forEach(bean => {
      if (!bean.roaster) return;
      if (!roasterMap.has(bean.roaster)) {
        roasterMap.set(bean.roaster, { name: bean.roaster, createdAt: bean.createdAt, updatedAt: bean.updatedAt });
      } else {
        const existing = roasterMap.get(bean.roaster);
        if (new Date(bean.createdAt) > new Date(existing.createdAt)) existing.createdAt = bean.createdAt;
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
    renderCards(
      grid,
      sortItems(getRoasterItems(), currentSort, 'name'),
      'name',
      selectedRoaster,
      (roaster) => {
        selectedRoaster = roaster.name;
        sessionStorage.setItem('dye_selectedRoaster', roaster.name);
        updateConfirmButton();
      },
      'ADD NEW ROASTER +',
      () => { window.location.href = '/api/v1/plugins/dye2.reaplugin/add-bean'; }
    );
  }

  render();
  updateConfirmButton();
  setupSortButtons((sort) => { currentSort = sort; render(); });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      ['dye_selectedBeanId','dye_selectedBeanName','dye_selectedBeanRoaster','dye_selectedRoaster']
        .forEach(k => sessionStorage.removeItem(k));
      window.history.back();
    });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (!selectedRoaster) return;
      const coffeeName    = sessionStorage.getItem('dye_selectedBeanName') || '';
      const coffeeRoaster = selectedRoaster;
      const beanBatchId   = sessionStorage.getItem('dye_selectedBatchId') || undefined;
      try {
        await updateWorkflow({ context: { coffeeName, coffeeRoaster, beanBatchId } });
      } catch (e) {
        console.error('Failed to update workflow:', e);
      }
      ['dye_selectedBeanId','dye_selectedBeanName','dye_selectedBeanRoaster','dye_selectedRoaster','dye_selectedBatchId']
        .forEach(k => sessionStorage.removeItem(k));
      window.history.back();
    });
  }
}

initializeDyeRoasters().catch(e => console.error('initializeDyeRoasters failed:', e));

// Returning from an add flow restores this page frozen from bfcache — reload to re-fetch.
window.addEventListener('pageshow', function(e) { if (e.persisted) window.location.reload(); });
`;
	function renderRoastersPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Select Roaster", content$2, styles$6, [devApiScript, pageScript$6])
		};
	}
	//#endregion
	//#region src/pages/add-bean.ts
	var styles$5 = `
  .dye-form-label {
    width: 135px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: var(--mimoja-blue);
    flex-shrink: 0;
    line-height: 1.2;
  }
  .dye-form-input-wrap {
    flex: 1;
    border: 2px solid var(--profile-button-outline-color);
    display: flex;
    align-items: center;
    padding: 23px 15px 23px 23px;
    position: relative;
  }
  .dye-form-input {
    flex: 1;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
    background: transparent;
    border: none;
    outline: none;
    line-height: 1.2;
    width: 100%;
  }
  .dye-form-input::placeholder { color: var(--low-contrast-white); }
  .dye-form-icon { flex-shrink: 0; margin-left: 8px; }

  .dye-dropdown-wrap { position: relative; }
  .dye-dropdown-toggle { cursor: pointer; transition: transform 0.2s; }
  .dye-dropdown-wrap.dye-dropdown-open .dye-dropdown-toggle { transform: rotate(180deg); }

  .dye-dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: -2px;
    right: -2px;
    max-height: 360px;
    overflow-y: auto;
    background: var(--profile-button-background-color);
    border: 2px solid var(--profile-button-outline-color);
    border-top: none;
    z-index: 50;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
  .dye-dropdown-wrap.dye-dropdown-open .dye-dropdown-menu { display: block; }
  .dye-dropdown-item {
    padding: 18px 23px;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dye-dropdown-item:hover, .dye-dropdown-item.dye-dropdown-highlight { background: var(--mimoja-blue); color: #fff; }
  .dye-dropdown-item + .dye-dropdown-item { border-top: 1px solid var(--profile-button-outline-color); }
  .dye-dropdown-empty { padding: 18px 23px; font-family: 'Inter', sans-serif; font-size: 22px; color: var(--low-contrast-white); font-style: italic; }
  .dye-dropdown-menu::-webkit-scrollbar { width: 12px; }
  .dye-dropdown-menu::-webkit-scrollbar-track { background: transparent; }
  .dye-dropdown-menu::-webkit-scrollbar-thumb { background: var(--profile-button-outline-color); border-radius: 6px; border: 3px solid transparent; background-clip: padding-box; }

  .dye-form-textarea-wrap { align-items: flex-start; }
  .dye-form-textarea {
    flex: 1;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: var(--text-primary);
    background: transparent;
    border: none;
    outline: none;
    line-height: 1.2;
    width: 100%;
    min-height: 479px;
    resize: vertical;
  }
  .dye-form-textarea::placeholder { color: var(--low-contrast-white); }
`;
	var content$1 = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">
  <div class="flex justify-between items-center px-[37px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[165px]">
    <h1 class="text-[38px] font-bold text-[var(--text-primary)] no-select">Add New Beans</h1>
    <div class="flex items-center gap-[16px]">
      <button id="dye-cancel-btn" class="flex justify-center items-center w-[240px] h-[82px] py-[27px] rounded-[68px] font-bold text-[24px] text-[var(--text-primary)]">
        CANCEL
      </button>
      <button id="dye-confirm-btn" class="bg-[var(--mimoja-blue)] text-white flex items-center justify-center w-[240px] h-[82px] py-[27px] rounded-[68px] font-bold text-[24px]">
        CONFIRM
      </button>
    </div>
  </div>
  <div class="flex-1 flex items-center justify-center overflow-y-auto">
    <div id="dye-add-bean-form" class="flex flex-col gap-[30px] w-[1200px]">
      <div class="flex gap-[30px] items-center">
        <label class="dye-form-label">Beans</label>
        <div class="dye-form-input-wrap dye-dropdown-wrap">
          <input id="dye-bean-name" type="text" class="dye-form-input" placeholder="Enter bean name..." autocomplete="off">
          <svg class="dye-form-icon dye-dropdown-toggle" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          <div id="dye-bean-name-dropdown" class="dye-dropdown-menu"></div>
        </div>
      </div>
      <div class="flex gap-[30px] items-center">
        <label class="dye-form-label">Roaster</label>
        <div class="dye-form-input-wrap dye-dropdown-wrap">
          <input id="dye-bean-roaster" type="text" class="dye-form-input" placeholder="Enter or select roaster..." autocomplete="off">
          <svg class="dye-form-icon dye-dropdown-toggle" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          <div id="dye-bean-roaster-dropdown" class="dye-dropdown-menu"></div>
        </div>
      </div>
      <div class="flex gap-[30px] items-center">
        <label class="dye-form-label">Roast Date</label>
        <div class="dye-form-input-wrap">
          <input id="dye-bean-roast-date" type="date" class="dye-form-input">
          <svg class="dye-form-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
        </div>
      </div>
      <div class="flex gap-[30px] items-start">
        <label class="dye-form-label pt-[23px]">Bean Notes</label>
        <div class="dye-form-input-wrap dye-form-textarea-wrap">
          <textarea id="dye-bean-notes" class="dye-form-textarea" placeholder="Enter tasting notes, description..." rows="12"></textarea>
        </div>
      </div>
    </div>
  </div>
</div>
`;
	var pageScript$5 = `
let beansCache = null;

function setupDropdown(inputId, dropdownId, items) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  const wrap = input && input.closest('.dye-dropdown-wrap');
  if (!input || !dropdown || !wrap) return;

  const chevron = wrap.querySelector('.dye-dropdown-toggle');
  let highlightIndex = -1;

  function renderOptions(filter) {
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
      item.addEventListener('mouseenter', () => { clearHighlight(); highlightIndex = i; item.classList.add('dye-dropdown-highlight'); });
      item.addEventListener('mouseleave', () => { item.classList.remove('dye-dropdown-highlight'); highlightIndex = -1; });
      dropdown.appendChild(item);
    });
  }

  function clearHighlight() { dropdown.querySelectorAll('.dye-dropdown-highlight').forEach(el => el.classList.remove('dye-dropdown-highlight')); }
  function openDropdown() { wrap.classList.add('dye-dropdown-open'); renderOptions(input.value); }
  function closeDropdown() { wrap.classList.remove('dye-dropdown-open'); highlightIndex = -1; }
  function isOpen() { return wrap.classList.contains('dye-dropdown-open'); }

  if (chevron) {
    chevron.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isOpen() ? closeDropdown() : (input.focus(), openDropdown());
    });
  }

  input.addEventListener('focus', () => openDropdown());
  input.addEventListener('blur', () => setTimeout(closeDropdown, 150));
  input.addEventListener('input', () => { if (!isOpen()) openDropdown(); renderOptions(input.value); });
  input.addEventListener('keydown', (e) => {
    if (!isOpen()) { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { openDropdown(); e.preventDefault(); } return; }
    const visibleItems = dropdown.querySelectorAll('.dye-dropdown-item');
    if (visibleItems.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); clearHighlight(); highlightIndex = (highlightIndex + 1) % visibleItems.length; visibleItems[highlightIndex].classList.add('dye-dropdown-highlight'); visibleItems[highlightIndex].scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); clearHighlight(); highlightIndex = highlightIndex <= 0 ? visibleItems.length - 1 : highlightIndex - 1; visibleItems[highlightIndex].classList.add('dye-dropdown-highlight'); visibleItems[highlightIndex].scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter') { e.preventDefault(); if (highlightIndex >= 0 && visibleItems[highlightIndex]) { input.value = visibleItems[highlightIndex].textContent; closeDropdown(); input.dispatchEvent(new Event('change')); } else { closeDropdown(); } }
    else if (e.key === 'Escape') { closeDropdown(); }
  });
}

async function initializeDyeAddBean() {
  const cancelBtn = document.getElementById('dye-cancel-btn');
  const confirmBtn = document.getElementById('dye-confirm-btn');
  const nameInput = document.getElementById('dye-bean-name');
  const roasterInput = document.getElementById('dye-bean-roaster');
  const roastDateInput = document.getElementById('dye-bean-roast-date');
  const notesInput = document.getElementById('dye-bean-notes');

  if (!nameInput) return;

  if (!beansCache) {
    try { beansCache = await getBeans(); }
    catch (e) { console.error('Failed to load beans:', e); beansCache = []; }
  }

  const beanNames = [...new Set(beansCache.map(b => b.name).filter(Boolean))].sort();
  const roasters = [...new Set(beansCache.map(b => b.roaster).filter(Boolean))].sort();

  setupDropdown('dye-bean-name', 'dye-bean-name-dropdown', beanNames);
  setupDropdown('dye-bean-roaster', 'dye-bean-roaster-dropdown', roasters);

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => { window.location.href = '/api/v1/plugins/dye2.reaplugin/bean-picker'; });
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
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
        const bean = await createBean({ roaster, name, notes: notesInput.value.trim() || null });
        if (roastDateInput.value && bean.id) {
          await createBeanBatch(bean.id, { roastDate: new Date(roastDateInput.value).toISOString() });
        }
        beansCache = null;
        window.location.href = '/api/v1/plugins/dye2.reaplugin/bean-picker';
      } catch (e) {
        console.error('Failed to create bean:', e);
      }
    });
  }
}

initializeDyeAddBean().catch(e => console.error('initializeDyeAddBean failed:', e));
`;
	function renderAddBeanPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Add New Beans", content$1, styles$5, [devApiScript, pageScript$5])
		};
	}
	//#endregion
	//#region src/utils/chart.ts
	/**
	* Browser-side Plotly chart logic for the dashboard page.
	* Exported as a string to be inlined as a <script> block.
	* Requires Plotly loaded via CDN before this script runs.
	*
	* Design follows streamline_project/src/modules/chart.js:
	* - Single Y-axis [0,10]; temperature scaled ÷10 to overlay
	* - Weight shown as smoothed flow rate (derivative), not raw weight
	* - Inline end-of-trace annotations, no legend
	* - Step marker vertical line on substate change
	*/
	var chartScript = `
var CHART_SMOOTHING = 0.1;

var CHART_COLORS = {
  pressure:          '#17c29a',
  flow:              '#0358cf',
  targetPressure:    '#bde2d5',
  targetFlow:        '#cdd9f5',
  temperature:       '#ff97a1',
  targetTemperature: '#F9ebec',
  weight:            '#D8BDA8',
};

function chartGetAnnotations(tracks) {
  var skip = ['targetPressure', 'targetFlow', 'targetTemperature'];
  var nameMap = { pressure: 'Pressure', flow: 'Flow', temperature: '°C', weight: 'Weight' };
  var candidates = [];

  Object.keys(tracks).forEach(function(key) {
    if (skip.indexOf(key) !== -1) return;
    var tr = tracks[key];
    if (tr.x.length > 0) {
      candidates.push({
        name:  nameMap[key] || key,
        x:     tr.x[tr.x.length - 1],
        y:     tr.y[tr.y.length - 1],
        color: CHART_COLORS[key] || '#999',
      });
    }
  });

  candidates.sort(function(a, b) { return a.y - b.y; });

  var annotations = [];
  var lastY = -Infinity;
  var minSep = 0.4;
  var minBuf = 0.2;

  candidates.forEach(function(c) {
    var fy = Math.max(c.y, minBuf);
    if (lastY !== -Infinity && fy - lastY < minSep) fy = lastY + minSep;
    annotations.push({
      x: c.x, y: fy,
      xref: 'x', yref: 'y',
      text: c.name,
      showarrow: false,
      xanchor: 'left', yanchor: 'middle',
      xshift: 6,
      font: { color: c.color, size: 13 },
    });
    lastY = fy;
  });

  return annotations;
}

function chartBuildLayout(shapes, annotations) {
  return {
    plot_bgcolor:  'transparent',
    paper_bgcolor: 'transparent',
    font: { family: 'Inter, sans-serif', color: '#64748b', size: 13 },
    shapes:      shapes      || [],
    annotations: annotations || [],
    xaxis: {
      gridcolor:  '#e2e8f0',
      linecolor:  '#e2e8f0',
      tickcolor:  '#e2e8f0',
      tickfont:   { color: '#64748b' },
      dtick:      1,
      fixedrange: true,
      zeroline:   false,
    },
    yaxis: {
      gridcolor:  '#e2e8f0',
      linecolor:  '#e2e8f0',
      tickcolor:  '#e2e8f0',
      tickfont:   { color: '#64748b' },
      range:      [0, 10],
      dtick:      1,
      fixedrange: true,
      zeroline:   false,
    },
    autosize:   true,
    margin:     { l: 40, r: 60, t: 10, b: 36, pad: 0 },
    showlegend: false,
  };
}

function chartMakeTracks() {
  return {
    pressure:          { x: [], y: [], name: 'Pressure',         type: 'scatter', mode: 'lines', line: { color: '#17c29a', width: 2 },              hoverinfo: 'name' },
    flow:              { x: [], y: [], name: 'Flow',             type: 'scatter', mode: 'lines', line: { color: '#0358cf', width: 2 },              hoverinfo: 'name' },
    targetPressure:    { x: [], y: [], name: 'Target Pressure',  type: 'scatter', mode: 'lines', line: { color: '#bde2d5', width: 1.5, dash: 'dot' }, hoverinfo: 'name' },
    targetFlow:        { x: [], y: [], name: 'Target Flow',      type: 'scatter', mode: 'lines', line: { color: '#cdd9f5', width: 1.5, dash: 'dot' }, hoverinfo: 'name' },
    temperature:       { x: [], y: [], name: '°C',               type: 'scatter', mode: 'lines', line: { color: '#ff97a1', width: 2 },              hoverinfo: 'name' },
    targetTemperature: { x: [], y: [], name: 'Target °C',        type: 'scatter', mode: 'lines', line: { color: '#F9ebec', width: 1.5, dash: 'dot' }, hoverinfo: 'name' },
    weight:            { x: [], y: [], name: 'Weight',           type: 'scatter', mode: 'lines', line: { color: '#D8BDA8', width: 2 },              hoverinfo: 'name' },
  };
}

function initChart() {
  // Plotly loads via CDN — nothing to eagerly init.
}

function plotHistoricalShot(measurements, workflow) {
  var el = document.getElementById('plotly-chart');
  if (!el) return;

  if (!measurements || measurements.length === 0) {
    el.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--low-contrast-white);font-size:18px;">No shot data</div>';
    return;
  }

  // Find shot start: first preinfusion or pouring point
  var shotStartTime = null;
  for (var i = 0; i < measurements.length; i++) {
    var m0 = measurements[i].machine;
    if (m0 && m0.state && (m0.state.substate === 'preinfusion' || m0.state.substate === 'pouring')) {
      shotStartTime = new Date(m0.timestamp || measurements[i].timestamp);
      break;
    }
  }
  if (!shotStartTime) {
    el.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--low-contrast-white);font-size:18px;">No pour data</div>';
    return;
  }

  // Find shot end: last preinfusion or pouring point
  var shotEndTime = null;
  for (var j = measurements.length - 1; j >= 0; j--) {
    var mj = measurements[j].machine;
    if (mj && mj.state && (mj.state.substate === 'preinfusion' || mj.state.substate === 'pouring')) {
      shotEndTime = new Date(mj.timestamp || measurements[j].timestamp);
      break;
    }
  }

  var tracks             = chartMakeTracks();
  var shapes             = [];
  var lastScaleWeight    = 0;
  var lastScaleTime      = 0;
  var smoothedWeight     = 0;
  var prevSubstate       = null;

  for (var k = 0; k < measurements.length; k++) {
    var dp = measurements[k];
    var m  = dp.machine;
    var s  = dp.scale;

    if (m && m.state) {
      var sub = m.state.substate;
      if (sub === 'preinfusion' || sub === 'pouring') {
        var t = (new Date(m.timestamp || dp.timestamp) - shotStartTime) / 1000;
        if (t >= 0) {
          // Step marker when substate transitions (e.g. preinfusion → pouring)
          if (prevSubstate !== null && sub !== prevSubstate) {
            shapes.push({
              type: 'line', x0: t, x1: t, y0: 0, y1: 1, yref: 'paper',
              line: { color: '#94a3b8', width: 1.5, dash: 'longdash' },
            });
          }
          prevSubstate = sub;

          tracks.pressure.x.push(t);
          tracks.pressure.y.push(m.pressure != null ? m.pressure : null);

          tracks.flow.x.push(t);
          tracks.flow.y.push(m.flow != null ? m.flow : null);

          if (m.targetPressure != null) {
            tracks.targetPressure.x.push(t);
            tracks.targetPressure.y.push(m.targetPressure);
          }
          if (m.targetFlow != null) {
            tracks.targetFlow.x.push(t);
            tracks.targetFlow.y.push(m.targetFlow);
          }

          // Temperature: scale ÷10 to fit 0-10 y-axis (e.g. 93°C → 9.3)
          var temp = m.mixTemperature != null ? m.mixTemperature : (m.groupTemperature != null ? m.groupTemperature : null);
          if (temp != null) {
            tracks.temperature.x.push(t);
            tracks.temperature.y.push(temp / 10);
          }
          if (m.targetGroupTemperature != null) {
            tracks.targetTemperature.x.push(t);
            tracks.targetTemperature.y.push(m.targetGroupTemperature / 10);
          }
        }
      }
    }

    // Weight as smoothed flow rate (derivative)
    if (s && s.weight != null) {
      var scaleTs = new Date(s.timestamp || dp.timestamp);
      if (shotEndTime && scaleTs > shotEndTime) continue;
      var st = (scaleTs - shotStartTime) / 1000;
      if (st >= 0) {
        var wChange = 0;
        if (lastScaleTime > 0 && st > lastScaleTime) {
          var dt  = st - lastScaleTime;
          var raw = (s.weight - lastScaleWeight) / dt;
          smoothedWeight = CHART_SMOOTHING * raw + (1 - CHART_SMOOTHING) * smoothedWeight;
          wChange = smoothedWeight;
        }
        tracks.weight.x.push(st);
        tracks.weight.y.push(wChange);
        lastScaleWeight = s.weight;
        lastScaleTime   = st;
      }
    }
  }

  // Adaptive x-axis tick spacing
  var allX    = Object.values(tracks).reduce(function(acc, tr) { return acc.concat(tr.x); }, []);
  var maxTime = allX.length > 0 ? Math.max.apply(null, allX) : 0;
  var dtick   = maxTime < 15 ? 1 : maxTime < 60 ? 5 : maxTime < 100 ? 20 : 30;

  var annotations = chartGetAnnotations(tracks);
  var layout      = chartBuildLayout(shapes, annotations);
  var traces      = Object.values(tracks).filter(function(tr) { return tr.x.length > 0; });

  if (traces.length === 0) {
    el.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;color:var(--low-contrast-white);font-size:18px;">No sensor data</div>';
    return;
  }

  Plotly.react(el, traces, layout, { responsive: true, displayModeBar: false });
  Plotly.relayout(el, { 'xaxis.dtick': dtick });
}
`;
	//#endregion
	//#region src/utils/icons.ts
	/** Inlined icon assets from dev/dye/icons/ */
	var iconHistory = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAB3tJREFUeAHtnbtyE0kUho9v3KqwZQxVznbINkNkG8oZGd4nQGSb2RvtboScbQaEG62UbQZ+AkS22YonYMioAmNxqWINvuz/Wy1vazwSkjU63XKdr2rKo9ZYM9I/5/Tp7tM9IoZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGAUxIwqsrKzcOzo6eoTd9szMTG1nZ6chBVIqlZK5ubkKPvsWzpNwYzG2JHNo6q4hxTEv8Le1sLDQev36dSpTjoqQ165deyn//6jtd+/eLcsYJElS+vTpU/nw8PAeXq5LR7RxaFFUbI23b982ZQrREvLIfw0hz3Te69evV/DnLgSsyvji9SOFoFuw1OY0WepUCEkB4QofYKuIHim2+oULFxrTIGjUQt64cYPu8+EQArLea3XrvYODgxbLQOofxLp0fn6edWiJn+nq1G999rGFol6vS8REKSTrwA8fPjzA7uaAw9rYGrOzs0/HqdcgbomBEgRlXXtvwKEprHMtVuuMTkhaISzqiZyOOI+BdTRpIZMISrrRL914n/Pz5tnC9T+SyIhKSBy3gT81yQlkJilgn2upScdCk5y3a/gOWxIR0QiJY2gFtZx/T+E+74doFtBCce6a5Lhc3FR11Jv3JRJmJQLQYfCn5IiIH+sxgp3bodp2DJZw01Wx+7N03OoJcL9V3Hz/SCQEF5Ii8kfJFDMKvY87fpOhpwSGdSJvKOk0SXzK7iYMTlAh+4iY4kdbiy3cp3XyuiQjJq8f7dyHEphgQg4SET9aSyKkn5go24Sb3ZSABAl2GCgMEDGVglhdXU329/cZCQs6Ah4X1QZ0QdAz6Y1o22hn3g7VzgwiZA6Fi+jOy2CkzH02X+Cu16QgIGbZiXnSVCr6HKMQQ9Q6EREd5e5O0f20zv33tCV5jlAuNgaL3OL4oAzJKKMSRY26DGJ5efkJrn/dK2ovLi7eTNNUNdqOxbWOBFza2jBtSw0hXX1JF+73RrEbryaKRNEhMCpuQDkKXJXwOFO8wY5/UURFSAYBUiD4vOcSEbixjtNYvCKO3qjWlSqu1bkffrElGZ9Xw7otDdfqnauGPw+8Inbv3RQlVIQMhaaQHNfEzcrcpBOXOmxdXgRTWUfGCPuE0fxo+mVusFoFE7JAMCjdE/RAyLuihAlZIOgOzPYRJ4wPRAETskDoXrMROlNHRAETsmCYyZcpKosCJmTBMB3Tf402ZiIKmJAFgyZHj5AQ9jtRwIQsmK9fv2Y7y1W66lSE5GwsNM53OZmH+xIIDjTLhMkZjktEARUhEQDUxE1zc9PrgvDly5dnTLvUEFQbLdeaePuaowLtnOuonUdBz3UdiUCD+ahpzluJnDNBQ0x0ZUh+c0KpHadwIy9V6Z/+T1IpaAqdO99L/7M1RkG0LDJIJHd84k62eM2lMTLHJs05LJGCLJTT9rKXIApoDSyn/mt0W6n0dvhoCcq5l5nXr0QBrag1+2XUhewyqqCjpmxks/WyPT2TQssis1/mlgRmWEE/fvw40pgiZ0FnXqsIqZnq4QcAsri4uKydMjiIfkHRKIGZyxLY9cu0AjsVi3RfJPXLuLyKRIRvoZwJhqI6UzVGESFnyKqlFZ3Pix7b2Da6L1CXcL8pkeF++LrbRiWbEaA2GUmtQ4CLNvivGRRo535OEka42YlJ+M4NUUJNSJdNlnpF6rmfkwSjHpVMUao501q7iy57h26cF6t0K4GcwIUrRBFVIWPIyJ4EbiGLxCtKDw4OmqKIqpBuPYBT8ySmudPaXXs1U9zQila7qI9+5Fkl6pfgc/DPCq79lDXiO9ZFmTlR5l9w+fLlPeze8Yq/R9n7z58//y1ThFvg6Ve/jENnu7u7TVEm2NyPlZWVZ5l+yTYa1Gtv3rxRa3uNwypcKvpis/MiVSfu+AQbWEYwwN6THhfLNeimob50IvasHwDart82CMGEdMFANkQ//oFiFtMTMcm8taUd4Pio15E+rBNRN3JZ7B+8Ylrm+tLS0jb6Y6PpVCeDRIRL/V0CEsX8SNSXXHcnmyYZ1fqo/ZYf5TroOzs7VQlMFMlX7oc4NZOJwUToFaUIo1OIeMoS3bo6VYmAoK7VB272jytXrjDi84e3LmG7g/IErvaFtqulK7148SIXDdx013KCs8QfJRKiEZJAzKeoM+nuK5m36NbW8V4Jx0x8IQj2/2Lk4hecsy45aSlcfhQi/iQREZWQBEI12TkgnQDItwKG+hW8V4WFvoeFtou20K6Ae3t7f0mnw+JS5hCe7zftNXSGIYpgJ48+C/f1wMUJ8Wf76tWrzbOmjXQfBgPr28DnVaRPqibrQ7Z9QzYxBhGtkF0Q0VYHLBZ/glvznI+MeI6/7f39/TTvcRELCwslNNzL7lER5WEeRSGRLkjvE72QZMhs8aI5HqlhJ38Mqzh/i6kQsssQj3MoghRbY1oE7DJVQvrwMUvuGVnMIx03Iy/Ftj3uw2BCMrVC+jhLLbs67xbqv0QGPHYQx/AxSa/c45easQYwhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYQfgP1ujxf1YGJRcAAAAASUVORK5CYII=";
	var iconClipboard = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABPhJREFUeAHt3btS20AUBuCDY4aYgvFwGSj1COEJYt6AlKkIXbokVSZVTJcO0qXDfgLyBjgdHbxBlI6Ci2IKZwBDzglLIsvyRR55z67yfzMeXxJj4Z9drXa1KyIAAAAAAAAAAAAAAAAAAAAAAADIbIY8sry8XLu/v//It2f8tEo5mZmZafFd8/z8vEGeekKeWFxclAAb/DDg21PKV8C3zUqlQp1O5xt5yIsSKSXx7u7ukCwolUobZ2dnLfJMiTwg1SlZYvOz8lQmD5h94l+8T3vB+7OvlINqtfqMS+HxoM/yhRdVK+8f7+PPLy4uct3uaf98G9RLZBAE1Xa7/YYfbtJDoyO31uikksEaEdcEJ3zfnJ2dbZ2enobkENW/PP7CJMA6ZQxv2iVyDCGHuuPS4YpaY0cOJ/hujxwogRMIeF+6b34HJ6gEab6AOvmvvrS0tEkOsF61rq2tBdfX19JKjJfEiG87fKzYiFjyPS40drh1G3DrVkKTP8L4tocLCwvrYRhGpMh6iby5ualR4ovgANf5y9tLC9EVvGmhbCNv60bin4Krqyv1UqlRtW7Fn0ijQb6kEe/pCXhlZSW3Yz2pIYZ9Vt+GRJG0XHfir/H+8jkps374kTzg7na7rVHvkWY/v68We88xV4eUB67m+z5r1Hu4im1xyYw3dGqkTKNE9rRSxyiNf0ot2dMc9R9ub29DcowXfa2mE9tGmE4dG2bhRZCCGxp1LpnbZuwwV/Iz5WfLZ5CnvOg0f2RKS4OgjzclEoZDkAWBIAsCQU4moljHATeUQlKGICcgXYnSyuWHJ9Li5Q6KbVJmvdO8CKPxLkKJLAgEWRAIMgUPFm/xLuCSb9/lMXkAQabgkZY6PXTuyykdDR/CRJDpekZoJEw5250chiBT8CHFu+RrPP54kOeAdt4QZArTOZ8Ms8rHi4euhokgB5Dzc6h/DNTZMBHkEGZ8Mi3Mg5RzfVQhyBEGhCmndB66FCaCHIMPYSLIMbkeJoLMwIT5OfGyE2EiyIw4zLd8nJk8ZVI9TK9OvhrGrPgh0/S0Znc9hrmhMXeyEEFWmfS8kP4UPQlTtmOdLCtK1Vold+ZZqnQWFCJImXaQst9SwduRyyIVmT+XLJvmqR6yQke5XLZSMrkq36X+0nci0+40pgcWprEjzJS3qePxyX3qD1Hmeb7QmuOJw4+MzFJqrxIvh6YkhqQEQWYwYO0D9RAFghyTyyEKBDkG10MUCHIEH0IUCHKIASFGroUoEOQAseXV4pwMUSDIFOY81r3Ey48hWjlWzQpBpjAnKPeQ2VeuhigQZLqebj4JMa+FfqcFQaYwJyiH9LBG67YPS7ZgfmRBoEQWRKFGP2ySJbzNqpCRC/tPlMgJtdvtY1lFmW8HvLuokzIEOQFZhJceFtJ/pD5/UiPInoFXqaLIM+VyOUi8pL5gsPUgk+uhchX1ljzD1elW4vkPUmY9SP6lkxcRe+PazKZhZEpd8gyBUqmk3tixfrW6ubk5WWToNf274tzTbre7OT8//3N1dTXkbrBf5CDZBXBg7znEL9R7tTxZ6/z/WzBJcCtPqtNdKgBXen5Urh/Z6XSOKpWK/BHVyG87ZmazOrULgXKYLY/DlFbqBw7xEzlC9YquEibvM5tcPUmgst9ZI3dJB/oR3zd5XPLl5eVliwAAAAAAAAAAAAAAAAAAAAAAAAAAAACK6DftkSw8YeTq4wAAAABJRU5ErkJggg==";
	//#endregion
	//#region src/pages/dashboard.ts
	var styles$4 = `
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
	function buildContent$3() {
		return `
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
`;
	}
	var pageScript$4 = `
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
  // Profile name is only shown after the user copies a shot (see setupClipboardPaste); not set here.

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
	function renderDashboardPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Dashboard", buildContent$3(), styles$4, [
				devApiScript,
				chartScript,
				pageScript$4
			], { plotly: true })
		};
	}
	//#endregion
	//#region src/utils/lucide.ts
	/** Inline Lucide SVG icons — only icons used in DYE2 redesign */
	var PATHS = {
		search: "<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>",
		"chevron-left": "<path d=\"m15 18-6-6 6-6\"/>",
		"chevron-right": "<path d=\"m9 18 6-6-6-6\"/>",
		"chevron-down": "<path d=\"m6 9 6 6 6-6\"/>",
		"chevron-up": "<path d=\"m18 15-6-6-6 6\"/>",
		history: "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M12 7v5l4 2\"/>",
		"clipboard-paste": "<path d=\"M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z\"/><path d=\"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2\"/><path d=\"M16 12H8\"/><path d=\"M16 16H8\"/>",
		star: "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/>",
		"check-circle": "<path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"/><path d=\"m9 11 3 3L22 4\"/>",
		pencil: "<path d=\"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z\"/><path d=\"m15 5 4 4\"/>",
		calendar: "<path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18\"/>",
		"maximize-2": "<polyline points=\"15 3 21 3 21 9\"/><polyline points=\"9 21 3 21 3 15\"/><line x1=\"21\" y1=\"3\" x2=\"14\" y2=\"10\"/><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"/>",
		plus: "<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>",
		minus: "<path d=\"M5 12h14\"/>",
		x: "<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>",
		check: "<path d=\"M20 6 9 17l-5-5\"/>",
		trash: "<path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/>",
		"arrow-up": "<path d=\"m5 12 7-7 7 7\"/><path d=\"M12 19V5\"/>"
	};
	function lucideIcon(name, size = 36, color = "currentColor", strokeWidth = 2, fill = "none") {
		return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${PATHS[name] ?? "<circle cx=\"12\" cy=\"12\" r=\"10\"/>"}</svg>`;
	}
	//#endregion
	//#region src/utils/shared-components.ts
	/** Shared CSS + HTML factories for DYE2 redesign pages (1920×1200 layout) */
	function sortSidebarCss() {
		return `
  .dye-sort-btn {
    width: 135px; padding: 14px 0;
    border: 2px solid var(--mimoja-blue); border-radius: 23px;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 21px;
    text-align: center; color: var(--mimoja-blue); background: transparent;
    cursor: pointer; white-space: nowrap;
  }
  .dye-sort-btn.dye-sort-active { background: var(--mimoja-blue); color: #fff; }
  `;
	}
	function sortSidebarHtml() {
		return `<div id="dye-sort-sidebar" class="flex flex-col gap-[30px] items-start pt-[30px] pl-[37px] pr-[30px] shrink-0">
    ${[
			["recent", "Recent"],
			["oldest", "Oldest"],
			["az", "A-Z"],
			["za", "Z-A"],
			["most-used", "Most Used"],
			["least-used", "Least Used"]
		].map(([key, label], i) => `<button class="dye-sort-btn${i === 0 ? " dye-sort-active" : ""}" data-sort="${key}">${label}</button>`).join("\n    ")}
  </div>`;
	}
	function pickerCardCss() {
		return `
  .dye-card {
    border-radius: 15px; display: flex; flex-direction: column;
    align-items: flex-start; justify-content: center; padding: 16px 20px;
    font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 400;
    cursor: pointer; background: var(--box-color);
    border: 1px solid var(--profile-button-outline-color);
    color: var(--text-primary); transition: background 0.15s, color 0.15s;
    user-select: none; min-height: 90px;
  }
  .dye-card:hover { opacity: 0.85; }
  .dye-card.dye-card-selected { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }
  .dye-card-add {
    border-color: var(--mimoja-blue); color: var(--mimoja-blue);
    font-weight: 700; flex-direction: row; align-items: center;
    justify-content: center; gap: 8px; background: var(--box-color);
  }
  .dye-card-add svg { stroke: var(--mimoja-blue); }
  .dye-card-name { font-size: 24px; font-weight: 600; line-height: 1.3; }
  .dye-card-sub  { font-size: 20px; font-weight: 400; opacity: 0.7; margin-top: 2px; }
  .dye-card-divider { border: none; border-top: 1px solid var(--profile-button-outline-color); width: 100%; margin: 8px 0; }
  .dye-card-date { font-size: 18px; font-weight: 400; opacity: 0.6; }
  .dye-card.dye-card-selected .dye-card-divider { border-color: rgba(255,255,255,0.3); }
  #dye-cards-container::-webkit-scrollbar { width: 45px; }
  #dye-cards-container::-webkit-scrollbar-track { background: transparent; }
  #dye-cards-container::-webkit-scrollbar-thumb {
    background: var(--profile-button-outline-color);
    border-radius: 53px; border: 14px solid transparent;
    background-clip: padding-box;
  }
  `;
	}
	function pickerHeaderHtml(title, primaryLabel, primaryDisabled = true) {
		return `<div class="flex justify-between items-center px-[37px] border-b border-[var(--profile-button-outline-color)] bg-[var(--box-color)] h-[165px] shrink-0">
    <h1 class="text-[38px] font-bold text-[var(--text-primary)] no-select">${title}</h1>
    <div class="flex items-center gap-[16px]">
      <button id="dye-cancel-btn" class="flex justify-center items-center w-[240px] h-[82px] rounded-[68px] font-bold text-[24px] text-[var(--text-primary)]">CANCEL</button>
      <button id="dye-confirm-btn" class="bg-[var(--mimoja-blue)] text-white flex items-center justify-center w-[240px] h-[82px] rounded-[68px] font-bold text-[24px]${primaryDisabled ? " opacity-50" : ""}">${primaryLabel}</button>
    </div>
  </div>`;
	}
	function stepperCss() {
		return `
  .dye-stepper-btn {
    display: flex; align-items: center; justify-content: center;
    width: 72px; height: 72px; background: #EDEDED;
    border-radius: 15px; cursor: pointer; flex-shrink: 0;
  }
  .dye-stepper-val {
    font-weight: 700; font-size: 26px; color: var(--text-primary);
    text-align: center; min-width: 72px;
  }
  .dye-stepper-sub {
    font-size: 18px; font-weight: 600; color: var(--text-primary); text-align: center;
  }
  .dye-stepper-label { font-weight: 700; font-size: 24px; color: var(--mimoja-blue); }
  `;
	}
	function stepperHtml(idPrefix, label, labelWidth = "75px", showSub = false, subHtml = "") {
		const minusSvg = lucideIcon("minus", 28, "var(--text-primary)", 2.5);
		const plusSvg = lucideIcon("plus", 28, "var(--text-primary)", 2.5);
		return `<div class="flex items-center gap-[18px]">
    ${subHtml ? `<div class="flex flex-col" style="width:${labelWidth};flex-shrink:0">
         <span class="dye-stepper-label">${label}</span>
         ${subHtml}
       </div>` : `<span class="dye-stepper-label" style="width:${labelWidth};flex-shrink:0">${label}</span>`}
    <div class="flex items-center gap-[15px]">
      <button id="${idPrefix}-minus" class="dye-stepper-btn">${minusSvg}</button>
      <div class="flex flex-col items-center" style="min-width:72px">
        <span id="${idPrefix}-value" class="dye-stepper-val">—</span>
        ${showSub ? `<span id="${idPrefix}-sub" class="dye-stepper-sub"></span>` : ""}
      </div>
      <button id="${idPrefix}-plus" class="dye-stepper-btn">${plusSvg}</button>
    </div>
  </div>`;
	}
	function presetStripCss() {
		return `
  .dye-preset {
    font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 400;
    color: var(--text-primary-disabled); background: none; border: none;
    cursor: pointer; padding: 0; white-space: nowrap;
  }
  .dye-preset.dye-preset-active { color: var(--mimoja-blue); font-weight: 700; }
  `;
	}
	function presetStripHtml(idPrefix, presets) {
		return `<div id="${idPrefix}-presets" class="flex items-center gap-[30px] mt-[6px]">${presets.map((p) => `<button class="dye-preset" data-preset="${p}" data-for="${idPrefix}">${p}</button>`).join("")}</div>`;
	}
	function toggleCss() {
		return `
  .dye-toggle-track {
    position: relative; width: 64px; height: 36px; border-radius: 9999px;
    background: #D1D5DB; transition: background 0.2s; cursor: pointer;
    flex-shrink: 0; display: flex; align-items: center; padding: 4px;
  }
  .dye-toggle-track.on { background: var(--mimoja-blue); justify-content: flex-end; }
  .dye-toggle-thumb {
    width: 28px; height: 28px; border-radius: 9999px; background: #fff;
    display: flex; align-items: center; justify-content: center;
  }
  .dye-toggle-icon-on  { display: none; }
  .dye-toggle-icon-off { display: flex; }
  .dye-toggle-track.on .dye-toggle-icon-on  { display: flex; }
  .dye-toggle-track.on .dye-toggle-icon-off { display: none; }
  .dye-toggle-row {
    display: flex; align-items: center; gap: 20px;
    padding: 20px 0; border-bottom: 1px solid var(--profile-button-outline-color);
  }
  .dye-toggle-row:last-child { border-bottom: none; }
  .dye-toggle-label { font-size: 24px; font-weight: 400; color: var(--text-primary); width: 160px; flex-shrink: 0; }
  .dye-toggle-value { font-size: 24px; font-weight: 700; color: var(--text-primary); flex: 1; }
  .dye-toggle-value.off { color: var(--text-primary-disabled); font-weight: 400; }
  .dye-toggle-edit { cursor: pointer; flex-shrink: 0; opacity: 0.55; }
  .dye-toggle-edit:hover { opacity: 1; }
  `;
	}
	function segmentControlHtml(id, options, initialIdx = 0) {
		return `<div id="${id}" class="flex rounded-[15px] overflow-hidden border-2 border-[var(--mimoja-blue)]" style="height:72px">${options.map((opt, i) => `<button class="dye-seg-btn${i === initialIdx ? " active" : ""}" data-idx="${i}" data-for="${id}" style="flex:1;font-family:'Inter',sans-serif;font-size:24px;font-weight:600;cursor:pointer;${i === initialIdx ? "background:var(--mimoja-blue);color:#fff;" : "background:transparent;color:var(--text-primary);"}">${opt}</button>`).join("")}</div>`;
	}
	function starRatingHtml(id, count = 5, size = 36) {
		return `<div id="${id}" class="flex items-center gap-[8px]">${Array.from({ length: count }, (_, i) => `<svg class="dye-star" data-index="${i + 1}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="var(--profile-button-outline-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join("")}</div>`;
	}
	function expandFieldHtml(id, label, placeholder = "—") {
		return `<div class="flex items-center gap-[18px]">
    <span class="dye-stepper-label" style="width:120px;flex-shrink:0">${label}</span>
    <div class="flex items-center flex-1 border border-[var(--profile-button-outline-color)] rounded-[12px] px-[20px] h-[72px] bg-[var(--box-color)] gap-[12px]">
      <span id="${id}-text" class="flex-1 text-[24px] font-normal text-[var(--text-primary)]">${placeholder}</span>
      <button id="${id}-expand" class="flex-shrink-0">${lucideIcon("maximize-2", 26, "var(--mimoja-blue)", 2)}</button>
    </div>
  </div>`;
	}
	var sortSidebarScript = `
function setupSortButtons(onSort) {
  const sidebar = document.getElementById('dye-sort-sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('.dye-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sidebar.querySelectorAll('.dye-sort-btn').forEach(b => b.classList.remove('dye-sort-active'));
      btn.classList.add('dye-sort-active');
      onSort(btn.dataset.sort);
    });
  });
}
`;
	var toggleRowScript = `
function setupToggleRows(onChange) {
  document.querySelectorAll('.dye-toggle-track').forEach(track => {
    track.addEventListener('click', () => {
      const id = track.dataset.toggle;
      const isOn = track.classList.toggle('on');
      const valEl = document.getElementById(id + '-value');
      if (valEl) valEl.classList.toggle('off', !isOn);
      if (onChange) onChange(id, isOn);
    });
  });
}
function isToggleOn(id) {
  const t = document.getElementById(id + '-track');
  return t ? t.classList.contains('on') : false;
}
`;
	var segmentControlScript = `
function setupSegmentControls() {
  document.querySelectorAll('.dye-seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentId = btn.dataset.for;
      const parent = document.getElementById(parentId);
      if (!parent) return;
      parent.querySelectorAll('.dye-seg-btn').forEach((b, i) => {
        const active = i === parseInt(btn.dataset.idx);
        b.classList.toggle('active', active);
        b.style.background = active ? 'var(--mimoja-blue)' : 'transparent';
        b.style.color = active ? '#fff' : 'var(--text-primary)';
      });
    });
  });
}
`;
	var presetStripScript = `
function setupPresetStrips() {
  document.querySelectorAll('.dye-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const idPrefix = btn.dataset.for;
      const val = btn.dataset.preset;
      const valueEl = document.getElementById(idPrefix + '-value');
      if (valueEl) valueEl.textContent = val;
      const container = document.getElementById(idPrefix + '-presets');
      if (container) {
        container.querySelectorAll('.dye-preset').forEach(b => b.classList.toggle('dye-preset-active', b.dataset.preset === val));
      }
    });
  });
}
function syncPresetActive(idPrefix, currentVal) {
  const container = document.getElementById(idPrefix + '-presets');
  if (!container) return;
  container.querySelectorAll('.dye-preset').forEach(b => {
    b.classList.toggle('dye-preset-active', b.dataset.preset === String(currentVal));
  });
}
`;
	//#endregion
	//#region src/pages/edit-shot.ts
	var styles$3 = `
  ${stepperCss()}
  .edit-divider { height: 2px; background: var(--profile-button-outline-color); flex-shrink: 0; }
  .edit-label { font-weight: 700; font-size: 24px; color: var(--mimoja-blue); }
  .edit-value { font-size: 24px; font-weight: 400; color: var(--text-primary); }
  .beans-card {
    border: 1px solid var(--profile-button-outline-color);
    border-radius: 18px; padding: 24px 28px;
    background: var(--dye-surface, #F8FAFC);
    display: flex; flex-direction: column; gap: 12px;
  }
  .beans-card-name { font-size: 26px; font-weight: 700; color: var(--text-primary); }
  .beans-card-roaster { font-size: 22px; font-weight: 400; color: var(--text-primary); }
  .beans-card-age { font-size: 20px; font-weight: 400; color: var(--low-contrast-white); }
  .beans-card-notes { font-size: 20px; font-weight: 400; color: var(--text-primary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .beans-read-more { font-size: 20px; font-weight: 700; color: var(--mimoja-blue); cursor: pointer; margin-top: 4px; }
  .notes-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    z-index: 100; align-items: center; justify-content: center;
  }
  .notes-overlay.open { display: flex; }
  .notes-modal {
    background: var(--box-color); border-radius: 24px;
    padding: 40px 48px; max-width: 900px; width: 90%;
    max-height: 80vh; overflow-y: auto; font-size: 22px;
    line-height: 1.6; color: var(--text-primary);
  }
  .notes-modal h2 { font-size: 28px; font-weight: 700; margin-bottom: 20px; color: var(--mimoja-blue); }
  .notes-modal-close {
    margin-top: 30px; padding: 14px 40px;
    background: var(--mimoja-blue); color: #fff;
    border-radius: 9999px; font-size: 22px; font-weight: 700; cursor: pointer;
  }
  .footer-btn-danger {
    border: 2px solid #E53935; color: #E53935; border-radius: 23px;
    padding: 0 28px; height: 60px; font-size: 21px; font-weight: 600; cursor: pointer;
    font-family: 'Inter', sans-serif;
  }
  .footer-btn-ghost {
    border: 2px solid var(--mimoja-blue); color: var(--mimoja-blue); border-radius: 23px;
    padding: 0 28px; height: 60px; font-size: 21px; font-weight: 600; cursor: pointer;
    font-family: 'Inter', sans-serif;
  }
  .read-from-dropdown {
    display: none; position: absolute; bottom: calc(100% + 4px); left: 0;
    min-width: 220px; background: var(--box-color);
    border: 2px solid var(--profile-button-outline-color);
    border-radius: 15px; overflow: hidden;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.12); z-index: 50;
  }
  .read-from-dropdown.open { display: block; }
  .read-from-item {
    padding: 16px 23px; font-family: 'Inter', sans-serif;
    font-size: 21px; font-weight: 600; color: var(--text-primary);
    cursor: pointer; white-space: nowrap;
  }
  .read-from-item + .read-from-item { border-top: 1px solid var(--profile-button-outline-color); }
  .read-from-item:hover { background: var(--mimoja-blue); color: #fff; }
  .dye-name-dropdown {
    position: absolute; top: calc(100% + 4px); left: 0; right: 0;
    max-height: 320px; overflow-y: auto;
    background: var(--box-color); border: 2px solid var(--profile-button-outline-color);
    border-radius: 15px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); z-index: 50;
  }
`;
	function buildContent$2() {
		const searchSvg = lucideIcon("search", 42, "var(--mimoja-blue)", 2);
		const prevSvg = lucideIcon("chevron-left", 36, "var(--mimoja-blue)", 2.5);
		const nextSvg = lucideIcon("chevron-right", 36, "var(--mimoja-blue)", 2.5);
		lucideIcon("maximize-2", 26, "var(--mimoja-blue)", 2);
		const pencilSvg = lucideIcon("pencil", 26, "var(--text-primary-disabled)", 2);
		const chevUpSvg = lucideIcon("chevron-up", 24, "var(--mimoja-blue)", 2.5);
		return `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex flex-col font-['Inter',sans-serif]">

  <!-- Header bar -->
  <div class="flex items-center justify-between px-[38px] h-[110px] shrink-0 bg-[var(--box-color)] border-b border-[var(--profile-button-outline-color)]">
    <div>
      <div class="text-[30px] font-bold text-[var(--text-primary)]">
        Editing &nbsp;<span id="es-shot-label" class="text-[var(--mimoja-blue)]">Last Shot</span>
      </div>
      <div id="es-shot-subtitle" class="text-[22px] font-normal text-[var(--text-primary)] mt-[4px]">—</div>
    </div>
    <div class="flex items-center gap-[30px]">
      <button id="es-search-btn">${searchSvg}</button>
      <div class="flex items-center border-2 border-[var(--mimoja-blue)] rounded-[23px] overflow-hidden">
        <button id="es-prev-btn" class="flex items-center justify-center w-[60px] h-[54px]">${prevSvg}</button>
        <div class="w-[2px] h-[54px] bg-[var(--profile-button-outline-color)]"></div>
        <button id="es-next-btn" class="flex items-center justify-center w-[60px] h-[54px]">${nextSvg}</button>
      </div>
    </div>
  </div>

  <!-- Two-column body -->
  <div class="flex flex-1 overflow-hidden">

    <!-- LEFT COLUMN -->
    <div class="flex flex-col w-[960px] shrink-0 bg-white border-r border-[var(--profile-button-outline-color)] overflow-y-auto px-[38px] py-[32px] gap-[28px]">

      <!-- Dose / Drink (top row) -->
      <div class="flex items-center gap-[60px]">
        ${stepperHtml("es-dose", "Dose", "80px")}
        ${stepperHtml("es-drink", "Drink", "80px", true)}
      </div>
      <div class="edit-divider"></div>

      <!-- TDS / EY (second row) -->
      <div class="flex items-center gap-[60px]">
        ${stepperHtml("es-tds", "TDS", "80px")}
        ${stepperHtml("es-ey", "EY", "80px")}
      </div>
      <div class="edit-divider"></div>

      <!-- Beans card -->
      <div>
        <div class="edit-label mb-[14px]">Beans</div>
        <div class="beans-card" id="es-beans-card" style="cursor:pointer">
          <div class="beans-card-name" id="es-bean-name">—</div>
          <div class="beans-card-roaster" id="es-bean-roaster"></div>
          <div class="beans-card-age" id="es-bean-age"></div>
          <div class="beans-card-notes" id="es-bean-notes"></div>
          <div class="beans-read-more" id="es-read-more" style="display:none">READ MORE</div>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="flex flex-col flex-1 bg-[var(--bgmain-color)] overflow-y-auto px-[38px] py-[32px] gap-[28px]">

      <!-- Grinder -->
      ${expandFieldHtml("es-grinder", "Grinder")}
      <div class="edit-divider"></div>

      <!-- Setting / RPM -->
      <div class="flex items-center gap-[60px]">
        ${stepperHtml("es-setting", "Setting", "100px")}
        ${stepperHtml("es-rpm", "RPM", "100px")}
      </div>
      <div class="edit-divider"></div>

      <!-- Barista / Drinker -->
      ${expandFieldHtml("es-barista", "Barista")}
      ${expandFieldHtml("es-drinker", "Drinker")}

      <!-- Drinker Notes -->
      <div class="flex items-center gap-[18px]">
        <span class="dye-stepper-label" style="width:120px;flex-shrink:0">Drinker Notes</span>
        <div class="flex items-center flex-1 border border-[var(--profile-button-outline-color)] rounded-[12px] px-[20px] h-[72px] bg-[var(--box-color)] gap-[12px]">
          <span id="es-notes-preview" class="flex-1 text-[22px] font-normal text-[var(--text-primary)] truncate">—</span>
          <button id="es-notes-edit">${pencilSvg}</button>
        </div>
      </div>
      <div class="edit-divider"></div>

      <!-- Rating -->
      <div class="flex items-center gap-[18px]">
        <span class="dye-stepper-label" style="width:120px;flex-shrink:0">Rating</span>
        ${starRatingHtml("es-stars")}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="flex items-center px-[38px] h-[90px] shrink-0 bg-[var(--box-color)] border-t border-[var(--profile-button-outline-color)] gap-[18px]">
    <button id="es-delete-btn" class="footer-btn-danger">Delete Shot</button>
    <button id="es-clear-btn" class="footer-btn-ghost">Clear all</button>
    <div class="relative">
      <button id="es-read-from-btn" class="footer-btn-ghost flex items-center gap-[8px]">
        Read From ${chevUpSvg}
      </button>
      <div id="es-read-from-dropdown" class="read-from-dropdown">
        <div class="read-from-item" id="es-read-from-workflow">Current Workflow</div>
        <div class="read-from-item" id="es-read-from-prev">Previous Shot</div>
      </div>
    </div>
    <div class="flex-1"></div>
    <button id="es-cancel-btn" class="text-[24px] font-bold text-[var(--text-primary)] px-[30px] h-[62px]">CANCEL</button>
    <button id="es-save-btn" class="bg-[var(--mimoja-blue)] text-white rounded-[68px] h-[62px] px-[40px] text-[24px] font-bold cursor-pointer">SAVE SHOT DATA</button>
  </div>
</div>

<!-- Bean notes full modal (read-only) -->
<div id="es-notes-overlay" class="notes-overlay">
  <div class="notes-modal">
    <h2 id="es-modal-bean-name">Bean Notes</h2>
    <div id="es-modal-notes-body"></div>
    <button class="notes-modal-close" id="es-modal-close">Close</button>
  </div>
</div>

<!-- Drinker notes editor modal -->
<div id="es-drinker-notes-overlay" class="notes-overlay">
  <div class="notes-modal">
    <h2>Drinker Notes</h2>
    <textarea id="es-drinker-notes-input" placeholder="Add tasting notes…"
      style="width:100%;min-height:220px;font-family:'Inter',sans-serif;font-size:22px;line-height:1.6;color:var(--text-primary);border:2px solid var(--profile-button-outline-color);border-radius:15px;padding:16px 20px;outline:none;resize:vertical;box-sizing:border-box"></textarea>
    <div style="display:flex;gap:16px;margin-top:24px;justify-content:flex-end">
      <button class="notes-modal-close" id="es-drinker-notes-cancel" style="margin-top:0;background:transparent;color:var(--text-primary);border:2px solid var(--profile-button-outline-color)">Cancel</button>
      <button class="notes-modal-close" id="es-drinker-notes-save" style="margin-top:0">Save</button>
    </div>
  </div>
</div>
`;
	}
	var pageScript$3 = `
let currentShot = null;
let currentStarRating = 0;
let allShots = [];
let shotIndex = 0;

function formatShotDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  const label = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : diff + ' days ago';
  const time = d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit', hour12:true });
  const date = d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
  return { label, full: date + ', ' + time };
}

function calcRatio(doseIn, doseOut) {
  if (!doseIn || !doseOut || doseIn === 0) return '';
  return '(1:' + (doseOut / doseIn).toFixed(1) + ')';
}

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val ?? '—';
}

function wireAdjuster(minusId, plusId, valueId, step, min, max, formatter, onChange) {
  [minusId, plusId].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    let t = null;
    btn.addEventListener('click', () => {
      const el = document.getElementById(valueId);
      if (!el) return;
      const raw = parseFloat(el.textContent);
      // Empty field shows "—" → start from min (or 0) so + / − begin working.
      const base = isNaN(raw) ? (min != null ? min : 0) : raw;
      const delta = btnId === minusId ? -step : step;
      let val = parseFloat((base + delta).toFixed(3));
      if (min != null) val = Math.max(min, val);
      if (max != null) val = Math.min(max, val);
      el.textContent = formatter(val);
      clearTimeout(t);
      t = setTimeout(() => onChange(val), 500);
    });
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

function wfctx() {
  if (!currentShot) return {};
  currentShot.workflow = currentShot.workflow || {};
  currentShot.workflow.context = currentShot.workflow.context || {};
  return currentShot.workflow.context;
}

// Tap a text display (barista / drinker) to edit it inline.
function makeTextEditable(displayId, onCommit) {
  const el = document.getElementById(displayId);
  if (!el || el.querySelector('input')) return;
  const prev = el.textContent === '—' ? '' : el.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = prev;
  input.style.cssText = 'width:100%;font:inherit;border:1px solid var(--mimoja-blue);border-radius:8px;background:#fff;color:inherit;outline:none;padding:4px 8px';
  el.textContent = '';
  el.appendChild(input);
  input.focus(); input.select();
  let done = false;
  const commit = (apply) => {
    if (done) return; done = true;
    const v = input.value.trim();
    el.textContent = (apply ? v : prev) || '—';
    if (apply) onCommit(v);
  };
  input.addEventListener('keydown', ev => {
    if (ev.key === 'Enter') { ev.preventDefault(); commit(true); }
    else if (ev.key === 'Escape') { ev.preventDefault(); commit(false); }
  });
  input.addEventListener('blur', () => commit(true));
}

// Remembered barista/drinker names: past shots (already loaded) ∪ ones typed on this device.
function rememberedNames(storeKey, ctxKeys) {
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(storeKey) || '[]'); } catch (e) {}
  const set = new Set(saved);
  allShots.forEach(s => {
    const c = (s.workflow && s.workflow.context) || {};
    for (const k of ctxKeys) if (c[k]) set.add(c[k]);
  });
  return [...set].filter(Boolean).sort((a, b) => a.localeCompare(b));
}

function rememberName(storeKey, v) {
  if (!v) return;
  let list = [];
  try { list = JSON.parse(localStorage.getItem(storeKey) || '[]'); } catch (e) {}
  if (!list.includes(v)) { list.push(v); localStorage.setItem(storeKey, JSON.stringify(list)); }
}

// Expand button → dropdown of remembered names (＋ New… falls back to inline typing).
function openNameDropdown(fieldId, storeKey, ctxKeys, onPick) {
  const textEl = document.getElementById(fieldId + '-text');
  if (!textEl) return;
  const box = textEl.parentElement;
  const existing = box.querySelector('.dye-name-dropdown');
  if (existing) { existing.remove(); return; }  // toggle off
  box.style.position = 'relative';
  const dd = document.createElement('div');
  dd.className = 'dye-name-dropdown';

  const pick = (v) => { textEl.textContent = v || '—'; onPick(v); rememberName(storeKey, v); };
  const rows = [{ label: '＋ New…', act: () => makeTextEditable(fieldId + '-text', v => { onPick(v); rememberName(storeKey, v); }) }];
  rememberedNames(storeKey, ctxKeys).forEach(n => rows.push({ label: n, act: () => pick(n) }));

  rows.forEach(r => {
    const row = document.createElement('div');
    row.className = 'read-from-item';
    row.textContent = r.label;
    row.addEventListener('click', (e) => { e.stopPropagation(); dd.remove(); r.act(); });
    dd.appendChild(row);
  });
  box.appendChild(dd);
  setTimeout(() => document.addEventListener('click', function close(ev) {
    if (!dd.contains(ev.target)) { dd.remove(); document.removeEventListener('click', close); }
  }), 0);
}

// Full-page nav to a picker loses this page's unsaved edits, so stash the working shot
// (+ index + a return flag) first; initEditShot rehydrates it and applies the picker's pick.
function goToPicker(url) {
  try { sessionStorage.setItem('dye_editShotDraft', JSON.stringify(currentShot)); } catch (e) {}
  sessionStorage.setItem('dye_editShotIdx', String(shotIndex));
  sessionStorage.setItem('dye_editShotReturn', '1');
  window.location.href = url;
}

// Fold any grinder / bean selection made in a picker into the shot being edited.
function applyPendingSelections(shot) {
  shot.workflow = shot.workflow || {};
  shot.workflow.context = shot.workflow.context || {};
  const ctx = shot.workflow.context;
  const gId = sessionStorage.getItem('dye_selectedGrinderId');
  if (gId) { ctx.grinderId = gId; ctx.grinderModel = sessionStorage.getItem('dye_selectedGrinderModel') || ctx.grinderModel; }
  const bName = sessionStorage.getItem('dye_selectedBeanName');
  if (bName) {
    ctx.coffeeName = bName;
    ctx.coffeeRoaster = sessionStorage.getItem('dye_selectedBeanRoaster') || '';
    const bb = sessionStorage.getItem('dye_selectedBatchId');
    if (bb) ctx.beanBatchId = bb;
    const rd = sessionStorage.getItem('dye_selectedRoastDate');
    if (rd) ctx.roastDate = rd;
  }
}

function clearReturnKeys() {
  ['dye_editShotReturn','dye_editShotDraft','dye_editShotIdx',
   'dye_selectedGrinderId','dye_selectedGrinderModel',
   'dye_selectedBeanId','dye_selectedBeanName','dye_selectedBeanRoaster','dye_selectedBatchId']
    .forEach(k => sessionStorage.removeItem(k));
}

function renderShot(shot) {
  if (!shot) return;
  currentShot = shot;
  const { label, full } = formatShotDate(shot.timestamp || shot.createdAt || Date.now());
  set('es-shot-label', label);
  const wf = shot.workflow || {};
  const ctx = wf.context || {};
  const dd = wf.doseData || {};
  const gd = wf.grinderData || {};
  const profile = wf.profile || {};
  set('es-shot-subtitle', full + (profile.title ? '  •  ' + profile.title : ''));

  // Shot annotations are the canonical home for measured/entered values (see rea_restapi.yml
  // ShotRecordSummary.annotations). Legacy dd/gd kept as read fallbacks for old shots.
  const ann = shot.annotations || {};
  const doseIn  = ann.actualDoseWeight != null ? ann.actualDoseWeight : dd.doseIn;
  const doseOut = ann.actualYield      != null ? ann.actualYield      : dd.doseOut;
  set('es-dose-value',  doseIn  != null ? doseIn  + 'g' : '—');
  set('es-drink-value', doseOut != null ? doseOut + 'g' : '—');
  set('es-drink-sub', calcRatio(doseIn, doseOut));

  set('es-tds-value', ann.drinkTds != null ? ann.drinkTds + '%' : '—');
  set('es-ey-value',  ann.drinkEy  != null ? ann.drinkEy  + '%' : '—');

  const grinderName = ctx.grinderModel || gd.model || gd.name || '';
  const grinderEl = document.getElementById('es-grinder-text');
  if (grinderEl) grinderEl.textContent = grinderName || '—';

  set('es-setting-value', ctx.grinderSetting != null ? ctx.grinderSetting : (gd.setting != null ? gd.setting : '—'));
  set('es-rpm-value',     (ann.extras && ann.extras.rpm != null) ? ann.extras.rpm : (gd.rpm != null ? gd.rpm : '—'));

  const baristaEl = document.getElementById('es-barista-text');
  if (baristaEl) baristaEl.textContent = ctx.baristaName || ctx.barista || '—';
  const drinkerEl = document.getElementById('es-drinker-text');
  if (drinkerEl) drinkerEl.textContent = ctx.drinkerName || ctx.drinker || '—';

  const notes = ann.espressoNotes || '';
  set('es-notes-preview', notes ? notes.slice(0, 60) + (notes.length > 60 ? '…' : '') : '—');

  // Beans
  const beanName = ctx.coffeeName || '';
  const roaster  = ctx.coffeeRoaster || '';
  set('es-bean-name', beanName || '—');
  set('es-bean-roaster', roaster);
  if (ctx.roastDate) {
    const rd = new Date(ctx.roastDate);
    const diff = Math.floor((new Date() - rd) / 86400000);
    const ds = rd.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
    set('es-bean-age', ds + ' (' + diff + ' days off-roast)');
  } else {
    set('es-bean-age', '');
  }
  const beanNotes = ctx.coffeeNotes || '';
  set('es-bean-notes', beanNotes);
  const readMoreBtn = document.getElementById('es-read-more');
  if (readMoreBtn) readMoreBtn.style.display = beanNotes.length > 200 ? 'block' : 'none';

  // Stars
  const rating = ann.enjoyment ? parseInt(ann.enjoyment) : 0;
  currentStarRating = rating;
  updateStars(rating);
}

function updateStars(rating) {
  document.querySelectorAll('#es-stars .dye-star').forEach(s => {
    const idx = parseInt(s.getAttribute('data-index'));
    s.setAttribute('fill',   idx <= rating ? 'var(--mimoja-blue)' : 'none');
    s.setAttribute('stroke', idx <= rating ? 'var(--mimoja-blue)' : 'var(--profile-button-outline-color)');
  });
}

// Extract the dial-in numbers from a saved shot (annotations first, legacy dd/gd as fallback).
function shotDialing(shot) {
  const ann = (shot && shot.annotations) || {};
  const wf  = (shot && shot.workflow) || {};
  const ctx = wf.context || {}, dd = wf.doseData || {}, gd = wf.grinderData || {};
  return {
    dose:  ann.actualDoseWeight != null ? ann.actualDoseWeight : dd.doseIn,
    yield: ann.actualYield      != null ? ann.actualYield      : dd.doseOut,
    grind: ctx.grinderSetting   != null ? ctx.grinderSetting   : gd.setting,
    rpm:   (ann.extras && ann.extras.rpm != null) ? ann.extras.rpm : gd.rpm,
    barista: ctx.baristaName || ctx.barista,
    drinker: ctx.drinkerName || ctx.drinker,
  };
}

// Extract the dial-in numbers from the live workflow (uses target* field names).
async function workflowDialing() {
  const wf = await getWorkflow().catch(() => null);
  const ctx = (wf && wf.context) || {};
  return {
    dose:  ctx.targetDoseWeight,
    yield: ctx.targetYield,
    grind: ctx.grinderSetting,
    rpm:   ctx.extras && ctx.extras.rpm,
    barista: ctx.baristaName || ctx.barista,
    drinker: ctx.drinkerName || ctx.drinker,
  };
}

// Copy a dialing patch into the current shot's editable fields, then re-render.
function applyDialing(d) {
  if (!currentShot || !d) return;
  currentShot.annotations = currentShot.annotations || {};
  currentShot.workflow = currentShot.workflow || {};
  currentShot.workflow.context = currentShot.workflow.context || {};
  const ann = currentShot.annotations, ctx = currentShot.workflow.context;
  if (d.dose  != null) ann.actualDoseWeight = d.dose;
  if (d.yield != null) ann.actualYield = d.yield;
  if (d.grind != null) ctx.grinderSetting = String(d.grind);
  if (d.rpm   != null) { ann.extras = ann.extras || {}; ann.extras.rpm = d.rpm; }
  if (d.barista) ctx.baristaName = d.barista;
  if (d.drinker) ctx.drinkerName = d.drinker;
  renderShot(currentShot);
}

function setupControls() {
  // Shot nav
  document.getElementById('es-prev-btn')?.addEventListener('click', () => {
    if (shotIndex < allShots.length - 1) { shotIndex++; renderShot(allShots[shotIndex]); }
  });
  document.getElementById('es-next-btn')?.addEventListener('click', () => {
    if (shotIndex > 0) { shotIndex--; renderShot(allShots[shotIndex]); }
  });

  // Steppers
  function ann() { currentShot.annotations = currentShot.annotations || {}; return currentShot.annotations; }
  wireAdjuster('es-dose-minus','es-dose-plus','es-dose-value', 0.5, 0, null, v => v + 'g', v => {
    if (currentShot) { ann().actualDoseWeight = v; set('es-drink-sub', calcRatio(v, parseFloat(document.getElementById('es-drink-value')?.textContent))); }
  });
  wireAdjuster('es-drink-minus','es-drink-plus','es-drink-value', 1, 0, null, v => v + 'g', v => {
    if (currentShot) { ann().actualYield = v; }
  });
  wireAdjuster('es-tds-minus','es-tds-plus','es-tds-value', 0.01, 0, null, v => v.toFixed(2) + '%', v => {
    if (currentShot) { ann().drinkTds = v; }
  });
  wireAdjuster('es-ey-minus','es-ey-plus','es-ey-value', 0.01, 0, null, v => v.toFixed(2) + '%', v => {
    if (currentShot) { ann().drinkEy = v; }
  });
  wireAdjuster('es-setting-minus','es-setting-plus','es-setting-value', 0.1, 0, null, v => v.toFixed(1), v => {
    if (currentShot) { currentShot.workflow = currentShot.workflow || {}; currentShot.workflow.context = currentShot.workflow.context || {}; currentShot.workflow.context.grinderSetting = String(v); }
  });
  wireAdjuster('es-rpm-minus','es-rpm-plus','es-rpm-value', 1, 1, null, v => String(v), v => {
    // RPM has no schema field — store in annotations.extras (see README: annotations.extras for DYE2 per-shot extras).
    if (currentShot) { ann().extras = ann().extras || {}; ann().extras.rpm = v; }
  });

  // Stars
  document.querySelectorAll('#es-stars .dye-star').forEach(star => {
    star.addEventListener('click', () => {
      const idx = parseInt(star.getAttribute('data-index'));
      currentStarRating = idx;
      updateStars(idx);
      if (currentShot) { ann().enjoyment = idx; }
    });
  });

  // Beans card → picker (round-trips via draft; selection applied on return)
  document.getElementById('es-beans-card')?.addEventListener('click', () => goToPicker('/api/v1/plugins/dye2.reaplugin/bean-picker'));

  // Bean notes modal
  document.getElementById('es-read-more')?.addEventListener('click', e => {
    e.stopPropagation();
    const notes = document.getElementById('es-bean-notes')?.textContent || '';
    const name = document.getElementById('es-bean-name')?.textContent || 'Bean Notes';
    document.getElementById('es-modal-bean-name').textContent = name;
    document.getElementById('es-modal-notes-body').textContent = notes;
    document.getElementById('es-notes-overlay').classList.add('open');
  });
  document.getElementById('es-modal-close')?.addEventListener('click', () => {
    document.getElementById('es-notes-overlay').classList.remove('open');
  });

  // Grinder → picker (round-trips via draft; selection applied on return)
  const goGrinder = () => goToPicker('/api/v1/plugins/dye2.reaplugin/grinder-picker');
  document.getElementById('es-grinder-expand')?.addEventListener('click', goGrinder);
  document.getElementById('es-grinder-text')?.addEventListener('click', goGrinder);

  // Barista / Drinker → expand shows remembered-name dropdown; tapping the text types a new one.
  const setBarista = v => { wfctx().baristaName = v; };
  document.getElementById('es-barista-expand')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openNameDropdown('es-barista', 'dye_baristaNames', ['baristaName', 'barista'], setBarista);
  });
  document.getElementById('es-barista-text')?.addEventListener('click', () =>
    makeTextEditable('es-barista-text', v => { setBarista(v); rememberName('dye_baristaNames', v); }));

  const setDrinker = v => { wfctx().drinkerName = v; };
  document.getElementById('es-drinker-expand')?.addEventListener('click', (e) => {
    e.stopPropagation();
    openNameDropdown('es-drinker', 'dye_drinkerNames', ['drinkerName', 'drinker'], setDrinker);
  });
  document.getElementById('es-drinker-text')?.addEventListener('click', () =>
    makeTextEditable('es-drinker-text', v => { setDrinker(v); rememberName('dye_drinkerNames', v); }));

  // Drinker notes → editable modal (writes annotations.espressoNotes)
  const openDrinkerNotes = () => {
    const ta = document.getElementById('es-drinker-notes-input');
    if (ta) ta.value = (currentShot && currentShot.annotations && currentShot.annotations.espressoNotes) || '';
    document.getElementById('es-drinker-notes-overlay')?.classList.add('open');
    ta?.focus();
  };
  document.getElementById('es-notes-edit')?.addEventListener('click', openDrinkerNotes);
  document.getElementById('es-notes-preview')?.addEventListener('click', openDrinkerNotes);
  document.getElementById('es-drinker-notes-cancel')?.addEventListener('click', () => {
    document.getElementById('es-drinker-notes-overlay')?.classList.remove('open');
  });
  document.getElementById('es-drinker-notes-save')?.addEventListener('click', () => {
    const ta = document.getElementById('es-drinker-notes-input');
    const v = ta ? ta.value.trim() : '';
    if (currentShot) ann().espressoNotes = v;
    set('es-notes-preview', v ? v.slice(0, 60) + (v.length > 60 ? '…' : '') : '—');
    document.getElementById('es-drinker-notes-overlay')?.classList.remove('open');
  });

  // Read From dropdown
  const rfBtn = document.getElementById('es-read-from-btn');
  const rfDrop = document.getElementById('es-read-from-dropdown');
  rfBtn?.addEventListener('click', e => { e.stopPropagation(); rfDrop?.classList.toggle('open'); });
  document.addEventListener('click', () => rfDrop?.classList.remove('open'));

  document.getElementById('es-read-from-workflow')?.addEventListener('click', async () => {
    applyDialing(await workflowDialing());
    rfDrop?.classList.remove('open');
  });
  document.getElementById('es-read-from-prev')?.addEventListener('click', () => {
    const prev = allShots[shotIndex + 1]; // higher index = older shot
    if (prev) applyDialing(shotDialing(prev));
    rfDrop?.classList.remove('open');
  });

  // Footer buttons
  document.getElementById('es-cancel-btn')?.addEventListener('click', () => window.history.back());

  document.getElementById('es-save-btn')?.addEventListener('click', async () => {
    if (!currentShot) return;
    try {
      // PUT supports partial updates — send only the edited fields, not the heavy measurements array.
      await updateShot(currentShot.id, { annotations: currentShot.annotations || {}, workflow: currentShot.workflow });
      window.history.back();
    } catch (e) { console.error('Failed to save shot:', e); }
  });

  document.getElementById('es-delete-btn')?.addEventListener('click', async () => {
    if (!currentShot) return;
    if (!confirm('Delete this shot? This cannot be undone.')) return;
    try {
      await deleteShot(currentShot.id);
      window.history.back();
    } catch (e) { console.error('Failed to delete shot:', e); }
  });

  document.getElementById('es-clear-btn')?.addEventListener('click', () => {
    if (!currentShot) return;
    currentShot.workflow = {};
    currentShot.annotations = {};
    renderShot(currentShot);
  });
}

async function initEditShot() {
  setupControls();
  const returning = sessionStorage.getItem('dye_editShotReturn') === '1';
  try {
    const result = await getShots({ limit: 50, order: 'desc' }).catch(() => ({ items: [] }));
    allShots = (result && result.items) ? result.items : (Array.isArray(result) ? result : []);
    const storedId = sessionStorage.getItem('dye_editShotId');
    if (storedId) {
      const idx = allShots.findIndex(s => s.id === storedId);
      if (idx >= 0) shotIndex = idx;
    }
    if (returning) {
      const savedIdx = parseInt(sessionStorage.getItem('dye_editShotIdx') || '');
      if (!isNaN(savedIdx)) shotIndex = savedIdx;
    }
    if (allShots.length === 0) {
      set('es-shot-label', 'No shots');
      clearReturnKeys();
      return;
    }
    if (returning) {
      // Came back from a picker: restore the in-progress draft (keeps unsaved edits) and
      // fold in whatever was selected, instead of re-fetching a clean copy from the bridge.
      try {
        const draft = JSON.parse(sessionStorage.getItem('dye_editShotDraft') || 'null');
        if (draft && draft.id === allShots[shotIndex].id) allShots[shotIndex] = draft;
      } catch (e) { console.warn('Could not restore shot draft:', e); }
      applyPendingSelections(allShots[shotIndex]);
      clearReturnKeys();
    } else {
      clearReturnKeys(); // drop any stale draft from an abandoned round-trip
      try {
        const full = await getShot(allShots[shotIndex].id);
        allShots[shotIndex] = { ...allShots[shotIndex], ...full };
      } catch (e) { console.warn('Could not fetch full shot:', e); }
    }
    renderShot(allShots[shotIndex]);
  } catch (e) {
    console.error('initEditShot failed:', e);
  }
}

initEditShot().catch(e => console.error('initEditShot failed:', e));

// history.back() from a picker can restore this page frozen from bfcache; reload so init
// re-runs and rehydrates the draft + applies the selection.
window.addEventListener('pageshow', function(e) { if (e.persisted) window.location.reload(); });
`;
	function renderEditShotPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Edit Shot", buildContent$2(), styles$3, [devApiScript, pageScript$3])
		};
	}
	//#endregion
	//#region src/pages/auto-favs.ts
	var TAB_KEYS = [
		"beans",
		"recipe",
		"profile",
		"grinder"
	];
	var TAB_LABELS = [
		"Beans",
		"Recipe",
		"Profile",
		"Grinder"
	];
	var styles$2 = `
  ${sortSidebarCss()}
  ${pickerCardCss()}
  .dye-tab-strip {
    display: flex; gap: 8px; padding: 18px 0 0;
  }
  .dye-tab-btn {
    padding: 10px 28px; border-radius: 23px;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 21px;
    border: 2px solid var(--profile-button-outline-color);
    background: transparent; color: var(--text-primary-disabled);
    cursor: pointer; white-space: nowrap;
  }
  .dye-tab-btn.active {
    background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff;
  }
  .fav-card-title { font-size: 22px; font-weight: 700; color: var(--text-primary); }
  .fav-card-date  { font-size: 18px; font-weight: 400; color: var(--low-contrast-white); margin-top: 4px; }
  .dye-card.dye-card-selected .fav-card-title { color: #fff; }
  .dye-card.dye-card-selected .fav-card-date  { color: rgba(255,255,255,0.7); }
  .fav-group-header {
    grid-column: 1 / -1;
    font-family: 'Inter', sans-serif; font-weight: 700; font-size: 22px;
    color: var(--mimoja-blue); padding: 10px 2px 0;
  }
`;
	var content = `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex-grow flex flex-col">
  ${pickerHeaderHtml("DYE Auto Favourites", "CONFIRM")}
  <div class="flex flex-1 overflow-hidden">
    ${sortSidebarHtml()}
    <div class="flex flex-col flex-1 overflow-hidden px-[20px]">
      <div class="dye-tab-strip shrink-0" id="dye-tab-strip">
        ${TAB_KEYS.map((k, i) => `<button class="dye-tab-btn${i === 0 ? " active" : ""}" data-tab="${k}">${TAB_LABELS[i]}</button>`).join("")}
      </div>
      <div id="dye-cards-container" class="flex-1 overflow-y-auto pt-[20px] pr-[20px]">
        <div id="dye-cards-grid" class="grid grid-cols-3 gap-[30px]"></div>
      </div>
    </div>
  </div>
</div>
`;
	var pageScript$2 = `
${sortSidebarScript}

let favsCache = [];
let selectedFavId = null;
let currentSort = 'recent';
let currentTab  = 'beans';

function sortFavs(favs, sortKey) {
  const s = [...favs];
  switch (sortKey) {
    case 'recent':    s.sort((a, b) => new Date(b.capturedAt || 0) - new Date(a.capturedAt || 0)); break;
    case 'oldest':    s.sort((a, b) => new Date(a.capturedAt || 0) - new Date(b.capturedAt || 0)); break;
    case 'az':        s.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
    case 'za':        s.sort((a, b) => (b.title || '').localeCompare(a.title || '')); break;
    case 'most-used': s.sort((a, b) => (b.useCount || 0) - (a.useCount || 0)); break;
    case 'least-used':s.sort((a, b) => (a.useCount || 0) - (b.useCount || 0)); break;
  }
  return s;
}

function formatFavDate(capturedAt) {
  if (!capturedAt) return '';
  const d = new Date(capturedAt);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  const time = d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit', hour12:false });
  const date = d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
  return date + ', ' + time + (diff > 0 ? '  ·  ' + diff + ' days off-roast' : '');
}

function renderCards(favs) {
  const grid = document.getElementById('dye-cards-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // ADD NEW auto-fav card
  const addCard = document.createElement('div');
  addCard.className = 'dye-card dye-card-add';
  addCard.innerHTML = '<span>ADD NEW FAVOURITE</span><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--mimoja-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
  addCard.addEventListener('click', () => {
    sessionStorage.removeItem('dye_editAutoFavId');
    window.location.href = '/api/v1/plugins/dye2.reaplugin/auto-fav-edit';
  });
  grid.appendChild(addCard);

  // Group by the active tab dimension; one full-width header per group.
  const groups = new Map();
  favs.forEach(fav => {
    const k = groupKeyOf(fav);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(fav);
  });

  groups.forEach((items, key) => {
    const header = document.createElement('div');
    header.className = 'fav-group-header';
    header.textContent = key;
    grid.appendChild(header);

    items.forEach(fav => {
      const card = document.createElement('div');
      card.className = 'dye-card' + (fav.id === selectedFavId ? ' dye-card-selected' : '');
      const title = fav.title || fav.snapshot?.coffeeName || 'Untitled Favourite';
      const sub = fav.snapshot?.coffeeRoaster || '';
      const dateStr = formatFavDate(fav.capturedAt);
      card.innerHTML =
        '<div class="fav-card-title">' + title + '</div>' +
        (sub ? '<div class="dye-card-sub">' + sub + '</div>' : '') +
        (dateStr ? '<hr class="dye-card-divider"><div class="fav-card-date">' + dateStr + '</div>' : '');
      card.addEventListener('click', () => {
        grid.querySelectorAll('.dye-card').forEach(c => c.classList.remove('dye-card-selected'));
        card.classList.add('dye-card-selected');
        selectedFavId = fav.id;
        const confirmBtn = document.getElementById('dye-confirm-btn');
        if (confirmBtn) confirmBtn.classList.remove('opacity-50');
      });
      card.addEventListener('dblclick', () => {
        sessionStorage.setItem('dye_editAutoFavId', fav.id);
        window.location.href = '/api/v1/plugins/dye2.reaplugin/auto-fav-edit';
      });
      grid.appendChild(card);
    });
  });
}

// Which snapshot field the tab strip groups by.
function groupKeyOf(fav) {
  const snp = fav.snapshot || {};
  switch (currentTab) {
    case 'beans':   return snp.coffeeName   || 'Other';
    case 'recipe':  return fav.beverage     || fav.title || 'Other';
    case 'profile': return snp.profileTitle || snp.profileId || 'Other';
    case 'grinder': return snp.grinderModel || snp.grinderId || 'Other';
    default:        return 'Other';
  }
}

function render() {
  const sorted = sortFavs(favsCache, currentSort);
  renderCards(sorted);
}

function setupTabs() {
  document.getElementById('dye-tab-strip')?.querySelectorAll('.dye-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dye-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      render();
    });
  });
}

async function initAutoFavs() {
  setupTabs();
  setupSortButtons(sort => { currentSort = sort; render(); });

  document.getElementById('dye-cancel-btn')?.addEventListener('click', () => window.history.back());
  document.getElementById('dye-confirm-btn')?.addEventListener('click', () => {
    if (!selectedFavId) return;
    sessionStorage.setItem('dye_selectedAutoFavId', selectedFavId);
    window.history.back();
  });

  try {
    const result = await getAutoFavourites().catch(() => []);
    favsCache = Array.isArray(result) ? result : (result && result.items ? result.items : []);
  } catch (e) {
    console.warn('Auto favourites endpoint not available yet:', e);
    favsCache = [];
  }
  render();
}

initAutoFavs().catch(e => console.error('initAutoFavs failed:', e));

// Returning via history.back() after saving a favourite can restore this list frozen
// from bfcache, so init never re-runs and a newly saved favourite is missing — reload
// to re-fetch. Mirrors the dashboard and recipe-edit pages.
window.addEventListener('pageshow', function(e) { if (e.persisted) window.location.reload(); });
`;
	function renderAutoFavsPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Auto Favourites", content, styles$2, [devApiScript, pageScript$2])
		};
	}
	//#endregion
	//#region src/pages/auto-fav-edit.ts
	var styles$1 = `
  ${stepperCss()}
  ${toggleCss()}
  .afe-header-sub { font-size: 22px; font-weight: 400; color: var(--text-primary); margin-top: 4px; }
  .afe-section-title { font-size: 28px; font-weight: 700; color: var(--text-primary); margin-bottom: 18px; }
  .afe-label { font-size: 24px; font-weight: 600; color: var(--mimoja-blue); margin-bottom: 8px; }
  .afe-input {
    width: 100%; border: 1px solid var(--profile-button-outline-color);
    border-radius: 12px; padding: 0 20px; height: 72px;
    font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 400;
    color: var(--text-primary); background: var(--box-color);
    outline: none;
  }
  .afe-input:focus { border-color: var(--mimoja-blue); }
  .afe-fav-num {
    width: 60px; height: 60px; border-radius: 9999px;
    border: 2px solid var(--profile-button-outline-color);
    font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 600;
    color: var(--text-primary); background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }
  .afe-fav-num.active {
    background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff;
  }
  .afe-divider { height: 2px; background: var(--profile-button-outline-color); margin: 8px 0; }

  /* Every row shows a read-only value; the pencil reveals its editor. */
  .afe-editor { flex: 1; min-width: 0; display: flex; }
  .afe-editor > * { flex: 1; min-width: 0; }

  /* Searchable lookup field (Profile / Beans / Grinder / Barista / Drinker) */
  .afe-combo { position: relative; }
  .afe-combo-input {
    width: 100%; border: 1px solid var(--profile-button-outline-color);
    border-radius: 12px; padding: 0 18px; height: 60px;
    font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 400;
    color: var(--text-primary); background: var(--box-color); outline: none;
  }
  .afe-combo-input:focus { border-color: var(--mimoja-blue); }
  .afe-combo-drop {
    display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0;
    z-index: 40; max-height: 300px; overflow-y: auto;
    background: var(--box-color); border: 1px solid var(--profile-button-outline-color);
    border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
  .afe-combo-drop.open { display: block; }
  .afe-combo-opt {
    padding: 14px 18px; font-size: 22px; color: var(--text-primary); cursor: pointer;
    border-bottom: 1px solid var(--profile-button-outline-color);
  }
  .afe-combo-opt:last-child { border-bottom: none; }
  .afe-combo-opt:hover { background: var(--bgmain-color); }
  .afe-combo-empty { padding: 14px 18px; font-size: 20px; color: var(--text-primary-disabled); }

  /* Roast date — native date picker, styled to match the combo inputs */
  .afe-date-input {
    border: 1px solid var(--profile-button-outline-color);
    border-radius: 12px; padding: 0 18px; height: 60px;
    font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 400;
    color: var(--text-primary); background: var(--box-color); outline: none;
  }
  .afe-date-input:focus { border-color: var(--mimoja-blue); }
  .afe-date-input::-webkit-calendar-picker-indicator { display: none; }

  /* Note — collapsed single line; grows while editing. */
  .afe-note-row.dye-toggle-row { align-items: flex-start; flex-wrap: wrap; }
  .afe-note-head { display: flex; align-items: center; gap: 20px; width: 100%; height: 60px; }
  .afe-note-pencil { margin-left: auto; }
  .afe-note-value {
    width: 100%; min-height: 40px; display: flex; align-items: center;
    font-size: 22px; color: var(--text-primary);
  }
  .afe-note-value.off { color: var(--text-primary-disabled); }
  .afe-note-field {
    width: 100%; box-sizing: border-box; display: none; resize: none; overflow: hidden;
    min-height: 132px; border: 1px solid var(--profile-button-outline-color);
    border-radius: 12px; padding: 14px 18px; line-height: 1.5;
    font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 400;
    color: var(--text-primary); background: var(--box-color); outline: none;
    white-space: pre-wrap; transition: height 0.18s ease, border-color 0.15s, box-shadow 0.15s;
  }
  .afe-note-field::placeholder { color: var(--text-primary-disabled); }
  .afe-note-field:focus { border-color: var(--mimoja-blue); box-shadow: 0 0 0 4px rgba(56,90,146,0.15); }

  /* Toggled-off row: value greyed + pencil dimmed (handled inline) */
  .dye-toggle-value.off { color: var(--text-primary-disabled); }
`;
	var FIELD_KINDS = {
		"afe-profile": "lookup",
		"afe-beans": "lookup",
		"afe-grinder": "lookup",
		"afe-barista": "lookup",
		"afe-drinker": "lookup",
		"afe-roast-date": "date",
		"afe-grind-setting": "text",
		"afe-dose": "number",
		"afe-drink": "number",
		"afe-note": "note"
	};
	function toggleMarkup(id, on) {
		const checkSvg = lucideIcon("check", 16, "#fff", 2.5);
		const xSvg = lucideIcon("x", 16, "#9CA3AF", 2.5);
		return `<div id="${id}-track" class="dye-toggle-track${on ? " on" : ""}" data-toggle="${id}">
    <div class="dye-toggle-thumb">
      <span class="dye-toggle-icon-on">${checkSvg}</span>
      <span class="dye-toggle-icon-off">${xSvg}</span>
    </div>
  </div>`;
	}
	function rowHtml(id, label, on, editorInner) {
		const pencilSvg = lucideIcon("pencil", 26, "var(--mimoja-blue)", 2);
		return `<div class="dye-toggle-row">
    ${toggleMarkup(id, on)}
    <span class="dye-toggle-label">${label}</span>
    <span id="${id}-value" class="dye-toggle-value">—</span>
    <div id="${id}-editor" class="afe-editor" style="display:none">${editorInner}</div>
    <button class="dye-toggle-edit" data-editrow="${id}">${pencilSvg}</button>
  </div>`;
	}
	function lookupEditor(id, label) {
		return `<div class="afe-combo">
    <input id="${id}-input" class="afe-combo-input" type="text" placeholder="Search ${label}…" autocomplete="off" data-field="${id}" />
    <div id="${id}-drop" class="afe-combo-drop"></div>
  </div>`;
	}
	function rowFor(id, label, on) {
		const kind = FIELD_KINDS[id];
		if (kind === "lookup") return rowHtml(id, label, on, lookupEditor(id, label));
		if (kind === "date") return rowHtml(id, label, on, `<input id="${id}-input" class="afe-date-input" type="date" required />`);
		if (kind === "text") return rowHtml(id, label, on, `<input id="${id}-input" class="afe-combo-input" type="text" inputmode="decimal" autocomplete="off" placeholder="e.g. 2.5 or 15 clicks" />`);
		if (kind === "number") return rowHtml(id, label, on, `<input id="${id}-input" class="afe-combo-input" type="text" inputmode="decimal" data-unit="g" autocomplete="off" />`);
		const pencilSvg = lucideIcon("pencil", 26, "var(--mimoja-blue)", 2);
		return `<div class="dye-toggle-row afe-note-row">
    <div class="afe-note-head">
      ${toggleMarkup(id, on)}
      <span class="dye-toggle-label">${label}</span>
      <button class="dye-toggle-edit afe-note-pencil" data-editrow="${id}">${pencilSvg}</button>
    </div>
    <span id="${id}-value" class="afe-note-value">—</span>
    <textarea id="${id}-input" class="afe-note-field" rows="1"
      autocapitalize="sentences" autocorrect="on" spellcheck="true"
      placeholder="e.g. chocolate & stone fruit, syrupy finish…"></textarea>
  </div>`;
	}
	function buildContent$1() {
		const copyFields = [
			["afe-profile", "Profile"],
			["afe-beans", "Beans"],
			["afe-roast-date", "Roast Date"],
			["afe-grinder", "Grinder"],
			["afe-grind-setting", "Grind Setting"],
			["afe-dose", "Dose"],
			["afe-drink", "Drink"],
			["afe-barista", "Barista"],
			["afe-drinker", "Drinker"],
			["afe-note", "Note"]
		];
		const defaultOn = new Set([
			"afe-profile",
			"afe-beans",
			"afe-grinder",
			"afe-grind-setting",
			"afe-dose",
			"afe-drink"
		]);
		return `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex flex-col font-['Inter',sans-serif]">

  <!-- Header bar -->
  <div class="flex items-center justify-between px-[38px] h-[110px] shrink-0 bg-[var(--box-color)] border-b border-[var(--profile-button-outline-color)]">
    <div>
      <div class="text-[30px] font-bold text-[var(--text-primary)]">Edit Auto Favourite</div>
      <div id="afe-subtitle" class="afe-header-sub">—</div>
    </div>
    <div class="flex items-center gap-[16px]">
      <button id="afe-cancel-btn" class="flex justify-center items-center w-[240px] h-[82px] rounded-[68px] font-bold text-[24px] text-[var(--text-primary)]">CANCEL</button>
      <button id="afe-save-btn" class="bg-[var(--mimoja-blue)] text-white flex items-center justify-center w-[310px] h-[82px] rounded-[68px] font-bold text-[24px]">SAVE FAVOURITE</button>
    </div>
  </div>

  <!-- Two-column body -->
  <div class="flex flex-1 overflow-hidden">

    <!-- LEFT: metadata fields -->
    <div class="flex flex-col w-[720px] shrink-0 bg-white border-r border-[var(--profile-button-outline-color)] overflow-y-auto px-[48px] py-[36px] gap-[28px]">

      <div>
        <div class="afe-label">Favourite Title</div>
        <input id="afe-title-input" class="afe-input" type="text" placeholder="Enter a title…" />
      </div>

      <div>
        <div class="afe-label">Beverage</div>
        <input id="afe-beverage-input" class="afe-input" type="text" placeholder="e.g. Cappucino" />
      </div>

      <div>
        <div class="afe-label">Always display on Dashboard</div>
        ${segmentControlHtml("afe-always-display", ["Yes", "No"], 0)}
      </div>

      <div>
        <div class="afe-label">Assign Fav number</div>
        <div class="flex gap-[18px] mt-[4px]">
          ${[
			1,
			2,
			3,
			4,
			5
		].map((n) => `<button class="afe-fav-num${n === 1 ? " active" : ""}" data-num="${n}">${n}</button>`).join("")}
        </div>
      </div>
    </div>

    <!-- RIGHT: Data to Copy toggles -->
    <div class="flex flex-col flex-1 overflow-y-auto px-[48px] py-[36px]">
      <div class="afe-section-title">Data to Copy</div>
      <div id="afe-toggles">
        ${copyFields.map(([id, label]) => rowFor(id, label, defaultOn.has(id))).join("")}
      </div>
    </div>
  </div>
</div>
`;
	}
	var pageScript$1 = `
${toggleRowScript}
${segmentControlScript}

let currentFav = null;
const el = id => document.getElementById(id);

const FIELD_KINDS = {
  'afe-profile':'lookup','afe-beans':'lookup','afe-grinder':'lookup','afe-barista':'lookup','afe-drinker':'lookup',
  'afe-roast-date':'date','afe-grind-setting':'text','afe-dose':'number','afe-drink':'number','afe-note':'note'
};
const ALL_COPY_FIELDS = Object.keys(FIELD_KINDS);

// ── Lookup sources (real data) ──────────────────────────────────────────────
function normList(result, labelFn) {
  const items = Array.isArray(result) ? result : (result.items || []);
  return items.map(it => ({ id: it.id || labelFn(it), label: labelFn(it) })).filter(o => o.label && o.label !== '—');
}
async function distinctNames(key) {
  const shots = await getShots({ limit: 200 }).catch(() => []);
  const seen = new Map();
  (Array.isArray(shots) ? shots : (shots.items || [])).forEach(s => {
    const ctx = (s.workflow && s.workflow.context) || {};
    const name = ctx[key] || (s.metadata && s.metadata[key === 'baristaName' ? 'barista' : 'drinker']);
    if (name && !seen.has(name)) seen.set(name, { id: name, label: name });
  });
  return [...seen.values()];
}
const LOOKUP_SOURCES = {
  'afe-profile': { load: async () => normList(await getProfiles(), p => (p.profile && p.profile.title) || p.title || p.name || p.id) },
  'afe-beans':   { load: async () => normList(await getBeans(), b => [b.roaster, b.name].filter(Boolean).join(' ') || b.name || b.id) },
  'afe-grinder': { load: async () => normList(await getGrinders(), g => g.model || g.name || g.id) },
  'afe-barista': { load: () => distinctNames('baristaName') },
  'afe-drinker': { load: () => distinctNames('drinkerName') },
};
const lookupCache = {};
const lookupState = {};   // field -> {id, label}

async function loadOptions(field) {
  if (!lookupCache[field]) {
    try { lookupCache[field] = await LOOKUP_SOURCES[field].load(); }
    catch (e) { console.warn('Lookup load failed for', field, e); lookupCache[field] = []; }
  }
  return lookupCache[field];
}
function filterOptions(opts, q) {
  const s = (q || '').trim().toLowerCase();
  return s ? opts.filter(o => o.label.toLowerCase().includes(s)) : opts;
}
function renderDrop(field, opts) {
  const drop = el(field + '-drop');
  if (!drop) return;
  drop.innerHTML = opts.length
    ? opts.slice(0, 50).map((o, i) => '<div class="afe-combo-opt" data-idx="' + i + '">' + o.label + '</div>').join('')
    : '<div class="afe-combo-empty">No matches</div>';
  drop.classList.add('open');
  drop.querySelectorAll('.afe-combo-opt').forEach(elm => {
    elm.addEventListener('mousedown', (ev) => { ev.preventDefault(); chooseLookup(field, opts[parseInt(elm.dataset.idx)]); });
  });
}
async function openMatches(field) {
  const input = el(field + '-input');
  renderDrop(field, filterOptions(await loadOptions(field), input ? input.value : ''));
}
function chooseLookup(field, opt) {
  lookupState[field] = opt;
  const input = el(field + '-input');
  if (input) input.value = opt.label;
  const drop = el(field + '-drop');
  if (drop) drop.classList.remove('open');
  if (field === 'afe-beans' && opt.id) fillRoastDateFromBean(opt.id);
  if (field === 'afe-beans' || field === 'afe-grinder') fillGrindFromShots();
  endEdit(field);
}

// ── Autofills ───────────────────────────────────────────────────────────────
let grindManual = false;
async function fillGrindFromShots() {
  const grindInput = el('afe-grind-setting-input');
  if (!grindInput || grindManual) return;
  const bean = lookupState['afe-beans'], grinder = lookupState['afe-grinder'];
  if (!bean || !bean.id || !grinder || !grinder.id) return;
  try {
    const res = await getShots({ grinderId: grinder.id, beanId: bean.id, limit: 1, order: 'desc' });
    const shots = Array.isArray(res) ? res : (res.items || []);
    const ctx = shots[0] && shots[0].workflow && shots[0].workflow.context;
    const gs = ctx ? ctx.grinderSetting : null;
    if (gs != null && gs !== '') { grindInput.value = String(gs); refreshValue('afe-grind-setting'); }
  } catch (e) { console.warn('Grind autofill failed:', e); }
}
let roastDateManual = false;
async function fillRoastDateFromBean(beanId) {
  const dateInput = el('afe-roast-date-input');
  if (!dateInput || roastDateManual) return;
  try {
    const batches = await getBeanBatches(beanId);
    const dates = (Array.isArray(batches) ? batches : (batches.items || [])).map(b => b.roastDate).filter(Boolean).sort();
    const latest = dates[dates.length - 1];
    dateInput.value = latest ? new Date(latest).toISOString().slice(0, 10) : '';
    refreshValue('afe-roast-date');
  } catch (e) { console.warn('Roast date autofill failed:', e); }
}

// ── Value display ───────────────────────────────────────────────────────────
const editVals = { 'afe-dose': null, 'afe-drink': null };   // parsed numeric values
function fmtDate(v) { return v ? new Date(v + 'T00:00:00').toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'; }
function fieldDisplay(id) {
  const kind = FIELD_KINDS[id], input = el(id + '-input');
  if (kind === 'lookup') { const s = lookupState[id]; return s && s.label ? s.label : '—'; }
  if (kind === 'date')   return input && input.value ? fmtDate(input.value) : '—';
  if (kind === 'text')   return input && input.value.trim() ? input.value.trim() : '—';
  if (kind === 'number') { const n = editVals[id]; return n != null ? n + 'g' : '—'; }
  if (kind === 'note')   { const t = input ? input.value.trim() : ''; return t ? (t.length > 60 ? t.slice(0, 60) + '…' : t) : '—'; }
  return '—';
}
function refreshValue(id) { const v = el(id + '-value'); if (v) v.textContent = fieldDisplay(id); }
function refreshAllValues() { ALL_COPY_FIELDS.forEach(refreshValue); }

// ── Edit reveal ─────────────────────────────────────────────────────────────
let editing = null;
function beginEdit(id) {
  if (!isToggleOn(id)) return;             // off rows aren't editable
  if (editing && editing !== id) endEdit(editing);
  editing = id;
  const kind = FIELD_KINDS[id], input = el(id + '-input');
  const value = el(id + '-value'), editor = el(id + '-editor');
  if (value) value.style.display = 'none';
  if (editor) editor.style.display = 'flex';
  if (kind === 'number' && input) input.value = editVals[id] != null ? String(editVals[id]) : '';
  if (kind === 'note' && input) { input.style.display = 'block'; sizeNote(input); }
  if (!input) return;
  input.focus();
  if (kind === 'lookup') openMatches(id);
  else if (kind === 'date') { if (input.showPicker) { try { input.showPicker(); } catch (e) {} } }
  else if (kind === 'note') setTimeout(() => input.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  else input.select();
}
function endEdit(id) {
  const kind = FIELD_KINDS[id], input = el(id + '-input');
  if (kind === 'number' && input) { const v = input.value.trim(); const n = Number(v); editVals[id] = (v === '' || isNaN(n)) ? null : n; }
  const drop = el(id + '-drop'); if (drop) drop.classList.remove('open');
  refreshValue(id);
  if (kind === 'note' && input) input.style.display = 'none';
  const editor = el(id + '-editor'); if (editor && kind !== 'note') editor.style.display = 'none';
  const value = el(id + '-value'); if (value) value.style.display = '';
  if (editing === id) editing = null;
}

// Note auto-grow while editing.
function sizeNote(elm) { elm.style.height = 'auto'; elm.style.height = Math.max(132, elm.scrollHeight) + 'px'; }

// ── Toggle state → row appearance ───────────────────────────────────────────
function applyRowState(id, on) {
  const value = el(id + '-value');
  if (value) value.classList.toggle('off', !on);
  const pencil = document.querySelector('[data-editrow="' + id + '"]');
  if (pencil) { pencil.disabled = !on; pencil.style.opacity = on ? '' : '0.4'; pencil.style.pointerEvents = on ? '' : 'none'; }
  if (!on && editing === id) endEdit(id);
}
function syncAllRowStates() { ALL_COPY_FIELDS.forEach(id => applyRowState(id, isToggleOn(id))); }

function getToggleMask() {
  return {
    profile: isToggleOn('afe-profile'), beans: isToggleOn('afe-beans'), roastDate: isToggleOn('afe-roast-date'),
    grinder: isToggleOn('afe-grinder'), grindSetting: isToggleOn('afe-grind-setting'),
    dose: isToggleOn('afe-dose'), drink: isToggleOn('afe-drink'),
    barista: isToggleOn('afe-barista'), drinker: isToggleOn('afe-drinker'), note: isToggleOn('afe-note'),
  };
}
function getAlwaysDisplay() {
  const btn = document.querySelector('#afe-always-display .dye-seg-btn.active');
  return btn ? btn.textContent === 'Yes' : true;
}
function getAssignedSlot() {
  const active = document.querySelector('.afe-fav-num.active');
  return active ? parseInt(active.dataset.num) : null;
}
function set(id, val) { const e = el(id); if (e) e.textContent = val == null ? '—' : val; }
function initLookup(field, label, id) {
  const input = el(field + '-input');
  if (label) { lookupState[field] = { id: id || null, label }; if (input) input.value = label; }
  else if (input) input.value = '';
}

function renderFav(fav) {
  if (!fav) return;
  currentFav = fav;
  if (el('afe-title-input')) el('afe-title-input').value = fav.title || '';
  if (el('afe-beverage-input')) el('afe-beverage-input').value = fav.beverage || '';

  const ts = fav.capturedAt || fav.createdAt;
  const snp = fav.snapshot || {};
  const subtitle = (ts ? new Date(ts).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) + ', ' + new Date(ts).toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' }) : '') + (snp.coffeeName ? '  |  ' + snp.coffeeName : '');
  set('afe-subtitle', subtitle || '—');

  initLookup('afe-profile', snp.profileTitle || snp.profileId || '', snp.profileId);
  initLookup('afe-beans',   snp.coffeeName || '', snp.beanBatchId);
  initLookup('afe-grinder', snp.grinderModel || snp.grinderId || '', snp.grinderId);
  initLookup('afe-barista', snp.barista || '');
  initLookup('afe-drinker', snp.drinker || '');

  const dateInput = el('afe-roast-date-input');
  if (dateInput) { dateInput.value = snp.roastDate ? new Date(snp.roastDate).toISOString().slice(0, 10) : ''; roastDateManual = !!snp.roastDate; }
  const grindInput = el('afe-grind-setting-input');
  if (grindInput) { grindInput.value = snp.grindSetting != null ? String(snp.grindSetting) : ''; grindManual = snp.grindSetting != null; }

  editVals['afe-dose']  = snp.dose  != null ? snp.dose  : null;
  editVals['afe-drink'] = snp.drink != null ? snp.drink : null;

  const noteInput = el('afe-note-input');
  if (noteInput) noteInput.value = snp.note || '';

  if (fav.copyMask) {
    const keyMap = { 'afe-profile':'profile','afe-beans':'beans','afe-roast-date':'roastDate','afe-grinder':'grinder',
      'afe-grind-setting':'grindSetting','afe-dose':'dose','afe-drink':'drink','afe-barista':'barista','afe-drinker':'drinker','afe-note':'note' };
    Object.keys(keyMap).forEach(id => { const t = el(id + '-track'); if (t) t.classList.toggle('on', fav.copyMask[keyMap[id]] !== false); });
  }
  syncAllRowStates();
  refreshAllValues();

  if (fav.favSlot) document.querySelectorAll('.afe-fav-num').forEach(btn => btn.classList.toggle('active', parseInt(btn.dataset.num) === fav.favSlot));

  const alwaysOn = fav.alwaysOnDashboard !== false;
  const yesBtn = document.querySelector('#afe-always-display .dye-seg-btn[data-idx="0"]');
  const noBtn  = document.querySelector('#afe-always-display .dye-seg-btn[data-idx="1"]');
  if (yesBtn && noBtn) [yesBtn, noBtn].forEach((btn, i) => {
    const active = alwaysOn ? i === 0 : i === 1;
    btn.classList.toggle('active', active);
    btn.style.background = active ? 'var(--mimoja-blue)' : 'transparent';
    btn.style.color = active ? '#fff' : 'var(--text-primary)';
  });
}

function setupControls() {
  setupToggleRows(applyRowState);
  setupSegmentControls();

  // Pencil reveals the row's editor.
  document.querySelectorAll('[data-editrow]').forEach(btn => btn.addEventListener('click', () => beginEdit(btn.dataset.editrow)));

  // Lookup comboboxes: filter as you type, blur commits (delay lets an option's mousedown land first).
  Object.keys(LOOKUP_SOURCES).forEach(field => {
    const input = el(field + '-input');
    if (!input) return;
    input.addEventListener('input', () => { lookupState[field] = { id: null, label: input.value }; openMatches(field); });
    input.addEventListener('blur', () => setTimeout(() => { if (editing === field) endEdit(field); }, 150));
  });

  // Manual edits opt out of autofill.
  el('afe-roast-date-input')?.addEventListener('input', () => { roastDateManual = true; });
  el('afe-grind-setting-input')?.addEventListener('input', () => { grindManual = true; });

  // Commit-on-blur / Enter for the simple inputs; Enter also commits for date.
  ['afe-roast-date', 'afe-grind-setting', 'afe-dose', 'afe-drink'].forEach(id => {
    const input = el(id + '-input');
    if (!input) return;
    input.addEventListener('blur', () => { if (editing === id) endEdit(id); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } });
    if (FIELD_KINDS[id] === 'date') input.addEventListener('change', () => { if (editing === id) endEdit(id); });
  });

  const noteInput = el('afe-note-input');
  if (noteInput) {
    noteInput.addEventListener('input', () => sizeNote(noteInput));
    noteInput.addEventListener('blur', () => { if (editing === 'afe-note') endEdit('afe-note'); });
  }

  document.querySelectorAll('.afe-fav-num').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.afe-fav-num').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }));

  el('afe-cancel-btn')?.addEventListener('click', () => window.history.back());

  el('afe-save-btn')?.addEventListener('click', async () => {
    if (editing) endEdit(editing);   // flush any in-progress edit
    const snapshot = { ...((currentFav && currentFav.snapshot) || {}) };
    const p = lookupState['afe-profile']; if (p) { snapshot.profileTitle = p.label; snapshot.profileId = p.id; }
    const b = lookupState['afe-beans'];   if (b) { snapshot.coffeeName = b.label; if (b.id) snapshot.beanBatchId = b.id; }
    const g = lookupState['afe-grinder']; if (g) { snapshot.grinderModel = g.label; snapshot.grinderId = g.id; }
    const ba = lookupState['afe-barista']; if (ba) snapshot.barista = ba.label;
    const dr = lookupState['afe-drinker']; if (dr) snapshot.drinker = dr.label;
    const noteInput = el('afe-note-input'); if (noteInput) snapshot.note = noteInput.value.trim() || null;
    const dateInput = el('afe-roast-date-input'); if (dateInput) snapshot.roastDate = dateInput.value ? new Date(dateInput.value).toISOString() : null;
    const grindInput = el('afe-grind-setting-input');
    if (grindInput) { const v = grindInput.value.trim(); const n = Number(v); snapshot.grindSetting = v === '' ? null : (isNaN(n) ? v : n); }
    snapshot.dose = editVals['afe-dose'];
    snapshot.drink = editVals['afe-drink'];

    const data = {
      ...(currentFav || {}),
      title: el('afe-title-input') ? el('afe-title-input').value : '',
      beverage: el('afe-beverage-input') ? el('afe-beverage-input').value : '',
      alwaysOnDashboard: getAlwaysDisplay(),
      favSlot: getAssignedSlot(),
      copyMask: getToggleMask(),
      snapshot,
    };
    try {
      if (currentFav && currentFav.id) await updateAutoFavourite(currentFav.id, data);
      else await createAutoFavourite(data);
      window.history.back();
    } catch (e) { console.error('Failed to save auto-favourite:', e); }
  });
}

function snapshotFromWorkflow(wf) {
  const ctx = (wf && wf.context) || {};
  const profile = (wf && wf.profile) || {};
  const extras = ctx.extras || {};
  return {
    profileId: profile.id || null, profileTitle: profile.title || null,
    beanBatchId: ctx.beanBatchId || null, coffeeName: ctx.coffeeName || null, coffeeRoaster: ctx.coffeeRoaster || null,
    roastDate: ctx.roastDate || null, grinderId: ctx.grinderId || null, grinderModel: ctx.grinderModel || null,
    grindSetting: ctx.grinderSetting != null ? ctx.grinderSetting : null, rpm: extras.rpm != null ? extras.rpm : null,
    dose: ctx.targetDoseWeight != null ? ctx.targetDoseWeight : null, drink: ctx.targetYield != null ? ctx.targetYield : null,
    barista: ctx.baristaName || null, drinker: ctx.drinkerName || null, note: extras.note || null,
  };
}

async function initAutoFavEdit() {
  setupControls();
  // Consume the edit id immediately (like dashboard/recipe-edit do): if left set it
  // would hijack the next "new favourite" open — silently editing (and re-saving) the
  // old one instead of creating, or, if it was since deleted, breaking renderFav.
  const favId = sessionStorage.getItem('dye_editAutoFavId');
  sessionStorage.removeItem('dye_editAutoFavId');

  let fav = null;
  if (favId) {
    try { fav = await getAutoFavourite(favId); }
    catch (e) { console.warn('Could not load auto-favourite:', e); }
  }
  // New favourite, or the requested one is gone: seed a fresh one from the workflow so
  // renderFav always runs (populating defaults + disabling off-row pencils).
  if (!fav) {
    try { const wf = await getWorkflow(); fav = { snapshot: snapshotFromWorkflow(wf), alwaysOnDashboard: true }; }
    catch (e) { console.warn('Could not load workflow for new auto-favourite:', e); fav = { snapshot: {}, alwaysOnDashboard: true }; }
  }
  renderFav(fav);
}

initAutoFavEdit().catch(e => console.error('initAutoFavEdit failed:', e));
`;
	function renderAutoFavEditPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Edit Auto Favourite", buildContent$1(), styles$1, [devApiScript, pageScript$1])
		};
	}
	//#endregion
	//#region src/pages/recipe-edit.ts
	var NUM_RECIPES = 5;
	var styles = `
  ${stepperCss()}
  ${presetStripCss()}
  /* Figma 2396:728: fixed 270x60 pills, stroke #C5CDDA, text #5F7BA8 */
  .re-tab {
    width: 270px; height: 60px; border-radius: 15px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 21px;
    border: 2px solid #C5CDDA;
    background: var(--box-color); color: #5F7BA8;
    cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    flex-shrink: 0; padding: 0 10px;
  }
  .re-tab.active { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }
  .re-label { font-size: 24px; font-weight: 700; color: var(--mimoja-blue); margin-bottom: 8px; }
  /* Figma 2396:747: label sits inline beside the input, 164px wide */
  .re-field-label { font-size: 24px; font-weight: 700; color: var(--mimoja-blue); width: 164px; flex-shrink: 0; }
  /* Figma 2396:749: one bordered box (2px #C9C9C9, square) holding text + edit icon */
  .re-input-row {
    display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;
    border: 2px solid #C9C9C9; background: var(--box-color);
    height: 80px; padding: 0 15px 0 22px;
  }
  .re-input-row:focus-within { border-color: var(--mimoja-blue); }
  .re-input {
    flex: 1; min-width: 0; border: none; height: 100%;
    font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 400;
    color: var(--text-primary); background: transparent; outline: none;
  }
  .re-input-pencil { flex-shrink: 0; opacity: 0.55; cursor: pointer; }
  .re-input-pencil:hover { opacity: 1; }
  /* Name-lookup dropdown for Beverage / Barista / Drinker (previously entered values) */
  .re-combo { position: relative; flex: 1; min-width: 0; }
  .re-combo-drop {
    display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 50;
    background: var(--box-color); border: 2px solid var(--mimoja-blue); border-radius: 10px;
    max-height: 320px; overflow-y: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  }
  .re-combo-drop.open { display: block; }
  .re-combo-opt {
    padding: 14px 18px; font-family: 'Inter', sans-serif; font-size: 22px;
    color: var(--text-primary); cursor: pointer;
    border-bottom: 1px solid var(--profile-button-outline-color);
  }
  .re-combo-opt:last-child { border-bottom: none; }
  .re-combo-opt:hover { background: var(--bgmain-color); }
  .re-combo-empty { padding: 14px 18px; font-size: 20px; color: var(--text-primary-disabled); }
  /* Figma 2396:757: strict 3-column grid of 60px-tall pills */
  .re-chip-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
  .re-chip {
    height: 60px; border-radius: 15px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Inter', sans-serif; font-size: 21px; font-weight: 600;
    border: 2px solid #C5CDDA;
    background: var(--box-color); color: #5F7BA8;
    cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    padding: 0 10px;
  }
  .re-chip.active { background: var(--mimoja-blue); border-color: var(--mimoja-blue); color: #fff; }
  .re-see-all {
    height: 60px; display: flex; align-items: center; justify-content: center;
    font-size: 21px; font-weight: 600; color: var(--mimoja-blue); cursor: pointer;
  }
  .re-divider { height: 1px; background: var(--profile-button-outline-color); }
  .re-var-block { display: flex; flex-direction: column; gap: 8px; }
  .re-var-label { font-size: 22px; font-weight: 700; color: var(--mimoja-blue); margin-bottom: 2px; }
  /* Figma: grinder options are plain text (no box) — active bold blue, inactive grey, wide gaps */
  .re-grinder-chips { display: flex; align-items: center; gap: 32px; overflow-x: auto; padding-bottom: 4px; }
  .re-grinder-chip {
    background: none; border: none; padding: 0;
    font-family: 'Inter', sans-serif; font-size: 24px; font-weight: 600;
    color: #B6C3D7;
    cursor: pointer; white-space: nowrap; flex-shrink: 0;
  }
  .re-grinder-chip.active { color: var(--mimoja-blue); font-weight: 700; }
  /* Figma right column: presets spread across the stepper block width */
  #re-right .re-var-block [id$="-presets"] { justify-content: space-between; }
  .footer-btn-ghost {
    border: 2px solid var(--mimoja-blue); color: var(--mimoja-blue); border-radius: 23px;
    padding: 0 28px; height: 60px; font-size: 21px; font-weight: 600; cursor: pointer;
    font-family: 'Inter', sans-serif; white-space: nowrap; display: flex; align-items: center; gap: 8px;
    background: var(--box-color);
  }
  /* Figma 2386:1884: bordered pill with check | divider | label */
  .re-show-streamline {
    display: flex; align-items: center; gap: 14px;
    border: 2px solid var(--mimoja-blue); border-radius: 23px;
    height: 60px; padding: 0 24px 0 16px; background: var(--box-color);
    font-family: 'Inter', sans-serif; font-size: 21px; font-weight: 600;
    color: var(--mimoja-blue); cursor: pointer;
  }
  .re-show-streamline-icon { flex-shrink: 0; display: flex; align-items: center; }
  .re-show-streamline-sep { width: 2px; height: 36px; background: var(--profile-button-outline-color); flex-shrink: 0; }
  .read-from-dropdown {
    display: none; position: absolute; bottom: calc(100% + 4px); left: 0;
    min-width: 220px; background: var(--box-color);
    border: 2px solid var(--profile-button-outline-color);
    border-radius: 15px; overflow: hidden;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.12); z-index: 50;
  }
  .read-from-dropdown.open { display: block; }
  .read-from-item {
    padding: 16px 23px; font-family: 'Inter', sans-serif;
    font-size: 21px; font-weight: 600; color: var(--text-primary);
    cursor: pointer; white-space: nowrap;
  }
  .read-from-item + .read-from-item { border-top: 1px solid var(--profile-button-outline-color); }
  .read-from-item:hover { background: var(--mimoja-blue); color: #fff; }
  /* Steam / Hot Water mode: compact inline text toggle under the label (matches Figma) */
  .re-mode-toggle { display: flex; align-items: center; gap: 10px; margin: 4px 0 0 0; font-size: 19px; font-weight: 600; }
  .re-mode-seg { background: none; border: none; padding: 0; font: inherit; cursor: pointer; color: var(--text-primary-disabled); }
  .re-mode-seg.active { color: var(--mimoja-blue); }
  .re-mode-sep { color: var(--profile-button-outline-color); }
`;
	function buildContent() {
		const chevUpSvg = lucideIcon("chevron-up", 24, "var(--mimoja-blue)", 2.5);
		const checkCircleSvg = lucideIcon("check-circle", 28, "var(--mimoja-blue)", 2);
		const pencilSvg = lucideIcon("pencil", 26, "var(--text-primary-disabled)", 2);
		return `
<div class="bg-[var(--bgmain-color)] overflow-hidden flex flex-col font-['Inter',sans-serif]">

  <!-- Header: title + recipe tabs on the grey strip (Figma 2386:1874) -->
  <div class="flex items-center gap-[48px] px-[38px] h-[124px] shrink-0 bg-[var(--bgmain-color)] border-b border-[var(--profile-button-outline-color)]">
    <span class="text-[30px] font-semibold text-[var(--text-primary)] shrink-0">Edit Recipes</span>
    <div id="re-tabs" class="flex gap-[15px] overflow-x-auto" style="scrollbar-width:none">
      ${Array.from({ length: NUM_RECIPES }, (_, i) => `<button class="re-tab${i === 0 ? " active" : ""}" data-recipe="${i}">Recipe ${i + 1}</button>`).join("")}
    </div>
  </div>

  <!-- Two-column body, 50/50 like the Figma columns -->
  <div class="flex flex-1 overflow-hidden">

    <!-- LEFT: recipe metadata -->
    <div id="re-left" class="flex flex-col w-1/2 shrink-0 bg-white border-r border-[var(--profile-button-outline-color)] overflow-y-auto px-[38px] py-[28px] gap-[24px]">

      <div class="flex items-center gap-[30px]">
        <span class="re-field-label">Recipe Name</span>
        <div class="re-input-row">
          <input id="re-name-input" class="re-input" type="text" placeholder="Recipe name…" />
          <button class="re-input-pencil" id="re-name-pencil">${pencilSvg}</button>
        </div>
      </div>

      <div class="re-divider"></div>

      <div>
        <div class="re-label" style="margin-bottom:15px">Assign Bean</div>
        <div class="re-chip-grid" id="re-bean-chips"></div>
      </div>

      <div class="re-divider"></div>

      <div>
        <div class="re-label" style="margin-bottom:15px">Assign Profile</div>
        <div class="re-chip-grid" id="re-profile-chips"></div>
      </div>

      <div class="re-divider"></div>

      <div class="flex items-center gap-[30px]">
        <span class="re-field-label">Beverage</span>
        <div class="re-combo">
          <div class="re-input-row">
            <input id="re-beverage-input" class="re-input" type="text" placeholder="e.g. Cappucino" />
            <button class="re-input-pencil" id="re-beverage-pencil">${pencilSvg}</button>
          </div>
          <div id="re-beverage-drop" class="re-combo-drop"></div>
        </div>
      </div>

      <div class="flex gap-[68px]">
        <div class="flex items-center gap-[30px] flex-1 min-w-0">
          <span class="re-field-label" style="width:auto">Barista</span>
          <div class="re-combo">
            <div class="re-input-row">
              <input id="re-barista-input" class="re-input" type="text" placeholder="Barista" />
              <button class="re-input-pencil" id="re-barista-pencil">${pencilSvg}</button>
            </div>
            <div id="re-barista-drop" class="re-combo-drop"></div>
          </div>
        </div>
        <div class="flex items-center gap-[30px] flex-1 min-w-0">
          <span class="re-field-label" style="width:auto">Drinker</span>
          <div class="re-combo">
            <div class="re-input-row">
              <input id="re-drinker-input" class="re-input" type="text" placeholder="Drinker" />
              <button class="re-input-pencil" id="re-drinker-pencil">${pencilSvg}</button>
            </div>
            <div id="re-drinker-drop" class="re-combo-drop"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: Dashboard Variables (2-column, matches Figma) -->
    <div id="re-right" class="flex flex-col flex-1 bg-white overflow-y-auto px-[38px] py-[28px] gap-[24px]">
      <div class="text-[30px] font-bold text-[var(--mimoja-blue)]">Dashboard Variables</div>

      <!-- Row: Dose | Drink -->
      <div class="flex gap-[40px]">
        <div class="re-var-block flex-1">
          ${stepperHtml("re-dose", "Dose", "120px")}
          ${presetStripHtml("re-dose", [
			"20g",
			"18g",
			"19g",
			"15g"
		])}
        </div>
        <div class="re-var-block flex-1">
          ${stepperHtml("re-drink", "Drink", "120px", true)}
          ${presetStripHtml("re-drink", [
			"1:2.3",
			"1:2.5",
			"1:5",
			"1:15"
		])}
        </div>
      </div>

      <div class="re-divider"></div>

      <!-- Row: Brew °c | Steam (Flow | Time) -->
      <div class="flex gap-[40px]">
        <div class="re-var-block flex-1">
          ${stepperHtml("re-brew-c", "Brew °c", "120px")}
          ${presetStripHtml("re-brew-c", [
			"75°c",
			"80°c",
			"92°c",
			"85°c"
		])}
        </div>
        <div class="re-var-block flex-1">
          ${stepperHtml("re-steam", "Steam", "120px", true, `
            <div class="re-mode-toggle">
              <button class="re-steam-mode re-mode-seg active" data-mode="flow">Flow</button>
              <span class="re-mode-sep">|</span>
              <button class="re-steam-mode re-mode-seg" data-mode="time">Time</button>
            </div>`)}
          ${presetStripHtml("re-steam", [
			"29s",
			"15s",
			"31s",
			"28s"
		])}
        </div>
      </div>

      <div class="re-divider"></div>

      <!-- Row: Flush | Hot Water (Temp | Vol) -->
      <div class="flex gap-[40px]">
        <div class="re-var-block flex-1">
          ${stepperHtml("re-flush", "Flush", "120px")}
          ${presetStripHtml("re-flush", [
			"5s",
			"2s",
			"10s",
			"15s"
		])}
        </div>
        <div class="re-var-block flex-1">
          ${stepperHtml("re-hotwater", "Hot Water", "120px", true, `
            <div class="re-mode-toggle">
              <button class="re-hotwater-mode re-mode-seg" data-mode="temp">Temp</button>
              <span class="re-mode-sep">|</span>
              <button class="re-hotwater-mode re-mode-seg active" data-mode="vol">Vol</button>
            </div>`)}
          ${presetStripHtml("re-hotwater", [
			"75ml",
			"120ml",
			"180ml",
			"200ml"
		])}
        </div>
      </div>

      <div class="re-divider"></div>

      <!-- Grinder names as plain text tabs (Figma 2396:991 — no label above) -->
      <div class="re-grinder-chips" id="re-grinder-chips">
        <!-- populated by JS -->
      </div>

      <!-- Grind + RPM (no preset strips in Figma) -->
      <div class="flex items-center gap-[90px]">
        <div class="re-var-block">
          ${stepperHtml("re-grind", "Grind", "75px")}
        </div>
        <div class="re-var-block">
          ${stepperHtml("re-rpm", "RPM", "75px")}
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="flex items-center px-[38px] h-[120px] shrink-0 bg-[var(--box-color)] border-t border-[var(--profile-button-outline-color)] gap-[30px]">
    <button id="re-clear-btn" class="footer-btn-ghost">Clear all</button>
    <div class="relative">
      <button id="re-read-from-btn" class="footer-btn-ghost">Read From ${chevUpSvg}</button>
      <div id="re-read-from-dropdown" class="read-from-dropdown">
        <div class="read-from-item" id="re-read-from-workflow">Current Workflow</div>
        <div class="read-from-item" id="re-read-from-fav">From Favourite</div>
      </div>
    </div>
    <button id="re-show-streamline-btn" class="re-show-streamline">
      <span id="re-show-streamline-icon" class="re-show-streamline-icon">${checkCircleSvg}</span>
      <span class="re-show-streamline-sep"></span>
      <span>Show on Streamline Dashboard</span>
    </button>
    <div class="flex-1"></div>
    <button id="re-cancel-btn" class="text-[24px] font-bold text-[var(--text-primary)] w-[240px] h-[76px]">CANCEL</button>
    <button id="re-save-btn" class="bg-[var(--mimoja-blue)] text-white rounded-[68px] h-[76px] w-[300px] text-[24px] font-bold cursor-pointer">SAVE RECIPE</button>
  </div>
</div>
`;
	}
	var pageScript = `
${presetStripScript}
${segmentControlScript}

const NUM_RECIPES = ${NUM_RECIPES};
let recipes = [];
let currentRecipeIdx = 0;
let grinders = [];
let showOnStreamline = true;
let selectedGrinderId = null;
let selectedBeanId = null;
let selectedBeanName = null;
let selectedProfileId = null;
let selectedProfileTitle = null;
let beans = [];
let profiles = [];

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val ?? '—';
}
function setInput(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function wireAdjuster(minusId, plusId, valueId, step, min, max, formatter) {
  [minusId, plusId].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    let t = null;
    btn.addEventListener('click', () => {
      const el = document.getElementById(valueId);
      if (!el) return;
      const raw = parseFloat(el.textContent);
      // Empty field shows "—" → start from min (or 0) so + / − begin working.
      const base = isNaN(raw) ? (min != null ? min : 0) : raw;
      const delta = btnId === minusId ? -step : step;
      let val = parseFloat((base + delta).toFixed(3));
      if (min != null) val = Math.max(min, val);
      if (max != null) val = Math.min(max, val);
      el.textContent = formatter(val);
      syncPresetActive(valueId.replace('-value', ''), formatter(val));
    });
  });
  makeValueEditable(valueId, min, max, formatter);
}

// Tap the number to type a value directly (tablet-friendly).
function makeValueEditable(valueId, min, max, formatter) {
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
        syncPresetActive(valueId.replace('-value', ''), formatter(v));
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

function renderRecipe(recipe) {
  if (!recipe) return;
  const dv = recipe.dashboardVariables || {};
  setInput('re-name-input',     recipe.name || '');
  setInput('re-beverage-input', recipe.beverage || '');
  setInput('re-barista-input',  recipe.barista || '');
  setInput('re-drinker-input',  recipe.drinker || '');

  set('re-dose-value',  dv.dose     != null ? dv.dose + 'g'          : '—');
  set('re-drink-value', dv.drink    != null ? dv.drink + 'g'         : '—');
  set('re-drink-sub',   dv.ratio    != null ? '(1:' + dv.ratio + ')' : '');
  set('re-brew-c-value',dv.brewC    != null ? dv.brewC + '°c'        : '—');
  set('re-steam-value', dv.steamTimeS  != null ? dv.steamTimeS + 's' : dv.steamFlowMls != null ? dv.steamFlowMls + 'ml/s' : '—');
  set('re-flush-value', dv.flushS   != null ? dv.flushS + 's'        : '—');
  set('re-hotwater-value', dv.hotWaterMl != null ? dv.hotWaterMl + 'ml' : (dv.hotWaterTempC != null ? dv.hotWaterTempC + '°C' : '—'));
  set('re-hotwater-sub',   dv.hotWaterTempC != null ? dv.hotWaterTempC + '°C' : '');
  // Point the mode toggles at the recipe's stored mode so units + presets match the value shown.
  setMode('re-steam-mode',    dv.steamMode    || (dv.steamFlowMls != null ? 'flow' : dv.steamTimeS != null ? 'time' : 'flow'));
  setMode('re-hotwater-mode', dv.hotWaterMode || (dv.hotWaterTempC != null ? 'temp' : 'vol'));
  set('re-grind-value', dv.grind    != null ? String(dv.grind)       : '—');
  set('re-rpm-value',   dv.rpm      != null ? String(dv.rpm)         : '—');

  showOnStreamline = recipe.showOnStreamlineDashboard !== false;
  updateStreamlineBtn();

  selectedBeanId      = recipe.beanId || null;
  selectedBeanName    = recipe.beanName || null;
  selectedProfileId   = recipe.profileId || null;
  selectedProfileTitle = recipe.profileTitle || null;
  renderBeanChips();
  renderProfileChips();

  if (dv.grinderId) selectedGrinderId = dv.grinderId;
  renderGrinderChips();

  syncPresetActive('re-dose',   set => {});
}

// Build a recipe-shaped patch from the live workflow.
async function readFromWorkflow() {
  const wf = await getWorkflow().catch(() => null);
  const ctx = (wf && wf.context) || {};
  const g = grinders.find(x => (x.model || x.name) === ctx.grinderModel);
  return {
    barista: ctx.baristaName || ctx.barista || '',
    drinker: ctx.drinkerName || ctx.drinker || '',
    dashboardVariables: {
      dose:  ctx.targetDoseWeight,
      drink: ctx.targetYield,
      grind: ctx.grinderSetting,
      rpm:   ctx.extras && ctx.extras.rpm,
      grinderId: g ? g.id : undefined,
    },
  };
}

// Build a recipe-shaped patch from a chosen favourite's snapshot, loading the WHOLE
// form (bean + profile included). Deliberately ignores the favourite's copyMask: the
// user explicitly picked this favourite and confirmed, so "give me everything it has"
// is least-surprising here (unlike the dashboard's auto-apply, which honours the mask).
// Bean is matched by coffee name → bean id so the chip highlights; profile carries its
// own id. brewC/steam/flush/hotWater aren't in a favourite snapshot, so those stay put.
function favouriteToRecipePatch(fav) {
  const s = fav.snapshot || {};
  const bean = s.coffeeName ? beans.find(b => b.name === s.coffeeName) : null;
  return {
    beverage:     fav.beverage || '',
    barista:      s.barista || '',
    drinker:      s.drinker || '',
    beanId:       bean ? bean.id : null,
    beanName:     s.coffeeName || null,
    profileId:    s.profileId || null,
    profileTitle: s.profileTitle || null,
    dashboardVariables: {
      dose:  s.dose,
      drink: s.drink,
      grind: s.grindSetting,
      rpm:   s.rpm,
      grinderId: s.grinderId,
    },
  };
}

// Merge a patch into the current recipe (keep id/name), then re-render.
function applyToCurrentRecipe(src) {
  if (!src) return;
  const cur = recipes[currentRecipeIdx] || {};
  const merged = {
    ...cur, ...src, id: cur.id, name: cur.name,
    dashboardVariables: { ...(cur.dashboardVariables || {}), ...(src.dashboardVariables || {}) },
  };
  recipes[currentRecipeIdx] = merged;
  if (merged.dashboardVariables.grinderId) selectedGrinderId = merged.dashboardVariables.grinderId;
  renderRecipe(merged);
}

// Show the assigned item first (so it is always visible + active), then fill up to the limit.
function orderedChips(list, selectedId, limit) {
  const sel = list.find(x => String(x.id) === String(selectedId));
  const rest = list.filter(x => x !== sel);
  return (sel ? [sel, ...rest] : rest).slice(0, limit);
}

function renderChipGrid(containerId, items, isActive, labelOf, onPick, seeAllRoute) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const chip = document.createElement('div');
    chip.className = 're-chip' + (isActive(item) ? ' active' : '');
    chip.textContent = labelOf(item);
    chip.addEventListener('click', () => { onPick(item); });
    container.appendChild(chip);
  });
  const seeAll = document.createElement('div');
  seeAll.className = 're-see-all';
  seeAll.textContent = seeAllRoute.beans ? 'See All Beans' : 'See All Profiles';
  seeAll.addEventListener('click', () => goToPicker(seeAllRoute.url));
  container.appendChild(seeAll);
}

function renderBeanChips() {
  renderChipGrid(
    're-bean-chips',
    orderedChips(beans, selectedBeanId, 5),
    b => String(b.id) === String(selectedBeanId),
    b => b.name || 'Unnamed bean',
    b => { selectedBeanId = b.id; selectedBeanName = b.name || ''; renderBeanChips(); },
    { beans: true, url: '/api/v1/plugins/dye2.reaplugin/bean-picker?return=/api/v1/plugins/dye2.reaplugin/recipe-edit' }
  );
}

// Bridge profiles nest the title under profile.title (not a top-level field).
function profileLabel(p) {
  return (p.profile && p.profile.title) || p.title || p.name || 'Untitled';
}

function renderProfileChips() {
  renderChipGrid(
    're-profile-chips',
    orderedChips(profiles, selectedProfileId, 5),
    p => String(p.id) === String(selectedProfileId),
    p => profileLabel(p),
    p => { selectedProfileId = p.id; selectedProfileTitle = profileLabel(p); renderProfileChips(); },
    { beans: false, url: '/api/v1/plugins/dye2.reaplugin/profile-picker?return=/api/v1/plugins/dye2.reaplugin/recipe-edit' }
  );
}

function renderGrinderChips() {
  const container = document.getElementById('re-grinder-chips');
  if (!container) return;
  container.innerHTML = '';
  if (grinders.length === 0) {
    container.innerHTML = '<span style="color:var(--text-primary-disabled);font-size:20px">No grinders</span>';
    return;
  }
  grinders.forEach(g => {
    const chip = document.createElement('button');
    chip.className = 're-grinder-chip' + (g.id === selectedGrinderId ? ' active' : '');
    chip.textContent = g.model || g.name || 'Grinder';
    chip.addEventListener('click', () => {
      container.querySelectorAll('.re-grinder-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedGrinderId = g.id;
    });
    container.appendChild(chip);
  });
}

function updateStreamlineBtn() {
  const btn = document.getElementById('re-show-streamline-btn');
  if (btn) btn.style.opacity = showOnStreamline ? '1' : '0.4';
}

function getCurrentRecipeData() {
  const num = id => parseFloat(document.getElementById(id)?.textContent) || 0;
  const steamMode = document.querySelector('.re-steam-mode.active')?.dataset.mode || 'flow';
  const steamVal  = num('re-steam-value');
  const hwMode    = document.querySelector('.re-hotwater-mode.active')?.dataset.mode || 'vol';
  const hwVal     = num('re-hotwater-value');
  return {
    name:      document.getElementById('re-name-input')?.value || '',
    beverage:  document.getElementById('re-beverage-input')?.value || '',
    barista:   document.getElementById('re-barista-input')?.value || '',
    drinker:   document.getElementById('re-drinker-input')?.value || '',
    beanId:    selectedBeanId,
    beanName:  selectedBeanName,
    profileId: selectedProfileId,
    profileTitle: selectedProfileTitle,
    showOnStreamlineDashboard: showOnStreamline,
    dashboardVariables: {
      dose:    num('re-dose-value'),
      drink:   num('re-drink-value'),
      brewC:   num('re-brew-c-value') || 93,
      steamMode,
      steamTimeS:   steamMode === 'time' ? steamVal : undefined,
      steamFlowMls: steamMode === 'flow' ? steamVal : undefined,
      flushS:  num('re-flush-value'),
      hotWaterMode:  hwMode,
      hotWaterMl:    hwMode === 'vol'  ? hwVal : undefined,
      hotWaterTempC: hwMode === 'temp' ? hwVal : undefined,
      grind:   num('re-grind-value'),
      rpm:     num('re-rpm-value'),
      grinderId: selectedGrinderId,
    },
  };
}

function setupTabs() {
  document.getElementById('re-tabs')?.querySelectorAll('.re-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.re-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRecipeIdx = parseInt(btn.dataset.recipe);
      const recipe = recipes[currentRecipeIdx];
      if (recipe) renderRecipe(recipe);
    });
  });
}

// Persist the in-progress form (full-page nav to the picker would otherwise lose it),
// then open the picker. initRecipeEdit restores the draft and folds in the pick on return.
function goToPicker(route) {
  const cur = recipes[currentRecipeIdx] || {};
  recipes[currentRecipeIdx] = { ...cur, ...getCurrentRecipeData(), id: cur.id };
  sessionStorage.setItem('dye_recipeDraft', JSON.stringify({ idx: currentRecipeIdx, recipes }));
  window.location.href = route;
}

// Steam/Hot-Water toggles change BOTH the unit shown in the stepper and the preset strip.
// ponytail: preset values below are sensible DE1 defaults — confirm against Figma if needed.
const MODE_CFG = {
  're-steam-mode': {
    valueId: 're-steam-value',
    unit:    { time: 's', flow: 'ml/s' },
    presets: { time: ['29s','15s','31s','28s'], flow: ['0.8ml/s','1ml/s','1.2ml/s','1.5ml/s'] },
  },
  're-hotwater-mode': {
    valueId: 're-hotwater-value',
    unit:    { vol: 'ml', temp: '°c' },
    presets: { vol: ['75ml','120ml','180ml','200ml'], temp: ['80°c','85°c','90°c','95°c'] },
  },
};
function activeMode(cls) { return document.querySelector('.' + cls + '.active')?.dataset.mode; }
// Wire preset buttons within one strip (setupPresetStrips only wires what exists at load).
function wirePresetButtons(container) {
  container.querySelectorAll('.dye-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const valueEl = document.getElementById(btn.dataset.for + '-value');
      if (valueEl) valueEl.textContent = btn.dataset.preset;
      container.querySelectorAll('.dye-preset').forEach(b => b.classList.toggle('dye-preset-active', b.dataset.preset === btn.dataset.preset));
    });
  });
}
function applyMode(cls) {
  const cfg = MODE_CFG[cls]; if (!cfg) return;
  const mode = activeMode(cls);
  const idPrefix = cfg.valueId.replace('-value', '');
  const strip = document.getElementById(idPrefix + '-presets');
  if (strip && cfg.presets[mode]) {
    strip.innerHTML = cfg.presets[mode]
      .map(p => '<button class="dye-preset" data-preset="' + p + '" data-for="' + idPrefix + '">' + p + '</button>').join('');
    wirePresetButtons(strip);
  }
  const valEl = document.getElementById(cfg.valueId);
  if (valEl) {
    const n = parseFloat(valEl.textContent);
    valEl.textContent = isNaN(n) ? '—' : n + (cfg.unit[mode] || '');
    syncPresetActive(idPrefix, valEl.textContent);
  }
}
function setMode(cls, mode) {
  document.querySelectorAll('.' + cls).forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  applyMode(cls);
}
function setupModeToggle(cls) {
  document.querySelectorAll('.' + cls).forEach(btn => {
    btn.addEventListener('click', () => setMode(cls, btn.dataset.mode));
  });
  applyMode(cls);   // sync presets + unit to the default-active mode on load
}

// ── Name lookups: pick from previously entered values ───────────────────────
async function distinctNames(key) {
  const shots = await getShots({ limit: 200 }).catch(() => []);
  const seen = new Set();
  (Array.isArray(shots) ? shots : (shots.items || [])).forEach(s => {
    const ctx = (s.workflow && s.workflow.context) || {};
    const name = ctx[key] || (s.metadata && s.metadata[key === 'baristaName' ? 'barista' : 'drinker']);
    if (name) seen.add(name);
  });
  return [...seen];
}
async function distinctBeverages() {
  const [recipeList, favs] = await Promise.all([getRecipes().catch(() => []), getAutoFavourites().catch(() => [])]);
  const seen = new Set();
  (Array.isArray(recipeList) ? recipeList : []).forEach(r => { if (r && r.beverage) seen.add(r.beverage); });
  (Array.isArray(favs) ? favs : []).forEach(f => { if (f && f.beverage) seen.add(f.beverage); });
  return [...seen];
}
const nameComboCache = {};
function setupNameCombo(field, loader) {
  const input = document.getElementById(field + '-input');
  const drop  = document.getElementById(field + '-drop');
  const pencil = document.getElementById(field + '-pencil');
  if (!input || !drop) return;
  async function options() {
    if (!nameComboCache[field]) { try { nameComboCache[field] = await loader(); } catch (e) { nameComboCache[field] = []; } }
    return nameComboCache[field];
  }
  async function open() {
    const opts = await options();
    const q = (input.value || '').trim().toLowerCase();
    const list = q ? opts.filter(o => String(o).toLowerCase().includes(q)) : opts;
    drop.innerHTML = '';
    if (!list.length) {
      const e = document.createElement('div'); e.className = 're-combo-empty'; e.textContent = 'No previous entries'; drop.appendChild(e);
    } else {
      list.slice(0, 50).forEach(o => {
        const el = document.createElement('div'); el.className = 're-combo-opt'; el.textContent = o;
        // mousedown (not click) so the pick lands before the input's blur closes the drop.
        el.addEventListener('mousedown', (ev) => { ev.preventDefault(); input.value = o; drop.classList.remove('open'); });
        drop.appendChild(el);
      });
    }
    drop.classList.add('open');
  }
  pencil?.addEventListener('click', () => { input.focus(); open(); });
  input.addEventListener('focus', open);
  input.addEventListener('input', open);
  input.addEventListener('blur', () => setTimeout(() => drop.classList.remove('open'), 150));
}

function setupStreamlineToggle() {
  document.getElementById('re-show-streamline-btn')?.addEventListener('click', () => {
    showOnStreamline = !showOnStreamline;
    updateStreamlineBtn();
  });
}

function setupFooter() {
  const rfBtn  = document.getElementById('re-read-from-btn');
  const rfDrop = document.getElementById('re-read-from-dropdown');
  rfBtn?.addEventListener('click', e => { e.stopPropagation(); rfDrop?.classList.toggle('open'); });
  document.addEventListener('click', () => rfDrop?.classList.remove('open'));

  document.getElementById('re-read-from-workflow')?.addEventListener('click', async () => {
    applyToCurrentRecipe(await readFromWorkflow());
    rfDrop?.classList.remove('open');
  });
  // Route to the Auto Favourites picker (select a card + Confirm). On return,
  // initRecipeEdit reads dye_selectedAutoFavId and loads the whole recipe from it.
  document.getElementById('re-read-from-fav')?.addEventListener('click', () => {
    rfDrop?.classList.remove('open');
    goToPicker('/api/v1/plugins/dye2.reaplugin/auto-favs');
  });

  document.getElementById('re-name-pencil')?.addEventListener('click', () => {
    const inp = document.getElementById('re-name-input');
    if (inp) { inp.focus(); inp.select(); }
  });

  document.getElementById('re-clear-btn')?.addEventListener('click', () => {
    recipes[currentRecipeIdx] = {};
    renderRecipe({});
  });

  document.getElementById('re-cancel-btn')?.addEventListener('click', () => window.history.back());

  document.getElementById('re-save-btn')?.addEventListener('click', async () => {
    const data = getCurrentRecipeData();
    const recipe = recipes[currentRecipeIdx];
    try {
      if (recipe && recipe.id) {
        await updateRecipe(recipe.id, data);
      }
      window.history.back();
    } catch (e) { console.error('Failed to save recipe:', e); }
  });
}

async function initRecipeEdit() {
  setupTabs();
  setupStreamlineToggle();
  setupPresetStrips();
  // After setupPresetStrips so the mode toggle owns/rewires the strips it rebuilds.
  setupModeToggle('re-steam-mode');
  setupModeToggle('re-hotwater-mode');
  setupNameCombo('re-barista',  () => distinctNames('baristaName'));
  setupNameCombo('re-drinker',  () => distinctNames('drinkerName'));
  setupNameCombo('re-beverage', distinctBeverages);
  setupFooter();

  wireAdjuster('re-dose-minus',  're-dose-plus',  're-dose-value',  0.5, 0, null, v => v + 'g');
  wireAdjuster('re-drink-minus', 're-drink-plus', 're-drink-value', 1,   0, null, v => v + 'g');
  wireAdjuster('re-brew-c-minus','re-brew-c-plus','re-brew-c-value',1, 60, 100,  v => v + '°c');
  wireAdjuster('re-steam-minus', 're-steam-plus', 're-steam-value', 1,   0, null, v => v + (MODE_CFG['re-steam-mode'].unit[activeMode('re-steam-mode')] || 's'));
  wireAdjuster('re-flush-minus', 're-flush-plus', 're-flush-value', 1,   0, null, v => v + 's');
  wireAdjuster('re-hotwater-minus','re-hotwater-plus','re-hotwater-value', 5, 0, null, v => v + (MODE_CFG['re-hotwater-mode'].unit[activeMode('re-hotwater-mode')] || 'ml'));
  wireAdjuster('re-grind-minus', 're-grind-plus', 're-grind-value', 0.1, 0, null, v => v.toFixed(1));
  wireAdjuster('re-rpm-minus',   're-rpm-plus',   're-rpm-value',   1,   1, null, v => String(v));

  let loadedRecipes = [];
  try {
    const result = await getRecipes();
    loadedRecipes = Array.isArray(result) ? result : (result && result.items ? result.items : []);
  } catch (e) {
    console.warn('Could not load recipes from KV store:', e);
  }
  // Normalize to NUM_RECIPES fixed slots with stable ids ("1".."5") so save() always upserts.
  recipes = Array.from({ length: NUM_RECIPES }, (_, i) => {
    const id = String(i + 1);
    const existing = loadedRecipes.find(r => r && r.id === id);
    return existing ? { ...existing, id } : { id, name: 'Recipe ' + (i + 1) };
  });
  document.querySelectorAll('.re-tab').forEach((btn, i) => {
    if (recipes[i] && recipes[i].name) btn.textContent = recipes[i].name;
  });

  try {
    const gs = await getGrinders().catch(() => []);
    grinders = Array.isArray(gs) ? gs : (gs && gs.items ? gs.items : []);
  } catch (e) { grinders = []; }

  const bs = await getBeans().catch(() => []);
  beans = Array.isArray(bs) ? bs : (bs && bs.items ? bs.items : []);
  const ps = await getProfiles().catch(() => []);
  profiles = Array.isArray(ps) ? ps : (ps && ps.items ? ps.items : []);

  const storedIdx = parseInt(sessionStorage.getItem('dye_editRecipeIdx') || '0');
  currentRecipeIdx = isNaN(storedIdx) ? 0 : Math.min(storedIdx, NUM_RECIPES - 1);

  // Returning from a See-All picker: restore the draft we stashed, then fold in the pick.
  // Gated on the draft so stray picker keys from other flows are never adopted here.
  const draftRaw = sessionStorage.getItem('dye_recipeDraft');
  sessionStorage.removeItem('dye_recipeDraft');
  if (draftRaw) {
    try {
      const draft = JSON.parse(draftRaw);
      if (Array.isArray(draft.recipes) && draft.recipes.length === NUM_RECIPES) recipes = draft.recipes;
      if (draft.idx != null) currentRecipeIdx = Math.min(draft.idx, NUM_RECIPES - 1);
      const cur = recipes[currentRecipeIdx] || (recipes[currentRecipeIdx] = { id: String(currentRecipeIdx + 1) });
      const beanId = sessionStorage.getItem('dye_selectedBeanId');
      if (beanId) {
        cur.beanId = beanId;
        cur.beanName = sessionStorage.getItem('dye_selectedBeanName') || '';
        ['dye_selectedBeanId','dye_selectedBeanName','dye_selectedBeanRoaster','dye_selectedBatchId','dye_selectedRoastDate']
          .forEach(k => sessionStorage.removeItem(k));
      }
      const profileId = sessionStorage.getItem('dye_selectedProfileId');
      if (profileId) {
        cur.profileId = profileId;
        cur.profileTitle = sessionStorage.getItem('dye_selectedProfileTitle') || '';
        ['dye_selectedProfileId','dye_selectedProfileTitle'].forEach(k => sessionStorage.removeItem(k));
      }
    } catch (e) { console.warn('recipe draft restore failed:', e); }
  }
  // Returning from the Auto Favourites picker: load the chosen favourite into this recipe.
  // Applied after the draft restore so it overwrites the in-progress form as intended.
  const selFavId = sessionStorage.getItem('dye_selectedAutoFavId');
  if (selFavId) {
    sessionStorage.removeItem('dye_selectedAutoFavId');
    try {
      const fav = await getAutoFavourite(selFavId);
      if (fav) applyToCurrentRecipe(favouriteToRecipePatch(fav));
    } catch (e) { console.warn('Could not load selected auto-favourite:', e); }
  }
  const activeTab = document.querySelectorAll('.re-tab')[currentRecipeIdx];
  if (activeTab) {
    document.querySelectorAll('.re-tab').forEach(b => b.classList.remove('active'));
    activeTab.classList.add('active');
  }
  renderRecipe(recipes[currentRecipeIdx] || {});
  renderGrinderChips();
}

initRecipeEdit().catch(e => console.error('initRecipeEdit failed:', e));

// Returning via history.back() from the favourites picker can restore this page frozen
// from bfcache, so init (and the apply-selected-favourite step) never re-runs — reload
// to re-fetch and fold in the pick. Mirrors the dashboard.
window.addEventListener('pageshow', function(e) { if (e.persisted) window.location.reload(); });
`;
	function renderRecipeEditPage(request) {
		return {
			requestId: request.requestId,
			status: 200,
			headers: { "Content-Type": "text/html; charset=utf-8" },
			body: devPageShell("Edit Recipes", buildContent(), styles, [devApiScript, pageScript])
		};
	}
	//#endregion
	//#region src/plugin.ts
	function createPlugin(host) {
		function log(msg) {
			host.log(`[dye2] ${msg}`);
		}
		return {
			id: "dye2.reaplugin",
			version: "0.1.0",
			onLoad(_settings) {
				log("DYE2 plugin loaded");
			},
			onUnload() {
				log("DYE2 plugin unloaded");
			},
			onEvent(_event) {},
			__httpRequestHandler(request) {
				log(`HTTP ${request.method} ${request.endpoint}`);
				switch (request.endpoint) {
					case "grinders": return renderGrindersPage(request);
					case "bean-picker": return renderBeanPickerPage(request);
					case "grinder-picker": return renderGrinderPickerPage(request);
					case "profile-picker": return renderProfilePickerPage(request);
					case "roasters": return renderRoastersPage(request);
					case "add-bean": return renderAddBeanPage(request);
					case "dashboard": return renderDashboardPage(request);
					case "edit-shot": return renderEditShotPage(request);
					case "auto-favs": return renderAutoFavsPage(request);
					case "auto-fav-edit": return renderAutoFavEditPage(request);
					case "recipe-edit": return renderRecipeEditPage(request);
					default: return {
						requestId: request.requestId,
						status: 404,
						headers: { "Content-Type": "text/plain" },
						body: "Not found"
					};
				}
			}
		};
	}
	//#endregion
	return createPlugin;
})();
