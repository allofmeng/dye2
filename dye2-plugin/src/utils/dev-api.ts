/**
 * Browser-side API client for dev-style pages.
 * Exported as a string to be inlined as a <script> block in served HTML.
 * Covers all functions used by dye.js and dyeDashboard.js.
 */
export const devApiScript = `
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

// Recipes (R mode)
async function getRecipes() { return kvGetArray('recipes'); }

async function updateRecipe(id, data) {
  const arr = await kvGetArray('recipes');
  const item = { ...data, id };
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
  arr.push(fav);
  await kvSetArray('autoFavourites', arr);
  return fav;
}

async function updateAutoFavourite(id, data) {
  const arr = await kvGetArray('autoFavourites');
  const item = { ...data, id };
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
