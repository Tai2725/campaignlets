import { APP_CONFIG } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="text-center py-6 border-t border-white/[.06] text-slate-500 text-xs">
      <span className="text-slate-500 font-semibold">LETS English</span> &mdash; Trung Tâm Anh Ngữ Trí Thức Việt &bull; Hệ thống nội bộ &copy; 2026
      <span className="block mt-1 text-slate-600 text-[10px]">
        v{APP_CONFIG.version}
      </span>
    </footer>
  );
}
