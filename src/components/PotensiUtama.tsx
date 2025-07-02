import Image from "next/image";
import React from "react";

const data = [
  {
    title: "Pertanian",
    image: "/images/pertanian.jpg",
    points: [
      "850 ha lahan produktif",
      "Irigasi teknis modern",
      "Organik certified",
    ],
    button: "Lihat Detail",
    color: "green",
  },
  {
    title: "Wisata",
    image: "/images/wisata.jpg",
    points: [
      "12 destinasi wisata",
      "Wisata budaya tradisional",
      "Akses mudah dijangkau",
    ],
    button: "Lihat Detail",
    color: "blue",
  },
  {
    title: "Peternakan",
    image: "/images/peternakan.jpg",
    points: ["320 kepala ternak", "Pakan organik lokal", "Sistem modern"],
    button: "Lihat Detail",
    color: "amber",
  },
];

const PotensiUtama = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Kategori Potensi Utama
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Desa Sidomulyo memiliki berbagai potensi unggulan yang siap
          dikembangkan untuk kemajuan bersama
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {data.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6">
            <Image
              width={400}
              height={300}
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <ul className="mb-4 space-y-2 text-sm text-gray-600">
              {item.points.map((point, j) => (
                <li key={j}>✔ {point}</li>
              ))}
            </ul>
            <button
              className={`px-4 py-2 rounded text-white bg-${item.color}-600 hover:bg-${item.color}-700`}
            >
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PotensiUtama;
