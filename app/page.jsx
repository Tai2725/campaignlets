import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContentSchedule from '@/components/schedule/ContentSchedule';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <div className="relative py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-500/5 border border-blue-500/20 flex items-center justify-center mx-auto mb-6 text-3xl text-blue-400">
            <i className="fa-solid fa-bullhorn" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 -tracking-[0.5px]">
            Quản lý <span className="bg-gradient-to-br from-blue-400 to-violet-400 bg-clip-text text-transparent">Chiến dịch</span>
          </h1>
          <p className="text-[15px] text-slate-500 max-w-[500px] mx-auto leading-relaxed">
            Trung tâm quản lý nội bộ các chiến dịch marketing, review tài liệu và theo dõi phản hồi của LETS English.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto mb-10 px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[.08] to-transparent" />
      </div>

      {/* Section Title */}
      <div className="px-6 max-w-[1200px] mx-auto mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-folder-open text-blue-500" /> Chiến dịch
        </h2>
        <span className="bg-blue-500/10 text-blue-400 py-0.5 px-2.5 rounded-full text-xs font-semibold">
          1 chiến dịch
        </span>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-5 px-6 pb-16 max-w-[1200px] mx-auto">
        <CampaignCard />
      </div>

      {/* Schedule */}
      <ContentSchedule />

      <Footer />
    </>
  );
}

function CampaignCard() {
  return (
    <div className="group bg-gradient-to-br from-white/[.06] to-white/[.02] border border-white/[.08] rounded-2xl overflow-hidden transition-all duration-400 relative hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,.3)]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-t-2xl" />

      <div className="p-6 pb-4 flex items-start justify-between gap-3">
        <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[22px] text-white shrink-0 shadow-[0_4px_16px_rgba(59,130,246,.25)]">
          <i className="fa-solid fa-rocket" />
        </div>
        <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          Đang hoạt động
        </div>
      </div>

      <div className="px-6 pb-5">
        <div className="text-xl font-bold text-white mb-1 -tracking-[0.3px]">Campaign chính - 05/03/26</div>
        <div className="text-[13px] text-slate-500 leading-relaxed mb-4">
          Chiến lược &quot;Boutique Center&quot; — Tối ưu nội tại, bứt phá doanh thu. Kế hoạch thực thi marketing đa kênh cho LETS English.
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          <MetaTag icon="fa-regular fa-calendar" text="05/03/2026" />
          <MetaTag icon="fa-solid fa-file-lines" text="Action Plan" />
          <MetaTag icon="fa-solid fa-pen-ruler" text="Review Tool" />
        </div>
      </div>

      <div className="px-6 pb-6 flex gap-2.5 max-md:flex-col">
        <Link
          href="/review"
          className="flex-1 py-3 px-4 rounded-xl text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 no-underline bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_16px_rgba(59,130,246,.25)] hover:shadow-[0_6px_24px_rgba(59,130,246,.4)] hover:-translate-y-0.5"
        >
          <i className="fa-solid fa-pen-ruler" /> Review & Comment
        </Link>
        <Link
          href="/admin"
          className="flex-1 py-3 px-4 rounded-xl text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 no-underline bg-white/[.06] text-slate-400 border border-white/10 hover:bg-white/10 hover:text-slate-200 hover:border-white/20"
        >
          <i className="fa-solid fa-shield-halved" /> Admin Panel
        </Link>
      </div>
    </div>
  );
}

function MetaTag({ icon, text }) {
  return (
    <span className="bg-white/5 border border-white/[.08] py-1.5 px-3 rounded-lg text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
      <i className={`${icon} text-[10px] text-slate-500`} /> {text}
    </span>
  );
}
