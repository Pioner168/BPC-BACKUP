import React from 'react';

export default function Event({ activeTab }) {
  if (activeTab !== 'event') return null;
  return (
    <div className="p-4 flex-1 space-y-4 overflow-y-auto">
      <h2 className="text-sm font-bold text-center text-amber-400 tracking-wider uppercase mb-2">Event & Update Komunitas</h2>

      <div className="w-full bg-slate-900 border border-dashed border-slate-800 rounded-xl py-1 text-center text-[7px] text-slate-600 tracking-widest uppercase">
        Mini Adds Space
      </div>

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

      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md">
        💬 HUBUNGI CHAT TO SUPPORT ADMIN
      </button>

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
        <h4 className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">⚙️ Pengaturan Keamanan Aplikasi</h4>
        <div className="space-y-2.5 text-xs text-slate-300">
          <div>
            <label className="text-[8px] text-slate-500 block font-bold uppercase mb-1">Durasi Kunci Aplikasi Otomatis</label>
            <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-[11px] focus:outline-none font-medium">
              <option>Selalu Terbuka (Tanpa Kunci)</option>
              <option>Kunci Otomatis Setelah 5 Menit</option>
              <option>Kunci Otomatis Setelah 15 Menit</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-center">
            <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl active:scale-95 transition cursor-pointer hover:border-slate-700">🔒 PENGATURAN & RESET PIN</div>
            <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl active:scale-95 transition cursor-pointer hover:border-slate-700">🛡️ SETTING GOOGLE 2FA</div>
          </div>

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
  );
}

