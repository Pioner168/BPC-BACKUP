import React from 'react';

export default function Web3({ activeTab }) {
  if (activeTab !== 'web3') return null;

  return (
    <div className="p-4 flex-1 space-y-4 overflow-y-auto">
      <h2 className="text-sm font-bold text-center text-amber-400 tracking-wider uppercase mb-2">Web3 Blockchain Portal</h2>

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Saldo BPT Terkunci (Lock)</span>
          <span className="text-sm font-black text-amber-500">12.500 BPT</span>
        </div>
        <p className="text-[9px] text-slate-500 leading-relaxed">
          * Saldo presale dikunci 12 bulan (terbuka 10% di bulan ke-13). Hasil mining harian dialokasikan 15% ke saldo terkunci ini, dan 85% sisanya otomatis hangus dibakar (burn) secara permanen hingga batas pasokan 40% tercapai.
        </p>
      </div>

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

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-2">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🔄 Swap BPT Poin ke Token Onchain</h4>
          <span className="text-[8px] text-green-400 font-bold border border-green-500/20 bg-green-500/5 px-1.5 py-0.2 rounded">Syarat: Lolos KYC</span>
        </div>
        <p className="text-[9px] text-slate-500 leading-tight mb-2">
          * Minimal melakukan 3x transaksi berturut-turut dalam 3 bulan terakhir atau bulan berjalan untuk melakukan swap bulanan resmi.
        </p>
        <button className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 border border-purple-500/30 text-white font-black p-2.5 rounded-xl text-xs shadow-md">EKSEKUSI SWAP TOKEN</button>
      </div>
      
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

      <div className="bg-gradient-to-b from-slate-900 to-amber-950/20 border border-amber-500/20 rounded-2xl p-4 text-center space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-amber-500/10 text-amber-400 text-[7px] font-bold px-2 py-0.5 rounded-br-lg tracking-wider">MINING PROTOCOL</div>
        <div>
          <span className="text-[8px] text-slate-500 uppercase font-extrabold tracking-widest block">Hasil Penambangan Hari Ini</span>
          <span className="text-lg font-black text-amber-400 font-mono tracking-wide block mt-0.5">0.41582910 BPT</span>
        </div>
        <button className="w-32 h-32 bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-90 duration-150 rounded-full mx-auto flex flex-col items-center justify-center border-4 border-slate-950 shadow-2xl shadow-amber-500/20 cursor-pointer">
          <span className="text-3xl animate-bounce">⚡</span>
          <span className="text-[10px] font-black text-slate-950 tracking-wider uppercase mt-1">KLAIM MINING</span>
        </button>
        <p className="text-[9px] text-slate-400 font-medium px-2 leading-tight">
          * Klik petir untuk aktifkan mesin absen harian. Setiap klik akan memunculkan video iklan promo (adds) 15-30 detik sebelum token dikunci masuk system.
        </p>
      </div>

      <div className="w-full bg-slate-900 border border-dashed border-slate-800 rounded-xl py-2 text-center text-[8px] text-slate-600 tracking-widest uppercase">
        Slot Iklan Bawah - Bali Pioneer Adds Platform
      </div>
    </div>
  );
}

