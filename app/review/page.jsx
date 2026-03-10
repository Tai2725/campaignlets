'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import AuthGate from '@/components/ui/AuthGate';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import Modal from '@/components/ui/Modal';
import { APP_CONFIG } from '@/lib/config';
import { escapeHtml } from '@/lib/helpers';

export default function ReviewPage() {
  return (
    <ToastProvider>
      <ReviewApp />
    </ToastProvider>
  );
}

function ReviewApp() {
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState(null);

  const handleAuth = useCallback((r) => {
    setRole(r);
    setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <AuthGate
        title="Xác thực truy cập"
        subtitle="Nhập mã được cung cấp để tiếp tục"
        codes={APP_CONFIG.authCodes}
        onAuth={handleAuth}
        icon="fa-lock"
        buttonColor="from-blue-500 to-blue-700"
      />
    );
  }

  return <ReviewTool role={role} />;
}

function ReviewTool({ role }) {
  const showToast = useToast();
  const iframeRef = useRef(null);
  const overlayRef = useRef(null);
  const selRectRef = useRef(null);

  const [annotationMode, setAnnotationMode] = useState(false);
  const [notesVisible, setNotesVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [sending, setSending] = useState(false);

  const drawState = useRef({ isDrawing: false, vpStart: { x: 0, y: 0 }, vpEnd: { x: 0, y: 0 }, pctRect: {}, capturedBlob: null });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load existing notes when iframe loads
  const onIframeLoad = useCallback(async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    // Inject styles
    if (!doc.getElementById('rv-styles')) {
      const s = doc.createElement('style');
      s.id = 'rv-styles';
      s.textContent = `
        .rv-marker{position:absolute;border:2px solid #ef4444;border-radius:4px;pointer-events:none;background:rgba(239,68,68,.06);z-index:9000;transition:opacity .3s}
        .rv-marker.hidden{opacity:0;pointer-events:none!important}
        .rv-badge{position:absolute;top:-12px;right:4px;background:#ef4444;color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;cursor:pointer;pointer-events:auto;white-space:nowrap;box-shadow:0 2px 8px rgba(239,68,68,.4);display:flex;align-items:center;gap:4px;font-family:'Inter',sans-serif;z-index:9001;transition:transform .15s}
        .rv-badge:hover{transform:scale(1.1)}
        .rv-popup{position:absolute;top:calc(100% + 8px);left:0;background:#fff;border-radius:12px;padding:14px 16px;min-width:200px;max-width:300px;box-shadow:0 8px 32px rgba(0,0,0,.18);font-family:'Inter',sans-serif;font-size:13px;color:#1f2937;z-index:9002;pointer-events:auto;display:none;border:1px solid #e5e7eb;line-height:1.5;word-break:break-word}
        .rv-popup.show{display:block;animation:rv-pop .2s ease-out}
        @keyframes rv-pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .rv-popup-header{font-weight:700;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;display:flex;align-items:center;gap:4px}
        .rv-popup-time{font-size:11px;color:#9ca3af;margin-top:8px}
        .rv-popup-close{position:absolute;top:8px;right:10px;background:none;border:none;cursor:pointer;color:#9ca3af;font-size:16px;padding:4px;line-height:1}
        .rv-popup-close:hover{color:#111}
      `;
      doc.head.appendChild(s);
    }
    if (!doc.querySelector('link[href*="font-awesome"]')) {
      const fa = doc.createElement('link');
      fa.rel = 'stylesheet';
      fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      doc.head.appendChild(fa);
    }

    // Load existing notes (filtered by role)
    try {
      const res = await fetch(APP_CONFIG.workerUrl + '/list');
      if (res.ok) {
        const data = await res.json();
        if (data.feedbacks?.length > 0) {
          // Staff chỉ thấy note của Staff, Head thấy cả Staff + Head
          const visible = data.feedbacks.filter(fb => {
            if (role === 'Head') return true; // Head thấy tất cả
            return fb.role === role;           // Staff chỉ thấy của mình
          });
          visible.forEach(fb => addMarker(fb));
          showToast(`Đã tải ${visible.length} ghi chú`, 'success');
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMarker = (data) => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    const a = data.selected_area;
    if (!a || typeof a.xPct === 'undefined') return;
    if (getComputedStyle(doc.body).position === 'static') doc.body.style.position = 'relative';

    const marker = doc.createElement('div');
    marker.className = 'rv-marker' + (notesVisible ? '' : ' hidden');
    marker.style.left = a.xPct + '%';
    marker.style.top = a.yPct + '%';
    marker.style.width = a.wPct + '%';
    marker.style.height = a.hPct + '%';

    const badge = doc.createElement('div');
    badge.className = 'rv-badge';
    const roleLabel = data.role ? ` (${data.role})` : '';
    badge.innerHTML = '<i class="fa-solid fa-comment"></i>' + roleLabel;
    marker.appendChild(badge);

    const popup = doc.createElement('div');
    popup.className = 'rv-popup';
    const time = data.timestamp ? new Date(data.timestamp).toLocaleString('vi-VN') : '';
    popup.innerHTML = `
      <button class="rv-popup-close" title="Đóng">&times;</button>
      <div class="rv-popup-header"><i class="fa-solid fa-comment-dots"></i> Yêu cầu chỉnh sửa</div>
      <div>${escapeHtml(data.comment)}</div>
      <div class="rv-popup-time"><i class="fa-regular fa-clock"></i> ${time}</div>
    `;
    marker.appendChild(popup);

    badge.addEventListener('click', e => {
      e.stopPropagation();
      doc.querySelectorAll('.rv-popup.show').forEach(p => { if (p !== popup) p.classList.remove('show'); });
      popup.classList.toggle('show');
    });
    popup.querySelector('.rv-popup-close').addEventListener('click', e => { e.stopPropagation(); popup.classList.remove('show'); });
    doc.body.appendChild(marker);
  };

  const getDocDims = () => {
    const doc = iframeRef.current?.contentDocument;
    return { w: doc?.documentElement.scrollWidth || 1, h: doc?.documentElement.scrollHeight || 1 };
  };

  const viewportToPct = (vx, vy) => {
    const frameRect = iframeRef.current.getBoundingClientRect();
    const win = iframeRef.current.contentWindow;
    const dims = getDocDims();
    const contentX = vx - frameRect.left + (win.scrollX || 0);
    const contentY = vy - frameRect.top + (win.scrollY || 0);
    return { xPct: (contentX / dims.w) * 100, yPct: (contentY / dims.h) * 100 };
  };

  const toggleNotes = () => {
    const newVal = !notesVisible;
    setNotesVisible(newVal);
    const doc = iframeRef.current?.contentDocument;
    if (doc) doc.querySelectorAll('.rv-marker').forEach(m => m.classList.toggle('hidden', !newVal));
  };

  // Mouse events
  const onPointerDown = (e) => {
    if (!annotationMode) return;
    const cx = e.clientX || e.touches?.[0]?.clientX;
    const cy = e.clientY || e.touches?.[0]?.clientY;
    if (!cx || !cy) return;
    e.preventDefault?.();
    drawState.current.isDrawing = true;
    drawState.current.vpStart = { x: cx, y: cy };
    const rect = selRectRef.current;
    if (rect) {
      rect.style.left = cx + 'px';
      rect.style.top = cy + 'px';
      rect.style.width = '0';
      rect.style.height = '0';
      rect.style.display = 'block';
    }
  };

  const onPointerMove = (e) => {
    if (!drawState.current.isDrawing) return;
    e.preventDefault?.();
    const cx = e.clientX || e.touches?.[0]?.clientX;
    const cy = e.clientY || e.touches?.[0]?.clientY;
    if (!cx || !cy) return;
    drawState.current.vpEnd = { x: cx, y: cy };
    const { vpStart } = drawState.current;
    const rect = selRectRef.current;
    if (rect) {
      rect.style.left = Math.min(vpStart.x, cx) + 'px';
      rect.style.top = Math.min(vpStart.y, cy) + 'px';
      rect.style.width = Math.abs(cx - vpStart.x) + 'px';
      rect.style.height = Math.abs(cy - vpStart.y) + 'px';
    }
  };

  const onPointerUp = async () => {
    if (!drawState.current.isDrawing) return;
    drawState.current.isDrawing = false;
    const { vpStart, vpEnd } = drawState.current;
    const vx = Math.min(vpStart.x, vpEnd.x), vy = Math.min(vpStart.y, vpEnd.y);
    const vw = Math.abs(vpEnd.x - vpStart.x), vh = Math.abs(vpEnd.y - vpStart.y);
    const rect = selRectRef.current;

    if (vw < 20 || vh < 20) { if (rect) rect.style.display = 'none'; return; }

    const topLeft = viewportToPct(vx, vy);
    const dims = getDocDims();
    drawState.current.pctRect = {
      xPct: topLeft.xPct, yPct: topLeft.yPct,
      wPct: (vw / dims.w) * 100, hPct: (vh / dims.h) * 100,
    };

    setAnnotationMode(false);
    if (rect) rect.style.display = 'none';

    // Capture screenshot
    try {
      const html2canvas = (await import('html2canvas')).default;
      const doc = iframeRef.current.contentDocument;
      const win = iframeRef.current.contentWindow;
      const fr = iframeRef.current.getBoundingClientRect();
      const sx = win.scrollX || 0, sy = win.scrollY || 0;
      if (doc.fonts?.ready) await doc.fonts.ready;

      const canvas = await html2canvas(doc.body, {
        x: vx - fr.left + sx, y: vy - fr.top + sy, width: vw, height: vh,
        scrollX: -sx, scrollY: -sy,
        windowWidth: doc.documentElement.scrollWidth,
        windowHeight: doc.documentElement.scrollHeight,
        useCORS: true, scale: window.devicePixelRatio || 1, logging: false,
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement('style');
          style.textContent = '* { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important; }';
          clonedDoc.head.appendChild(style);
        },
      });

      canvas.toBlob(blob => {
        drawState.current.capturedBlob = blob;
        setPreviewUrl(URL.createObjectURL(blob));
        setCommentText('');
        setCommentModal(true);
      }, 'image/png');
    } catch (err) {
      showToast('Lỗi chụp ảnh: ' + err.message, 'error');
    }
  };

  const sendFeedback = async () => {
    setSending(true);
    const text = commentText.trim();
    const { pctRect, capturedBlob } = drawState.current;

    const fd = new FormData();
    fd.append('image', capturedBlob, 'screenshot.png');
    fd.append('comment', text);
    fd.append('page_url', '/demo');
    fd.append('selected_area', JSON.stringify(pctRect));
    fd.append('timestamp', new Date().toISOString());
    fd.append('user_agent', navigator.userAgent);
    fd.append('role', role || 'Unknown');

    try {
      const res = await fetch(APP_CONFIG.workerUrl + '/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Server ' + res.status);
      const data = await res.json();
      setConfirmModal(false);
      addMarker({ selected_area: pctRect, comment: text, timestamp: new Date().toISOString(), id: data.id, role });
      showToast('Đã gửi yêu cầu thành công!', 'success');
    } catch (err) {
      setConfirmModal(false);
      addMarker({ selected_area: pctRect, comment: text, timestamp: new Date().toISOString(), id: 'local-' + Date.now(), role });
      showToast('Lỗi server: ' + err.message, 'error');
    }
    drawState.current.capturedBlob = null;
    setSending(false);
  };

  // Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (confirmModal) setConfirmModal(false);
        else if (commentModal) setCommentModal(false);
        else if (annotationMode) setAnnotationMode(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [confirmModal, commentModal, annotationMode]);

  return (
    <div className="overflow-hidden h-screen w-screen bg-slate-900">
      {/* Top Banner (Desktop) */}
      <div className="fixed top-0 left-0 right-0 z-[200] bg-gradient-to-r from-blue-900 to-blue-500 text-white py-2.5 px-5 hidden md:flex items-center justify-between text-[13px] shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="bg-white/15 py-1 px-2.5 rounded-md font-semibold text-[11px] uppercase tracking-wide"><i className="fa-solid fa-pen-ruler" /> Review Mode</span>
          <span className={`py-1 px-2.5 rounded-md font-bold text-[11px] uppercase tracking-wide ${role === 'Head' ? 'bg-gradient-to-br from-red-500 to-red-700' : 'bg-gradient-to-br from-blue-500 to-blue-700'}`}>
            <i className="fa-solid fa-user-shield" /> {role}
          </span>
          <span className="text-white/80">
            {annotationMode ? 'Kéo thả chuột để chọn vùng cần review' : 'Chế độ xem — Nhấn nút để bắt đầu đánh dấu'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleNotes} className={`bg-white/15 border border-white/25 text-white py-1.5 px-3.5 rounded-lg cursor-pointer text-xs font-medium transition-all hover:bg-white/25 ${notesVisible ? 'bg-emerald-600 border-emerald-600' : ''}`}>
            <i className={`fa-solid ${notesVisible ? 'fa-eye' : 'fa-eye-slash'}`} /> {notesVisible ? 'Ẩn ghi chú' : 'Hiện ghi chú'}
          </button>
          <button onClick={() => setAnnotationMode(!annotationMode)} className={`bg-white/15 border border-white/25 text-white py-1.5 px-3.5 rounded-lg cursor-pointer text-xs font-medium transition-all hover:bg-white/25 ${annotationMode ? 'bg-red-500 border-red-500' : ''}`}>
            <i className="fa-solid fa-crosshairs" /> Đánh dấu vùng
          </button>
        </div>
      </div>

      {/* Iframe */}
      <iframe ref={iframeRef} src="/demo" className="w-full border-none block md:mt-11 md:h-[calc(100vh-44px)] h-full" onLoad={onIframeLoad} />

      {/* Overlay */}
      {annotationMode && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] cursor-crosshair"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        />
      )}

      {/* Selection Rectangle */}
      <div ref={selRectRef} className="fixed border-[2.5px] border-dashed border-red-500 bg-red-500/[.08] rounded z-[101] pointer-events-none shadow-[0_0_0_4px_rgba(239,68,68,.15)]" style={{ display: 'none' }} />

      {/* FABs (Mobile) */}
      <button onClick={toggleNotes} className={`fixed bottom-6 right-24 z-[300] w-12 h-12 rounded-full text-white border-none text-lg cursor-pointer shadow-lg md:hidden flex items-center justify-center transition-all ${notesVisible ? 'bg-gradient-to-br from-emerald-600 to-emerald-800' : 'bg-gradient-to-br from-gray-500 to-gray-600'}`}>
        <i className={`fa-solid ${notesVisible ? 'fa-eye' : 'fa-eye-slash'}`} />
      </button>
      <button onClick={() => setAnnotationMode(!annotationMode)} className={`fixed bottom-6 right-6 z-[300] w-[60px] h-[60px] rounded-full text-white border-none text-[22px] cursor-pointer shadow-lg md:hidden flex items-center justify-center transition-all ${annotationMode ? 'bg-gradient-to-br from-red-500 to-red-700 animate-fab-pulse' : 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_6px_24px_rgba(59,130,246,.5)]'}`}>
        <i className={`fa-solid ${annotationMode ? 'fa-xmark' : 'fa-pen-ruler'}`} />
      </button>

      {/* Comment Modal */}
      <Modal isOpen={commentModal} onClose={() => setCommentModal(false)}>
        <div className="p-5 pb-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <i className="fa-solid fa-comment-dots text-blue-500" /> Yêu cầu chỉnh sửa
          </h3>
          <p className="mt-1 text-[13px] text-gray-500">Mô tả vấn đề hoặc yêu cầu thay đổi cho vùng đã chọn</p>
        </div>
        <div className="p-5">
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Preview" className="w-full max-h-[180px] object-contain rounded-lg border border-gray-200 bg-gray-50 mb-4" />
          )}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5"><i className="fa-solid fa-pencil" /> Nội dung yêu cầu</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border-[1.5px] border-gray-300 rounded-xl p-3 text-sm font-[Inter] resize-y min-h-[100px] transition-all focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,.15)] text-gray-900 placeholder:text-gray-400"
              placeholder="VD: Sửa tiêu đề thành..., Đổi màu nền..."
              rows={4}
            />
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-2.5 justify-end">
          <button onClick={() => setCommentModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer bg-gray-100 text-gray-600 border-none hover:bg-gray-200 flex items-center gap-1.5">
            <i className="fa-solid fa-xmark" /> Hủy
          </button>
          <button onClick={() => { if (!commentText.trim()) return; setCommentModal(false); setConfirmModal(true); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none hover:shadow-md flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
            <i className="fa-solid fa-paper-plane" /> Gửi yêu cầu
          </button>
        </div>
      </Modal>

      {/* Confirm Modal */}
      <Modal isOpen={confirmModal} onClose={() => setConfirmModal(false)} maxWidth="max-w-[400px]">
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4 text-3xl text-blue-600">
            <i className="fa-solid fa-paper-plane" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Xác nhận gửi yêu cầu cho admin</h3>
          <p className="text-[13px] text-gray-500 mb-6">Ảnh chụp vùng đã chọn và nội dung yêu cầu sẽ được gửi đến admin để xử lý.</p>
          <div className="flex gap-2.5 justify-center">
            <button onClick={() => { setConfirmModal(false); setCommentModal(true); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer bg-gray-100 text-gray-600 border-none hover:bg-gray-200 flex items-center gap-1.5">
              <i className="fa-solid fa-arrow-left" /> Quay lại
            </button>
            <button onClick={sendFeedback} disabled={sending} className="px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none hover:shadow-md flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {sending ? <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Đang gửi...</> : <><i className="fa-solid fa-check" /> Xác nhận gửi</>}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
