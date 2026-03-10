'use client';

import { useState, useEffect } from 'react';

export default function AuthGate({ title, subtitle, codes, onAuth, icon = 'fa-lock', buttonColor = 'from-blue-500 to-blue-700', placeholder = 'Nhập mã truy cập...', buttonText = 'Xác nhận' }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check saved session
    const savedRole = sessionStorage.getItem('auth_role');
    if (savedRole && Object.values(codes).includes(savedRole)) {
      onAuth(savedRole);
      setIsVisible(false);
    }
  }, [codes, onAuth]);

  const verify = () => {
    const upperCode = code.trim().toUpperCase();
    if (codes[upperCode]) {
      const role = codes[upperCode];
      sessionStorage.setItem('auth_role', role);
      sessionStorage.setItem('auth_code', upperCode);
      onAuth(role);
      setIsVisible(false);
    } else {
      setError('Mã không hợp lệ. Vui lòng thử lại.');
      setTimeout(() => setError(''), 2000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-5">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 w-full max-w-[400px] text-center animate-auth-in">
        <div className={`w-[72px] h-[72px] rounded-full bg-gradient-to-br ${buttonColor} flex items-center justify-center mx-auto mb-5 text-3xl text-white shadow-lg`}>
          <i className={`fa-solid ${icon}`} />
        </div>
        <h2 className="text-white text-[22px] font-bold mb-1.5">{title}</h2>
        <p className="text-white/50 text-[13px] mb-6">{subtitle}</p>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && verify()}
          className={`w-full py-3.5 px-[18px] bg-white/[.07] border-[1.5px] rounded-xl text-white text-base font-semibold text-center tracking-[3px] transition-all focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,.2)] focus:bg-white/10 placeholder:text-white/25 placeholder:tracking-[1px] placeholder:font-normal ${
            error ? 'border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,.2)] animate-shake' : 'border-white/15'
          }`}
          placeholder={placeholder}
          autoComplete="off"
        />
        <button
          onClick={verify}
          className={`w-full mt-4 py-3.5 bg-gradient-to-br ${buttonColor} text-white border-none rounded-xl text-[15px] font-semibold cursor-pointer transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2`}
        >
          <i className="fa-solid fa-arrow-right-to-bracket" /> {buttonText}
        </button>
        {error && <p className="text-red-500 text-xs mt-2.5 font-medium">{error}</p>}
      </div>
    </div>
  );
}
