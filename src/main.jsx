import React, { useState } from 'react';
import logoResmi from './Logo.png';
import Turnstile from 'react-turnstile';

export default function App() {
  const [currentPage, setCurrentPage] = useState('auth'); 
  const [authStep, setAuthStep] = useState('login'); 
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [pinCode, setPinCode] = useState(['', '', '', '', '', '']);
  const [activeTab, setActiveTab] = useState('home');

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handlePinChange = (index, value) => {
    if (isNaN(value)) return;
    let newPin = [...pinCode];
    newPin[index] = value;
    setPinCode(newPin);
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const LogoKomunitas = () => (
    <div className="w-28 h-28 mx-auto mb-3 flex items-center justify-center">
      <img src={logoResmi} alt="Logo Bali Pioneer System" className="w-full h-full object-contain" />
    </div>
  );

  const daftarIklan = [
    "Promo Anggota: Diskon Transaksi PPOB 5% khusus bulan ini!",
    "Event Bali Pioneer: Presale Token BPT Gelombang 1 Segera Dibuka!",
    "Gunakan Scan QRIS Komunitas, Bebas Biaya Admin Antar Merchant."
  ];
    if (currentPage === 'auth') {
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
              <button 
                onClick={() => setCurrentPage('home')}
                className="w-full bg-purple-700 hover:bg-purple-600 active:scale-95 transition p-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 mb-4 border border-purple-500 shadow-md"
              >
                <span className="w-4 h-4 bg-amber-400 text-purple-900 rounded-full flex items-center justify-center font-bold text-[10px]">π</span>
                Masuk dengan Akun Pi Network
              </button>
              <div className="flex items-center my-4 text-slate-500 text-[10px]">
                <div className="flex-1 h-px bg-slate-700"></div>
                <span className="px-2">ATAU LOGIN UMUM</span>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Email / No Telepon" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500" />
                <input type="password" placeholder="Kata Sandi" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500" />
                <button onClick={() => setCurrentPage('home')} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold p-2.5 rounded-xl text-xs mt-2 transition shadow-md">Masuk Sekarang</button>
              </div>
              <p className="text-center text-[11px] text-slate-400 mt-5">Belum punya akun? <span onClick={() => setAuthStep('register')} className="text-amber-400 font-semibold cursor-pointer hover:underline">Daftar disini</span></p>
            </div>
          )}

          {authStep === 'register' && (
            <div>
              <h2 className="text-sm font-semibold text-center mb-4 text-slate-200">Pendaftaran Anggota</h2>
              <button 
                onClick={() => setAuthStep('otp')}
                className="w-full bg-purple-700 hover:bg-purple-600 active:scale-95 transition p-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 mb-4 border border-purple-500"
              >
                <span className="w-4 h-4 bg-amber-400 text-purple-900 rounded-full flex items-center justify-center font-bold text-[10px]">π</span>
                Daftar dengan Akun Pi Network
              </button>
              <div className="flex items-center my-4 text-slate-500 text-[10px]">
                <div className="flex-1 h-px bg-slate-700"></div>
                <span className="px-2">ATAU DAFTAR UMUM</span>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>
              <div className="space-y-3">
                <input type="text" placeholder="Email / No Telepon" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500" />
                <input type="password" placeholder="Kata Sandi Baru" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500" />
                
                <div className="flex justify-center my-3 bg-slate-900/50 p-2 rounded-xl border border-slate-700/50">
                  <Turnstile
                    sitekey="0x4AAAAAAD2ZyidOeSifvBGn"
                    onVerify={(token) => {
                      if (token) setCaptchaChecked(true);
                    }}
                    onError={() => setCaptchaChecked(false)}
                    onExpire={() => setCaptchaChecked(false)}
                  />
                </div>

                <button disabled={!captchaChecked} onClick={() => setAuthStep('otp')} className={`w-full p-2.5 rounded-xl font-bold text-xs mt-2 transition shadow-md ${captchaChecked ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>Lanjutkan Pendaftaran</button>
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
                  <input key={index} id={`otp-${index}`} type="text" maxLength="1" value={data} onChange={(e) => handleOtpChange(index, e.target.value)} className="w-9 h-9 bg-slate-900 border border-slate-600 text-center text-sm font-bold text-amber-400 rounded-lg focus:outline-none focus:border-amber-400" />
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
                  <input key={index} id={`pin-${index}`} type="password" maxLength="1" value={data} onChange={(e) => handlePinChange(index, e.target.value)} className="w-9 h-9 bg-slate-900 border border-slate-600 text-center text-sm font-bold text-white rounded-lg focus:outline-none focus:border-amber-400" />
                ))}
              </div>
              <button onClick={() => setCurrentPage('home')} className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-bold p-2.5 rounded-xl text-xs shadow-md">Selesaikan & Masuk Aplikasi</button>
            </div>
          )}
        </div>
      </div>
    );
                    }
    // JIKA CURRENT PAGE === 'HOME' (HALAMAN UTAMA DASHBOARD & MULTI-TAB)
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 select-none flex flex-col" style={{ fontFamily: 'sans-serif' }}>
      
      {/* HEADER UTAMA APLIKASI */}
      <header className="bg-slate-900 border-b border-slate-800 p-3 sticky top-0 z-50 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center">
            <img src={logoResmi} alt="BPT" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-wide text-amber-400 uppercase">Bali Pioneer System</h1>
            <p className="text-[10px] text-slate-400 font-medium">Store & Marketplace</p>
          </div>
        </div>
        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">Store Active</span>
      </header>

      {/* 1. KONTEN UNTUK TAB HOME */}
      {activeTab === 'home' && (
        <div className="p-4 flex-1 space-y-4">
          <div className="w-full bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-4 text-center min-h-[90px] flex items-center justify-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[7px] font-bold px-2 py-0.5 rounded-bl-xl tracking-wider">EVENT / PROMO</div>
            <p className="text-[11px] text-amber-300 font-semibold max-w-xs animate-pulse">📢 {daftarIklan[Math.floor(Math.random() * daftarIklan.length)]}</p>
          </div>
          <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-95 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 tracking-wider">
            🔳 SCAN QRIS PEMBAYARAN
          </button>
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase font-bold text-amber-500 tracking-widest flex items-center gap-1">⭐ Toko Sponsor Utama</h3>
            <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3 flex gap-3 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500/20 text-amber-400 text-[7px] font-bold px-1.5 py-0.5 rounded-bl-lg">PREMIUM</div>
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-xl border border-slate-700">📱</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">Pioneer Gadget Bali (VIP)</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">Pusat gawai, laptop, dan aksesoris khusus Pionir</p>
                <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 font-bold px-1.5 py-0.2 rounded mt-1 inline-block">Menerima Rupiah / BPT</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">🏪 Lapak Komunitas (Diacak Otomatis)</h3>
            {[
              { nama: "Warung Kopi Pioneer Khas Kintamani", ikon: "☕", desc: "Sedia kopi hangat, bubuk kopi murni, dan camilan Bali" },
              { nama: "Jasa Cetak KTA Bali Mandiri", ikon: "🎨", desc: "Cetak kartu digital KTA fisik premium dan atribut BPT" },
              { nama: "Sembako Murah Pionir Sukses", ikon: "🌾", desc: "Beras, minyak goreng, gula pasir harga grosir anggota" },
              { nama: "Bengkel Motor Pioneer Jaya", ikon: "🔧", desc: "Service mesin, ganti oli, dan ban garansi bersahabat" }
            ].sort(() => Math.random() - 0.5).map((lapak, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 flex gap-3 hover:border-slate-700 transition duration-200">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-base border border-slate-700/50 shadow-inner">{lapak.ikon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 truncate">{lapak.nama}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{lapak.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-900 border border-dashed border-slate-800 rounded-xl py-2 text-center text-[8px] text-slate-600 tracking-widest mt-4 uppercase">
            Slot Iklan Penopang Kas Perusahaan (Adds Space)
          </div>
        </div>
      )}
            {/* 2. KONTEN UNTUK TAB PROFILE DENGAN KTA ELEGAN */}
      {activeTab === 'profile' && (
        <div className="p-4 flex-1 space-y-4 overflow-y-auto">
          <h2 className="text-sm font-bold text-center text-amber-400 tracking-wider uppercase mb-2">Profil Anggota BPT</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-lg">
            <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-3 border-2 border-amber-500/50 flex items-center justify-center overflow-hidden relative">
              <img src={logoResmi} alt="Avatar" className="w-full h-full object-contain opacity-40" />
              <span className="absolute text-[9px] text-slate-400 font-bold bg-slate-950/80 px-2 py-0.5 bottom-0 left-0 right-0">EDIT FOTO</span>
            </div>
            <h3 className="text-sm font-bold text-white">HARI SURYA WIJAYA</h3>
            <p className="text-[10px] text-slate-500">@cescplank</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-md"><div className="flex justify-between items-center mb-1"><span className="text-[10px] text-slate-400 font-medium">Status KYC</span><span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.2 rounded font-bold">LOLOS</span></div><button className="w-full bg-slate-800 text-[9px] text-slate-300 font-bold py-1.5 rounded-lg border border-slate-700">Lihat Berkas KTP</button></div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-md"><div className="flex justify-between items-center mb-1"><span className="text-[10px] text-slate-400 font-medium">Keamanan 2FA</span><span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.2 rounded font-bold">AKTIF</span></div><button className="w-full bg-red-500/10 text-[9px] text-red-400 font-bold py-1.5 rounded-lg border border-red-500/20">Nonaktifkan 2FA</button></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🏦 Rekening Pencairan Dana (Wajib Sesuai KTP)</h4>
            <div className="space-y-2">
              <input type="text" value="HARI SURYA WIJAYA" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-400 font-bold cursor-not-allowed" />
              <div className="grid grid-cols-2 gap-2"><input type="text" value="BANK BCA" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-400 font-bold cursor-not-allowed" /><input type="text" value="8420xxxxxx" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-400 font-bold cursor-not-allowed" /></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center"><h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🪪 Kartu Anggota Digital</h4><button className="text-[10px] text-amber-400 font-bold hover:underline">📥 Download Kartu</button></div>
            
            {/* TATA LETAK KTA PREMIUM TERBARU */}
            <div className="w-full bg-gradient-to-br from-[#0c192c] via-[#0f233c] to-[#091322] border border-amber-500/30 rounded-2xl p-5 shadow-2xl relative min-h-[220px] flex flex-col justify-between tracking-wide" style={{ borderRadius: '20px' }}>
              <div className="flex justify-between items-center w-full border-b border-slate-800/60 pb-3">
                <div className="flex items-center gap-3"><img src={logoResmi} alt="BPT" className="w-9 h-9 object-contain" /><div><h5 className="text-[9px] font-bold tracking-widest text-amber-500/80 uppercase leading-none">KARTU ANGGOTA DIGITAL</h5><h4 className="text-sm font-black tracking-wider text-white uppercase mt-1">BALI PIONEER COMMUNITY</h4></div></div>
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 text-[10px] font-extrabold px-3 py-1.5 rounded-xl tracking-widest shadow-lg uppercase border border-amber-300/30">VIP MEMBER</span>
              </div>
              <div className="mt-4 flex justify-between items-center w-full gap-4">
                <div className="space-y-3 flex-1">
                  <div><span className="text-[8px] text-slate-500 block uppercase font-extrabold tracking-widest leading-none">Nama Lengkap</span><span className="text-sm font-black text-white tracking-wide uppercase block mt-1">HARI SURYA WIJAYA</span></div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/40 w-full">
                    <div><span className="text-[8px] text-slate-500 block uppercase font-extrabold tracking-widest">Username Pi</span><span className="text-xs font-bold text-amber-400 mt-1 block">@harisurya</span></div>
                    <div><span className="text-[8px] text-slate-500 block uppercase font-extrabold tracking-widest">Wilayah</span><span className="text-[11px] font-bold text-slate-300 mt-1 block">Denpasar Timur</span></div>
                  </div>
                </div>
                <div className="w-20 h-20 bg-white rounded-xl p-2 flex flex-col items-center justify-between border-2 border-amber-500/30 shadow-2xl shrink-0">
                  <div className="w-full h-12 bg-slate-950 rounded-lg flex flex-col items-center justify-center p-1 gap-0.5">
                    <div className="w-full flex justify-between gap-0.5"><div className="w-3 h-3 bg-white"></div><div className="w-1 h-1 bg-white"></div><div className="w-3 h-3 bg-white"></div></div>
                    <div className="w-full flex justify-between gap-0.5"><div className="w-1.5 h-1.5 bg-white"></div><div className="w-3 h-3 bg-white"></div><div className="w-1.5 h-1.5 bg-white"></div></div>
                  </div>
                  <span className="text-[8px] font-black text-slate-900 tracking-wider lowercase truncate w-full text-center">cescplank</span>
                </div>
              </div>
                            <div className="flex justify-between items-end mt-4 border-t border-slate-800/60 pt-3 w-full text-[9px]">
                <div className="text-slate-500 font-extrabold tracking-widest uppercase">STATUS: <span className="text-green-400 font-black">● AKTIF</span></div>
                <div className="text-slate-500 font-extrabold tracking-widest uppercase">JOINED: <span className="text-slate-300 font-black">2024</span></div>
                <span className="font-black tracking-widest text-amber-500/40 uppercase">BALI PIONEER SYSTEM</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md grid grid-cols-2 gap-4">
            <div><h5 className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Upline Anda</h5><p className="text-xs font-bold text-slate-200">@cescplank</p></div>
            <div><h5 className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Kode Referral Anda</h5><div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg p-1.5 px-2.5"><span className="text-xs font-bold text-amber-400 tracking-wider">BPI168</span><span className="text-[9px] text-slate-500 font-bold cursor-pointer">SALIN</span></div></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-2">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">⚙️ Manajemen Lapak Toko</h4>
            <button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/60 text-slate-200 text-xs py-2.5 px-3 rounded-xl flex items-center justify-between font-semibold"><span>🏪 Pengisian Data & Kelola Produk Toko Anda</span><span>⚙️</span></button>
          </div>
        </div>
      )}
      
      {/* 3. KONTEN UNTUK TAB FINANCE (MULTISALDO & TRANSFER) */}
      {activeTab === 'finance' && (
        <div className="p-4 flex-1 space-y-4 overflow-y-auto">
          <h2 className="text-sm font-bold text-center text-amber-400 tracking-wider uppercase mb-2">Finance Dashboard</h2>

          {/* KOTAK INFORMASI MULTI-SALDO MULTI-ASET */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0e1e38] border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
              <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase">Saldo Rupiah Utama</span>
              <span className="text-sm font-black text-green-400 tracking-wide">Rp 2.540.000</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
                <span className="text-[8px] text-slate-500 block uppercase font-bold">BPT Poin (Offchain)</span>
                <span className="font-bold text-amber-400">⚡ 15.420,50 Poin</span>
              </div>
              <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
                <span className="text-[8px] text-slate-500 block uppercase font-bold">Saldo BPT (Onchain)</span>
                <span className="font-bold text-amber-500">🪙 2.500 BPT</span>
              </div>
            </div>
            <div className="bg-purple-950/20 p-2 rounded-xl border border-purple-500/20 flex justify-between items-center text-[11px]">
              <div>
                <span className="text-[8px] text-purple-400 block uppercase font-bold">Saldo Pi Network</span>
                <span className="font-bold text-purple-300">π 314,15 Pi</span>
              </div>
              <a href="https://minepi.com" target="_blank" rel="noreferrer" className="text-[9px] bg-purple-700 text-white font-black px-2 py-1 rounded-lg">Pi Browser</a>
            </div>
          </div>

          {/* TOMBOL AKSI UTAMA KEWANGAN (TRANSFER & TOP UP) */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-amber-500 text-slate-950 font-black p-2.5 rounded-xl text-xs tracking-wider">
              ➕ TOP UP SALDO
            </button>
            <button className="bg-slate-900 border border-slate-700 text-amber-400 font-black p-2.5 rounded-xl text-xs tracking-wider">
              💸 KIRIM RUPIAH
            </button>
          </div>

          {/* SIMULASI FORM TRANSFER AMAN (CEK NAMA OTOMATIS) */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">📤 Transfer Rupiah Antar Pengguna Aman</h4>
            <div className="space-y-2">
              <div>
                <label className="text-[9px] text-slate-500 block mb-0.5">Username Tujuan</label>
                <input type="text" value="@harisurya" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold" />
              </div>
              <div>
                <label className="text-[9px] text-slate-500 block mb-0.5">Nama Asli Penerima (Validasi Otomatis)</label>
                <div className="w-full bg-green-500/5 border border-green-500/20 text-green-400 rounded-lg p-2 text-xs font-bold">
                  ✓ HARI SURYA WIJAYA (Sesuai KYC)
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Nominal Transfer (Min Rp10k)</label>
                  <input type="text" value="Rp 50.000" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold" />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 block mb-0.5">Biaya Admin Bank / WD</label>
                  <input type="text" value="Rp 10.000" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-red-400 font-bold cursor-not-allowed" />
                </div>
              </div>
              <button className="w-full bg-green-500 text-slate-950 font-black p-2.5 rounded-xl text-xs mt-1">KONFIRMASI KIRIM SEKARANG</button>
            </div>
          </div>
                              {/* GRID MENU UTAMA LAYANAN PPOB NASIONAL */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">⚡ Layanan PPOB Nasional Resmi</h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: "Isi Pulsa", ikon: "📱", warna: "from-blue-600/20 to-cyan-600/20 border-blue-500/20" },
                { label: "Token PLN", ikon: "💡", warna: "from-amber-600/20 to-orange-600/20 border-amber-500/20" },
                { label: "Tagihan PDAM", ikon: "💧", warna: "from-teal-600/20 to-emerald-600/20 border-teal-500/20" },
                { label: "BPJS Sehat", ikon: "🛡️", warna: "from-red-600/20 to-rose-600/20 border-red-500/20" }
              ].map((ppob, i) => (
                <div key={i} className={`bg-gradient-to-b ${ppob.warna} border rounded-xl p-2 flex flex-col items-center justify-center shadow-sm`}>
                  <span className="text-lg mb-1">{ppob.ikon}</span>
                  <span className="text-[9px] font-bold text-slate-200 tracking-tight leading-tight">{ppob.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM ISI NOMOR DAN KONFIRMASI PEMBELIAN PPOB */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-md space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[8px] text-slate-500 block uppercase font-bold">Nomor Pelanggan / HP</label>
                <input type="text" placeholder="0812xxxx / 5321xxxx" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold" />
              </div>
              <div>
                <label className="text-[8px] text-slate-500 block uppercase font-bold">Nominal / Pilih Paket</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-400 font-bold focus:outline-none">
                  <option>Pulsa Telkomsel Rp 10.000</option>
                  <option>Token Listrik PLN Rp 50.000</option>
                  <option>Tagihan Air PDAM Cek</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-amber-500 text-slate-950 font-black p-2 rounded-xl text-[11px] tracking-wider">PROSES TRANSAKSI PPOB</button>
          </div>

        </div>
      )}

      {/* 4. KONTEN UNTUK TAB WEB3 (MINING, STAKING & TRANSPARANSI) */}
      {activeTab === 'web3' && (
        <div className="p-4 flex-1 space-y-4 overflow-y-auto">
          <h2 className="text-sm font-bold text-center text-amber-400 tracking-wider uppercase mb-2">Web3 Blockchain Portal</h2>

          {/* INFORMASI SALDO TERKUNCI & BURN POLICY */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Saldo BPT Terkunci (Lock)</span>
              <span className="text-sm font-black text-amber-500">12.500 BPT</span>
            </div>
            <p className="text-[9px] text-slate-500 leading-relaxed">
              * Saldo presale dikunci 12 bulan (terbuka 10% di bulan ke-13). Hasil mining harian dialokasikan 15% ke saldo terkunci ini, dan 85% sisanya otomatis hangus dibakar (burn) secara permanen hingga batas pasokan 40% tercapai.
            </p>
          </div>

          {/* FITUR STAKING RATE KECEPATAN MINING */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🔒 Staking Kontrak (Boost Kecepatan Mining)</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[8px] text-slate-500 block font-bold mb-1">ALOKASI SALDO</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold text-[11px] focus:outline-none">
                  <option>25% Saldo</option>
                  <option>50% Saldo</option>
                  <option>75% Saldo</option>
                  <option>90% Saldo</option>
                  <option>100% Saldo</option>
                </select>
              </div>
              <div>
                <label className="text-[8px] text-slate-500 block font-bold mb-1">MASA PENGUNCIAN</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-bold text-[11px] focus:outline-none">
                  <option>6 Bulan (1.2x Boost)</option>
                  <option>12 Bulan (1.5x Boost)</option>
                  <option>2 Tahun (2.0x Boost)</option>
                  <option>3 Tahun (3.0x Boost)</option>
                  <option>5 Tahun (5.0x Boost)</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-amber-500 text-slate-950 font-black p-2 rounded-xl text-xs shadow-md tracking-wider">KUNCI KONTRAK STAKING</button>
          </div>

          {/* TOMBOL SWAP POINT OFFCHAIN KE ONCHAIN */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-2">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🔄 Swap BPT Poin ke Token Onchain</h4>
              <span className="text-[8px] text-green-400 font-bold border border-green-500/20 bg-green-500/5 px-1.5 py-0.2 rounded">Syarat: Lolos KYC</span>
            </div>
            <p className="text-[9px] text-slate-500 leading-tight mb-2">
              * Minimal melakukan 3x transaksi berturut-turut dalam 3 bulan terakhir atau bulan berjalan untuk melakukan swap bulanan resmi.
            </p>
            <button className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 border border-purple-500/30 text-white font-black p-2.5 rounded-xl text-xs shadow-md">
              EKSEKUSI SWAP TOKEN
            </button>
          </div>
          
          {/* DASHBOARD TRANSPARANSI DATA PERUSAHAAN (FUTURISTIK) */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-2.5">
            <h4 className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">📊 Transparansi Finansial Perusahaan</h4>
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Total Token di Bursa Luar (Liquidity)</span>
                <span className="font-bold text-white">4.500.000 BPT</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Dana Penopang Abadi (40% Profit Perusahaan)</span>
                <span className="font-bold text-green-400">Rp 1.450.200.000 / USDT</span>
              </div>
              <div className="flex justify-between pb-0.5">
                <span className="text-slate-400">Total Hasil Mining Hangus (85% Burn/Bulan)</span>
                <span className="font-bold text-red-400">845.200 BPT (Reset Bulanan)</span>
              </div>
            </div>
          </div>

          {/* TOMBOL UTAMA MINING HARIAN KLIK PETIR DENGAN RUNNING DESIMAL */}
          <div className="bg-gradient-to-b from-slate-900 to-amber-950/20 border border-amber-500/20 rounded-2xl p-4 text-center space-y-3 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-amber-500/10 text-amber-400 text-[7px] font-bold px-2 py-0.5 rounded-br-lg tracking-wider">MINING PROTOCOL</div>
            <div>
              <span className="text-[8px] text-slate-500 uppercase font-extrabold tracking-widest block">Hasil Penambangan Hari Ini</span>
              {/* Angka berjalan simulasi desimal crypto */}
              <span className="text-lg font-black text-amber-400 font-mono tracking-wide block mt-0.5">0.41582910 BPT</span>
            </div>
            
            {/* Tombol Animasi Petir */}
            <button className="w-32 h-32 bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-90 duration-150 rounded-full mx-auto flex flex-col items-center justify-center border-4 border-slate-950 shadow-2xl shadow-amber-500/20 cursor-pointer">
              <span className="text-3xl animate-bounce">⚡</span>
              <span className="text-[10px] font-black text-slate-950 tracking-wider uppercase mt-1">KLAIM MINING</span>
            </button>
            <p className="text-[9px] text-slate-400 font-medium px-2 leading-tight">
              * Klik petir untuk aktifkan mesin absen harian. Setiap klik akan memunculkan video iklan promo (adds) 15-30 detik sebelum token dikunci masuk sistem.
            </p>
          </div>

          {/* SPACE ADS DI BAGIAN PALING BAWAH */}
          <div className="w-full bg-slate-900 border border-dashed border-slate-800 rounded-xl py-2 text-center text-[8px] text-slate-600 tracking-widest uppercase">
            Slot Iklan Bawah - Bali Pioneer Adds Platform
          </div>

        </div>
      )}              

            {/* 5. KONTEN UNTUK TAB EVENT (FEED KEGIATAN & PENGATURAN) */}
      {activeTab === 'event' && (
        <div className="p-4 flex-1 space-y-4 overflow-y-auto">
          <h2 className="text-sm font-bold text-center text-amber-400 tracking-wider uppercase mb-2">Event & Update Komunitas</h2>

          {/* ADS KECIL DI BAGIAN ATAS BANNER */}
          <div className="w-full bg-slate-900 border border-dashed border-slate-800 rounded-xl py-1 text-center text-[7px] text-slate-600 tracking-widest uppercase">
            Mini Adds Space
          </div>

          {/* FEED KONTEN KEGIATAN MANAJEMEN / PROMO / PRESALE (PLACEHOLDER MEDIA) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="w-full h-36 bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs relative">
              📸 [ Wadah Foto / Video Kegiatan / Promo Update Admin ]
              <div className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">PRESALE UPDATE</div>
            </div>
            <div className="p-3 space-y-1">
              <h4 className="text-xs font-bold text-white">Sosialisasi Bali Pioneer System Wilayah Denpasar</h4>
              <p className="text-[10px] text-slate-400 leading-normal">
                Pertemuan rutin antar pionir untuk membahas edukasi pemanfaatan utilitas token BPT onchain serta strategi pengembangan lapak merchant UMKM lokal.
              </p>
              <span className="text-[8px] text-slate-500 font-medium block pt-1">Diposting: 15 Juli 2026</span>
            </div>
          </div>

          {/* TOMBOL HUBUNGI BANTUAN CHAT TO SUPPORT */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md">
            💬 HUBUNGI CHAT TO SUPPORT ADMIN
          </button>

          {/* DASHBOARD PENGATURAN APLIKASI (SETTINGS CONTROL) */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">⚙️ Pengaturan Keamanan Aplikasi</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              
              {/* Opsi Tampilan Terbuka / Session Timeout */}
              <div>
                <label className="text-[8px] text-slate-500 block font-bold uppercase mb-1">Durasi Kunci Aplikasi Otomatis</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-[11px] focus:outline-none font-medium">
                  <option>Selalu Terbuka (Tanpa Kunci)</option>
                  <option>Kunci Otomatis Setelah 5 Menit</option>
                  <option>Kunci Otomatis Setelah 15 Menit</option>
                </select>
              </div>

              {/* Grid Tombol Pengaturan Cepat */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-center">
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl active:scale-95 transition cursor-pointer hover:border-slate-700">
                  🔒 PENGATURAN & RESET PIN
                </div>
                <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl active:scale-95 transition cursor-pointer hover:border-slate-700">
                  🛡️ SETTING GOOGLE 2FA
                </div>
              </div>

              {/* Formulir Verifikasi Ganti Kontak */}
              <div className="pt-2 border-t border-slate-800/60">
                <label className="text-[8px] text-slate-500 block font-bold uppercase mb-1">Verifikasi Perubahan Data Kontak</label>
                <button className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-bold py-2 px-3 rounded-lg text-left flex justify-between items-center active:scale-98 transition">
                  <span>Ganti Alamat Email / Nomor Telepon</span>
                  <span className="text-amber-500">➜</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

            {/* STRUKTUR MENU NAVIGASI BAWAH */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2 flex justify-around items-center z-50 shadow-2xl">
        {[
          { id: 'home', label: 'Home', ikon: '🏠' },
          { id: 'profile', label: 'Profile', ikon: '👤' },
          { id: 'finance', label: 'Finance', ikon: '💳' },
          { id: 'web3', label: 'Web3', ikon: '⚡' },
          { id: 'event', label: 'Event', ikon: '📅' }
        ].map((menu) => (
          <button key={menu.id} onClick={() => setActiveTab(menu.id)} className={`flex flex-col items-center gap-0.5 text-[9px] transition active:scale-90 duration-150 ${activeTab === menu.id ? 'text-amber-400 font-bold' : 'text-slate-500'}`}><span className="text-base">{menu.ikon}</span>{menu.label}</button>
        ))}
      </nav>

    </div>
  );
}
