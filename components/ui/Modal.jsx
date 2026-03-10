'use client';

export default function Modal({ isOpen, onClose, children, maxWidth = 'max-w-[480px]' }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className={`bg-white rounded-2xl w-full ${maxWidth} shadow-2xl overflow-hidden animate-modal-in`}>
        {children}
      </div>
    </div>
  );
}

export function DarkModal({ isOpen, onClose, children, maxWidth = 'max-w-[700px]' }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-lg flex items-center justify-center p-5"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className={`bg-slate-800 border border-white/10 rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto shadow-2xl animate-modal-in`}>
        {children}
      </div>
    </div>
  );
}
