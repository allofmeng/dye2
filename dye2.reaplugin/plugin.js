var createPlugin = function() {
  "use strict";
  function html(strings, ...values) {
    return strings.reduce((result, str, i) => {
      const value = i < values.length ? String(values[i]) : "";
      return result + str + value;
    }, "");
  }
  function sharedStyles() {
    return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #1a1a2e;
      color: #e0e0e0;
      padding: 16px;
    }
    h1 { font-size: 1.4rem; margin-bottom: 16px; color: #fff; }
    h2 { font-size: 1.1rem; margin-bottom: 12px; color: #ccc; }
    button {
      background: #16213e;
      color: #e0e0e0;
      border: 1px solid #0f3460;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    button:hover { background: #0f3460; }
    button.primary { background: #533483; border-color: #533483; }
    button.primary:hover { background: #6a42a0; }
    button.danger { background: #6b2737; border-color: #6b2737; }
    button.danger:hover { background: #8b3a4a; }
    input, select, textarea {
      background: #16213e;
      color: #e0e0e0;
      border: 1px solid #0f3460;
      padding: 8px;
      border-radius: 4px;
      font-size: 0.9rem;
      width: 100%;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #533483;
    }
    .card {
      background: #16213e;
      border: 1px solid #0f3460;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .flex { display: flex; gap: 8px; align-items: center; }
    .flex-between { display: flex; justify-content: space-between; align-items: center; }
    .grid { display: grid; gap: 12px; }
    .grid-2 { grid-template-columns: 1fr 1fr; }
    .mt-8 { margin-top: 8px; }
    .mt-16 { margin-top: 16px; }
    .mb-8 { margin-bottom: 8px; }
    .text-muted { color: #888; }
    .text-small { font-size: 0.8rem; }
    .hidden { display: none; }
    .icon-btn {
      background: none;
      border: none;
      color: #888;
      padding: 4px 8px;
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer;
      border-radius: 4px;
    }
    .icon-btn:hover { background: #0f3460; color: #e0e0e0; }
    .tag {
      display: inline-block;
      background: #0f3460;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      margin-right: 4px;
    }
  `;
  }
  function pageShell(title, content, scripts = []) {
    return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DYE2 - ${title}</title>
  <style>${sharedStyles()}</style>
</head>
<body>
  ${content}
  ${scripts.map((s) => `<script>${s}<\/script>`).join("\n")}
</body>
</html>`;
  }
  const beanListComponent = `
class Dye2BeanList extends HTMLElement {
  constructor() {
    super();
    this._beans = [];
    this._showArchived = false;
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  connectedCallback() {
    this.render();
    this.fetchBeans();
  }

  async fetchBeans() {
    try {
      const params = this._showArchived ? '?includeArchived=true' : '';
      const res = await fetch('/api/v1/beans' + params);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._beans = await res.json();
      this.render();
    } catch (err) {
      this.innerHTML = '<p style="color: #ff6b6b;">Failed to load beans: ' + err.message + '</p>';
    }
  }

  toggleArchived() {
    this._showArchived = !this._showArchived;
    this.fetchBeans();
  }

  render() {
    const beans = this._beans;
    this.innerHTML = \`
      <div class="flex-between mb-8">
        <h1>Beans</h1>
        <div class="flex">
          <label class="flex" style="cursor:pointer;">
            <input type="checkbox" \${this._showArchived ? 'checked' : ''} style="width:auto;" />
            <span class="text-small">Show archived</span>
          </label>
          <button class="primary" data-action="create">+ Add Bean</button>
        </div>
      </div>
      \${beans.length === 0
        ? '<p class="text-muted">No beans yet. Add your first coffee!</p>'
        : beans.map(bean => \`
          <div class="card" data-bean-id="\${bean.id}">
            <div class="flex-between">
              <div>
                <strong>\${this._esc(bean.name) || 'Unnamed'}</strong>
                <span class="text-muted"> by \${this._esc(bean.roaster) || 'Unknown roaster'}</span>
              </div>
              <div class="flex">
                \${bean.archived ? '<span class="tag">archived</span>' : ''}
                \${bean.country ? '<span class="tag">' + this._esc(bean.country) + '</span>' : ''}
                \${bean.processing ? '<span class="tag">' + this._esc(bean.processing) + '</span>' : ''}
                <button class="icon-btn" data-edit-bean-id="\${bean.id}" title="Edit bean">&hellip;</button>
              </div>
            </div>
            \${bean.variety && bean.variety.length ? '<div class="text-small text-muted mt-8">' + bean.variety.map(v => this._esc(v)).join(', ') + '</div>' : ''}
          </div>
        \`).join('')
      }
    \`;

    // Event listeners
    const checkbox = this.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.addEventListener('change', () => this.toggleArchived());

    const createBtn = this.querySelector('[data-action="create"]');
    if (createBtn) createBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('create-bean', { bubbles: true }));
    });

    this.querySelectorAll('[data-edit-bean-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-edit-bean-id');
        this.dispatchEvent(new CustomEvent('edit-bean', { detail: { id }, bubbles: true }));
      });
    });

    this.querySelectorAll('[data-bean-id]').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-bean-id');
        this.dispatchEvent(new CustomEvent('select-bean', { detail: { id }, bubbles: true }));
      });
    });
  }
}
customElements.define('dye2-bean-list', Dye2BeanList);
`;
  const beanFormComponent = `
class Dye2BeanForm extends HTMLElement {
  constructor() {
    super();
    this._beanId = null;
    this._loading = false;
    this._error = null;
    this._data = {};
  }

  static get observedAttributes() {
    return ['bean-id'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'bean-id') {
      this._beanId = newVal;
    }
  }

  connectedCallback() {
    this._beanId = this.getAttribute('bean-id') || null;
    this._data = {};
    this._error = null;
    if (this._beanId) {
      this._loadBean();
    } else {
      this.render();
    }
  }

  async _loadBean() {
    this._loading = true;
    this.render();
    try {
      const res = await fetch('/api/v1/beans/' + this._beanId);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._data = await res.json();
      this._loading = false;
      this.render();
    } catch (err) {
      this._loading = false;
      this._error = 'Failed to load bean: ' + err.message;
      this.render();
    }
  }

  _val(field) {
    return this._data[field] != null ? this._data[field] : '';
  }

  render() {
    if (this._loading) {
      this.innerHTML = '<div class="card"><p class="text-muted">Loading bean...</p></div>';
      return;
    }
    if (this._error) {
      this.innerHTML = '<div class="card"><p style="color:#ff6b6b;">' + this._error + '</p>'
        + '<button data-action="cancel">Back</button></div>';
      this.querySelector('[data-action="cancel"]').addEventListener('click', () => this._cancel());
      return;
    }

    const isEdit = !!this._beanId;
    const variety = Array.isArray(this._data.variety) ? this._data.variety.join(', ') : (this._data.variety || '');
    const altitude = Array.isArray(this._data.altitude) ? this._data.altitude.join('-') : (this._data.altitude || '');
    const decaf = this._data.decaf || false;

    this.innerHTML = \`
      <div class="card">
        <h2>\${isEdit ? 'Edit Bean' : 'New Bean'}</h2>
        <form id="bean-form">
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Roaster *</label>
              <input name="roaster" required value="\${this._esc(this._val('roaster'))}" placeholder="Roaster name" />
            </div>
            <div>
              <label class="text-small text-muted">Name *</label>
              <input name="name" required value="\${this._esc(this._val('name'))}" placeholder="Bean name" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Country</label>
              <input name="country" value="\${this._esc(this._val('country'))}" placeholder="Country of origin" />
            </div>
            <div>
              <label class="text-small text-muted">Region</label>
              <input name="region" value="\${this._esc(this._val('region'))}" placeholder="Region" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Producer</label>
              <input name="producer" value="\${this._esc(this._val('producer'))}" placeholder="Producer / Farm" />
            </div>
            <div>
              <label class="text-small text-muted">Species</label>
              <input name="species" value="\${this._esc(this._val('species'))}" placeholder="e.g. arabica" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Processing</label>
              <input name="processing" value="\${this._esc(this._val('processing'))}" placeholder="e.g. washed, natural, honey" />
            </div>
            <div>
              <label class="text-small text-muted">Variety (comma-separated)</label>
              <input name="variety" value="\${this._esc(variety)}" placeholder="e.g. Bourbon, Typica" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Altitude (e.g. 1500-1800)</label>
              <input name="altitude" value="\${this._esc(altitude)}" placeholder="min-max in meters" />
            </div>
            <div class="flex" style="align-items:flex-end;padding-bottom:2px;">
              <label class="flex" style="cursor:pointer;">
                <input type="checkbox" name="decaf" \${decaf ? 'checked' : ''} style="width:auto;" />
                <span class="text-small">Decaf</span>
              </label>
            </div>
          </div>
          <div class="mb-8 \${decaf ? '' : 'hidden'}" id="decaf-process-row">
            <label class="text-small text-muted">Decaf Process</label>
            <input name="decafProcess" value="\${this._esc(this._val('decafProcess'))}" placeholder="e.g. Swiss Water, CO2" />
          </div>
          <div class="mb-8">
            <label class="text-small text-muted">Notes</label>
            <textarea name="notes" rows="3" placeholder="Tasting notes, comments...">\${this._esc(this._val('notes'))}</textarea>
          </div>
          <div class="flex">
            <button type="submit" class="primary">\${isEdit ? 'Save' : 'Create'}</button>
            <button type="button" data-action="cancel">Cancel</button>
          </div>
        </form>
      </div>
    \`;

    // Toggle decaf process visibility
    const decafCheckbox = this.querySelector('input[name="decaf"]');
    const decafRow = this.querySelector('#decaf-process-row');
    if (decafCheckbox && decafRow) {
      decafCheckbox.addEventListener('change', () => {
        decafRow.classList.toggle('hidden', !decafCheckbox.checked);
      });
    }

    // Cancel button
    this.querySelector('[data-action="cancel"]').addEventListener('click', () => this._cancel());

    // Form submit
    this.querySelector('#bean-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this._submit();
    });
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('bean-cancelled', { bubbles: true }));
  }

  async _submit() {
    const form = this.querySelector('#bean-form');
    const fd = new FormData(form);

    const body = {
      roaster: fd.get('roaster') || '',
      name: fd.get('name') || '',
    };

    // Optional text fields
    const optionalText = ['species', 'country', 'region', 'producer', 'processing', 'decafProcess', 'notes'];
    for (const key of optionalText) {
      const v = fd.get(key);
      if (v) body[key] = v;
    }

    // Variety — comma-separated to array
    const varietyStr = fd.get('variety');
    if (varietyStr) {
      body.variety = varietyStr.split(',').map(s => s.trim()).filter(Boolean);
    }

    // Altitude — "min-max" to [min, max]
    const altStr = fd.get('altitude');
    if (altStr) {
      const parts = altStr.split('-').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
      if (parts.length > 0) body.altitude = parts;
    }

    // Decaf
    body.decaf = !!form.querySelector('input[name="decaf"]').checked;

    // Remove decafProcess if not decaf
    if (!body.decaf) delete body.decafProcess;

    try {
      const url = this._beanId ? '/api/v1/beans/' + this._beanId : '/api/v1/beans';
      const method = this._beanId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error('HTTP ' + res.status + ': ' + text);
      }
      this.dispatchEvent(new CustomEvent('bean-saved', { bubbles: true }));
    } catch (err) {
      this._error = 'Save failed: ' + err.message;
      this.render();
    }
  }
}
customElements.define('dye2-bean-form', Dye2BeanForm);
`;
  const beanBatchListComponent = `
class Dye2BeanBatchList extends HTMLElement {
  constructor() {
    super();
    this._batches = [];
    this._beanId = null;
    this._loading = false;
    this._showArchived = false;
  }

  static get observedAttributes() {
    return ['bean-id'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'bean-id') {
      this._beanId = newVal;
    }
  }

  connectedCallback() {
    this._beanId = this.getAttribute('bean-id') || null;
    if (this._beanId) {
      this.fetchBatches();
    } else {
      this.render();
    }
  }

  async fetchBatches() {
    if (!this._beanId) return;
    this._loading = true;
    this.render();
    try {
      const params = this._showArchived ? '?includeArchived=true' : '';
      const res = await fetch('/api/v1/beans/' + this._beanId + '/batches' + params);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._batches = await res.json();
      this._loading = false;
      this.render();
    } catch (err) {
      this._loading = false;
      this.innerHTML = '<p style="color: #ff6b6b;">Failed to load batches: ' + err.message + '</p>';
    }
  }

  toggleArchived() {
    this._showArchived = !this._showArchived;
    this.fetchBatches();
  }

  _formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  render() {
    if (this._loading) {
      this.innerHTML = '<div class="card"><p class="text-muted">Loading batches...</p></div>';
      return;
    }

    if (!this._beanId) {
      this.innerHTML = '<p class="text-muted">No bean selected.</p>';
      return;
    }

    const batches = this._batches;
    this.innerHTML = \`
      <div class="flex-between mb-8">
        <div class="flex">
          <button data-action="back">&larr; Back to beans</button>
          <h2 style="margin:0;">Batches</h2>
          <button data-action="edit-bean">Edit Bean</button>
        </div>
        <div class="flex">
          <label class="flex" style="cursor:pointer;">
            <input type="checkbox" \${this._showArchived ? 'checked' : ''} style="width:auto;" />
            <span class="text-small">Show archived</span>
          </label>
          <button class="primary" data-action="create">+ Add Batch</button>
        </div>
      </div>
      \${batches.length === 0
        ? '<p class="text-muted">No batches yet. Add your first batch!</p>'
        : batches.map(b => \`
          <div class="card" data-batch-id="\${b.id}">
            <div class="flex-between">
              <div>
                \${b.roastDate ? '<strong>Roasted: ' + this._formatDate(b.roastDate) + '</strong>' : '<strong>Batch</strong>'}
              </div>
              <div class="flex">
                \${b.roastLevel ? '<span class="tag">' + this._esc(b.roastLevel) + '</span>' : ''}
                \${b.frozen ? '<span class="tag">frozen</span>' : ''}
                \${b.archived ? '<span class="tag">archived</span>' : ''}
              </div>
            </div>
            <div class="flex text-small text-muted mt-8" style="flex-wrap:wrap;">
              \${b.weight != null ? '<span>' + (b.weightRemaining != null ? b.weightRemaining + 'g / ' : '') + b.weight + 'g</span>' : ''}
              \${b.price != null ? '<span>' + (b.currency || '') + ' ' + b.price.toFixed(2) + '</span>' : ''}
              \${b.qualityScore != null ? '<span>Score: ' + b.qualityScore + '</span>' : ''}
            </div>
            \${b.notes ? '<div class="text-small text-muted mt-8" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + this._esc(b.notes) + '</div>' : ''}
          </div>
        \`).join('')
      }
    \`;

    // Event listeners
    const checkbox = this.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.addEventListener('change', () => this.toggleArchived());

    const backBtn = this.querySelector('[data-action="back"]');
    if (backBtn) backBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('back-to-beans', { bubbles: true }));
    });

    const editBeanBtn = this.querySelector('[data-action="edit-bean"]');
    if (editBeanBtn) editBeanBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('edit-bean', { detail: { id: this._beanId }, bubbles: true }));
    });

    const createBtn = this.querySelector('[data-action="create"]');
    if (createBtn) createBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('create-batch', { detail: { beanId: this._beanId }, bubbles: true }));
    });

    this.querySelectorAll('[data-batch-id]').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-batch-id');
        this.dispatchEvent(new CustomEvent('select-batch', { detail: { id, beanId: this._beanId }, bubbles: true }));
      });
    });
  }
}
customElements.define('dye2-bean-batch-list', Dye2BeanBatchList);
`;
  const beanBatchFormComponent = `
class Dye2BeanBatchForm extends HTMLElement {
  constructor() {
    super();
    this._beanId = null;
    this._batchId = null;
    this._loading = false;
    this._error = null;
    this._data = {};
  }

  static get observedAttributes() {
    return ['bean-id', 'batch-id'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'bean-id') this._beanId = newVal;
    if (name === 'batch-id') this._batchId = newVal;
  }

  connectedCallback() {
    this._beanId = this.getAttribute('bean-id') || null;
    this._batchId = this.getAttribute('batch-id') || null;
    this._data = {};
    this._error = null;
    if (this._batchId) {
      this._loadBatch();
    } else {
      this.render();
    }
  }

  async _loadBatch() {
    this._loading = true;
    this.render();
    try {
      const res = await fetch('/api/v1/bean-batches/' + this._batchId);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._data = await res.json();
      this._loading = false;
      this.render();
    } catch (err) {
      this._loading = false;
      this._error = 'Failed to load batch: ' + err.message;
      this.render();
    }
  }

  _val(field) {
    return this._data[field] != null ? this._data[field] : '';
  }

  _dateVal(field) {
    const v = this._data[field];
    if (!v) return '';
    // Return YYYY-MM-DD for date input
    try {
      return new Date(v).toISOString().split('T')[0];
    } catch (e) {
      return v;
    }
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  render() {
    if (this._loading) {
      this.innerHTML = '<div class="card"><p class="text-muted">Loading batch...</p></div>';
      return;
    }
    if (this._error) {
      this.innerHTML = '<div class="card"><p style="color:#ff6b6b;">' + this._error + '</p>'
        + '<button data-action="cancel">Back</button></div>';
      this.querySelector('[data-action="cancel"]').addEventListener('click', () => this._cancel());
      return;
    }

    const isEdit = !!this._batchId;
    const roastLevel = this._val('roastLevel');

    this.innerHTML = \`
      <div class="card">
        <h2>\${isEdit ? 'Edit Batch' : 'New Batch'}</h2>
        <form id="batch-form">
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Roast Date</label>
              <input type="date" name="roastDate" value="\${this._esc(this._dateVal('roastDate'))}" />
            </div>
            <div>
              <label class="text-small text-muted">Roast Level</label>
              <select name="roastLevel">
                <option value="">-- select --</option>
                <option value="light" \${roastLevel === 'light' ? 'selected' : ''}>Light</option>
                <option value="medium" \${roastLevel === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="medium-dark" \${roastLevel === 'medium-dark' ? 'selected' : ''}>Medium-Dark</option>
                <option value="dark" \${roastLevel === 'dark' ? 'selected' : ''}>Dark</option>
              </select>
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Weight (grams)</label>
              <input type="number" name="weight" min="0" step="1" value="\${this._esc(this._val('weight'))}" placeholder="e.g. 250" />
            </div>
            <div>
              <label class="text-small text-muted">Quality / Cupping Score</label>
              <input type="number" name="qualityScore" min="0" max="100" step="0.1" value="\${this._esc(this._val('qualityScore'))}" placeholder="e.g. 85.5" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Price</label>
              <input type="number" name="price" min="0" step="0.01" value="\${this._esc(this._val('price'))}" placeholder="e.g. 18.50" />
            </div>
            <div>
              <label class="text-small text-muted">Currency</label>
              <input name="currency" value="\${this._esc(this._val('currency'))}" placeholder="e.g. USD, EUR" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Buy Date</label>
              <input type="date" name="buyDate" value="\${this._esc(this._dateVal('buyDate'))}" />
            </div>
            <div>
              <label class="text-small text-muted">Open Date</label>
              <input type="date" name="openDate" value="\${this._esc(this._dateVal('openDate'))}" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Harvest Date</label>
              <input type="date" name="harvestDate" value="\${this._esc(this._dateVal('harvestDate'))}" />
            </div>
            <div>
              <label class="text-small text-muted">Best Before Date</label>
              <input type="date" name="bestBeforeDate" value="\${this._esc(this._dateVal('bestBeforeDate'))}" />
            </div>
          </div>
          <div class="mb-8">
            <label class="text-small text-muted">Notes</label>
            <textarea name="notes" rows="3" placeholder="Batch notes...">\${this._esc(this._val('notes'))}</textarea>
          </div>
          <div class="flex">
            <button type="submit" class="primary">\${isEdit ? 'Save' : 'Create'}</button>
            <button type="button" data-action="cancel">Cancel</button>
          </div>
        </form>
      </div>
    \`;

    // Cancel button
    this.querySelector('[data-action="cancel"]').addEventListener('click', () => this._cancel());

    // Form submit
    this.querySelector('#batch-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this._submit();
    });
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('batch-cancelled', { bubbles: true }));
  }

  async _submit() {
    const form = this.querySelector('#batch-form');
    const fd = new FormData(form);
    const body = {};

    // Date fields
    const dateFields = ['roastDate', 'harvestDate', 'buyDate', 'openDate', 'bestBeforeDate'];
    for (const key of dateFields) {
      const v = fd.get(key);
      if (v) body[key] = v;
    }

    // String fields
    const strFields = ['roastLevel', 'currency', 'notes'];
    for (const key of strFields) {
      const v = fd.get(key);
      if (v) body[key] = v;
    }

    // Number fields
    const numFields = ['weight', 'price', 'qualityScore'];
    for (const key of numFields) {
      const v = fd.get(key);
      if (v !== '' && v != null) body[key] = parseFloat(v);
    }

    try {
      let url, method;
      if (this._batchId) {
        url = '/api/v1/bean-batches/' + this._batchId;
        method = 'PUT';
      } else {
        url = '/api/v1/beans/' + this._beanId + '/batches';
        method = 'POST';
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error('HTTP ' + res.status + ': ' + text);
      }
      this.dispatchEvent(new CustomEvent('batch-saved', { bubbles: true }));
    } catch (err) {
      this._error = 'Save failed: ' + err.message;
      this.render();
    }
  }
}
customElements.define('dye2-bean-batch-form', Dye2BeanBatchForm);
`;
  const beanPageOrchestration = `
// Helper references
function beanList() { return document.querySelector('dye2-bean-list'); }
function beanForm() { return document.querySelector('dye2-bean-form'); }
function batchList() { return document.querySelector('dye2-bean-batch-list'); }
function batchForm() { return document.querySelector('dye2-bean-batch-form'); }

// --- Bean events ---

document.addEventListener('create-bean', () => {
  const form = beanForm();
  form.removeAttribute('bean-id');
  form.classList.remove('hidden');
  form.connectedCallback();
});

document.addEventListener('select-bean', (e) => {
  // Show batch list for this bean, hide bean list and form
  beanList().classList.add('hidden');
  beanForm().classList.add('hidden');
  batchForm().classList.add('hidden');

  const bl = batchList();
  bl.setAttribute('bean-id', e.detail.id);
  bl.classList.remove('hidden');
  bl.connectedCallback();
});

document.addEventListener('edit-bean', (e) => {
  const form = beanForm();
  form.setAttribute('bean-id', e.detail.id);
  form.classList.remove('hidden');
  form.connectedCallback();
});

document.addEventListener('bean-saved', () => {
  beanForm().classList.add('hidden');
  beanList().fetchBeans();
});

document.addEventListener('bean-cancelled', () => {
  beanForm().classList.add('hidden');
});

// --- Batch events ---

document.addEventListener('back-to-beans', () => {
  batchList().classList.add('hidden');
  batchForm().classList.add('hidden');
  beanList().classList.remove('hidden');
});

document.addEventListener('create-batch', (e) => {
  const form = batchForm();
  form.setAttribute('bean-id', e.detail.beanId);
  form.removeAttribute('batch-id');
  form.classList.remove('hidden');
  form.connectedCallback();
});

document.addEventListener('select-batch', (e) => {
  const form = batchForm();
  form.setAttribute('bean-id', e.detail.beanId);
  form.setAttribute('batch-id', e.detail.id);
  form.classList.remove('hidden');
  form.connectedCallback();
});

document.addEventListener('batch-saved', () => {
  batchForm().classList.add('hidden');
  batchList().fetchBatches();
});

document.addEventListener('batch-cancelled', () => {
  batchForm().classList.add('hidden');
});
`;
  function renderBeansPage(request) {
    const content = `
    <dye2-bean-list></dye2-bean-list>
    <dye2-bean-form class="hidden"></dye2-bean-form>
    <dye2-bean-batch-list class="hidden"></dye2-bean-batch-list>
    <dye2-bean-batch-form class="hidden"></dye2-bean-batch-form>
  `;
    return {
      requestId: request.requestId,
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: pageShell("Beans", content, [
        beanListComponent,
        beanFormComponent,
        beanBatchListComponent,
        beanBatchFormComponent,
        beanPageOrchestration
      ])
    };
  }
  const grinderListComponent = `
class Dye2GrinderList extends HTMLElement {
  constructor() {
    super();
    this._grinders = [];
    this._showArchived = false;
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  connectedCallback() {
    this.render();
    this.fetchGrinders();
  }

  async fetchGrinders() {
    try {
      const params = this._showArchived ? '?includeArchived=true' : '';
      const res = await fetch('/api/v1/grinders' + params);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._grinders = await res.json();
      this.render();
    } catch (err) {
      this.innerHTML = '<p style="color: #ff6b6b;">Failed to load grinders: ' + err.message + '</p>';
    }
  }

  toggleArchived() {
    this._showArchived = !this._showArchived;
    this.fetchGrinders();
  }

  render() {
    const grinders = this._grinders;
    this.innerHTML = \`
      <div class="flex-between mb-8">
        <h1>Grinders</h1>
        <div class="flex">
          <label class="flex" style="cursor:pointer;">
            <input type="checkbox" \${this._showArchived ? 'checked' : ''} style="width:auto;" />
            <span class="text-small">Show archived</span>
          </label>
          <button class="primary" data-action="create">+ Add Grinder</button>
        </div>
      </div>
      \${grinders.length === 0
        ? '<p class="text-muted">No grinders yet. Add your first grinder!</p>'
        : grinders.map(g => \`
          <div class="card" data-grinder-id="\${g.id}">
            <div class="flex-between">
              <div>
                <strong>\${this._esc(g.model) || 'Unnamed'}</strong>
              </div>
              <div class="flex">
                \${g.archived ? '<span class="tag">archived</span>' : ''}
                \${g.settingType ? '<span class="tag">' + this._esc(g.settingType) + '</span>' : ''}
              </div>
            </div>
            <div class="flex text-small text-muted mt-8">
              \${g.burrs ? '<span>Burrs: ' + this._esc(g.burrs) + '</span>' : ''}
              \${g.burrType ? '<span>Type: ' + this._esc(g.burrType) + '</span>' : ''}
              \${g.burrSize ? '<span>Size: ' + this._esc(g.burrSize) + 'mm</span>' : ''}
            </div>
            \${g.notes ? '<div class="text-small text-muted mt-8">' + this._esc(g.notes) + '</div>' : ''}
          </div>
        \`).join('')
      }
    \`;

    // Event listeners
    const checkbox = this.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.addEventListener('change', () => this.toggleArchived());

    const createBtn = this.querySelector('[data-action="create"]');
    if (createBtn) createBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('create-grinder', { bubbles: true }));
    });

    this.querySelectorAll('[data-grinder-id]').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-grinder-id');
        this.dispatchEvent(new CustomEvent('select-grinder', { detail: { id }, bubbles: true }));
      });
    });
  }
}
customElements.define('dye2-grinder-list', Dye2GrinderList);
`;
  const grinderFormComponent = `
class Dye2GrinderForm extends HTMLElement {
  constructor() {
    super();
    this._grinderId = null;
    this._loading = false;
    this._error = null;
    this._data = {};
  }

  static get observedAttributes() {
    return ['grinder-id'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'grinder-id') {
      this._grinderId = newVal;
    }
  }

  connectedCallback() {
    this._grinderId = this.getAttribute('grinder-id') || null;
    this._data = {};
    this._error = null;
    if (this._grinderId) {
      this._loadGrinder();
    } else {
      this.render();
    }
  }

  async _loadGrinder() {
    this._loading = true;
    this.render();
    try {
      const res = await fetch('/api/v1/grinders/' + this._grinderId);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._data = await res.json();
      this._loading = false;
      this.render();
    } catch (err) {
      this._loading = false;
      this._error = 'Failed to load grinder: ' + err.message;
      this.render();
    }
  }

  _val(field) {
    return this._data[field] != null ? this._data[field] : '';
  }

  _numVal(field) {
    const v = this._data[field];
    return v != null ? v : '';
  }

  render() {
    if (this._loading) {
      this.innerHTML = '<div class="card"><p class="text-muted">Loading grinder...</p></div>';
      return;
    }
    if (this._error) {
      this.innerHTML = '<div class="card"><p style="color:#ff6b6b;">' + this._error + '</p>'
        + '<button data-action="cancel">Back</button></div>';
      this.querySelector('[data-action="cancel"]').addEventListener('click', () => this._cancel());
      return;
    }

    const isEdit = !!this._grinderId;
    const settingType = this._data.settingType || 'numeric';
    const isNumeric = settingType === 'numeric';
    const settingValues = Array.isArray(this._data.settingValues)
      ? this._data.settingValues.join(', ')
      : (this._data.settingValues || '');

    this.innerHTML = \`
      <div class="card">
        <h2>\${isEdit ? 'Edit Grinder' : 'New Grinder'}</h2>
        <form id="grinder-form">
          <div class="mb-8">
            <label class="text-small text-muted">Model *</label>
            <input name="model" required value="\${this._esc(this._val('model'))}" placeholder="Grinder model" />
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Burrs</label>
              <input name="burrs" value="\${this._esc(this._val('burrs'))}" placeholder="Burr set name" />
            </div>
            <div>
              <label class="text-small text-muted">Burr Type</label>
              <select name="burrType">
                <option value="">-- Select --</option>
                <option value="flat" \${this._val('burrType') === 'flat' ? 'selected' : ''}>Flat</option>
                <option value="conical" \${this._val('burrType') === 'conical' ? 'selected' : ''}>Conical</option>
              </select>
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">Burr Size (mm)</label>
              <input name="burrSize" type="number" step="any" value="\${this._numVal('burrSize')}" placeholder="e.g. 64" />
            </div>
            <div>
              <label class="text-small text-muted">Setting Type</label>
              <select name="settingType">
                <option value="numeric" \${isNumeric ? 'selected' : ''}>Numeric</option>
                <option value="preset" \${!isNumeric ? 'selected' : ''}>Preset</option>
              </select>
            </div>
          </div>
          <div id="numeric-settings" class="\${isNumeric ? '' : 'hidden'}">
            <div class="grid grid-2 mb-8">
              <div>
                <label class="text-small text-muted">Setting Small Step</label>
                <input name="settingSmallStep" type="number" step="any" value="\${this._numVal('settingSmallStep')}" placeholder="e.g. 0.1" />
              </div>
              <div>
                <label class="text-small text-muted">Setting Big Step</label>
                <input name="settingBigStep" type="number" step="any" value="\${this._numVal('settingBigStep')}" placeholder="e.g. 1" />
              </div>
            </div>
          </div>
          <div id="preset-settings" class="\${isNumeric ? 'hidden' : ''}">
            <div class="mb-8">
              <label class="text-small text-muted">Setting Values (comma-separated)</label>
              <input name="settingValues" value="\${this._esc(settingValues)}" placeholder="e.g. Fine, Medium, Coarse" />
            </div>
          </div>
          <div class="grid grid-2 mb-8">
            <div>
              <label class="text-small text-muted">RPM Small Step</label>
              <input name="rpmSmallStep" type="number" step="any" value="\${this._numVal('rpmSmallStep')}" placeholder="e.g. 10" />
            </div>
            <div>
              <label class="text-small text-muted">RPM Big Step</label>
              <input name="rpmBigStep" type="number" step="any" value="\${this._numVal('rpmBigStep')}" placeholder="e.g. 100" />
            </div>
          </div>
          <div class="mb-8">
            <label class="text-small text-muted">Notes</label>
            <textarea name="notes" rows="3" placeholder="Notes about this grinder...">\${this._esc(this._val('notes'))}</textarea>
          </div>
          <div class="flex">
            <button type="submit" class="primary">\${isEdit ? 'Save' : 'Create'}</button>
            <button type="button" data-action="cancel">Cancel</button>
          </div>
        </form>
      </div>
    \`;

    // Toggle setting type sections
    const settingTypeSelect = this.querySelector('select[name="settingType"]');
    const numericSection = this.querySelector('#numeric-settings');
    const presetSection = this.querySelector('#preset-settings');
    if (settingTypeSelect) {
      settingTypeSelect.addEventListener('change', () => {
        const isNum = settingTypeSelect.value === 'numeric';
        numericSection.classList.toggle('hidden', !isNum);
        presetSection.classList.toggle('hidden', isNum);
      });
    }

    // Cancel button
    this.querySelector('[data-action="cancel"]').addEventListener('click', () => this._cancel());

    // Form submit
    this.querySelector('#grinder-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this._submit();
    });
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('grinder-cancelled', { bubbles: true }));
  }

  async _submit() {
    const form = this.querySelector('#grinder-form');
    const fd = new FormData(form);

    const body = {
      model: fd.get('model') || '',
    };

    // Optional text fields
    const optText = ['burrs', 'burrType', 'notes'];
    for (const key of optText) {
      const v = fd.get(key);
      if (v) body[key] = v;
    }

    // Numeric fields
    const optNum = ['burrSize', 'rpmSmallStep', 'rpmBigStep'];
    for (const key of optNum) {
      const v = fd.get(key);
      if (v !== '' && v != null) body[key] = parseFloat(v);
    }

    // Setting type
    const st = fd.get('settingType') || 'numeric';
    body.settingType = st;

    if (st === 'numeric') {
      const ss = fd.get('settingSmallStep');
      const bs = fd.get('settingBigStep');
      if (ss !== '' && ss != null) body.settingSmallStep = parseFloat(ss);
      if (bs !== '' && bs != null) body.settingBigStep = parseFloat(bs);
    } else {
      // Preset — comma-separated to array
      const svStr = fd.get('settingValues');
      if (svStr) {
        body.settingValues = svStr.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    try {
      const url = this._grinderId ? '/api/v1/grinders/' + this._grinderId : '/api/v1/grinders';
      const method = this._grinderId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error('HTTP ' + res.status + ': ' + text);
      }
      this.dispatchEvent(new CustomEvent('grinder-saved', { bubbles: true }));
    } catch (err) {
      this._error = 'Save failed: ' + err.message;
      this.render();
    }
  }
}
customElements.define('dye2-grinder-form', Dye2GrinderForm);
`;
  const grinderPageOrchestration = `
document.addEventListener('create-grinder', () => {
  const form = document.querySelector('dye2-grinder-form');
  form.removeAttribute('grinder-id');
  form.classList.remove('hidden');
  form.connectedCallback();
});
document.addEventListener('select-grinder', (e) => {
  const form = document.querySelector('dye2-grinder-form');
  form.setAttribute('grinder-id', e.detail.id);
  form.classList.remove('hidden');
  form.connectedCallback();
});
document.addEventListener('grinder-saved', () => {
  document.querySelector('dye2-grinder-form').classList.add('hidden');
  document.querySelector('dye2-grinder-list').fetchGrinders();
});
document.addEventListener('grinder-cancelled', () => {
  document.querySelector('dye2-grinder-form').classList.add('hidden');
});
`;
  function renderGrindersPage(request) {
    const content = `
    <dye2-grinder-list></dye2-grinder-list>
    <dye2-grinder-form class="hidden"></dye2-grinder-form>
  `;
    return {
      requestId: request.requestId,
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: pageShell("Grinders", content, [
        grinderListComponent,
        grinderFormComponent,
        grinderPageOrchestration
      ])
    };
  }
  const beanPickerComponent = `
class Dye2BeanPicker extends HTMLElement {
  constructor() {
    super();
    this._beans = [];
    this._expandedBeanId = null;
    this._batches = [];
    this._selectedBatchId = null;
    this._loading = true;
    this._loadingBatches = false;
  }

  connectedCallback() {
    this.render();
    this.fetchBeans();
  }

  async fetchBeans() {
    this._loading = true;
    this.render();
    try {
      const res = await fetch('/api/v1/beans');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._beans = await res.json();
      this._loading = false;
      this.render();
    } catch (err) {
      this._loading = false;
      this.innerHTML = '<p style="color: #ff6b6b;">Failed to load beans: ' + err.message + '</p>';
    }
  }

  async expandBean(beanId) {
    if (this._expandedBeanId === beanId) {
      this._expandedBeanId = null;
      this._batches = [];
      this.render();
      return;
    }
    this._expandedBeanId = beanId;
    this._batches = [];
    this._loadingBatches = true;
    this.render();
    try {
      const res = await fetch('/api/v1/beans/' + beanId + '/batches');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._batches = await res.json();
      this._loadingBatches = false;
      this.render();
    } catch (err) {
      this._loadingBatches = false;
      this.innerHTML = '<p style="color: #ff6b6b;">Failed to load batches: ' + err.message + '</p>';
    }
  }

  async selectBatch(batchId, bean) {
    this._selectedBatchId = batchId;
    this.render();

    const detail = {
      beanBatchId: batchId,
      coffeeName: bean.name || '',
      coffeeRoaster: bean.roaster || '',
    };

    // Update workflow
    try {
      await fetch('/api/v1/workflow', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: detail }),
      });
    } catch (err) {
      console.error('[dye2-bean-picker] Workflow update failed:', err);
    }

    // Dispatch DOM event
    this.dispatchEvent(new CustomEvent('picker-done', { detail, bubbles: true }));

    // PostMessage for iframe integration
    window.parent.postMessage({ type: 'dye2-picker-done', ...detail }, '*');
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  _formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  render() {
    if (this._loading) {
      this.innerHTML = '<h1>Select Bean</h1><div class="card"><p class="text-muted">Loading beans...</p></div>';
      return;
    }

    const beans = this._beans;
    this.innerHTML = \`
      <h1>Select Bean</h1>
      \${beans.length === 0
        ? '<p class="text-muted">No beans available. Add beans in the Beans management page.</p>'
        : beans.map(bean => {
            const isExpanded = this._expandedBeanId === bean.id;
            return \`
              <div class="card picker-bean" data-bean-id="\${bean.id}" style="cursor:pointer;">
                <div class="flex-between">
                  <div>
                    <span style="margin-right:6px;">\${isExpanded ? '&#9660;' : '&#9654;'}</span>
                    <strong>\${this._esc(bean.name) || 'Unnamed'}</strong>
                    <span class="text-muted"> by \${this._esc(bean.roaster) || 'Unknown roaster'}</span>
                  </div>
                  <div class="flex">
                    \${bean.country ? '<span class="tag">' + this._esc(bean.country) + '</span>' : ''}
                    \${bean.processing ? '<span class="tag">' + this._esc(bean.processing) + '</span>' : ''}
                  </div>
                </div>
              </div>
              \${isExpanded ? this._renderBatches(bean) : ''}
            \`;
          }).join('')
      }
    \`;

    // Event listeners for bean expand/collapse
    this.querySelectorAll('.picker-bean[data-bean-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-bean-id');
        this.expandBean(id);
      });
    });

    // Event listeners for batch selection
    this.querySelectorAll('.picker-batch[data-batch-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        const batchId = card.getAttribute('data-batch-id');
        const beanId = card.getAttribute('data-bean-id');
        const bean = this._beans.find(b => b.id === beanId) || {};
        this.selectBatch(batchId, bean);
      });
    });
  }

  _renderBatches(bean) {
    if (this._loadingBatches) {
      return '<div style="margin-left:24px;margin-bottom:12px;" class="card"><p class="text-muted">Loading batches...</p></div>';
    }

    const batches = this._batches;
    if (batches.length === 0) {
      return '<div style="margin-left:24px;margin-bottom:12px;"><p class="text-muted text-small">No batches for this bean.</p></div>';
    }

    return batches.map(b => {
      const isSelected = this._selectedBatchId === b.id;
      const selectedStyle = isSelected
        ? 'border-color: #2ecc71; background: #1a3a2a;'
        : '';
      return \`
        <div class="card picker-batch" data-batch-id="\${b.id}" data-bean-id="\${bean.id}"
             style="margin-left:24px;margin-bottom:8px;cursor:pointer;\${selectedStyle}">
          <div class="flex-between">
            <div class="flex">
              \${isSelected ? '<span style="color:#2ecc71;margin-right:6px;">&#10003;</span>' : ''}
              \${b.roastDate ? '<strong>Roasted: ' + this._formatDate(b.roastDate) + '</strong>' : '<strong>Batch</strong>'}
            </div>
            <div class="flex">
              \${b.roastLevel ? '<span class="tag">' + this._esc(b.roastLevel) + '</span>' : ''}
              \${b.frozen ? '<span class="tag">frozen</span>' : ''}
            </div>
          </div>
          <div class="flex text-small text-muted mt-8" style="flex-wrap:wrap;">
            \${b.weight != null ? '<span>' + (b.weightRemaining != null ? b.weightRemaining + 'g / ' : '') + b.weight + 'g</span>' : ''}
            \${b.price != null ? '<span>' + (b.currency || '') + ' ' + b.price.toFixed(2) + '</span>' : ''}
          </div>
        </div>
      \`;
    }).join('');
  }
}
customElements.define('dye2-bean-picker', Dye2BeanPicker);
`;
  function renderBeanPickerPage(request) {
    const content = `<dye2-bean-picker></dye2-bean-picker>`;
    return {
      requestId: request.requestId,
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: pageShell("Select Bean", content, [beanPickerComponent])
    };
  }
  const grinderPickerComponent = `
class Dye2GrinderPicker extends HTMLElement {
  constructor() {
    super();
    this._grinders = [];
    this._selectedGrinderId = null;
    this._loading = true;
  }

  connectedCallback() {
    this.render();
    this.fetchGrinders();
  }

  async fetchGrinders() {
    this._loading = true;
    this.render();
    try {
      const res = await fetch('/api/v1/grinders');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      this._grinders = await res.json();
      this._loading = false;
      this.render();
    } catch (err) {
      this._loading = false;
      this.innerHTML = '<p style="color: #ff6b6b;">Failed to load grinders: ' + err.message + '</p>';
    }
  }

  async selectGrinder(grinder) {
    this._selectedGrinderId = grinder.id;
    this.render();

    const detail = {
      grinderId: grinder.id,
      grinderModel: grinder.model || '',
    };

    // Update workflow
    try {
      await fetch('/api/v1/workflow', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: detail }),
      });
    } catch (err) {
      console.error('[dye2-grinder-picker] Workflow update failed:', err);
    }

    // Dispatch DOM event
    this.dispatchEvent(new CustomEvent('picker-done', { detail, bubbles: true }));

    // PostMessage for iframe integration
    window.parent.postMessage({ type: 'dye2-picker-done', ...detail }, '*');
  }

  _esc(val) {
    if (val == null) return '';
    return String(val).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  render() {
    if (this._loading) {
      this.innerHTML = '<h1>Select Grinder</h1><div class="card"><p class="text-muted">Loading grinders...</p></div>';
      return;
    }

    const grinders = this._grinders;
    this.innerHTML = \`
      <h1>Select Grinder</h1>
      \${grinders.length === 0
        ? '<p class="text-muted">No grinders available. Add grinders in the Grinders management page.</p>'
        : grinders.map(g => {
            const isSelected = this._selectedGrinderId === g.id;
            const selectedStyle = isSelected
              ? 'border-color: #2ecc71; background: #1a3a2a;'
              : '';
            return \`
              <div class="card picker-grinder" data-grinder-id="\${g.id}"
                   style="cursor:pointer;\${selectedStyle}">
                <div class="flex-between">
                  <div class="flex">
                    \${isSelected ? '<span style="color:#2ecc71;margin-right:6px;">&#10003;</span>' : ''}
                    <strong>\${this._esc(g.model) || 'Unnamed'}</strong>
                  </div>
                  <div class="flex">
                    \${g.settingType ? '<span class="tag">' + this._esc(g.settingType) + '</span>' : ''}
                  </div>
                </div>
                <div class="flex text-small text-muted mt-8">
                  \${g.burrs ? '<span>Burrs: ' + this._esc(g.burrs) + '</span>' : ''}
                  \${g.burrType ? '<span>Type: ' + this._esc(g.burrType) + '</span>' : ''}
                  \${g.burrSize ? '<span>Size: ' + g.burrSize + 'mm</span>' : ''}
                </div>
                \${g.notes ? '<div class="text-small text-muted mt-8" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + this._esc(g.notes) + '</div>' : ''}
              </div>
            \`;
          }).join('')
      }
    \`;

    // Event listeners
    this.querySelectorAll('.picker-grinder[data-grinder-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-grinder-id');
        const grinder = this._grinders.find(g => g.id === id) || { id };
        this.selectGrinder(grinder);
      });
    });
  }
}
customElements.define('dye2-grinder-picker', Dye2GrinderPicker);
`;
  function renderGrinderPickerPage(request) {
    const content = `<dye2-grinder-picker></dye2-grinder-picker>`;
    return {
      requestId: request.requestId,
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: pageShell("Select Grinder", content, [grinderPickerComponent])
    };
  }
  function createPlugin2(host) {
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
      onEvent(_event) {
      },
      __httpRequestHandler(request) {
        log(`HTTP ${request.method} ${request.endpoint}`);
        switch (request.endpoint) {
          case "beans":
            return renderBeansPage(request);
          case "grinders":
            return renderGrindersPage(request);
          case "bean-picker":
            return renderBeanPickerPage(request);
          case "grinder-picker":
            return renderGrinderPickerPage(request);
          default:
            return {
              requestId: request.requestId,
              status: 404,
              headers: { "Content-Type": "text/plain" },
              body: "Not found"
            };
        }
      }
    };
  }
  return createPlugin2;
}();
