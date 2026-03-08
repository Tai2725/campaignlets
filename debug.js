/**
 * ═══════════════════════════════════════════════════
 *  LETS English — Debug Logger & Panel
 *  Toggle debug panel: Ctrl+Shift+D
 * ═══════════════════════════════════════════════════
 */

const Logger = (() => {
  const MAX_LOGS = 200;
  const logs = [];
  let panelEl = null;
  let listEl = null;
  let isVisible = false;

  // ── Log levels ──
  const LEVELS = {
    LOG: { color: '#60a5fa', icon: 'ℹ️', bg: 'rgba(59,130,246,.08)' },
    WARN: { color: '#fbbf24', icon: '⚠️', bg: 'rgba(251,191,36,.08)' },
    ERROR: { color: '#ef4444', icon: '❌', bg: 'rgba(239,68,68,.08)' },
    SUCCESS: { color: '#34d399', icon: '✅', bg: 'rgba(52,211,153,.08)' },
    NET: { color: '#a78bfa', icon: '🌐', bg: 'rgba(167,139,250,.08)' },
    PERF: { color: '#f472b6', icon: '⏱️', bg: 'rgba(244,114,182,.08)' },
  };

  const timers = {};

  function _add(level, source, message, data) {
    const entry = {
      time: new Date().toISOString().split('T')[1].replace('Z', ''),
      level,
      source,
      message,
      data,
    };
    logs.push(entry);
    if (logs.length > MAX_LOGS) logs.shift();

    // Console output
    const tag = `[${entry.time}] [${source}]`;
    if (level === 'ERROR') console.error(tag, message, data || '');
    else if (level === 'WARN') console.warn(tag, message, data || '');
    else console.log(`%c${tag}`, `color:${LEVELS[level]?.color || '#fff'}`, message, data || '');

    // Update panel
    _renderEntry(entry);
  }

  function _renderEntry(entry) {
    if (!listEl) return;
    const cfg = LEVELS[entry.level] || LEVELS.LOG;
    const row = document.createElement('div');
    row.style.cssText = `padding:4px 8px;border-bottom:1px solid rgba(255,255,255,.06);font-size:11px;line-height:1.5;background:${cfg.bg};font-family:'Cascadia Code','Fira Code',monospace`;
    let html = `<span style="color:#64748b">${entry.time}</span> `;
    html += `<span style="color:${cfg.color};font-weight:600">${cfg.icon} ${entry.level}</span> `;
    html += `<span style="color:#94a3b8">[${entry.source}]</span> `;
    html += `<span style="color:#e2e8f0">${escapeHtml(String(entry.message))}</span>`;
    if (entry.data !== undefined && entry.data !== '') {
      const dataStr = typeof entry.data === 'object' ? JSON.stringify(entry.data, null, 0) : String(entry.data);
      if (dataStr.length < 200) {
        html += ` <span style="color:#64748b">${escapeHtml(dataStr)}</span>`;
      }
    }
    row.innerHTML = html;
    listEl.appendChild(row);
    listEl.scrollTop = listEl.scrollHeight;
  }

  // ── Public API ──
  function log(source, msg, data) { _add('LOG', source, msg, data); }
  function warn(source, msg, data) { _add('WARN', source, msg, data); }
  function error(source, msg, data) { _add('ERROR', source, msg, data); }
  function success(source, msg, data) { _add('SUCCESS', source, msg, data); }
  function net(source, msg, data) { _add('NET', source, msg, data); }
  function perf(source, msg, data) { _add('PERF', source, msg, data); }

  function time(label) { timers[label] = performance.now(); }
  function timeEnd(label, source) {
    if (!timers[label]) return;
    const ms = (performance.now() - timers[label]).toFixed(1);
    delete timers[label];
    perf(source || 'Timer', `${label}: ${ms}ms`);
    return parseFloat(ms);
  }

  // ── Debug Panel ──
  function _createPanel() {
    if (panelEl) return;

    panelEl = document.createElement('div');
    panelEl.id = 'debug-panel';
    panelEl.style.cssText = `
      position:fixed;bottom:0;left:0;right:0;z-index:99999;
      background:#0f172a;border-top:2px solid #3b82f6;
      height:260px;display:none;flex-direction:column;
      font-family:'Inter',sans-serif;
      box-shadow:0 -4px 24px rgba(0,0,0,.4);
      transition:height .2s;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      display:flex;align-items:center;justify-content:space-between;
      padding:6px 12px;background:#1e293b;border-bottom:1px solid rgba(255,255,255,.08);
      flex-shrink:0;
    `;
    header.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        <span style="color:#3b82f6;font-weight:700;font-size:12px">🔧 DEBUG PANEL</span>
        <span style="color:#64748b;font-size:10px">${typeof APP_CONFIG !== 'undefined' ? 'v' + APP_CONFIG.version : ''}</span>
        <span style="color:#475569;font-size:10px">Ctrl+Shift+D to toggle</span>
      </div>
      <div style="display:flex;gap:6px">
        <button id="dbg-clear" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.25);color:#f87171;padding:3px 10px;border-radius:5px;cursor:pointer;font-size:10px;font-family:inherit">Clear</button>
        <button id="dbg-close" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#94a3b8;padding:3px 10px;border-radius:5px;cursor:pointer;font-size:10px;font-family:inherit">✕</button>
      </div>
    `;

    // Log list
    listEl = document.createElement('div');
    listEl.id = 'debug-log-list';
    listEl.style.cssText = `flex:1;overflow-y:auto;`;

    panelEl.appendChild(header);
    panelEl.appendChild(listEl);
    document.body.appendChild(panelEl);

    // Button handlers
    document.getElementById('dbg-clear').addEventListener('click', () => {
      logs.length = 0;
      listEl.innerHTML = '';
    });
    document.getElementById('dbg-close').addEventListener('click', toggle);

    // Render existing logs
    logs.forEach(_renderEntry);
  }

  function toggle() {
    _createPanel();
    isVisible = !isVisible;
    panelEl.style.display = isVisible ? 'flex' : 'none';
  }

  // ── Keyboard shortcut: Ctrl+Shift+D ──
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      toggle();
    }
  });

  // ── Network fetch wrapper ──
  const _origFetch = window.fetch;
  window.fetch = async function (...args) {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '?';
    const method = args[1]?.method || 'GET';
    const shortUrl = url.replace(/https?:\/\/[^/]+/, '');

    net('Fetch', `→ ${method} ${shortUrl}`);
    const t0 = performance.now();

    try {
      const res = await _origFetch.apply(this, args);
      const ms = (performance.now() - t0).toFixed(0);
      const statusColor = res.ok ? 'SUCCESS' : 'ERROR';
      _add(statusColor, 'Fetch', `← ${res.status} ${shortUrl} (${ms}ms)`);
      return res;
    } catch (err) {
      const ms = (performance.now() - t0).toFixed(0);
      error('Fetch', `✗ ${method} ${shortUrl} (${ms}ms): ${err.message}`);
      throw err;
    }
  };

  // ── Global error handlers ──
  window.addEventListener('error', e => {
    error('Window', `${e.message} at ${e.filename}:${e.lineno}:${e.colno}`);
  });
  window.addEventListener('unhandledrejection', e => {
    error('Promise', `Unhandled: ${e.reason?.message || e.reason}`);
  });

  // ── Boot log ──
  if (typeof APP_CONFIG !== 'undefined') {
    log('System', `App loaded: ${APP_CONFIG.name} v${APP_CONFIG.version}`);
    log('System', `Debug mode: ${APP_CONFIG.debug ? 'ON' : 'OFF'}`);
    log('System', `Worker URL: ${APP_CONFIG.workerUrl}`);
  }

  return { log, warn, error, success, net, perf, time, timeEnd, toggle, logs };
})();
