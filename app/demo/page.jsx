export const metadata = {
  title: "Kế hoạch Thực thi Marketing - LETS English",
};

export default function DemoPage() {
  return (
    <div className="font-[Nunito] bg-[#f4f7f6] text-slate-800 pb-20 [&_h1]:font-[Montserrat] [&_h2]:font-[Montserrat] [&_h3]:font-[Montserrat] [&_h4]:font-[Montserrat]">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-4 py-2 bg-blue-900/50 rounded-full text-blue-200 font-bold mb-6 border border-blue-700">
            <i className="fa-solid fa-rocket mr-2" /> ACTION PLAN & EXECUTION
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Chiến Lược &quot;Boutique Center&quot;
            <br />
            <span className="text-yellow-400">
              Tối Ưu Nội Tại - Bứt Phá Doanh Thu
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mt-6">
            Biến quy mô tinh gọn (1 Bản xứ, 2 Việt Nam) và không gian Offline
            đắc địa thành <b className="text-white">vũ khí sắc bén nhất</b>,
            đánh bật sự hời hợt của các khóa học Online.
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-10 text-[300px] leading-none translate-x-1/4 -translate-y-1/4">
          <i className="fa-solid fa-chess-knight" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Section 1: Brand Key */}
        <Section1BrandKey />
        {/* Section 2: USPs */}
        <Section2USPs />
        {/* Section 3: Customer Psychology */}
        <Section3CustomerPsychology />
        {/* Section 4: Content Calendar */}
        <Section4ContentCalendar />
        {/* Section 5: Marketing Campaigns */}
        <Section5Campaigns />
        {/* Section 6: Customer Journey */}
        <Section6Journey />
      </main>

      <footer className="bg-gray-900 text-gray-400 py-10 text-center mt-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h4 className="text-white font-bold text-xl mb-2">
            Trung Tâm Anh Ngữ LETS - Trí Thức Việt
          </h4>
          <p className="mb-4 text-sm">
            Nội bộ: Tài liệu Hướng dẫn Thực thi Marketing đa kênh
          </p>
          <div className="flex justify-center space-x-4 text-2xl mt-4">
            <i className="fa-brands fa-facebook hover:text-white cursor-pointer transition" />
            <i className="fa-brands fa-tiktok hover:text-white cursor-pointer transition" />
            <i className="fa-brands fa-youtube hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══ Section Components ═══ */

function CardShadow({ children, className = "" }) {
  return (
    <div
      className={`shadow-[0_10px_30px_-5px_rgba(0,0,0,.05)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,.1)] ${className}`}
    >
      {children}
    </div>
  );
}

function Tag({ bg, text, label }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${bg} ${text}`}
    >
      {label}
    </span>
  );
}

function Section1BrandKey() {
  return (
    <section className="mb-16">
      <CardShadow className="bg-white rounded-2xl p-8 md:p-10 border-t-4 border-yellow-500">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <span className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-4 text-xl">
            <i className="fa-solid fa-key" />
          </span>
          1. Brand Key (Bộ Gen Thương Hiệu LETS)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="text-blue-600 font-bold text-sm mb-1 uppercase tracking-wider">
              Slogan / Key Message
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              &quot;Đồng hành tri thức, Kiến tạo tương lai&quot;
            </h3>
            <div className="text-blue-600 font-bold text-sm mb-1 uppercase tracking-wider">
              Định vị thương hiệu
            </div>
            <p className="text-gray-700 text-sm">
              LETS không chỉ là trung tâm dạy ngoại ngữ đại trà, chúng tôi là{" "}
              <b>&quot;Boutique English Center&quot;</b> - Một người Mentor tận
              tâm, cung cấp giải pháp tiếng Anh cá nhân hóa sâu sắc, kỷ luật và
              &quot;chất lượng thật&quot; thông qua mô hình 100% Offline.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="text-yellow-600 font-bold text-sm mb-1 uppercase tracking-wider">
              Sứ mệnh
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Đồng hành sát sao cùng học viên phá vỡ rào cản mất gốc. Trang bị
              ngôn ngữ sắc bén và kỹ năng thực chiến để họ tự tin thăng tiến, mở
              rộng cơ hội nghề nghiệp trong tương lai.
            </p>
            <div className="text-yellow-600 font-bold text-sm mb-1 uppercase tracking-wider">
              Lý do để tin tưởng (RTB)
            </div>
            <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>Mô hình &quot;Tam giác vàng&quot; kèm cặp sát sao.</li>
              <li>Cam kết đầu ra bằng văn bản.</li>
              <li>Cơ sở vật chất hiện đại, môi trường 100% tương tác thực.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
          Bóc tách Brand Key Model
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <BrandKeyBox
              color="border-l-blue-500"
              title="Root Strengths (Thế mạnh cốt lõi)"
              titleColor="text-blue-800"
            >
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  • Đội ngũ &quot;1 Bản xứ - 2 Việt Nam&quot; bù trừ hoàn hảo.
                </li>
                <li>• Cơ sở vật chất Premium, vị trí đắc địa dễ tìm.</li>
                <li>
                  • Mô hình Offline tạo áp lực (Peer pressure) và tính kỷ luật
                  cao.
                </li>
              </ul>
            </BrandKeyBox>
            <BrandKeyBox
              color="border-l-red-400"
              title="Competitive Environment"
              titleColor="text-red-800"
            >
              <p className="text-sm text-gray-600 mb-2">
                <b>Đối thủ trực tiếp:</b> Các trung tâm tiếng Anh truyền thống,
                lò luyện thi nhồi nhét, đại trà.
              </p>
              <p className="text-sm text-gray-600">
                <b>Đối thủ gián tiếp:</b> Các khóa học Online (Video, Zoom) giá
                siêu rẻ nhưng khiến học viên dễ bỏ cuộc.
              </p>
            </BrandKeyBox>
          </div>
          <div className="space-y-6">
            <BrandKeyBox
              color="border-l-purple-500"
              title="Target Insight (Sự thật ngầm hiểu)"
              titleColor="text-purple-800"
            >
              <p className="text-sm text-gray-600 italic">
                &quot;Tôi cần bằng TOEIC/IELTS để tốt nghiệp, thăng tiến, nhưng
                tôi lười, mất gốc, học online mãi không vô. Tôi cần một
                người/một môi trường thực tế ép tôi học, chỉ rành rọt điểm sai
                và cam kết kết quả để tôi không tốn tiền oan nữa.&quot;
              </p>
            </BrandKeyBox>
            <BrandKeyBox
              color="border-l-green-500"
              title="Benefits (Lợi ích mang lại)"
              titleColor="text-green-800"
            >
              <p className="text-sm text-gray-600 mb-2">
                <b>Lý tính:</b> Đạt chuẩn đầu ra, phát âm chuẩn Tây, mẹo giải đề
                thực chiến, không gian học thoải mái.
              </p>
              <p className="text-sm text-gray-600">
                <b>Cảm tính:</b> Sự an tâm tuyệt đối (không bị đem con bỏ chợ),
                sự tự tin vươn tầm, năng lượng tích cực khi có người đồng hành.
              </p>
            </BrandKeyBox>
          </div>
          <div className="space-y-6">
            <BrandKeyBox
              color="border-l-orange-500"
              title="Values & Personality"
              titleColor="text-orange-800"
            >
              <p className="text-sm text-gray-600 mb-2">
                <b>Giá trị:</b> Chất lượng thật - Kỷ luật - Thấu hiểu.
              </p>
              <p className="text-sm text-gray-600">
                <b>Tính cách:</b> Chuyên nghiệp và tận tâm như một Mentor; sắc
                bén trong học thuật; gần gũi và truyền cảm hứng như những người
                bạn.
              </p>
            </BrandKeyBox>
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-5 rounded-lg shadow-md text-white">
              <h4 className="font-bold text-yellow-400 mb-2 text-lg">
                <i className="fa-solid fa-gem mr-2" />
                Discriminator (Vũ khí khác biệt)
              </h4>
              <p className="text-sm text-blue-100">
                Sự kết hợp độc quyền giữa mô hình chăm sóc{" "}
                <b>&quot;Tam giác vàng&quot;</b> theo sát từng cá nhân và không
                gian <b>Premium Hub 100% Offline</b>. Khách hàng không chỉ mua
                khóa học, họ mua một <b>&quot;Kỷ luật tích cực&quot;</b> để chắc
                chắn thay đổi bản thân.
              </p>
            </div>
          </div>
        </div>
      </CardShadow>
    </section>
  );
}

function BrandKeyBox({ color, title, titleColor, children }) {
  return (
    <div
      className={`border-l-4 ${color} bg-white p-5 rounded shadow-sm border border-gray-100`}
    >
      <h4 className={`font-bold ${titleColor} mb-2`}>{title}</h4>
      {children}
    </div>
  );
}

function Section2USPs() {
  return (
    <section className="mb-16">
      <CardShadow className="bg-white rounded-2xl p-8 md:p-10 border-t-4 border-blue-600">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 text-xl">
            <i className="fa-solid fa-magnifying-glass" />
          </span>
          2. Bóc tách & Chuyển hóa Nội tại (USPs)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <Tag bg="bg-blue-600" text="text-white" label="ĐỘI NGŨ TINH GỌN" />
            <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">
              1 Giáo viên Bản xứ + 2 Giáo viên VN
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              <b>
                Đừng hiểu lầm là &quot;ít nhân sự&quot;. Hãy định vị là
                &quot;Tam Giác Vàng Chuyên Môn&quot;.
              </b>
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <i className="fa-solid fa-check text-blue-500 mr-2" />
                <b>GV Bản xứ:</b> Chìa khóa cho Phát âm chuẩn, phản xạ giao tiếp
                tự nhiên và sự tự tin.
              </li>
              <li>
                <i className="fa-solid fa-check text-blue-500 mr-2" />
                <b>2 GV Việt Nam:</b> Bậc thầy giải đề, thấu hiểu tâm lý
                &quot;sợ tiếng Anh&quot; của người Việt.
              </li>
              <li>
                <i className="fa-solid fa-star text-yellow-500 mr-2" />
                <b>Góc nhìn Marketing:</b> Học viên không bị &quot;đem con bỏ
                chợ&quot; với hàng tá GV không nhớ mặt. Tại LETS, 3 thầy cô sẽ{" "}
                <b>nhớ tên, nhớ điểm yếu</b> của từng người.
              </li>
            </ul>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
            <Tag
              bg="bg-yellow-600"
              text="text-white"
              label="MÔI TRƯỜNG & CƠ SỞ"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">
              CSVC Hiện đại + Vị trí Đắc địa
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              <b>
                Biến không gian thành &quot;Lý do để rời khỏi giường và đi học
                Offline&quot;.
              </b>
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <i className="fa-solid fa-check text-yellow-600 mr-2" />
                <b>Ánh sáng & Thiết kế:</b> Chụp ảnh góc nào cũng đẹp. Kích
                thích mood học tập, tạo cảm giác chuyên nghiệp, cao cấp.
              </li>
              <li>
                <i className="fa-solid fa-check text-yellow-600 mr-2" />
                <b>Vị trí:</b> Dễ tìm, an ninh tốt, nâng tầm uy tín.
              </li>
              <li>
                <i className="fa-solid fa-star text-yellow-500 mr-2" />
                <b>Góc nhìn Marketing:</b> Định vị không gian này như một
                &quot;Premium English Hub&quot;. Bán sự tập trung, năng lượng
                tích cực mà ở nhà học Online không bao giờ có được.
              </li>
            </ul>
          </div>
        </div>
      </CardShadow>
    </section>
  );
}

function Section3CustomerPsychology() {
  const cards = [
    {
      icon: "fa-ban",
      color: "text-red-500",
      title: 'Nạn nhân của "Học Online"',
      desc: "Những người đã mua khóa học Video/Zoom nhưng bỏ cuộc vì thiếu kỷ luật, buồn ngủ, không ai thúc giục. Họ CẦN một nơi ép họ phải học.",
    },
    {
      icon: "fa-people-group",
      color: "text-green-500",
      title: 'Người thích "Năng lượng thực"',
      desc: "Cần sự tương tác ánh mắt (Eye-contact) với Thầy Tây, cần bạn cùng tiến (Peer pressure) để có động lực đua điểm TOEIC/IELTS.",
    },
    {
      icon: "fa-shield-halved",
      color: "text-purple-500",
      title: 'Yêu cầu "Chất lượng thật"',
      desc: "Đến tận nơi xem cơ sở vật chất, gặp trực tiếp thầy cô để đánh giá sự uy tín trước khi xuống tiền.",
    },
  ];
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        3. Tâm lý Khách hàng &quot;Chọn Offline&quot;
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <CardShadow
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-100 text-center"
          >
            <div className={`text-4xl ${c.color} mb-4`}>
              <i className={`fa-solid ${c.icon}`} />
            </div>
            <h3 className="font-bold text-lg mb-2">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.desc}</p>
          </CardShadow>
        ))}
      </div>
    </section>
  );
}

function Section4ContentCalendar() {
  const rows = [
    {
      day: "Thứ 2",
      topic: "Branding (Truyền cảm hứng)",
      detail:
        "Làm nổi bật không gian Offline cao cấp, hình ảnh giáo viên tận tâm, quote động lực đầu tuần kích thích tinh thần học tập.",
      format: "Photo Album / Post",
      tagColor: "bg-purple-100 text-purple-700",
    },
    {
      day: "Thứ 3",
      topic: "Kiến thức (Mẹo / Giải đề)",
      detail:
        'GV Việt Nam phân tích mẹo giải đề TOEIC/IELTS, bẫy ngữ pháp thường gặp. Đánh mạnh vào tính "thực chiến".',
      format: "Short Video / Reels",
      tagColor: "bg-blue-100 text-blue-700",
    },
    {
      day: "Thứ 4",
      topic: "Tương tác / Test",
      detail:
        "Các bài Quiz ngắn, trắc nghiệm từ vựng, điền từ. Kêu gọi học viên comment để nhận tài liệu độc quyền từ trung tâm.",
      format: "Hình ảnh / Poll",
      tagColor: "bg-yellow-100 text-yellow-700",
    },
    {
      day: "Thứ 5",
      topic: "Kiến thức (Phát âm / Giao tiếp)",
      detail:
        "GV Bản xứ hướng dẫn phát âm chuẩn, Idioms, tiếng Anh ứng dụng thực tế. Khẳng định chất lượng môi trường quốc tế.",
      format: "Short Video / Reels",
      tagColor: "bg-blue-100 text-blue-700",
    },
    {
      day: "Thứ 6",
      topic: "Case Study (Vinh danh)",
      detail:
        "Câu chuyện thật về sự tiến bộ của học viên. Đăng tải chứng chỉ, bảng điểm TOEIC/IELTS thực tế làm bằng chứng thép.",
      format: "Bài viết PR dài",
      tagColor: "bg-green-100 text-green-700",
    },
    {
      day: "Thứ 7",
      topic: "Branding (Behind the scenes)",
      detail:
        "Chia sẻ hình ảnh lớp học thực tế đang diễn ra, sự tương tác sôi nổi giữa 3 giáo viên và học viên tại cơ sở.",
      format: "Story / Carousel",
      tagColor: "bg-purple-100 text-purple-700",
    },
    {
      day: "Chủ Nhật",
      topic: "Giải trí / Personal Branding",
      detail:
        "Góc nhìn gần gũi về đời sống, sở thích của thầy cô. Tạo sự gắn kết thân thiện, phá bỏ hình ảnh lớp học cứng nhắc.",
      format: "Casual Post",
      tagColor: "bg-gray-200 text-gray-700",
    },
  ];
  return (
    <section className="mb-16 bg-white rounded-2xl p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,.05)] border border-gray-200">
      <h2 className="text-3xl font-bold mb-2 flex items-center">
        <span className="text-blue-600 mr-3">
          <i className="fa-regular fa-calendar-days" />
        </span>
        4. Tuyến Nội Dung & Lịch Đăng Bài
      </h2>
      <p className="text-gray-500 mb-8">
        Chiến lược: Cấu trúc hóa nội dung theo 4 Pillars cốt lõi giúp tối ưu hóa
        việc sản xuất và truyền tải Brief nhất quán.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4 rounded-tl-lg font-bold w-1/6">Thứ</th>
              <th className="p-4 font-bold w-1/4">Chủ đề (Pillar)</th>
              <th className="p-4 font-bold w-1/3">Nội dung chi tiết</th>
              <th className="p-4 rounded-tr-lg font-bold">Định dạng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-blue-50 transition-colors">
                <td className="p-4 font-bold text-blue-800">{r.day}</td>
                <td className="p-4 font-semibold text-gray-800">{r.topic}</td>
                <td className="p-4 text-sm text-gray-600">{r.detail}</td>
                <td className="p-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${r.tagColor}`}
                  >
                    {r.format}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Section5Campaigns() {
  const campaigns = [
    {
      bg: "bg-gray-900",
      accent: "text-gray-700",
      tagBg: "bg-red-600",
      tag: "CHIẾN DỊCH DU KÍCH (Luôn bật)",
      title: '"Giải Cứu Trầm Cảm Online"',
      titleColor: "text-yellow-400",
      desc: "Đánh thẳng vào nỗi đau của người mua khóa học Online nhưng bỏ xó.",
      infoBg: "bg-gray-800",
      infoBorder: "border-gray-700",
      icon: "fa-bolt",
      target:
        "Sinh viên, dân văn phòng khu vực xung quanh trung tâm (Bán kính 5-7km).",
      message:
        '"Đã tốn bao nhiêu tiền cho khóa học Online mà vẫn chưa mở ra xem? Đến LETS ngay, chúng tôi cam kết kỷ luật Offline - Chắc chắn ra điểm!"',
      offer:
        "Tặng 1 buổi học thử + Test năng lực 1-1 trực tiếp tại cơ sở xịn xò.",
      descColor: "text-gray-300",
      labelColor: "text-blue-300",
    },
    {
      bg: "bg-red-700",
      accent: "text-red-900",
      tagBg: "bg-red-900",
      tag: "CHIẾN DỊCH ĐẦU NĂM (Tháng 2 - 3)",
      title: '"Chạy Nước Rút - Kịp Ra Trường"',
      titleColor: "text-white",
      desc: "Đánh vào áp lực deadline nộp chứng chỉ của sinh viên năm cuối.",
      infoBg: "bg-red-800",
      infoBorder: "border-red-600",
      icon: "fa-graduation-cap",
      target:
        "Sinh viên năm 3, năm 4 cần chứng chỉ TOEIC/IELTS gấp để xét tốt nghiệp hoặc nộp CV xin việc.",
      message:
        '"Đừng để rớt tốt nghiệp chỉ vì thiếu chứng chỉ tiếng Anh. Lộ trình cấp tốc tại LETS - Học trúng tủ, thi là đỗ!"',
      offer: "Combo đăng ký nhóm bạn giảm giá + Cam kết đầu ra bằng văn bản.",
      descColor: "text-red-100",
      labelColor: "text-yellow-300",
    },
    {
      bg: "bg-green-600",
      accent: "text-green-800",
      tagBg: "bg-green-800",
      tag: "CHIẾN DỊCH HÈ (Tháng 4 - 5)",
      title: '"Hè Bứt Phá - Tự Tin Giao Tiếp"',
      titleColor: "text-white",
      desc: "Tập trung vào phụ huynh tìm kiếm môi trường ngoại khóa hè cho trẻ.",
      infoBg: "bg-green-700",
      infoBorder: "border-green-500",
      icon: "fa-child-reaching",
      target:
        "Phụ huynh có con em cấp 1, cấp 2 muốn bé cởi mở, dạn dĩ hơn trong mùa hè.",
      message:
        '"Cho con một mùa hè rời xa iPad. Môi trường 100% tương tác với GV Bản xứ giúp bé tự tin giao tiếp, kết nối bạn bè đồng trang lứa!"',
      offer: "Tặng buổi test năng lực + Trải nghiệm lớp học hè miễn phí.",
      descColor: "text-green-100",
      labelColor: "text-yellow-300",
    },
    {
      bg: "bg-blue-600",
      accent: "text-blue-800",
      tagBg: "bg-blue-900",
      tag: "CHIẾN DỊCH TỰU TRƯỜNG (Tháng 7 - 9)",
      title: '"Trạm Sạc Kiến Thức - Back to School"',
      titleColor: "text-white",
      desc: "Tận dụng CSVC Premium để thu hút tân sinh viên/học viên mới.",
      infoBg: "bg-blue-700",
      infoBorder: "border-blue-500",
      icon: "fa-leaf",
      target:
        "Tân sinh viên, người đi làm cần khởi động lại việc học sau kỳ nghỉ hè.",
      message:
        '"Check-in không gian học cực chill - Chinh phục điểm mục tiêu siêu đỉnh. Khởi đầu năm học mới rực rỡ cùng LETS."',
      offer:
        "Check-in tại trung tâm tặng bộ Kit học tập LETS (Sổ tay, Bút, Balo).",
      descColor: "text-blue-100",
      labelColor: "text-yellow-300",
    },
  ];
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <span className="text-orange-500">
          <i className="fa-solid fa-fire" />
        </span>{" "}
        5. Chiến Dịch Chạy Ads & Du Kích
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {campaigns.map((c, i) => (
          <div
            key={i}
            className={`${c.bg} text-white p-8 rounded-2xl relative overflow-hidden`}
          >
            <div
              className={`absolute -right-6 -top-6 text-6xl ${c.accent} opacity-50`}
            >
              <i className={`fa-solid ${c.icon}`} />
            </div>
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${c.tagBg} text-white mb-4`}
            >
              {c.tag}
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${c.titleColor}`}>
              {c.title}
            </h3>
            <p className={`${c.descColor} mb-4 text-sm`}>{c.desc}</p>
            <div
              className={`${c.infoBg} p-4 rounded-lg text-sm space-y-2 border ${c.infoBorder}`}
            >
              <p>
                <b className={c.labelColor}>Target:</b> {c.target}
              </p>
              <p>
                <b className={c.labelColor}>Brief:</b> {c.message}
              </p>
              <p>
                <b className={c.labelColor}>Offer:</b> {c.offer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FlowBlock({
  num,
  title,
  color,
  borderColor,
  bgColor,
  textColor,
  desc,
  tags,
  children,
}) {
  return (
    <div
      className={`w-full bg-white p-6 rounded-2xl border-l-4 ${borderColor} shadow-[0_10px_30px_-5px_rgba(0,0,0,.05)] flex flex-col sm:flex-row items-start gap-5 relative z-10 transition-all hover:shadow-md`}
    >
      <div
        className={`w-12 h-12 shrink-0 ${bgColor} ${textColor} rounded-full flex items-center justify-center text-xl font-bold`}
      >
        {num}
      </div>
      <div className="flex-grow w-full">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{desc}</p>
        {children}
        <div className="flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${t.style}`}
            >
              <i className={`fa-solid ${t.icon}`} /> {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="h-8 w-0.5 bg-gray-200 relative">
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-gray-300 text-sm">
        <i className="fa-solid fa-caret-down" />
      </div>
    </div>
  );
}

function Section6Journey() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
        <i className="fa-solid fa-route text-blue-600 mr-3" />
        6. Hành Trình Khách Hàng (Customer Journey & Vận Hành)
      </h2>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
        Hệ thống hoá từ Marketing, Thu thập Data đến Chốt Sale
      </p>

      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-2">
        <FlowBlock
          num={1}
          title="Tiếp Cận (Acquisition)"
          borderColor="border-blue-500"
          bgColor="bg-blue-100"
          textColor="text-blue-600"
          desc="Chạy quảng cáo (QC) dựa theo chiến lược của từng chiến dịch. Lưu lượng khách hàng sẽ được trỏ về Messenger để chat hoặc trỏ trực tiếp về Website trung tâm."
          tags={[
            {
              icon: "fa-bullhorn",
              label: "QC Đa Kênh",
              style: "bg-blue-50 text-blue-600 border-blue-200",
            },
            {
              icon: "fa-brands fa-facebook-messenger",
              label: "Điều hướng Messenger",
              style: "bg-blue-50 text-blue-600 border-blue-200",
            },
            {
              icon: "fa-globe",
              label: "Traffic Website",
              style: "bg-blue-50 text-blue-600 border-blue-200",
            },
          ]}
        />
        <FlowArrow />
        <FlowBlock
          num={2}
          title="Thu Thập Thông Tin & Phân Loại (Lead Gen)"
          borderColor="border-purple-500"
          bgColor="bg-purple-100"
          textColor="text-purple-600"
          desc="Khách hàng vào Website xem thông tin. Trọng tâm là form đăng ký thu thập dữ liệu khách hàng. Hệ thống tự động phân luồng:"
          tags={[
            {
              icon: "fa-check-circle",
              label: "Điền Form Website",
              style: "bg-purple-50 text-purple-600 border-purple-200",
            },
            {
              icon: "fa-crosshairs",
              label: "Thi Test Năng Lực",
              style: "bg-purple-50 text-purple-600 border-purple-200",
            },
            {
              icon: "fa-users",
              label: "Thu thập SĐT/Zalo",
              style: "bg-purple-50 text-purple-600 border-purple-200",
            },
          ]}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1.5">
                <i className="fa-solid fa-file-lines text-purple-600" />
                <h5 className="font-semibold text-gray-800 text-sm">
                  Học viên (TOEIC/IELTS)
                </h5>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                Điền form đăng ký → Chuyển qua làm bài Test thực tế online để
                đánh giá năng lực dựa theo mục tiêu.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1.5">
                <i className="fa-solid fa-phone text-purple-600" />
                <h5 className="font-semibold text-gray-800 text-sm">
                  Phụ huynh (Lớp trẻ em)
                </h5>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                Click link riêng biệt → Để lại SĐT/Zalo → Trung tâm chủ động gọi
                điện/nhắn tin tư vấn.
              </p>
            </div>
          </div>
        </FlowBlock>
        <FlowArrow />
        <FlowBlock
          num={3}
          title="Vận Hành Dữ Liệu Cốt Lõi (Core CRM)"
          borderColor="border-yellow-500"
          bgColor="bg-yellow-100"
          textColor="text-yellow-600"
          desc={
            <>
              <strong>Tài sản quý giá nhất</strong>: Toàn bộ thông tin được lưu
              trữ tập trung, dễ tìm kiếm và truy xuất. Data này được tái sử dụng
              liên tục trong quá trình CSKH.
            </>
          }
          tags={[
            {
              icon: "fa-database",
              label: "Lưu trữ Data Khách Hàng",
              style: "bg-yellow-50 text-yellow-700 border-yellow-200",
            },
            {
              icon: "fa-user-check",
              label: "Hồ Sơ Cá Nhân Hoá",
              style: "bg-yellow-50 text-yellow-700 border-yellow-200",
            },
            {
              icon: "fa-chart-line",
              label: "Theo Dõi Quỹ Phát Triển",
              style: "bg-yellow-50 text-yellow-700 border-yellow-200",
            },
          ]}
        />
        <FlowArrow />
        <FlowBlock
          num={4}
          title="Đánh Giá & Tư Vấn Chuyên Sâu (Assessment)"
          borderColor="border-green-500"
          bgColor="bg-green-100"
          textColor="text-green-600"
          desc="Sử dụng kịch bản tư vấn riêng biệt dựa trên tệp khách hàng đã thu thập:"
          tags={[
            {
              icon: "fa-file-lines",
              label: "Trả Điểm Tự Động",
              style: "bg-green-50 text-green-600 border-green-200",
            },
            {
              icon: "fa-user-check",
              label: "Tư Vấn 1-1",
              style: "bg-green-50 text-green-600 border-green-200",
            },
            {
              icon: "fa-wand-magic-sparkles",
              label: "Báo Giá Ưu Đãi",
              style: "bg-green-50 text-green-600 border-green-200",
            },
          ]}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1.5">
                <i className="fa-solid fa-crosshairs text-green-600" />
                <h5 className="font-semibold text-gray-800 text-sm">
                  Học viên (TOEIC/IELTS)
                </h5>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                Trả bài test chấm tự động → Giảng viên tư vấn 1-1 chỉ ra thiếu
                sót → Đánh giá điểm A và vạch lộ trình thời gian đạt Aim → Gửi
                file tổng hợp qua Mess/Zalo.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1.5">
                <i className="fa-solid fa-handshake-angle text-green-600" />
                <h5 className="font-semibold text-gray-800 text-sm">
                  Phụ huynh (Lớp trẻ em)
                </h5>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                Tư vấn giải đáp → Đưa Testimonials → Cam kết cải thiện cảm xúc,
                kỹ năng, tinh thần → Đưa ra mức giá cực kỳ ưu đãi (Key chốt
                sale).
              </p>
            </div>
          </div>
        </FlowBlock>
        <FlowArrow />
        <FlowBlock
          num={5}
          title="Trải Nghiệm, Chốt Sale & Mở Rộng (Close & Scale)"
          borderColor="border-red-500"
          bgColor="bg-red-100"
          textColor="text-red-600"
          desc="Kêu gọi khách hàng đến lớp học thử miễn phí. Nếu ưng ý sẽ tiến hành đóng học phí và đi học trực tiếp. Liên tục sáng tạo sản phẩm, khoá học mới."
          tags={[
            {
              icon: "fa-book-open",
              label: "Học Thử Miễn Phí",
              style: "bg-red-50 text-red-600 border-red-200",
            },
            {
              icon: "fa-circle-check",
              label: "Đóng Học Phí",
              style: "bg-red-50 text-red-600 border-red-200",
            },
            {
              icon: "fa-users",
              label: "Training Trợ Giảng Part-time",
              style: "bg-red-50 text-red-600 border-red-200",
            },
            {
              icon: "fa-wand-magic-sparkles",
              label: "R&D Khoá Mới",
              style: "bg-red-50 text-red-600 border-red-200",
            },
          ]}
        >
          <div className="bg-orange-50 border border-orange-100 text-orange-700 text-xs p-3 rounded-lg mb-4 flex gap-2 items-start">
            <i className="fa-solid fa-lightbulb shrink-0 mt-0.5" />
            <p>
              <b>Tips nhân sự:</b> Lớp trẻ em nếu thiếu nguồn lực, có thể kêu
              gọi, training sinh viên/bạn trẻ làm part-time để giao lưu, rèn
              luyện tiếng Anh với các bé.
            </p>
          </div>
        </FlowBlock>
      </div>
    </section>
  );
}
