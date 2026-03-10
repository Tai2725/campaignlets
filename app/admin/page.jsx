'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGate from '@/components/ui/AuthGate';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { DarkModal } from '@/components/ui/Modal';
import { APP_CONFIG } from '@/lib/config';
import { escapeHtml, formatDate } from '@/lib/helpers';

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminApp />
    </ToastProvider>
  );
}

function AdminApp() {
  const [authed, setAuthed] = useState(false);

  const handleAuth = useCallback(() => {
    setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <AuthGate
        title="Admin Panel"
        subtitle="Chỉ Admin mới được phép truy cập trang này"
        codes={{ [APP_CONFIG.adminCode.toUpperCase()]: 'Admin' }}
        onAuth={handleAuth}
        icon="fa-shield-halved"
        buttonColor="from-red-500 to-red-700"
        placeholder="Nhập mã Admin..."
        buttonText="Truy cập Admin"
      />
    );
  }

  return <AdminPanel />;
}

function AdminPanel() {
  const showToast = useToast();
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [detailFb, setDetailFb] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(APP_CONFIG.workerUrl + '/list');
      if (!res.ok) throw new Error('Server ' + res.status);
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
    } catch (err) {
      showToast('Lỗi tải dữ liệu: ' + err.message, 'error');
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => { loadFeedbacks(); }, [loadFeedbacks]);

  const executeDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(APP_CONFIG.workerUrl + '/delete/' + deleteId, { method: 'DELETE' });
      if (!res.ok) throw new Error('Server ' + res.status);
      setDeleteId(null);
      setDetailFb(null);
      showToast('Đã xoá comment thành công!', 'success');
      loadFeedbacks();
    } catch (err) {
      showToast('Lỗi xoá: ' + err.message, 'error');
    }
    setDeleting(false);
  };

  const filtered = filter === 'all' ? feedbacks : feedbacks.filter(f => f.role === filter);
  const stats = {
    total: feedbacks.length,
    head: feedbacks.filter(f => f.role === 'Head').length,
    staff: feedbacks.filter(f => f.role === 'Staff').length,
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 border-b border-white/[.08] px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-lg text-white">
            <i className="fa-solid fa-shield-halved" />
          </div>
          <h1 className="text-lg font-bold text-white">Admin <span className="text-red-500">Panel</span></h1>
        </div>
        <button onClick={() => { sessionStorage.removeItem('auth_role'); location.reload(); }} className="bg-white/[.08] border border-white/10 text-slate-400 py-2 px-3.5 rounded-lg cursor-pointer text-xs font-medium font-[Inter] transition-all hover:bg-red-500/15 hover:text-red-500 hover:border-red-500/30 flex items-center gap-1.5">
          <i className="fa-solid fa-right-from-bracket" /> Đăng xuất
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 max-w-[1400px] mx-auto">
        <StatCard icon="fa-comments" iconBg="bg-gradient-to-br from-blue-500 to-blue-700" value={stats.total} label="Tổng comment" />
        <StatCard icon="fa-crown" iconBg="bg-gradient-to-br from-red-500 to-red-700" value={stats.head} label="Từ Head" />
        <StatCard icon="fa-user-tie" iconBg="bg-gradient-to-br from-violet-500 to-violet-700" value={stats.staff} label="Từ Staff" />
      </div>

      {/* Toolbar */}
      <div className="px-6 pb-4 max-w-[1400px] mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2">
          {['all', 'Head', 'Staff'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`py-2 px-4 rounded-lg cursor-pointer text-[13px] font-medium font-[Inter] transition-all border ${filter === f ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white border-blue-500' : 'bg-white/[.06] border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'}`}>
              <i className={`fa-solid ${f === 'all' ? 'fa-layer-group' : f === 'Head' ? 'fa-crown' : 'fa-user-tie'}`} /> {f === 'all' ? 'Tất cả' : f}
            </button>
          ))}
        </div>
        <button onClick={loadFeedbacks} className="bg-blue-500/10 border border-blue-500/20 text-blue-400 py-2 px-4 rounded-lg cursor-pointer text-[13px] font-medium font-[Inter] transition-all hover:bg-blue-500/20 flex items-center gap-1.5">
          <i className="fa-solid fa-arrows-rotate" /> Làm mới
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4 px-6 pb-10 max-w-[1400px] mx-auto">
        {loading ? (
          <div className="text-center py-16 text-slate-500 col-span-full">
            <i className="fa-solid fa-spinner text-4xl text-blue-500 animate-spin block mb-4" />
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500 col-span-full">
            <i className="fa-regular fa-comment-dots text-5xl text-slate-700 block mb-4" />
            <h3 className="text-lg font-semibold text-slate-400 mb-1">Chưa có feedback nào</h3>
            <p>Các comment sẽ xuất hiện ở đây</p>
          </div>
        ) : filtered.map((fb, i) => (
          <FeedbackCard
            key={fb.id || i}
            fb={fb}
            onView={() => setDetailFb(fb)}
            onDelete={() => setDeleteId(fb.id)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <DarkModal isOpen={!!detailFb} onClose={() => setDetailFb(null)}>
        {detailFb && (
          <>
            <div className="p-5 border-b border-white/[.08] flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-magnifying-glass text-blue-500" /> Chi tiết feedback
              </h3>
              <button onClick={() => setDetailFb(null)} className="bg-white/[.08] border-none text-slate-400 w-9 h-9 rounded-xl cursor-pointer text-base flex items-center justify-center transition-all hover:bg-red-500/20 hover:text-red-500">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            {detailFb.image_key && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={APP_CONFIG.workerUrl + '/image/' + detailFb.image_key} alt="Screenshot" className="w-full max-h-[400px] object-contain bg-slate-900 border-b border-white/[.08]" />
            )}
            <div className="p-6">
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5"><i className="fa-solid fa-comment-dots" /> Nội dung yêu cầu</div>
                <div className="text-sm text-slate-200 leading-relaxed bg-white/[.04] p-3.5 rounded-xl border border-white/[.06]">{detailFb.comment || 'Không có nội dung'}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <DetailMeta icon="fa-user-shield" label="Vai trò" value={detailFb.role || 'Unknown'} />
                <DetailMeta icon="fa-clock" label="Thời gian" value={formatDate(detailFb.timestamp)} />
                <DetailMeta icon="fa-vector-square" label="Vùng chọn" value={detailFb.selected_area ? `x:${detailFb.selected_area.xPct?.toFixed(1)}% y:${detailFb.selected_area.yPct?.toFixed(1)}% w:${detailFb.selected_area.wPct?.toFixed(1)}% h:${detailFb.selected_area.hPct?.toFixed(1)}%` : 'N/A'} mono />
                <DetailMeta icon="fa-fingerprint" label="ID" value={detailFb.id || 'N/A'} mono />
              </div>
              <button onClick={() => { setDeleteId(detailFb.id); }} className="mt-4 w-full bg-red-500/10 border border-red-500/20 text-red-400 py-2.5 px-5 rounded-xl cursor-pointer text-sm font-semibold font-[Inter] transition-all hover:bg-red-500/25 hover:text-red-500 flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-trash-can" /> Xoá comment này
              </button>
            </div>
          </>
        )}
      </DarkModal>

      {/* Confirm Delete Modal */}
      <DarkModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} maxWidth="max-w-[400px]">
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-3xl text-red-500">
            <i className="fa-solid fa-trash-can" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Xoá comment này?</h3>
          <p className="text-[13px] text-slate-400 mb-6">Hành động này không thể hoàn tác. Ảnh và dữ liệu sẽ bị xoá vĩnh viễn.</p>
          <div className="flex gap-2.5 justify-center">
            <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/[.08] border border-white/10 text-slate-400 cursor-pointer hover:bg-white/15 flex items-center gap-1.5">
              <i className="fa-solid fa-arrow-left" /> Huỷ
            </button>
            <button onClick={executeDelete} disabled={deleting} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-red-500 to-red-700 text-white border-none cursor-pointer hover:shadow-md flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {deleting ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Đang xoá...</> : <><i className="fa-solid fa-trash-can" /> Xoá</>}
            </button>
          </div>
        </div>
      </DarkModal>
    </div>
  );
}

function StatCard({ icon, iconBg, value, label }) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[.02] border border-white/[.08] rounded-[14px] p-5 flex items-center gap-3.5 transition-all hover:border-white/15 hover:-translate-y-0.5">
      <div className={`w-12 h-12 rounded-xl ${iconBg} text-white flex items-center justify-center text-xl shrink-0`}>
        <i className={`fa-solid ${icon}`} />
      </div>
      <div>
        <div className="text-3xl font-extrabold text-white">{value}</div>
        <div className="text-xs text-slate-400 font-medium mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function FeedbackCard({ fb, onView, onDelete }) {
  const role = fb.role || 'Unknown';
  const roleClass = role === 'Head' ? 'bg-gradient-to-br from-red-500 to-red-700' : role === 'Staff' ? 'bg-gradient-to-br from-violet-500 to-violet-700' : 'bg-white/10';
  const imageUrl = fb.image_key ? APP_CONFIG.workerUrl + '/image/' + fb.image_key : '';
  const area = fb.selected_area ? `x:${fb.selected_area.xPct?.toFixed(1)}% y:${fb.selected_area.yPct?.toFixed(1)}%` : 'N/A';

  return (
    <div onClick={onView} className="bg-gradient-to-br from-white/5 to-white/[.02] border border-white/[.08] rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-blue-500/30 hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(0,0,0,.3)]">
      <div className="w-full h-[180px] border-b border-white/[.08] bg-slate-800 flex items-center justify-center text-slate-600 text-sm overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Screenshot" className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <><i className="fa-regular fa-image" /> Không có ảnh</>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className={`py-1 px-2.5 rounded-md text-[11px] font-bold text-white uppercase tracking-wide ${roleClass}`}>
            <i className={`fa-solid ${role === 'Head' ? 'fa-crown' : 'fa-user-tie'}`} /> {role}
          </span>
          <span className="text-[11px] text-slate-600"><i className="fa-regular fa-clock" /> {formatDate(fb.timestamp)}</span>
        </div>
        <div className="text-sm text-slate-300 leading-relaxed line-clamp-3">{escapeHtml(fb.comment || 'Không có nội dung')}</div>
        <div className="mt-2.5 p-2 bg-white/[.04] rounded-lg text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
          <i className="fa-solid fa-vector-square" /> {area}
        </div>
        <div className="mt-2.5 flex justify-end">
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="bg-red-500/10 border border-red-500/20 text-red-400 py-1.5 px-3.5 rounded-lg cursor-pointer text-xs font-medium font-[Inter] transition-all hover:bg-red-500/25 hover:text-red-500 hover:border-red-500/40 flex items-center gap-1.5">
            <i className="fa-solid fa-trash-can" /> Xoá
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailMeta({ icon, label, value, mono }) {
  return (
    <div className="bg-white/[.04] p-3 rounded-xl border border-white/[.06]">
      <div className="text-[11px] text-slate-500 font-semibold mb-1"><i className={`fa-solid ${icon}`} /> {label}</div>
      <div className={`text-[13px] text-slate-200 font-medium ${mono ? 'font-mono text-xs' : ''}`}>{value}</div>
    </div>
  );
}
