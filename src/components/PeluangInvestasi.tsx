import React from "react";

const peluang = [
  {
    title: "Agrowisata Terpadu",
    desc: "Pengembangan kawasan agrowisata dengan konsep farm-to-table, edukasi pertanian, dan homestay tradisional.",
    investasi: "Rp 500 Jt",
    periode: "3-5 Tahun",
    roi: "25-35%",
    color: "green",
  },
  {
    title: "Industri Pengolahan",
    desc: "Pembangunan fasilitas pengolahan hasil pertanian dan peternakan dengan teknologi modern.",
    investasi: "Rp 800 Jt",
    periode: "4-6 Tahun",
    roi: "20-30%",
    color: "blue",
  },
];

const PeluangInvestasi = () => {
  return (
    <section className="py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Peluang Investasi
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Berbagai peluang investasi menarik dengan potensi keuntungan yang
          menjanjikan
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {peluang.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border p-6 bg-gradient-to-br from-white to-gray-50"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">{item.desc}</p>
            <div className="flex justify-between text-sm mb-4">
              <span>
                <strong>Investasi Minimal:</strong> {item.investasi}
              </span>
              <span>
                <strong>Periode:</strong> {item.periode}
              </span>
            </div>
            <button
              className={`px-4 py-2 rounded text-white bg-${item.color}-600 hover:bg-${item.color}-700`}
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PeluangInvestasi;
