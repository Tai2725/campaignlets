import Link from 'next/link';

export default function Header({ showBadge = true }) {
  return (
    <header className="bg-gradient-to-br from-slate-900 to-slate-800 border-b border-white/[.06] px-6 py-4 flex items-center justify-between sticky top-0 z-[100] backdrop-blur-xl">
      <Link href="/" className="flex items-center gap-3.5 no-underline">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-lg text-white font-black tracking-tight shadow-[0_4px_16px_rgba(59,130,246,.3)]">
          LE
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-extrabold text-white -tracking-[0.5px]">
            LETS <span className="text-blue-400">English</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium uppercase tracking-widest">
            Internal Tools
          </div>
        </div>
      </Link>
      {showBadge && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-1.5 px-3 rounded-full text-[11px] font-semibold flex items-center gap-1.5 tracking-wide max-md:hidden">
          <i className="fa-solid fa-lock" /> Chỉ dành cho nội bộ
        </div>
      )}
    </header>
  );
}
