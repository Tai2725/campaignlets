/**
 * ═══════════════════════════════════════════════════
 *  LETS English — Shared Configuration
 *  Single source of truth for all frontend pages
 * ═══════════════════════════════════════════════════
 */

export const APP_CONFIG = {
  // ── App Info ──
  version: '2.0.0',
  name: 'LETS English Internal Tools',
  buildDate: '2026-03-09',

  // ── API ──
  workerUrl: process.env.NEXT_PUBLIC_WORKER_URL || 'https://review-feedback-upload.lets-tools.workers.dev',

  // ── Auth Codes ──
  authCodes: {
    'HEAD2026': 'Head',
    'STAFF2026': 'Staff',
  },
  adminCode: 'Tai12345@',

  // ── Debug ──
  debug: process.env.NODE_ENV === 'development',
};
