import React, { useEffect, useState } from 'react';
import Turnstile from 'react-turnstile';

export default function Login({
  currentPage,
  setCurrentPage,
  authStep,
  setAuthStep,
  captchaChecked,
  setCaptchaChecked,
  otpCode,
  pinCode,
  handleOtpChange,
  handlePinChange,
  logoResmi
}) {
  if (currentPage !== 'auth') return null;

  // 🌟 LOGIKA BARU: Membaca parameter URL (?ref=KODE) otomatis saat aplikasi dibuka
  const [referralOtomatis, setReferralOtomatis] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setReferralOtomatis(refCode.toUpperCase());
      setIsLocked(true); // Kunci kolom agar tidak bisa diedit calon anggota
    }
  }, []);

  const handlePiLogin = async () => {
    try {
      if (typeof window.Pi !== 'undefined') {
        const scopes = ['username'];
        window.Pi.authenticate(scopes, function(auth) {
          alert("Selamat datang, @" + auth.user.username);
          setCurrentPage('home');
        }, function(error) {
          alert("Gagal masuk dengan Pi Network.");
        });
      } else {
        alert("Akses Web3 Terdeteksi! Mohon buka aplikasi Bali Pioneer System langsung di dalam PI BROWSER Anda.");
        setCurrentPage('home');
      }
    } catch (err) {
      setCurrentPage('home');
    }
  };

  const LogoKomunitas = () => (
    <div className="w-28 h-28 mx-auto mb-3 flex items-center justify-center">
      <img src={logoResmi} alt="Logo" className="w-full h-full object-contain" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4" style={{ fontFamily: 'sans-serif' }}>
      <div className="text-center mb-6">
        <LogoKomunitas />
        <h1 className="text-xl font-bold tracking-wider text-amber-400">BALI PIONEER SYSTEM</h1>
        <p className="text-[11px] text-slate-400 mt-0.5">Sistem Super-App Komunitas Pionir</p>
      </div>

      <div className="w-full max-w-sm bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
        
        {authStep === 'login' && (
          <div>
            <h2 className="text-sm font-semibold text-center mb-4 text-slate-200">Masuk ke Akun Anda</h2>
            <button onClick={handlePiLogin} className="w-full bg-purple-700 hover:bg-purple-600 active:scale-95 transition p-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 mb-4 border border-purple-500 shadow-md">
              <span className="w-4 h-4 bg-amber-400 text-purple-900 rounded-full flex items-center justify-center font-bold text-[10px]">π</span>
              Masuk dengan Akun Pi Network
            </button>
            <div className="flex items-center my-4 text-slate-500 text-[10px]">
              <div className="flex-1 h-px bg-slate-700"></div>
              <span className="px-2">ATAU LOGIN UMUM</span>
              <div className="flex-1 h-px bg-slate-700"></div>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Email / No Telepon" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none" />
              <input type="password" placeholder="Kata Sandi" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none" />
              <button onClick={() => setCurrentPage('home')} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-2.5 rounded-xl text-xs mt-2 transition">Masuk Sekarang</button>
            </div>
            <p className="text-center text-[11px] text-slate-400 mt-5">Belum punya akun? <span onClick={() => setAuthStep('register')} className="text-amber-400 font-semibold cursor-pointer hover:underline">Daftar disini</span></p>
          </div>
        )}
                        {authStep === 'register' && (
          <div>
            <h2 className="text-sm font-semibold text-center mb-4 text-slate-200">Pendaftaran Anggota</h2>
            <button onClick={handlePiLogin} className="w-full bg-purple-700 hover:bg-purple-600 active:scale-95 transition p-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 mb-4 border border-purple-500">
              <span className="w-4 h-4 bg-amber-400 text-purple-900 rounded-full flex items-center justify-center font-bold text-[10px]">π</span>
              Daftar dengan Akun Pi Network
            </button>
            <div className="flex items-center my-4 text-slate-500 text-[10px]">
              <div className="flex-1 h-px bg-slate-700"></div>
              <span className="px-2">ATAU DAFTAR UMUM</span>
              <div className="flex-1 h-px bg-slate-700"></div>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Nama Lengkap Sesuai KTP" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none" />
              <input type="text" placeholder="Email / No Telepon Aktif" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none" />
              <input type="password" placeholder="Kata Sandi Baru" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none" />
              
              {/* 🌟 BARU: KOLOM INPUT REFERRAL PINTAR DENGAN PENGUNCI OTOMATIS */}
              <div>
                <label className="text-[9px] text-slate-500 block mb-1 uppercase font-bold tracking-wider">Kode Upline / Referral (Opsional)</label>
                <input 
                  type="text" 
                  placeholder="Masukkan Kode Referral Jika Ada" 
                  value={referralOtomatis}
                  onChange={(e) => !isLocked && setReferralOtomatis(e.target.value.toUpperCase())}
                  disabled={isLocked}
                  className={`w-full border p-2 rounded-xl text-xs font-mono font-bold tracking-widest ${isLocked ? 'bg-slate-950 border-amber-500/30 text-amber-400 cursor-not-allowed shadow-inner' : 'bg-slate-900 border-slate-700 text-white focus:outline-none'}`} 
                />
                {isLocked && <span className="text-[8px] text-amber-500/60 block mt-1 leading-none">✓ Kode Upline Terkunci dari Tautan Undangan</span>}
              </div>

              <div className="flex justify-center my-2 p-1 bg-transparent border-none shadow-none">
                <Turnstile
                  sitekey="0x4AAAAAAD2ZyidOeSifvBGn"
                  options={{ theme: 'dark' }}
                  onVerify={(token) => { if (token) setCaptchaChecked(true); }}
                  onError={() => setCaptchaChecked(false)}
                  onExpire={() => setCaptchaChecked(false)}
                />
              </div>

              <button disabled={!captchaChecked} onClick={() => setAuthStep('otp')} className={`w-full p-2.5 rounded-xl font-bold text-xs mt-1 transition ${captchaChecked ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>Lanjutkan Pendaftaran</button>
            </div>
            <p className="text-center text-[11px] text-slate-400 mt-5">Sudah punya akun? <span onClick={() => setAuthStep('login')} className="text-amber-400 font-semibold cursor-pointer hover:underline">Login disini</span></p>
          </div>
        )}

        {authStep === 'otp' && (
          <div className="text-center">
            <h2 className="text-sm font-semibold mb-2 text-slate-200">Masukkan Kode Verifikasi</h2>
            <p className="text-[11px] text-slate-400 px-4 mb-4">Kode keamanan telah dikirim. Masukkan 6 digit kode di bawah ini:</p>
            <div className="flex justify-center gap-1.5 mb-5">
              {otpCode.map((data, index) => (
                <input key={index} id={`otp-${index}`} type="text" maxLength="1" value={data} onChange={(e) => handleOtpChange(index, e.target.value)} className="w-9 h-9 bg-slate-900 border border-slate-600 text-center text-sm font-bold text-amber-400 rounded-lg focus:outline-none" />
              ))}
            </div>
            <button onClick={() => setAuthStep('pin')} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold p-2.5 rounded-xl text-xs shadow-md">Verifikasi & Lanjutkan</button>
          </div>
        )}

        {authStep === 'pin' && (
          <div className="text-center">
            <div className="mb-2"><LogoKomunitas /></div>
            <h2 className="text-sm font-semibold mb-1 text-slate-200">Buat PIN 6 Angka</h2>
            <p className="text-[11px] text-slate-400 px-4 mb-4">Gunakan PIN ini untuk mengamankan setiap transaksi fintech Anda.</p>
            <div className="flex justify-center gap-1.5 mb-5">
              {pinCode.map((data, index) => (
                <input key={index} id={`pin-${index}`} type="password" maxLength="1" value={data} onChange={(e) => handlePinChange(index, e.target.value)} className="w-9 h-9 bg-slate-900 border border-slate-600 text-center text-sm font-bold text-white rounded-lg focus:outline-none" />
              ))}
            </div>
            <button onClick={() => setCurrentPage('home')} className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-bold p-2.5 rounded-xl text-xs shadow-md">Selesaikan & Masuk Aplikasi</button>
          </div>
        )}
      </div>
    </div>
  );
                  }
