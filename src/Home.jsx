import React, { useState, useEffect } from 'react';

export default function Home({ activeTab, daftarIklan, logoResmi }) {
  if (activeTab !== 'home') return null;

  const [indeksIklan, setIndeksIklan] = useState(0);
  const [tokoTerpilih, setTokoTerpilih] = useState(null);
  const [kategoriTerpilih, setKategoriTerpilih] = useState(null);
  const [kataKunciCari, setKataKunciCari] = useState('');
  const [jendelaCariTerbuka, setJendelaCariTerbuka] = useState(false);
  const [lapakAcak, setLapakAcak] = useState([]);

  const masterLapak = [
    { nama: "Warung Kopi Pioneer Khas Kintamani", ikon: "☕", desc: "Sedia kopi hangat, bubuk kopi murni, dan camilan Bali", tag: "F&B" },
    { nama: "Jasa Cetak KTA Bali Mandiri", ikon: "🎨", desc: "Cetak kartu digital KTA fisik premium dan atribut BPT", tag: "Jasa" },
    { nama: "Sembako Murah Pionir Sukses", ikon: "🌾", desc: "Beras, minyak goreng, gula pasir harga grosir", tag: "Sembako" },
    { nama: "Bengkel Motor Pioneer Jaya", ikon: "🔧", desc: "Service mesin, ganti oli, dan ban garansi bersahabat", tag: "Otomotif" },
    { nama: "Bali Pioneer Furniture Jepara", ikon: "🪑", desc: "Meja, kursi, lemari kayu jati kualitas ekspor premium", tag: "Furniture" },
    { nama: "Pioneer Gadget Center Denpasar", ikon: "💻", desc: "Laptop bekas bergaransi, service hp, dan aksesoris", tag: "Technology" },
    { nama: "Toko Jam Arloji Pioneer Mandiri", ikon: "⌚", desc: "Sedia jam tangan mewah, ganti baterai, bisa bayar pakai BPT", tag: "Aksesoris" },
    { nama: "Distro Pakaian Pionir Trendi", ikon: "👕", desc: "Kaos komunitas BPT, jaket, dan topi bordir kustom", tag: "Pakaian" },
    { nama: "Kuliner Babi Guling Pionir Sanur", ikon: "🍛", desc: "Nasi babi guling khas Bali renyah dan bumbu genep mantap", tag: "F&B" },
    { nama: "L Laundry Kilat Anggota BPT", ikon: "🧺", desc: "Cuci kering setrika ekspres 1 hari selesai wangi bersih", tag: "Jasa" },
    { nama: "Grosir Telur Ayam Pionir Sejahtera", ikon: "🥚", desc: "Telur ayam segar langsung peternak harga anggota", tag: "Sembako" }
  ];

  useEffect(() => {
    const diacak = [...masterLapak].sort(() => Math.random() - 0.5);
    setLapakAcak(diacak);

    const interval = setInterval(() => {
      setIndeksIklan((indeksSebelumnya) => 
        indeksSebelumnya === daftarIklan.length - 1 ? 0 : indeksSebelumnya + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [daftarIklan.length]);

  const daftarKategori = [
    { id: 'sembako', nama: 'Sembako', ikon: '🌾' },
    { id: 'otomotif', nama: 'Otomotif', ikon: '🔧' },
    { id: 'furniture', nama: 'Furniture', ikon: '🪑' },
    { id: 'tech', nama: 'Technology', ikon: '💻' },
    { id: 'aksesoris', nama: 'Aksesoris', ikon: '📿' },
    { id: 'jasa', nama: 'Jasa Resmi', ikon: '🎨' },
    { id: 'fashion', nama: 'Pakaian', ikon: '👕' },
  ];

  const eksekusiPencarian = (e) => {
    e.preventDefault();
    if (kataKunciCari.trim() !== '') {
      setJendelaCariTerbuka(true);
    }
  };

  return (
    <div className="p-4 flex-1 space-y-4 relative">
      <div className="w-full bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-4 text-center min-h-[90px] flex items-center justify-center relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[7px] font-bold px-2 py-0.5 rounded-bl-xl tracking-wider">SPONSOR & EVENT</div>
        <p className="text-[11px] text-amber-300 font-semibold max-w-xs animate-pulse">
          📢 {daftarIklan[indeksIklan]}
        </p>
      </div>

      <form onSubmit={eksekusiPencarian} className="w-full relative">
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400 text-xs">🔍</span>
          <input 
            type="text" 
            placeholder="Ketik produk atau toko (misal: jam, kopi)..." 
            value={kataKunciCari}
            onChange={(e) => setKataKunciCari(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/50 rounded-xl p-2.5 pl-9 pr-20 text-xs text-white focus:outline-none transition duration-150"
          />
          <button type="submit" className="absolute right-1.5 bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase">
            Cari
          </button>
        </div>
      </form>

      <div className="space-y-1.5">
        <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">🗂️ Kategori Pilihan</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x">
          {daftarKategori.map((kat) => (
            <div key={kat.id} onClick={() => setKategoriTerpilih(kat.nama)} className="flex flex-col items-center gap-1 min-w-[65px] snap-center cursor-pointer active:scale-90 duration-100">
              <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-xl shadow-md">
                {kat.ikon}
              </div>
              <span className="text-[9px] font-medium text-slate-300 text-center truncate w-full">{kat.nama}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">🏪 Semua Lapak Komunitas BPT</h3>
        <div className="grid grid-cols-2 gap-3">
          {lapakAcak.map((lapak, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between shadow-md">
              <div className="w-full h-24 bg-slate-800 flex items-center justify-center text-3xl border-b border-slate-800/50 relative">
                {lapak.ikon}
                <span className="absolute top-2 left-2 bg-slate-950/60 text-slate-300 text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase">{lapak.tag}</span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div className="text-left">
                  <h4 className="text-[11px] font-bold text-slate-200 line-clamp-2 leading-tight min-h-[32px]">{lapak.nama}</h4>
                  <p className="text-[9px] text-slate-400 line-clamp-2 mt-1 leading-normal">{lapak.desc}</p>
                </div>
                <button onClick={() => setTokoTerpilih(lapak)} className="w-full bg-slate-800 border border-slate-700 text-amber-400 font-bold py-1.5 rounded-xl text-[9px] uppercase tracking-wider">
                  Lihat Toko
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
           {tokoTerpilih && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl">{tokoTerpilih.ikon}</div>
                <div className="text-left">
                  <span className="text-[8px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded uppercase">{tokoTerpilih.tag}</span>
                  <h3 className="text-sm font-bold text-white mt-1">{tokoTerpilih.nama}</h3>
                </div>
              </div>
              <button onClick={() => setTokoTerpilih(null)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-sm text-slate-400">✕</button>
            </div>
            <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800 text-left">{tokoTerpilih.desc}</p>
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">📦 Produk Toko</h4>
              <div className="text-xs text-slate-500 text-center py-6 border border-dashed border-slate-800 rounded-xl">[ Belum ada katalog produk ]</div>
            </div>
          </div>
        </div>
      )}

      {kategoriTerpilih && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-amber-400 uppercase">📁 Kategori: {kategoriTerpilih}</h3>
              <button onClick={() => setKategoriTerpilih(null)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-sm text-slate-400">✕</button>
            </div>
            <div className="space-y-3 pt-2">
              {masterLapak.filter(t => t.tag.toLowerCase() === kategoriTerpilih.toLowerCase()).length > 0 ? (
                masterLapak.filter(t => t.tag.toLowerCase() === kategoriTerpilih.toLowerCase()).map((toko, i) => (
                  <div key={i} onClick={() => { setTokoTerpilih(toko); setKategoriTerpilih(null); }} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex gap-3 items-center cursor-pointer hover:border-amber-500/20">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xl">{toko.ikon}</div>
                    <div className="text-left flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{toko.nama}</h4>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{toko.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 text-center py-10 border border-dashed border-slate-800 rounded-xl">
                  Belum ada Lapak UMKM terdaftar di kategori <span className="text-amber-400 font-bold">{kategoriTerpilih}</span> ini.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {jendelaCariTerbuka && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-end justify-center p-0">
          <div className="w-full max-w-md bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="text-left">
                <span className="text-[8px] text-slate-500 block uppercase font-bold">HASIL PENCARIAN</span>
                <h3 className="text-xs font-bold text-white mt-0.5">Kata Kunci: <span className="text-amber-400">"{kataKunciCari}"</span></h3>
              </div>
              <button onClick={() => { setJendelaCariTerbuka(false); setKataKunciCari(''); }} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-sm text-slate-400">✕</button>
            </div>
            <div className="space-y-3 pt-2">
              {masterLapak.filter(t => t.nama.toLowerCase().includes(kataKunciCari.toLowerCase()) || t.desc.toLowerCase().includes(kataKunciCari.toLowerCase())).length > 0 ? (
                masterLapak.filter(t => t.nama.toLowerCase().includes(kataKunciCari.toLowerCase()) || t.desc.toLowerCase().includes(kataKunciCari.toLowerCase())).map((toko, i) => (
                  <div key={i} onClick={() => { setTokoTerpilih(toko); setJendelaCariTerbuka(false); }} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex gap-3 items-center cursor-pointer hover:border-amber-500/20">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xl">{toko.ikon}</div>
                    <div className="text-left flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{toko.nama}</h4>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{toko.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 text-center py-10 border border-dashed border-slate-800 rounded-xl">
                  Lapak <span className="text-red-400 font-bold">"{kataKunciCari}"</span> tidak ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full bg-slate-900 border border-dashed border-slate-800 rounded-xl py-2 text-center text-[8px] text-slate-600 tracking-widest mt-4 uppercase">
        Slot Iklan Penopang Kas Perusahaan (Adds Space)
      </div>
    </div>
  );
              }
      
