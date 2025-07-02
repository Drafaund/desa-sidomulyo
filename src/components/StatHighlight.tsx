"use client";
import React from "react";

const stats = [
  { label: "Hektar Lahan Pertanian", value: 850 },
  { label: "Kepala Ternak", value: 320 },
  { label: "Destinasi Wisata", value: 12 },
  { label: "Penduduk Aktif", value: 2450 },
];

const StatHighlights = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-bold text-green-600">{stat.value}</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatHighlights;
