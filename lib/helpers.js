/**
 * ═══════════════════════════════════════════════════
 *  LETS English — Shared Helpers
 * ═══════════════════════════════════════════════════
 */

export function escapeHtml(str) {
  if (typeof document === 'undefined') {
    // Server-side fallback
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString('vi-VN');
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
