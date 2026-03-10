"use client";

import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   DATA — All 14 days, kept intact from schedule.html
   ═══════════════════════════════════════════════════════ */
const PHASES = [
  {
    id: 1,
    title: "Tuần 1 (Ngày 1-7)",
    subtitle: "Gieo hạt — Xây dựng thiện cảm & Thấu hiểu nỗi đau",
    gradient: "from-blue-600/20 to-blue-500/5",
    border: "border-blue-500/20",
    badgeBg: "bg-gradient-to-br from-blue-500 to-blue-700",
    barColor: "bg-blue-500",
    items: [
      {
        day: 1,
        topic: "BRANDING / VIBE",
        tc: "bg-purple-500/15 text-purple-400 border-purple-500/25",
        title: "Đi học hay đi Cafe? Khám phá không gian LETS!",
        detail:
          'Note: Chụp 4-5 ảnh cơ sở vật chất sáng sủa, góc check-in, ánh đèn sáng, TV,...\nBrief: "Đi học hay đi Cafe? Khám phá không gian học tại LETS! Cam kết hiệu quả x10 lần so với khoá học Online"\nLưu ý: Dùng Canva gắn logo - watermark ở góc ảnh.',
        fmt: "Album Ảnh",
        fmtIcon: "fa-solid fa-images",
        fmtColor: "text-blue-400",
      },
      {
        day: 2,
        topic: "THỰC TẾ LỚP HỌC",
        tc: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
        title: "POV: 1 buổi học của bạn tại LETS sẽ như thế nào?",
        detail:
          "Note: Đặt máy quay kiểu POV, hoà vào như các bạn học viên, góc thấy được cô và các bạn phía trên, ghi lại, chuyển cảnh (khoảng 4-5s là cut, chuyển) giữa các công đoạn từ cho giải đề, listening, speaking, đồng thanh, khen (good/excellent) dài khoảng 30-45s. Mood năng động, vui tươi, nhạc nền nhanh, tươi sáng. \nBrief: Tại LETS, bạn được đánh giá thực lực một cách nghiêm túc, học thật - chỉ ra lỗi thật để tiến bộ.",
        fmt: "Video Raw",
        fmtIcon: "fa-solid fa-video",
        fmtColor: "text-red-400",
      },
      {
        day: 3,
        topic: "KIẾN THỨC NỀN",
        tc: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        title: "Đừng mất điểm oan ở 3 từ vựng này trong phòng thi!",
        detail:
          "Note: Thầy Bản xứ quay clip ngắn giảng dạy trực diện. Đi thẳng vào vấn đề: Hướng dẫn khẩu hình miệng, cách đặt lưỡi. Không chèn hiệu ứng âm thanh quá over.\nEdit: Thêm phụ đề to, rõ, chuẩn phong cách học thuật.",
        fmt: "Reels Học thuật",
        fmtIcon: "fa-solid fa-video",
        fmtColor: "text-red-400",
      },
      {
        day: 4,
        topic: "GIỚI THIỆU LETS",
        tc: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
        title: "Tam Giác Vàng: 1 Tây - 2 Việt, Cân mọi mất gốc!",
        detail:
          "Note: Thiết kế ảnh. Ảnh 1: Hình chung 3 giáo viên.(tỉ lệ ngang 2:1, góc trung) Ảnh 2 (góc cận, tỉ lệ 1:1): Vai trò thầy Tây (Phát âm). Ảnh 3 (góc cận, tỉ lệ 1:1): Vai trò 2 cô Việt (Ngữ pháp, giải đề, theo sát làm bài tập).\nBrief: Học ở LETS, bạn không bao giờ bị bỏ rơi. Với đội ngũ giáo viên tận tâm, nhiệt tình, thiết kế lộ trình phát triển toàn diện cho bạn và các bé.",
        fmt: "Carousel / Ảnh",
        fmtIcon: "fa-solid fa-layer-group",
        fmtColor: "text-yellow-400",
      },
      {
        day: 5,
        topic: "TƯƠNG TÁC / GAME",
        tc: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
        title: "3 câu hỏi trắc nghiệm",
        detail:
          'Note: Dùng Canva thiết kế 3 câu hỏi trắc nghiệm tiếng Anh (chọn A B C D) gài bẫy nhẹ.\nCall To Action: Kêu gọi "Comment đáp án để trung tâm gửi tặng bộ Ebook 500 từ vựng TOEIC qua tin nhắn nha!". (Dùng mồi câu để lấy tương tác).',
        fmt: "Ảnh Đơn",
        fmtIcon: "fa-regular fa-image",
        fmtColor: "text-emerald-400",
      },
      {
        day: 6,
        topic: "KIẾN THỨC / MẸO",
        tc: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        title: 'Thấy đuôi "-tion" là chọn gì? Mẹo 3s Part 5 TOEIC',
        detail:
          "Note: Quay Cô giáo VN đứng trước bảng/màn hình. Giảng siêu tốc, dứt khoát 1 mẹo giải đề TOEIC.\nBrief: Học offline với LETS là học thực chiến, giải nhanh, không dài dòng lý thuyết, giúp bạn đạt được kỹ năng và chinh phục mục tiêu cực hiệu quả.",
        fmt: "Reels Ngắn",
        fmtIcon: "fa-solid fa-video",
        fmtColor: "text-red-400",
      },
      {
        day: 7,
        topic: "THỰC TẾ VẬN HÀNH",
        tc: "bg-slate-500/15 text-slate-400 border-slate-500/25",
        title: "Tài liệu độc quyền tại LETS được biên soạn ra sao?",
        detail:
          'Note: Chụp cận cảnh những cuốn giáo trình đóng gáy cẩn thận, hoặc các tờ "Tips thực chiến" chi chít chữ note viết tay của giáo viên.\nBrief: Show ra giá trị hữu hình. Mỗi tài liệu đều là tâm huyết và kinh nghiệm đúc kết, không phải copy trên mạng.',
        fmt: "Ảnh thực tế",
        fmtIcon: "fa-solid fa-image",
        fmtColor: "text-slate-400",
      },
    ],
  },
  {
    id: 2,
    title: "Tuần 2 (Ngày 8-14)",
    subtitle: "Thể hiện thành tích, testimonials & Kêu gọi hành động",
    gradient: "from-red-600/20 to-red-500/5",
    border: "border-red-500/20",
    badgeBg: "bg-gradient-to-br from-red-500 to-red-700",
    barColor: "bg-red-500",
    items: [
      {
        day: 8,
        topic: "BẢNG VÀNG / TRUST",
        tc: "bg-orange-500/15 text-orange-400 border-orange-500/25",
        title: "Album: Bảng Vàng Thành Tích - Học thật thi thật",
        detail:
          "Note: Tổng hợp 5-7 ảnh học viên nhận bảng điểm/chứng chỉ (đăng ảnh chụp cùng giáo viên tại trung tâm).\nNội dung: Ghi rõ số điểm Tăng từ X -> Y trong bao nhiêu tháng. Đây là bài quan trọng nhất để tạo Uy Tín (Trust).",
        fmt: "Album Ảnh",
        fmtIcon: "fa-solid fa-images",
        fmtColor: "text-blue-400",
      },
      {
        day: 9,
        topic: "GIẢI ĐÁP / TƯ VẤN",
        tc: "bg-pink-500/15 text-pink-400 border-pink-500/25",
        title: "Q&A: Mất gốc tiếng Anh hoàn toàn có học LETS được không?",
        detail:
          "Note: Dùng Canva thiết kế 3-4 ảnh dạng Hỏi - Đáp. Lấy các câu hỏi học viên hay băn khoăn nhất lúc inbox để trả lời công khai.",
        fmt: "Carousel / Ảnh",
        fmtIcon: "fa-solid fa-layer-group",
        fmtColor: "text-yellow-400",
      },
      {
        day: 10,
        topic: "KIẾN THỨC NÂNG CAO",
        tc: "bg-blue-500/15 text-blue-400 border-blue-500/25",
        title: 'Thay vì nói "Very Good", hãy nói 3 câu "sang chảnh" này',
        detail:
          "Note: Thầy Bản xứ quay 1 clip ngắn cung cấp Idioms hoặc từ vựng xịn xò (Band điểm cao) trong giao tiếp/IELTS.\nMục đích: Chứng minh trình độ học thuật cao của trung tâm. Không chỉ dạy mẹo mà dạy cả độ sâu ngôn ngữ.",
        fmt: "Reels Ngắn",
        fmtIcon: "fa-solid fa-video",
        fmtColor: "text-red-400",
      },
      {
        day: 11,
        topic: "REVIEW / RAW DATA",
        tc: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
        title: "Không tô vẽ, đây là feedback thật từ học viên tuần qua",
        detail:
          "Note: Chụp màn hình (Screen capture) các tin nhắn Zalo/Mess học viên báo điểm hoặc feedback về chất lượng dạy (Nhớ che tên/avatar).\nBrief: Giá trị thật tạo nên uy tín thật. Người thật việc thật 100%.",
        fmt: "Ảnh Chụp MH",
        fmtIcon: "fa-solid fa-comment-dots",
        fmtColor: "text-emerald-400",
      },
      {
        day: 12,
        topic: "CASE STUDY / LOGIC",
        tc: "bg-teal-500/15 text-teal-400 border-teal-500/25",
        title: "Phân tích lộ trình giúp bạn A đạt target sau 3 tháng",
        detail:
          'KV: Có thể là giấy chứng nhận,... \nNote: Viết bài phân tích CHUYÊN MÔN. Bóc tách rõ: Tuần 1 bạn A hổng kiến thức gì -> LETS can thiệp ra sao -> Tuần 4 cải thiện kỹ năng nào.\nBrief "Viết 1 bài post chuyên môn, bóc tách lộ trình học TOEIC thực tế của 1 học viên từ mức 300 lên 650..."',
        fmt: "Bài viết dài",
        fmtIcon: "fa-solid fa-chart-line",
        fmtColor: "text-teal-400",
      },
      {
        day: 13,
        topic: "FOMO / GẤP RÚT",
        tc: "bg-red-500/15 text-red-400 border-red-500/25",
        title: "Chỉ còn 2 tháng nữa là nộp chứng chỉ xét tốt nghiệp!",
        detail:
          "Note: Dùng Canva thiết kế 1 Quote nhắc nhở cực mạnh. Hình ảnh đồng hồ đếm ngược hoặc lịch. Đánh mạnh vào áp lực đồng trang lứa và thời gian.\nBrief: Đừng chần chừ nữa, đến test ngay để lên lộ trình.",
        fmt: "Ảnh Banner",
        fmtIcon: "fa-regular fa-image",
        fmtColor: "text-emerald-400",
      },
      {
        day: 14,
        topic: "BIG CTA / SALE",
        tc: "bg-red-600/30 text-red-300 border-red-500/40",
        title: "Tặng 20 suất Test năng lực 1-1 MIỄN PHÍ cùng GV Bản Xứ!",
        detail:
          "Ghi chú: Nếu dùng chiến lược này thì có thể hẹn 1 ngày, tập trung, cái này giá trị nhất là ở phần Speaking. Hoặc có thể tuỳ chiến lược, trung tâm có thể thay đổi.\nNote: Đây là bài chốt sale (sẽ dùng để ghim lên đầu page và chạy Ads). Thiết kế Banner nổi bật (Màu nhận diện thương hiệu + Vàng/Xanh/Đỏ).\nCall To Action: Kêu gọi điền Link đăng ký trên web. Rõ ràng Offer (Giảm giá, Tặng quà, Học thử).\nLưu ý: Content chạy QC nên làm 1 video dạng talking head, khoảng 30-40s kèm B-roll để đạt hiệu quả cao. \n QUAN TRỌNG NHẤT: Vẫn là phải thiết kế làm sao để chuyển đổi được từ 'làm bài test thử' sang học viên thực sự, thiết kế ra được luồng đi cho 20 người đến đó, tránh tình trạng là 20 người đến đó, làm xong bài rồi thì chờ điểm, có điểm lại 'im luôn' ",
        fmt: "POSTER ADS",
        fmtIcon: "fa-solid fa-fire",
        fmtColor: "text-red-400",
        highlight: true,
      },
    ],
  },
];

const STORAGE_KEY = "lets-schedule-checked";

/* ═══════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function ContentSchedule() {
  const [checked, setChecked] = useState({});
  const [sectionOpen, setSectionOpen] = useState(false);
  const [openPhases, setOpenPhases] = useState({});
  const [expandedDay, setExpandedDay] = useState(null);

  // Load saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCheck = useCallback((day, e) => {
    e.stopPropagation();
    setChecked((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const togglePhase = useCallback((id) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
    setExpandedDay(null);
  }, []);

  const totalDone = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((totalDone / 14) * 100);

  const phaseProgress = (phase) => {
    const done = phase.items.filter((i) => checked[i.day]).length;
    return {
      done,
      total: phase.items.length,
      pct: Math.round((done / phase.items.length) * 100),
    };
  };

  return (
    <section className="px-4 sm:px-6 max-w-[1200px] mx-auto pb-10">
      {/* Divider */}
      <div className="mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[.08] to-transparent" />
      </div>

      {/* ────────── MAIN DROPDOWN HEADER ────────── */}
      <button
        onClick={() => setSectionOpen((p) => !p)}
        className="w-full cursor-pointer rounded-xl border border-white/[.08] bg-gradient-to-r from-white/[.05] to-white/[.02] hover:from-white/[.07] hover:to-white/[.03] transition-all"
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-calendar-check text-violet-400 text-sm" />
            </div>
            <div className="text-left min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white tracking-wide">
                  Kế Hoạch Bài Đăng
                </span>
                <span className="bg-violet-500/15 text-violet-400 py-0.5 px-2 rounded-full text-[10px] font-bold">
                  14 ngày
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                Lịch đăng bài Facebook — tracking tiến độ từng ngày
              </p>
            </div>
          </div>

          {/* Right — mini progress + chevron */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Compact progress */}
            <div className="hidden sm:flex items-center gap-2 bg-white/[.04] border border-white/[.06] rounded-lg py-1.5 px-3">
              <div className="w-16 h-1.5 bg-white/[.08] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? "bg-emerald-400" : "bg-violet-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {totalDone}/14
              </span>
            </div>
            {/* Mobile: simple count */}
            <span className="sm:hidden text-[11px] font-bold text-slate-400 bg-white/[.04] border border-white/[.06] rounded-lg py-1 px-2">
              {totalDone}/14
            </span>
            <i
              className={`fa-solid fa-chevron-down text-[10px] text-slate-500 transition-transform duration-300 ${sectionOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* ────────── COLLAPSIBLE CONTENT ────────── */}
      {sectionOpen && (
        <div className="mt-3 space-y-3 animate-[fadeSlide_.25s_ease]">
          {/* Strategy tip */}
          <div className="rounded-lg border border-violet-500/15 bg-violet-500/[.04] px-4 py-3">
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-lightbulb text-yellow-400 text-xs mt-0.5 shrink-0" />
              <p className="text-[12px] text-slate-400 leading-relaxed">
                <span className="text-slate-200 font-semibold">
                  Chiến lược:{" "}
                </span>
                Facebook hiển thị bài mới ở trên cùng.{" "}
                <strong className="text-blue-400">Phase 1</strong> (làm nền) nằm
                dưới → <strong className="text-red-400">Phase 2</strong> (uy
                tín) nằm trên, đập ngay vào mắt khách. Hành trình:{" "}
                <span className="text-slate-300">Biết → Hiểu → Tin → Mua</span>.
              </p>
            </div>
          </div>

          {/* Tool badges */}
          <div className="flex flex-wrap items-center gap-2 px-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Công cụ:
            </span>
            <ToolBadge
              icon="fa-solid fa-paintbrush"
              label="CANVA"
              cls="bg-blue-500/10 text-blue-400 border-blue-500/20"
            />
            <ToolBadge
              icon="fa-solid fa-video"
              label="CAPCUT"
              cls="bg-white/[.05] text-slate-300 border-white/10"
            />
            <ToolBadge
              icon="fa-solid fa-robot"
              label="GEMINI"
              cls="bg-violet-500/10 text-violet-400 border-violet-500/20"
            />
          </div>

          {/* ────────── PHASES ────────── */}
          {PHASES.map((phase) => {
            const prog = phaseProgress(phase);
            const isOpen = !!openPhases[phase.id];

            return (
              <div
                key={phase.id}
                className="rounded-xl border border-white/[.08] bg-white/[.02] overflow-hidden"
              >
                {/* Phase toggle header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className={`w-full cursor-pointer flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r ${phase.gradient} border-b ${isOpen ? phase.border : "border-transparent"} transition-colors`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold text-white shrink-0 ${phase.badgeBg}`}
                    >
                      {phase.id}
                    </span>
                    <div className="text-left min-w-0">
                      <span className="text-[12px] font-bold text-white block truncate">
                        {phase.title}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {phase.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="hidden sm:block w-20 h-1.5 bg-white/[.08] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${phase.barColor}`}
                        style={{ width: `${prog.pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                      {prog.done}/{prog.total}
                    </span>
                    <i
                      className={`fa-solid fa-chevron-down text-[9px] text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {/* Phase items */}
                {isOpen && (
                  <div className="divide-y divide-white/[.04]">
                    {phase.items.map((item) => (
                      <DayRow
                        key={item.day}
                        item={item}
                        done={!!checked[item.day]}
                        expanded={expandedDay === item.day}
                        onCheck={(e) => toggleCheck(item.day, e)}
                        onExpand={() =>
                          setExpandedDay(
                            expandedDay === item.day ? null : item.day,
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   DAY ROW — each day's compact row + expandable detail
   ═══════════════════════════════════════════════════════ */
function DayRow({ item, done, expanded, onCheck, onExpand }) {
  return (
    <div
      className={`transition-colors ${item.highlight ? "bg-red-500/[.05]" : done ? "bg-emerald-500/[.03]" : "hover:bg-white/[.02]"}`}
    >
      {/* Compact row */}
      <div
        onClick={onExpand}
        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 cursor-pointer select-none"
      >
        {/* Checkbox */}
        <button
          onClick={onCheck}
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            done
              ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(52,211,153,.25)]"
              : "border-white/15 hover:border-white/30 text-transparent hover:text-white/20"
          }`}
        >
          <i className="fa-solid fa-check text-[9px] sm:text-[10px]" />
        </button>

        {/* Day # */}
        <span
          className={`w-7 sm:w-8 text-center font-extrabold text-base sm:text-lg shrink-0 ${
            item.highlight
              ? "text-red-400"
              : done
                ? "text-emerald-400/50 line-through"
                : "text-slate-500"
          }`}
        >
          {item.highlight ? (
            <i className="fa-solid fa-bullseye text-red-400 text-sm" />
          ) : (
            String(item.day).padStart(2, "0")
          )}
        </span>

        {/* Title (mobile: stacks topic+title) */}
        <div className="flex-1 min-w-0">
          {/* Topic badge — inline on desktop, small above title on mobile */}
          <span
            className={`inline-block px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border mb-0.5 sm:mb-0 sm:mr-2 ${item.tc}`}
          >
            {item.topic}
          </span>
          <span
            className={`block text-[12px] sm:text-[13px] font-semibold line-clamp-2 ${
              item.highlight
                ? "text-red-300"
                : done
                  ? "text-slate-500 line-through"
                  : "text-slate-200"
            }`}
          >
            {item.title}
          </span>
        </div>

        {/* Format — hidden on mobile, shown on sm+ */}
        <span className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-500 shrink-0">
          <i className={`${item.fmtIcon} ${item.fmtColor}`} />
          {item.fmt}
        </span>

        {/* Chevron */}
        <i
          className={`fa-solid fa-chevron-down text-[8px] sm:text-[9px] text-slate-600 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-3 sm:px-4 pb-3 pl-[52px] sm:pl-[64px]">
          {/* Mobile format tag */}
          <div className="flex items-center gap-1.5 mb-2 md:hidden text-[10px] text-slate-500">
            <i className={`${item.fmtIcon} ${item.fmtColor}`} />
            <span className="font-semibold">{item.fmt}</span>
          </div>
          {/* Detail content */}
          <div className="text-[11.5px] sm:text-[12px] text-slate-400 leading-relaxed bg-white/[.03] border border-white/[.06] rounded-lg p-3 whitespace-pre-line">
            {item.detail}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TOOL BADGE — small helper
   ═══════════════════════════════════════════════════════ */
function ToolBadge({ icon, label, cls }) {
  return (
    <span
      className={`border py-1 px-2 rounded-md text-[10px] font-bold flex items-center gap-1 ${cls}`}
    >
      <i className={icon} /> {label}
    </span>
  );
}
