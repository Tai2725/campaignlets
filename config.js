/**
 * ═══════════════════════════════════════════════════
 *  LETS English — Shared Configuration
 *  Single source of truth for all frontend pages
 * ═══════════════════════════════════════════════════
 */

const APP_CONFIG = {
  // ── App Info ──
  version: '1.2.0',
  name: 'LETS English Internal Tools',
  buildDate: '2026-03-07',

  // ── API ──
  workerUrl: 'https://review-feedback-upload.lets-tools.workers.dev',

  // ── Auth Codes ──
  authCodes: {
    'HEAD2026': 'Head',
    'STAFF2026': 'Staff',
  },
  adminCode: 'Tai12345@',

  // ── Debug ──
  debug: false, // Production mode
};

// ── Shared Helpers ──
function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function showToast(toastEl, msg, type = 'success') {
  if (typeof toastEl === 'string') toastEl = document.getElementById(toastEl);
  if (!toastEl) return;
  toastEl.textContent = '';
  const ic = document.createElement('i');
  ic.className = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
  toastEl.appendChild(ic);
  toastEl.appendChild(document.createTextNode(' ' + msg));
  toastEl.className = 'show ' + type;
  setTimeout(() => { toastEl.className = ''; }, 3500);
}
