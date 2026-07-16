import React, { useState } from 'react';

export default function Finance({ activeTab }) {
  if (activeTab !== 'finance') return null;

  // STATE TRANSAKSI UTAMA
  const [inputUserTujuan, setInputUserTujuan] = useState('@harisurya');
  const [nominalTransfer, setNominalTransfer] = useState('50000');
  const [jendelaTopUpTerbuka, setJendelaTopUpTerbuka] = useState(false);
  const [jendelaKirimBankTerbuka, setJendelaKirimBankTerbuka] = useState(false);
  const [pilihanLayananTopUp, setPilihanLayananTopUp] = useState('deposit');
  const [ewalletTerpilih, setEwalletTerpilih] = useState('');
  const [layananPpobAktif, setLayananPpobAktif] = useState('pulsa');

  // DATABASE RIIL PROVIDER PULSA NASIONAL SE-INDONESIA
  const databasePulsaNasional = [
    { provider: "TELKOMSEL (Simpati/As/Loop)", nominal: ["Rp 5.000", "Rp 10.000", "Rp 20.000", "Rp 25.000", "Rp 50.000", "Rp 100.000", "Rp 150.000", "Rp 200.000", "Rp 300.000", "Rp 500.000", "Rp 1.000.000"] },
    { provider: "XL AXIATA", nominal: ["Rp 5.000", "Rp 10.000", "Rp 15.000", "Rp 25.000", "Rp 50.000", "Rp 100.000", "Rp 200.000", "Rp 300.000", "Rp 500.000", "Rp 1.000.000"] },
    { provider: "INDOSAT (IM3/Mentari)", nominal: ["Rp 5.000", "Rp 10.000", "Rp 20.000", "Rp 25.000", "Rp 30.000", "Rp 50.000", "Rp 100.000", "Rp 150.000", "Rp 250.000", "Rp 500.000"] },
    { provider: "THREE (3)", nominal: ["Rp 5.000", "Rp 10.000", "Rp 15.000", "Rp 20.000", "Rp 30.000", "Rp 50.000", "Rp 100.000", "Rp 150.000", "Rp 200.000", "Rp 300.000", "Rp 500.000"] },
    { provider: "SMARTFREN", nominal: ["Rp 5.000", "Rp 10.000", "Rp 15.000", "Rp 20.000", "Rp 30.000", "Rp 50.000", "Rp 60.000", "Rp 100.000", "Rp 150.000", "Rp 200.000", "Rp 300.000", "Rp 500.000"] },
    { provider: "BY.U (Telkomsel Digital)", nominal: ["Rp 5.000", "Rp 10.000", "Rp 20.000", "Rp 25.000", "Rp 50.000", "Rp 100.000"] },
    { provider: "AXIS", nominal: ["Rp 5.000", "Rp 10.000", "Rp 15.000", "Rp 25.000", "Rp 30.000", "Rp 50.000", "Rp 100.000", "Rp 200.000", "Rp 300.000", "Rp 500.000"] }
  ];

  // DATABASE RIIL NOMINAL TOKEN LISTRIK PLN RESMI
  const databaseTokenPln = ["Rp 20.000", "Rp 50.000", "Rp 100.000", "Rp 200.000", "Rp 500.000", "Rp 1.000.000", "Rp 5.000.000", "Rp 10.000.000"];

  // DATABASE LENGKAP 34 PROVINSI UNTUK PDAM NASIONAL
  const databaseProvinsiPdam = ["Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung", "Kep. Bangka Belitung", "Kep. Riau", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat", "Maluku", "Maluku Utara", "Papua Barat", "Papua"];
  
  // DATABASE BANK KLIRING NASIONAL BI-FAST UTUH
  const databaseBankNasional = ["BANK CENTRAL ASIA (BCA)", "BANK MANDIRI", "BANK RAKYAT INDONESIA (BRI)", "BANK NEGARA INDONESIA (BNI)", "BANK SYARIAH INDONESIA (BSI)", "BANK DANAMON", "BANK PERMATA", "BANK CIMB NIAGA", "BANK MEGA", "BANK MAYBANK", "BANK TABUNGAN NEGARA (BTN)", "SEABANK", "BANK ALADIN", "BANK JAGO", "ALLO BANK", "BANK NEO COMMERCE", "BPD BALI", "BPD JAWA BARAT (BJB)", "BPD JAWA TIMUR", "BPD JAWA TENGAH", "BANK MUAMALAT"];

  // STATE PILIHAN FILTER USER SAAT KLIK DROPDOWN PPOB
  const [providerPulsaTerpilih, setProviderPulsaTerpilih] = useState(databasePulsaNasional[0].provider);
  const [bankTujuanWd, setBankTujuanWd] = useState(databaseBankNasional[0]);

  const hitungBiayaAdmin = () => {
    if (inputUserTujuan.toLowerCase() === '@harisurya') return 0;
    if (inputUserTujuan.trim() === '') return 0;
    return 10000;
  };
    return (
    <div className="p-4 flex-1 space-y-4 overflow-y-auto relative text-left">
      <h2 className="text-sm font-bold text-center text-amber-400 tracking-wider uppercase mb-2">Finance Dashboard</h2>

      {/* MULTI SALDO KAS UTAMA */}
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

      {/* TOMBOL AKSI UTAMA DEPOSIT & WD */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => { setPilihanLayananTopUp('deposit'); setJendelaTopUpTerbuka(true); }}
          className="bg-amber-500 text-slate-950 font-black p-2.5 rounded-xl text-xs tracking-wider active:scale-95 transition shadow-lg"
        >
          ➕ TOP UP SALDO
        </button>
        <button 
          onClick={() => setJendelaKirimBankTerbuka(true)}
          className="bg-slate-900 border border-slate-700 text-amber-400 font-black p-2.5 rounded-xl text-xs tracking-wider active:scale-95 transition"
        >
          💸 KIRIM RUPIAH
        </button>
      </div>

      {/* FORM TRANFER SESAMA PENGGUNA ANGGOTA */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
        <h4 className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">📤 Transfer Rupiah Antar Anggota (Bebas Biaya)</h4>
        <div className="space-y-2">
          <div>
            <label className="text-[9px] text-slate-500 block mb-0.5">Username Komunitas Tujuan</label>
            <input type="text" value={inputUserTujuan} onChange={(e) => setInputUserTujuan(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold focus:outline-none" />
          </div>
          <div>
            <label className="text-[9px] text-slate-500 block mb-0.5">Validasi Sistem</label>
            {inputUserTujuan.trim().toLowerCase() === '@cescplank' ? (
              <div className="w-full bg-green-500/5 border border-green-500/20 text-green-400 rounded-lg p-2 text-xs font-bold">✓ HARI SURYA WIJAYA (Sesama Akun - Gratis Admin)</div>
            ) : (
              <div className="w-full bg-red-500/5 border border-red-500/20 text-red-400 rounded-lg p-2 text-xs font-bold">❌ Akun tidak terdaftar di database internal</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" value={nominalTransfer} onChange={(e) => setNominalTransfer(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold focus:outline-none" />
            <input type="text" value="GRATIS Rp 0" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-green-400 font-bold cursor-not-allowed" />
          </div>
          <button onClick={() => alert("Transaksi Antar Anggota Berhasil!")} className="w-full bg-green-500 text-slate-950 font-black p-2.5 rounded-xl text-xs mt-1">KONFIRMASI TRANSAKSI INTERNAL</button>
        </div>
      </div>
                {/* AREA LAYANAN BILER PPOB NASIONAL */}
      <div className="space-y-2">
        <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">⚡ Layanan PPOB Nasional Resmi</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { id: 'pulsa', label: 'Isi Pulsa', ikon: '📱', warna: 'from-blue-600/20 border-blue-500/20' },
            { id: 'pln', label: 'Token PLN', ikon: '💡', warna: 'from-amber-600/20 border-amber-500/20' },
            { id: 'pdam', label: 'Tagihan PDAM', ikon: '💧', warna: 'from-teal-600/20 border-teal-500/20' },
            { id: 'bpjs', label: 'BPJS Sehat', ikon: '🛡️', warna: 'from-red-600/20 border-red-500/20' }
          ].map((ppob) => (
            <div 
              key={ppob.id} 
              onClick={() => setLayananPpobAktif(ppob.id)}
              className={`bg-gradient-to-b ${ppob.warna} border rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer transition ${layananPpobAktif === ppob.id ? 'border-amber-500 bg-slate-900 shadow-md ring-1 ring-amber-500/20' : 'opacity-70'}`}
            >
              <span className="text-lg mb-1">{ppob.ikon}</span>
              <span className="text-[9px] font-bold text-slate-200 tracking-tight leading-tight">{ppob.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FORM PPOB GENERIK DINAMIS NASIONAL */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md space-y-3">
        <h5 className="text-[10px] uppercase font-bold text-amber-400">
          Formulir {layananPpobAktif.toUpperCase()} Riil Seluruh Indonesia
        </h5>
        
        {/* LAYANAN UTAMA 1: JIKA USER PILIH MENU PULSA */}
        {layananPpobAktif === 'pulsa' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Nomor Handphone</label>
                <input type="text" placeholder="Contoh: 081234xxxxxx" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none" />
              </div>
              <div>
                <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Pilih Provider / Operator</label>
                <select value={providerPulsaTerpilih} onChange={(e) => setProviderPulsaTerpilih(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold focus:outline-none">
                  {databasePulsaNasional.map((p) => (
                    <option key={p.provider} value={p.provider}>{p.provider}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Pilih Nominal Pulsa Resmi</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-400 font-bold focus:outline-none">
                {databasePulsaNasional.find(p => p.provider === providerPulsaTerpilih)?.nominal.map((nom) => (
                  <option key={nom}>{nom} (Biaya Admin Rp 2.500)</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* LAYANAN UTAMA 2: JIKA USER PILIH MENU TOKEN LISTRIK PLN */}
        {layananPpobAktif === 'pln' && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Nomor ID Pelanggan / Meteran</label>
              <input type="text" placeholder="Masukkan 11-12 digit ID..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none" />
            </div>
            <div>
              <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Pilih Nominal Token Riil</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-400 font-bold focus:outline-none">
                {databaseTokenPln.map((token) => (
                  <option key={token}>{token} (Biaya Admin Rp 2.500)</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* LAYANAN UTAMA 3: JIKA USER PILIH MENU TAGIHAN PDAM NUSANTARA */}
        {layananPpobAktif === 'pdam' && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Nomor ID Sambungan Air</label>
              <input type="text" placeholder="Masukkan nomor pelanggan..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none" />
            </div>
            <div>
              <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Pilih Wilayah Provinsi PDAM</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-400 font-bold focus:outline-none">
                {databaseProvinsiPdam.map((prov) => (
                  <option key={prov}>PDAM PROVINSI {prov.toUpperCase()} (Biaya Admin Rp 2.500)</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* LAYANAN UTAMA 4: JIKA USER PILIH MENU BPJS KESEHATAN */}
        {layananPpobAktif === 'bpjs' && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Nomor Virtual Account BPJS</label>
              <input type="text" placeholder="Contoh: 88888xxxxxxxx" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none" />
            </div>
            <div>
              <label className="text-[8px] text-slate-500 block uppercase font-bold mb-1">Opsi Kliring Biller</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-400 font-bold focus:outline-none">
                <option>BAYAR IURAN BPJS KESEHATAN KELUARGA (Biaya Admin Rp 2.500)</option>
              </select>
            </div>
          </div>
        )}

        <button onClick={() => alert(`Transaksi Biller ${layananPpobAktif.toUpperCase()} sukses dikirim ke antrean server PPOB nasional.`)} className="w-full bg-amber-500 text-slate-950 font-black p-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md">
          EKSEKUSI PEMBAYARAN VIA SALDO UTAMA BPT
        </button>
      </div>
                {/* 🚪 JENDELA POP-UP 1: WITHDRAWAL / TRANSFER KE SELURUH BANK INDONESIA (RIIL BFAST) */}
      {jendelaKirimBankTerbuka && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div>
                <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-widest">CLEARING SYSTEM</span>
                <h3 className="text-xs font-black text-white mt-0.5">Kirim Saldo Ke Seluruh Bank Indonesia</h3>
              </div>
              <button onClick={() => setJendelaKirimBankTerbuka(false)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-slate-400">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[8px] text-slate-500 block font-bold mb-1 uppercase">Pilih Bank Tujuan (Nasional)</label>
                  <select value={bankTujuanWd} onChange={(e) => setBankTujuanWd(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-bold focus:outline-none text-[11px]">
                    {databaseBankNasional.map((bnk) => (
                      <option key={bnk}>{bnk}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[8px] text-slate-500 block font-bold mb-1 uppercase">Nomor Rekening</label>
                  <input type="text" placeholder="Masukkan no rekening..." className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[8px] text-slate-500 block font-bold mb-1 uppercase">Nominal</label>
                  <input type="number" placeholder="Min Rp50.000" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none" />
                </div>
                <div>
                  <label className="text-[8px] text-slate-500 block font-bold mb-1 uppercase">Potongan Kliring</label>
                  <input type="text" value="Rp 10.000" disabled className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-red-400 font-bold cursor-not-allowed" />
                </div>
              </div>
              <button onClick={() => { alert(`Permintaan Transfer Bank Luar Ke ${bankTujuanWd} diproses! Dikenakan biaya admin kliring Rp10.000.`); setJendelaKirimBankTerbuka(false); }} className="w-full bg-green-500 text-slate-950 font-black p-2.5 rounded-xl text-xs uppercase tracking-wider">PROSES TRANSAKSI INTERBANK BI-FAST</button>
            </div>
          </div>
        </div>
      )}

      {/* JENDELA POP-UP 2: OVERLAY TOP UP DEPOSIT & LOGO E-WALLET INTERNAL */}
      {jendelaTopUpTerbuka && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button onClick={() => setPilihanLayananTopUp('deposit')} className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${pilihanLayananTopUp === 'deposit' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>📥 DEPOSIT APPLIKASI</button>
                <button onClick={() => setPilihanLayananTopUp('ewallet')} className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${pilihanLayananTopUp === 'ewallet' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>📱 TOP UP E-WALLET (PPOB)</button>
              </div>
              <button onClick={() => { setJendelaTopUpTerbuka(false); setEwalletTerpilih(''); }} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-slate-400">✕</button>
            </div>

            {pilihanLayananTopUp === 'deposit' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">1. Transfer Virtual Account (Otomatis)</h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div><span className="text-[8px] text-slate-500 block font-bold">BANK CENTRAL ASIA (BCA)</span><span className="font-mono text-amber-400 font-bold tracking-widest">9823 0842 xxxx</span></div>
                      <span className="text-[9px] bg-slate-800 text-slate-400 p-1 rounded cursor-pointer">SALIN</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pt-3 border-t border-slate-800/40 text-center flex flex-col items-center">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-left w-full">2. Scan Instan via QRIS (Semua E-Wallet/Bank)</h4>
                  <div className="w-64 h-64 bg-white rounded-2xl p-4 shadow-2xl flex flex-col items-center justify-between border border-amber-500/30 mt-3">
                    <div className="w-full h-48 bg-slate-950 rounded-xl flex flex-col justify-between p-2.5 gap-2">
                      <div className="w-full flex justify-between"><div className="w-5 h-5 bg-white rounded-sm"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-5 h-5 bg-white rounded-sm"></div></div>
                      <div className="w-full flex justify-between items-center"><div className="w-8 h-8 bg-white rounded-md mx-auto"></div></div>
                    </div>
                    <span className="text-[9px] font-black text-slate-950 tracking-widest uppercase font-mono mt-1">QRIS DEPOSIT BPT</span>
                  </div>
                </div>
              </div>
            )}

            {pilihanLayananTopUp === 'ewallet' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pilih Operator E-Wallet</h4>
                  <div className="grid grid-cols-5 gap-2 text-center text-[9px] font-bold">
                    {[
                      { name: 'DANA', fileImg: '/dana.png' },
                      { name: 'OVO', fileImg: '/ovo.png' },
                      { name: 'GOPAY', fileImg: '/gopay.png' },
                      { name: 'SHOPEE', fileImg: '/shopee.png' },
                      { name: 'LINKAJA', fileImg: '/linkaja.png' }
                    ].map((wallet) => (
                      <div key={wallet.name} onClick={() => setEwalletTerpilih(wallet.name)} className={`p-2 rounded-2xl border cursor-pointer active:scale-95 transition h-20 flex flex-col items-center justify-center gap-2 ${ewalletTerpilih === wallet.name ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                        <div className="w-12 h-12 flex items-center justify-center overflow-hidden shrink-0">
                          <img src={wallet.fileImg} alt={wallet.name} className="w-full h-full object-contain filter brightness-110 drop-shadow-md" onError={(e) => { e.target.src = "🏢"; }} />
                        </div>
                        <div className="text-[7.5px] truncate tracking-tighter w-full uppercase leading-none">{wallet.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {ewalletTerpilih && (
                  <div className="space-y-3 pt-2 border-t border-slate-800/60 animate-fade-in">
                    <h5 className="text-[10px] uppercase font-bold text-amber-400">Form Pengisian {ewalletTerpilih}</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <input type="text" placeholder="Nomor HP Tujuan" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold focus:outline-none" />
                      <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-amber-400 font-bold focus:outline-none">
                        <option>Rp 10.000 (Admin Rp 2.000)</option>
                        <option>Rp 25.000 (Admin Rp 2.000)</option>
                        <option>Rp 50.000 (Admin Rp 2.000)</option>
                        <option>Rp 100.000 (Admin Rp 2.000)</option>
                        <option>Rp 200.000 (Admin Rp 2.000)</option>
                      </select>
                    </div>
                    <button onClick={() => { alert(`Top Up ${ewalletTerpilih} sukses! Potong biaya admin Rp2.000.`); setJendelaTopUpTerbuka(false); setEwalletTerpilih(''); }} className="w-full bg-amber-500 text-slate-950 font-black p-2.5 rounded-xl text-xs uppercase font-mono shadow-md">PROSES TOP UP {ewalletTerpilih} NOW</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
          }

