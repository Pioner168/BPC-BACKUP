import React, { useState, useEffect } from 'react';
import logoResmi from './Logo.png';
import { Html5QrcodeScanner } from 'html5-qrcode'; // <--- Impor mesin pelacak kamera

import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Finance from './Finance';
import Web3 from './Web3';
import Event from './Event';

export default function App() {
  const [currentPage, setCurrentPage] = useState('auth'); 
  const [authStep, setAuthStep] = useState('login'); 
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [pinCode, setPinCode] = useState(['', '', '', '', '', '']);
  const [activeTab, setActiveTab] = useState('home');
  const [qrisTerbuka, setQrisTerbuka] = useState(false);

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

  const daftarIklan = [
    "Promo Anggota: Diskon Transaksi PPOB 5% khusus bulan ini!",
    "Event Bali Pioneer: Presale Token BPT Gelombang 1 Segera Dibuka!",
    "Gunakan Scan QRIS Komunitas, Bebas Biaya Admin Antar Merchant."
  ];

  // FUNGSI UTAMAKAN KAMERA OTOMATIS SAAT POP-UP NYALA
  useEffect(() => {
    let scanner = null;
    if (qrisTerbuka) {
      // Tunggu element HTML scanner siap di layar
      setTimeout(() => {
        scanner = new Html5QrcodeScanner("reader-qris-kamera", {
          fps: 15,
          qrbox: { width: 180, height: 180 },
          rememberLastUsedCamera: true,
          supportedScanTypes: [0] // Mengutamakan kamera belakang langsung
        });

        scanner.render((dataHasilScan) => {
          // Aksi jika QRIS sukses terbaca komputer
          alert("Sukses membaca QRIS Merchant: " + dataHasilScan);
          scanner.clear();
          setQrisTerbuka(false);
        }, (error) => {
          // logs error pelacakan biasa (abaikan saja agar tidak spam log)
          console.warn(error);
        });
      }, 300);
    }

    return () => {
      if (scanner) {
        try { scanner.clear(); } catch (e) { console.error(e); }
      }
    };
  }, [qrisTerbuka]);

  if (currentPage === 'auth') {
    return (
      <Login
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        authStep={authStep}
        setAuthStep={setAuthStep}
        captchaChecked={captchaChecked}
        setCaptchaChecked={setCaptchaChecked}
        otpCode={otpCode}
        pinCode={pinCode}
        handleOtpChange={handleOtpChange}
        handlePinChange={handlePinChange}
        logoResmi={logoResmi}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 select-none flex flex-col" style={{ fontFamily: 'sans-serif' }}>
      
      {/* HEADER UTAMA */}
      <header className="bg-slate-900 border-b border-slate-800 p-3 sticky top-0 z-50 flex items-center justify-between shadow-md min-h-[68px]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img src={logoResmi} alt="BPT" className="w-full h-full object-contain" />
          </div>
          <div className="text-left space-y-0.5">
            <h1 className="text-sm font-black tracking-wider text-amber-400 uppercase leading-tight">Bali Pioneer System</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">Store & Marketplace</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-1 shrink-0">
          <button 
            onClick={() => setQrisTerbuka(true)}
            className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-90 text-slate-950 rounded-full flex flex-col items-center justify-center shadow-lg transition duration-150"
          >
            <span className="text-xs leading-none">🔳</span>
            <span className="text-[6px] font-black tracking-tighter uppercase mt-0.5">SCAN</span>
          </button>
          <span className="text-green-400 text-[6px] font-black uppercase tracking-widest leading-none mt-0.5 opacity-90">
            STORE ACTIVE
          </span>
        </div>
      </header>

      {/* KONTEN HALAMAN */}
      <Home activeTab={activeTab} daftarIklan={daftarIklan} logoResmi={logoResmi} />
      <Profile activeTab={activeTab} logoResmi={logoResmi} />
      <Finance activeTab={activeTab} />
      <Web3 activeTab={activeTab} />
      <Event activeTab={activeTab} />

      {/* JENDELA POP-UP OVERLAY QRIS DENGAN FEED VIDEO KAMERA ASLI */}
      {qrisTerbuka && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-5 text-center space-y-4 relative shadow-2xl overflow-hidden">
            <button onClick={() => setQrisTerbuka(false)} className="absolute top-4 right-4 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-slate-400 z-50">✕</button>
            
            <div className="text-center">
              <h3 className="text-sm font-black text-amber-400 tracking-wider uppercase">QRIS Scanner</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Berikan izin akses kamera saat jendela pop-up memintanya</p>
            </div>
            
            {/* 🌟 WADAH UTAMA TEMPAT VIDEO STREAM KAMERA HP BERJALAN */}
            <div className="w-full min-h-[240px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-inner text-white">
              <div id="reader-qris-kamera" className="w-full h-full text-white text-[10px] text-center"></div>
            </div>
            
            <div className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-300 p-2 rounded-xl leading-normal text-left">
              * Arahkan kamera belakang ke kode QRIS. Sistem mendukung mata uang Fiat & pemindahan Token BPT terbuka.
            </div>
          </div>
        </div>
      )}

      {/* NAVIGASI BAWAH */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2 flex justify-around items-center z-40 shadow-2xl">
        {[
          { id: 'home', label: 'Home', ikon: '🏠' },
          { id: 'profile', label: 'Profile', ikon: '👤' },
          { id: 'finance', label: 'Finance', ikon: '💳' },
          { id: 'web3', label: 'Web3', ikon: '⚡' },
          { id: 'event', label: 'Event', ikon: '📅' }
        ].map((menu) => (
          <button 
            key={menu.id} 
            onClick={() => setActiveTab(menu.id)} 
            className={`flex flex-col items-center gap-0.5 text-[9px] min-w-[55px] transition active:scale-90 duration-150 ${activeTab === menu.id ? 'text-amber-400 font-bold' : 'text-slate-500'}`}
          >
            <span className="text-base mb-0.5">{menu.ikon}</span>
            {menu.label}
          </button>
        ))}
      </nav>

    </div>
  );
      }

