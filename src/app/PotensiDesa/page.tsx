// src/app/PotensiDesa/page.tsx
"use client";

import React, { useState } from "react";
import PotentialCategoryTabs from "@/components/potential/PotentialCategory";
import PotensiCard from "@/components/potential/PotentialCard";
import { attractionsData, categoryColors } from "../../../data/attractionsData";
import { TreePine, Truck, Triangle, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import InvestmentCard from "@/components/investation/InvestmentCard";
import { Leaf, Factory } from "lucide-react";

export default function PotensiDesaPage() {
  const statistikData = [
    {
      icon: <TreePine className="w-8 h-8 text-green-600" />,
      jumlah: "850",
      label: "Hektar Lahan Pertanian",
      color: "text-green-600",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      jumlah: "320",
      label: "Kepala Ternak",
      color: "text-blue-600",
    },
    {
      icon: <Triangle className="w-8 h-8 text-orange-600" />,
      jumlah: "12",
      label: "Destinasi Wisata",
      color: "text-orange-600",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      jumlah: "2,450",
      label: "Penduduk Aktif",
      color: "text-purple-600",
    },
  ];

  const investasiData = [
    {
      id: 1,
      title: "Agrowisata Terpadu",
      roi: "25-35%",
      description:
        "Pengembangan kawasan agrowisata dengan konsep farm-to-table, edukasi pertanian, dan homestay tradisional.",
      investasiMinimal: "Rp 500 Jt",
      periode: "3-5 Tahun",
      color: "green",
      bgColor: "bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
    },
    {
      id: 2,
      title: "Industri Pengolahan",
      roi: "20-30%",
      description:
        "Pembangunan fasilitas pengolahan hasil pertanian dan peternakan dengan teknologi modern untuk meningkatkan nilai tambah.",
      investasiMinimal: "Rp 800 Jt",
      periode: "4-6 Tahun",
      color: "blue",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      icon: <Factory className="w-6 h-6 text-blue-600" />,
    },
  ];

  const [activeTab, setActiveTab] = useState("Semua");

  // Get unique categories from data
  const categories = [
    "Semua",
    ...Array.from(
      new Set(attractionsData.map((attraction) => attraction.category))
    ),
  ];

  // Filter attractions based on active tab
  const filteredAttractions =
    activeTab === "Semua"
      ? attractionsData
      : attractionsData.filter(
          (attraction) => attraction.category === activeTab
        );

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistikData.map((item, index) => (
              <StatCard
                key={index}
                icon={item.icon}
                jumlah={item.jumlah}
                label={item.label}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Potensi Desa
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Jelajahi berbagai potensi yang dimiliki desa kami, mulai dari
                pertanian, peternakan, hingga wisata alam yang menawan.
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <PotentialCategoryTabs
          categories={categories}
          activeTab={activeTab}
          bgColor="bg-white"
          setActiveTab={setActiveTab}
          categoryColors={categoryColors}
        />

        {/* Content */}
        <PotensiCard
          attractions={filteredAttractions}
          categoryColors={categoryColors}
        />
      </div>

      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Peluang Investasi Desa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai peluang investasi strategis yang ditawarkan oleh
              Desa Sidomulyo untuk pengembangan ekonomi berkelanjutan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investasiData.map((investasi) => (
              <div key={investasi.id} className={` p-4 rounded-xl`}>
                <InvestmentCard
                  icon={investasi.icon}
                  title={investasi.title}
                  description={investasi.description}
                  roi={investasi.roi}
                  minInvestment={investasi.investasiMinimal}
                  period={investasi.periode}
                  buttonColor={investasi.buttonColor}
                  bgcolor={investasi.bgColor}
                  onButtonClick={() => {
                    console.log(`Klik investasi: ${investasi.title}`);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
