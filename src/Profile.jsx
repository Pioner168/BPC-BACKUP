import React, { useState } from 'react';
import html2canvas from 'html2canvas';

export default function Profile({ activeTab, logoResmi }) {
  if (activeTab !== 'profile') return null;

  const [sudahDisalin, setSudahDisalin] = useState(false);
  const [linkDisalin, setLinkDisalin] = useState(false);
  const [sedangMengunduh, setSedangMengunduh] = useState(false);

  const tanganiSalinReferral = () => {
    navigator.clipboard.writeText("BPI168");
    setSudahDisalin(true);
    setTimeout(() => setSudahDisalin(false), 2000);
  };

  const tanganiSalinLinkInvite = () => {
    const linkUtuh = `${window.location.origin}/?ref=BPI168`;
    navigator.clipboard.writeText(linkUtuh);
    setLinkDisalin(true);
    setTimeout(() => setLinkDisalin(false), 2000);
  };

  const unduhKtaKeGaleri = () => {
    const elemenKta = document.getElementById('kta-premium-card');
    if (!elemenKta) return;

    setSedangMengunduh(true);
    
    html2canvas(elemenKta, {
      scale: 3,
      useCORS: true,
      backgroundColor: null
    }).then((canvas) => {
      const linkDownload = document.createElement('a');
      linkDownload.download = 'KTA_BPT_HARI_SURYA.png';
      linkDownload.href = canvas.toDataURL('image/png');
      linkDownload.click();
      setSedangMengunduh(false);
    }).catch((err) => {
      console.error("Gagal mengunduh KTA:", err);
      setSedangMengunduh(false);
    });
  };

  return (
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
          <input type="text" defaultValue="HARI SURYA WIJAYA" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-400 font-bold cursor-not-allowed" />
          <div className="grid grid-cols-2 gap-2"><input type="text" defaultValue="BANK BCA" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-400 font-bold cursor-not-allowed" /><input type="text" defaultValue="8420xxxxxx" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-400 font-bold cursor-not-allowed" /></div>
        </div>
      </div>
            <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🪪 Kartu Anggota Digital</h4>
          <button onClick={unduhKtaKeGaleri} disabled={sedangMengunduh} className="text-[10px] text-amber-400 font-bold hover:underline bg-slate-900/50 px-2 py-1 rounded-md border border-slate-800">
            {sedangMengunduh ? '📥 Menyimpan...' : '📥 Download Kartu'}
          </button>
        </div>
        
        {/* KTA DIGITAL PREMIUM - FIX SMOOTH LOGO & AKURASI POSISI BARU */}
        <div 
          id="kta-premium-card" 
          className="w-full aspect-[1.586/1] bg-gradient-to-br from-[#081322] via-[#0f223a] to-[#060d18] border border-amber-500/20 rounded-2xl p-4 shadow-2xl relative flex flex-col justify-between text-left select-none overflow-hidden"
        >
          {/* HEADER KARTU */}
          <div className="flex justify-between items-center w-full border-b border-slate-800/60 pb-2">
            <div className="flex items-center gap-2.5">
              {/* 🌟 LOGO FIX: Ditambahkan anti-blur CSS agar tidak putus-putus */}
              <img 
                src={logoResmi} 
                alt="BPT" 
                className="w-10 h-10 object-contain shrink-0" 
                style={{ imageRendering: 'auto', transform: 'translateZ(0)' }} 
              />
              <div>
                <span className="text-[7px] text-slate-400 block font-bold tracking-widest uppercase leading-none">KARTU ANGGOTA DIGITAL</span>
                <h4 className="text-xs font-black text-white tracking-wide uppercase mt-1 whitespace-nowrap">BALI PIONEER COMMUNITY</h4>
              </div>
            </div>
          </div>

          {/* KONTEN UTAMA TENGAH */}
          <div className="flex justify-between items-stretch w-full gap-2 my-auto pt-2">
            
            {/* AREA DATA KIRI & TENGAH (Wilayah & Status Sejajar) */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 text-left">
              <div>
                <span className="text-[7px] text-slate-400 block uppercase font-bold tracking-widest leading-none">Nama Lengkap</span>
                <h3 className="text-xs font-black text-white tracking-wide uppercase block mt-1 whitespace-nowrap">HARI SURYA WIJAYA</h3>
              </div>
              
              <div className="pt-1.5 border-t border-slate-800/40 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[6.5px] text-slate-500 block uppercase font-bold tracking-widest leading-none">Username Pi</span>
                  <span className="text-[9px] font-bold text-amber-400 block mt-0.5">@cescplank</span>
                </div>
                <div className="flex flex-col justify-end text-left pl-2">
                  {/* 🌟 VIP MEMBER: Dipindah ke tengah atas QR Code, polos tanpa border */}
                  <span className="text-amber-500 text-[8px] font-black tracking-widest uppercase leading-none mb-1">
                    VIP MEMBER
                  </span>
                </div>
              </div>

              {/* Baris Paling Bawah: Wilayah & Status Aktif Sejajar di Tengah */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[6.5px] text-slate-500 block uppercase font-bold tracking-widest leading-none">Wilayah</span>
                  <span className="text-[8px] font-medium text-slate-400 block mt-0.5 whitespace-nowrap">Denpasar Timur, Bali</span>
                </div>
                <div className="pl-2">
                  <span className="text-[6.5px] text-slate-500 block uppercase font-bold tracking-widest leading-none">Status Akun</span>
                  <span className="text-[8px] font-black text-green-400 block mt-0.5确 whitespace-nowrap">● Aktif</span>
                </div>
              </div>
            </div>

            {/* AREA KANAN: QR CODE JUMBO TEGAK LURUS DI ATAS BALI PIONEER SYSTEM */}
            <div className="flex flex-col justify-end items-center shrink-0 min-w-[85px] pt-4">
              {/* QR Code Diperbesar Maksimal (JUMBO w-20 h-20) */}
              <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex flex-col items-center justify-between border border-amber-500/20 shadow-2xl shrink-0">
                <div className="w-full h-14 bg-slate-950 rounded-lg flex flex-col items-center justify-center p-0.5 gap-0.5">
                  <div className="w-full flex justify-between gap-0.5"><div className="w-2 h-2 bg-white"></div><div className="w-0.5 h-0.5 bg-white"></div><div className="w-2 h-2 bg-white"></div></div>
                  <div className="w-full flex justify-between gap-0.5"><div className="w-1.5 h-1.5 bg-white"></div><div className="w-2 h-2 bg-white"></div><div className="w-1.5 h-1.5 bg-white"></div></div>
                </div>
                <span className="text-[6px] font-mono font-bold text-slate-900 tracking-tighter truncate w-full text-center leading-none mt-0.5">harisurya</span>
              </div>
            </div>

          </div>

          {/* FOOTER KARTU SEJAJAR SEMPURNA */}
          <div className="flex justify-between items-center w-full border-t border-slate-800/60 pt-1.5 text-[8px] text-slate-500 font-bold uppercase tracking-wider">
            <div>JOINED: <span className="text-slate-300 font-black">2024</span></div>
            <span className="font-black text-amber-400/50 tracking-widest">BALI PIONEER SYSTEM</span>
          </div>
        </div>
      </div>

      {/* REFERRAL SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-left">
            <h5 className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Upline Anda</h5>
            <p className="text-xs font-bold text-slate-200">@cescplank</p>
          </div>
          <div className="text-left">
            <h5 className="text-[9px] text-slate-500 uppercase font-bold mb-1">Kode Referral Anda</h5>
            <div onClick={tanganiSalinReferral} className="flex items-center justify-between bg-slate-950 border border-slate-800 hover:border-amber-500/40 cursor-pointer rounded-lg p-1.5 px-2.5 transition active:scale-95 duration-100">
              <span className="text-xs font-bold text-amber-400 tracking-wider font-mono">BPI168</span>
              <span className={`text-[8px] font-black tracking-wide uppercase px-1.5 py-0.5 rounded transition ${sudahDisalin ? 'bg-green-500/20 text-green-400' : 'text-slate-400'}`}>
                {sudahDisalin ? '✓ Tersalin' : 'Salin'}
              </span>
            </div>
          </div>
        </div>
        <button onClick={tanganiSalinLinkInvite} className={`w-full text-xs font-black py-2.5 rounded-xl transition duration-150 flex items-center justify-center gap-2 border ${linkDisalin ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-transparent active:scale-98'}`}>
          {linkDisalin ? '✓ LINK UNDANGAN BERHASIL TERSALIN' : '🔗 SALIN TAUTAN UNDANGAN ANGGOTA'}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-2 text-left">
        <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">⚙️ Manajemen Lapak Toko</h4>
        <button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/60 text-slate-200 text-xs py-2.5 px-3 rounded-xl flex items-center justify-between font-semibold">
          <span>🏪 Pengisian Data & Kelola Produk Toko Anda</span>
          <span className="text-amber-500">➜</span>
        </button>
      </div>
    </div>
  );
              }
