import React, { useState, useEffect } from 'react';

export default function Web3({ activeTab }) {
  if (activeTab !== 'web3') return null;

  // SAKELAR BUKA-TUTUP JENDELA POP-UP
  const [modalAktif, setModalAktif] = useState(null); 
  
  // STATE MINING UTAMA (8 DIGIT DESIMAL CRYPTO)
  const [saldoMiningHariIni, setSaldoMiningHariIni] = useState(0.12576941);
  const [isMining, setIsMining] = useState(false);
  const [jendelaIklanTerbuka, setJendelaIklanTerbuka] = useState(false);
  const [hitungMundurIklan, setHitungMundurIklan] = useState(15);

  // STATE DINAMIS PILIHAN KONTRAK USER
  const [persenStakingDipilih, setPersenStakingDipilih] = useState('25%');
  const [durasiStakingDipilih, setDurasiStakingDipilih] = useState('1 Tahun');

  // SALDO DOMPET B DIATAS DIKUNCI MATI (HANYA BERTAMBAH SAAT RESET BULANAN)
  const [saldoDompetB_Membeku, setSaldoDompetB_Membeku] = useState(0.01886541);

  // DATABASE LINGKARAN KEAMANAN (MAKSIMAL 5 ANGGOTA)
  const [securityCircle, setSecurityCircle] = useState([
    { username: "@wayan_pioneer", nama: "I Wayan Sudarta", aktif: true },
    { username: "@made_bali", nama: "Ni Made Rai", aktif: true },
    { username: "@nyoman_bpt", nama: "I Nyoman Gede", aktif: false },
    { username: null, nama: "Kosong", aktif: false },
    { username: null, nama: "Kosong", aktif: false }
  ]);

  // DATABASE TIM REFERRAL NASIONAL
  const [referralTeam, setReferralTeam] = useState([
    { username: "@ketut_pionir", nama: "I Ketut Alit", aktif: true },
    { username: "@giri_bpt", nama: "Giri Wijaya", aktif: true },
    { username: "@agung_bali", nama: "Anak Agung", aktif: false },
    { username: "@santi_pioneer", nama: "Luh Santi", aktif: false }
  ]);
  // LOGIKA HITUNG RUMUS DINAMIS SKALA NASIONAL (PERSENTASE AKHIR)
  const baseRate = 0.01000000; 
  const pioneerBoost = 100; 

  const dapatkanBonusStakingPercent = () => {
    if (durasiStakingDipilih.includes('6 Bulan')) return 20;
    if (durasiStakingDipilih.includes('1 Tahun')) return 50;
    if (durasiStakingDipilih.includes('2 Tahun')) return 100;
    if (durasiStakingDipilih.includes('3 Tahun')) return 150;
    return 0;
  };

  const hitungSecurityCount = () => securityCircle.filter(f => f.username !== null).length;
  const totalBoosterPercent = pioneerBoost + (hitungSecurityCount() * 20) + dapatkanBonusStakingPercent();
  const totalBoosterDesimal = totalBoosterPercent / 100;

  const hitungReferralAktif = () => referralTeam.filter(r => r.aktif).length;
  const ppobUsageBonus = 0.30; 
  const totalRewardsMultiplier = 1.00 + (hitungReferralAktif() * 0.25) + ppobUsageBonus;
  const totalMiningRatePerJam = baseRate * totalBoosterDesimal * totalRewardsMultiplier;

  // LOGIKA KALKULASI ALARM WARNING TANGGAL DEKATI RESET BULANAN
  const infoWaktuPonsel = new Date();
  const tanggalHariIni = infoWaktuPonsel.getDate(); 
  const jumlahTransaksiBulanIni = 1; // Simulasi: Anggota baru 1x transaksi dari syarat 3x

  // Timer detakan angka crypto berjalan harian
  useEffect(() => {
    let interval = null;
    if (isMining) {
      interval = setInterval(() => {
        setSaldoMiningHariIni((prev) => prev + (totalMiningRatePerJam / 3600));
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isMining, totalMiningRatePerJam]);

  // Timer hitung mundur google interstitial ads
  useEffect(() => {
    let timer = null;
    if (jendelaIklanTerbuka && hitungMundurIklan > 0) {
      timer = setInterval(() => setHitungMundurIklan(p => p - 1), 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [jendelaIklanTerbuka, hitungMundurIklan]);

  const porsiMilikUser15Percent = saldoMiningHariIni * 0.15;
  const porsiBurnKomunitas85Percent = saldoMiningHariIni * 0.85;
    return (
    <div className="p-4 flex-1 space-y-4 overflow-y-auto text-left select-none relative">
      
      {/* JENDELA GOOGLE INTERSTITIAL ADS FULL 1 LAYAR PENUH */}
      {jendelaIklanTerbuka && (
        <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center p-6">
          <div className="absolute top-6 right-6 bg-slate-900 border border-slate-800 text-[10px] px-3 py-1.5 rounded-full font-mono font-bold tracking-wider text-slate-300 shadow-xl">
            {hitungMundurIklan > 0 ? `🎁 Google Video Ads: ${hitungMundurIklan}s` : '✕ Tutup Iklan'}
          </div>
          <div className="w-full h-full max-w-sm flex flex-col items-center justify-center space-y-5 text-center">
            <span className="text-5xl animate-bounce">🎬</span>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest">Google Mobile Ads Network</h3>
              <p className="text-[10px] text-slate-500 px-6 leading-relaxed">Menayangkan Video Promo Komersial. Seluruh pendapatan Google AdSense dari klik ini otomatis masuk ke kas penopang ekosistem komunitas.</p>
            </div>
            {hitungMundurIklan > 0 ? (
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mt-4"></div>
            ) : (
              <button 
                onClick={() => { setIsMining(true); setJendelaIklanTerbuka(false); }}
                className="w-full bg-green-500 text-slate-950 font-black p-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-2xl active:scale-95 transition mt-4"
              >
                ✓ AKTIFKAN ABSEN MINING BPT
              </button>
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD EMPAT PANEL DOMPET DIGITAL */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-xl space-y-2 text-[10px]">
        <div className="flex justify-between items-center border-b border-slate-800/40 pb-1.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider">🪙 Saldo BPT Murni (Onchain)</span>
          <span className="font-mono font-black text-white">2.500.00000000 BPT</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800/40 pb-1.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider">🔒 Saldo Staking Terkunci</span>
          <span className="font-mono font-black text-amber-500">1.500.00000000 BPT</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800/40 pb-1.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider">🔒 Saldo Presale Terkunci (12 Bln)</span>
          <span className="font-mono font-black text-orange-400">5.000.00000000 BPT</span>
        </div>
        <div className="flex justify-between items-center pb-0.5">
          <span className="text-slate-400 font-bold uppercase tracking-wider">⛏️ Saldo Dompet B (Mining 15%)</span>
          <span className="font-mono font-black text-green-400">{saldoDompetB_Membeku.toFixed(8)} BPT</span>
        </div>
      </div>

      {/* ALARM PERINGATAN MERAH JIKA MEMASUKI TANGGAL 25 KE ATAS */}
      {tanggalHariIni >= 25 && jumlahTransaksiBulanIni < 3 && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-2xl text-[9px] font-black uppercase leading-normal tracking-wide text-center space-y-1 shadow-inner animate-pulse">
          <div>⚠️ ALARM HANGUS RESET BULANAN AKAN SEGERA TIBA!</div>
          <div className="text-white font-medium">Akun Anda baru melakukan {jumlahTransaksiBulanIni}/3 Transaksi Finansial. Selesaikan 3x transaksi sebelum akhir bulan, atau seluruh hasil tambang Anda bulan ini otomatis dihancurkan menjadi NOL!</div>
        </div>
      )}

      {/* BLOK MESIN PETIR MINING UTAMA */}
      <div className="bg-gradient-to-b from-slate-900 to-amber-950/20 border border-amber-500/20 rounded-2xl p-4 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-amber-500/10 text-amber-400 text-[7px] font-bold px-2 py-0.5 rounded-br-lg tracking-wider">MINING PROTOCOL</div>
        <div className="flex justify-between items-center px-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Hasil Tambang Hari Ini</span>
          <span className="text-amber-500/60 font-mono text-[8px]">15% Hak Milik / 85% Burn</span>
        </div>
        <span className="text-2xl font-black text-amber-400 font-mono tracking-wider block">
          {saldoMiningHariIni.toFixed(8)} BPT
        </span>
        
        <div className="grid grid-cols-2 gap-2 text-[9px] font-black uppercase bg-slate-950/50 p-2 rounded-xl border border-slate-800/40 text-center tracking-tight">
          <div className="text-green-400">Milik Anda (15%): <span className="font-mono block text-white font-bold mt-0.5">{porsiMilikUser15Percent.toFixed(8)}</span></div>
          <div className="text-red-400">Dibakar (85%): <span className="font-mono block text-white font-bold mt-0.5">{porsiBurnKomunitas85Percent.toFixed(8)}</span></div>
        </div>

        <button 
          onClick={() => { if (!isMining) { setHitungMundurIklan(15); setJendelaIklanTerbuka(true); } }}
          className={`w-32 h-32 rounded-full mx-auto flex flex-col items-center justify-center border-4 border-slate-950 shadow-2xl transition duration-150 ${isMining ? 'bg-gradient-to-tr from-green-600 to-emerald-500 shadow-green-500/10 cursor-not-allowed' : 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/20 cursor-pointer active:scale-90'}`}
        >
          <span className={`text-3xl ${isMining ? 'animate-pulse text-white' : 'animate-bounce'}`}>⚡</span>
          <span className="text-[8px] font-black text-slate-950 tracking-wider uppercase mt-1">
            {isMining ? 'MINING AKTIF' : 'KLAIM MINING'}
          </span>
        </button>
        <p className="text-[9px] text-slate-400 font-medium px-4 text-center leading-normal">
          * Klik petir untuk aktifkan mesin absen harian. Setiap klik memicu Google Interstitial Ads Full Screen sebelum token masuk sistem.
        </p>
      </div>
            {/* BARISAN 5 MENU IKON SEJAJAR */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-md">
        <div className="grid grid-cols-5 gap-2 text-center text-[8.5px] font-black tracking-tighter text-slate-300">
          <div onClick={() => setModalAktif('swap')} className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition"><div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center text-lg shadow-md">🔄</div><span>SWAP</span></div>
          <div onClick={() => setModalAktif('stake')} className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition"><div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center text-lg shadow-md">🔒</div><span>STAKE</span></div>
          <div onClick={() => setModalAktif('security')} className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition"><div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center text-lg shadow-md">🛡️</div><span>SECURITY</span></div>
          <div onClick={() => setModalAktif('referral')} className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition"><div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center text-lg shadow-md">👥</div><span>REFERRAL</span></div>
          <div onClick={() => setModalAktif('detail')} className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition"><div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center text-lg shadow-md">📊</div><span>DETAILS</span></div>
        </div>
      </div>

      {/* POP-UP JENDELA 1: DETAILS KALKULASI RUMUS PI */}
      {modalAktif === 'detail' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">📊 Kalkulasi Rumus Kecepatan Mining</h3>
              <button onClick={() => setModalAktif(null)} className="w-7 h-7 bg-slate-800 rounded-full text-sm font-bold text-slate-400">✕</button>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 text-center space-y-2">
              <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-widest">Total Mining Rate Aktif</span>
              <span className="text-xl font-black text-white font-mono">{totalMiningRatePerJam.toFixed(8)} <span className="text-xs text-amber-400">BPT/hr</span></span>
              <div className="grid grid-cols-5 gap-1 items-center pt-2 text-[10px] font-bold text-slate-400">
                <div className="bg-slate-900 p-1.5 rounded-lg text-center"><span className="text-[6px] text-red-400 block uppercase leading-none mb-0.5">Base</span>{baseRate.toFixed(4)}</div>
                <div>×</div>
                <div className="bg-slate-900 p-1.5 rounded-lg text-center"><span className="text-[6px] text-green-400 block uppercase leading-none mb-0.5">Booster</span>{totalBoosterPercent}%</div>
                <div>×</div>
                <div className="bg-slate-900 p-1.5 rounded-lg text-center"><span className="text-[6px] text-blue-400 block uppercase leading-none mb-0.5">Rewards</span>{totalRewardsMultiplier.toFixed(2)}</div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl space-y-1.5">
                <h4 className="text-[9px] font-black text-green-400 uppercase tracking-wider">🛡️ Rincian Boosters (Persentase)</h4>
                <div className="flex justify-between text-[11px] text-slate-300"><span>Pioneer Dasar</span><span>100%</span></div>
                <div className="flex justify-between text-[11px] text-slate-300"><span>Lingkaran Keamanan ({hitungSecurityCount()}/5)</span><span>+{hitungSecurityCount() * 20}%</span></div>
                <div className="flex justify-between text-[11px] text-amber-400 font-bold"><span>Kontrak Staking ({durasiStakingDipilih})</span><span>+{dapatkanBonusStakingPercent()}%</span></div>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-xl space-y-1.5">
                <h4 className="text-[9px] font-black text-blue-400 uppercase tracking-wider">🎁 Rincian Rewards (Poin Pengali)</h4>
                <div className="flex justify-between text-[11px] text-slate-300"><span>Pioneer Dasar</span><span>1.00</span></div>
                <div className="flex justify-between text-[11px] text-slate-300"><span>Referral Tim Aktif ({hitungReferralAktif()})</span><span>+{hitungReferralAktif() * 0.25}</span></div>
                <div className="flex justify-between text-[11px] text-amber-400 font-bold"><span>Bonus Utilitas Finansial PPOB (3x)</span><span>+{ppobUsageBonus.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP JENDELA 2: STAKING KONTRAK DROPDOWN AKURAT */}
      {modalAktif === 'stake' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">🔒 Kunci Staking Kontrak Dinamis</h3>
              <button onClick={() => setModalAktif(null)} className="w-7 h-7 bg-slate-800 rounded-full text-sm font-bold text-slate-400">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                <div><span className="text-[8px] text-slate-500 block font-bold">ESTIMASI KAPASITAS BOOSTER ANDA</span><span className="font-mono text-white text-sm font-black">1.500 BPT STAKED</span></div>
                <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-lg font-black">+{dapatkanBonusStakingPercent()}% BOOST MINING</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[8px] text-slate-500 block font-bold mb-1 uppercase">Jumlah Alokasi Saldo</label>
                  <select value={persenStakingDipilih} onChange={(e) => setPersenStakingDipilih(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold text-[11px] focus:outline-none">
                    <option value="25%">25% Saldo</option><option value="50%">50% Saldo</option><option value="90%">90% Saldo</option><option value="100%">100% Saldo</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8px] text-slate-500 block font-bold mb-1 uppercase">Masa Penguncian Kontrak</label>
                  <select value={durasiStakingDipilih} onChange={(e) => setDurasiStakingDipilih(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-400 font-bold text-[11px] focus:outline-none">
                    <option value="6 Bulan">6 Bulan (+20% Boost)</option>
                    <option value="1 Tahun">1 Tahun (+50% Boost)</option>
                    <option value="2 Tahun">2 Tahun (+100% Boost)</option>
                    <option value="3 Tahun">3 Tahun (+150% Boost)</option>
                  </select>
                </div>
              </div>
              <button onClick={() => { alert(`Sukses Mengunci ${persenStakingDipilih} Saldo Selama ${durasiStakingDipilih}.`); setModalAktif(null); }} className="w-full bg-amber-500 text-slate-950 font-black p-2.5 rounded-xl text-xs uppercase shadow-md">KUNCI KONTRAK DAN SINKRONKAN RUMUS</button>
            </div>
          </div>
        </div>
      )}
            {/* POP-UP JENDELA 3: PORTAL SWAP MIGRATION */}
      {modalAktif === 'swap' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">🔄 Portal Swap Migrasi Bulanan</h3>
              <button onClick={() => setModalAktif(null)} className="w-7 h-7 bg-slate-800 rounded-full text-sm font-bold text-slate-400">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                <div><span className="text-[8px] text-slate-500 block font-bold">1. SWAP SALDO PRESALE TO BPT</span><span className="font-mono text-slate-500 font-bold">5.000.00000000 BPT</span></div>
                <button onClick={() => alert("Pencairan 10% Saldo Presale Baru Terbuka Otomatis Di Bulan Ke-13.")} className="text-[9px] bg-slate-800 text-slate-500 font-bold px-3 py-1.5 rounded-lg cursor-not-allowed">SWAP PRESALE</button>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                <div><span className="text-[8px] text-slate-500 block font-bold">2. SWAP SALDO PENAMBANGAN MURNI TO BPT</span><span className="font-mono text-green-400 font-bold">{saldoDompetB_Membeku.toFixed(8)} BPT</span></div>
                <button onClick={() => alert("Sukses Migrasi Saldo Penambangan!")} className="text-[9px] bg-purple-700 text-white font-black px-3 py-1.5 rounded-lg shadow-md active:scale-95 transition">SWAP MINING</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP JENDELA 4: SECURITY CIRCLE */}
      {modalAktif === 'security' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">🛡️ Lingkaran Keamanan (+20% Speed / Anggota)</h3>
              <button onClick={() => setModalAktif(null)} className="w-7 h-7 bg-slate-800 rounded-full text-sm font-bold text-slate-400">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              {securityCircle.map((member, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm ${member.username ? 'bg-slate-900 border-amber-500/20 text-amber-400' : 'bg-slate-950 border-dashed border-slate-800 text-slate-700'}`}>
                      {member.username ? '👤' : '+'}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{member.nama}</h4>
                      <span className="text-[9px] text-slate-500 block mt-0.5">{member.username ? member.username : 'Gunakan menu dashboard admin untuk entry data'}</span>
                    </div>
                  </div>
                  {member.username && (
                    <button 
                      onClick={() => alert(`Notifikasi Ping Pengingat sukses ditembakkan!`)}
                      className={`text-[8.5px] font-black px-2.5 py-1.5 rounded-lg shadow-md transition ${member.aktif ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 active:scale-95'}`}
                      disabled={member.aktif}
                    >
                      {member.aktif ? '● AKTIF MINING' : '🔔 INGATKAN MINING'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POP-UP JENDELA 5: TIM REFERRAL LAMPU INDIKATOR */}
      {modalAktif === 'referral' && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">👥 Pelacak Aktivitas Referral Anggota</h3>
              <button onClick={() => setModalAktif(null)} className="w-7 h-7 bg-slate-800 rounded-full text-sm font-bold text-slate-400">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              {referralTeam.map((ref, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[13px] leading-none ${ref.aktif ? 'text-green-400' : 'text-red-500 animate-pulse'}`}>●</span>
                    <div>
                      <h4 className="font-bold text-white text-xs">{ref.nama}</h4>
                      <span className="text-[9px] text-slate-500 block font-mono mt-0.5">{ref.username}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Sinyal PING dikirim!`)}
                    className={`text-[8.5px] font-black px-2.5 py-1.5 rounded-lg transition ${ref.aktif ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-not-allowed' : 'bg-red-500/10 border border-red-500/20 text-red-400 active:scale-95'}`}
                    disabled={ref.aktif}
                  >
                    {ref.aktif ? '✓ AKTIF TAMBANG' : '🔔 PING TIM'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
                        }
