// src/app/PotensiDesa/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PotensiCard from "@/components/potential/PotentialCard";
import { attractionsData, categoryColors } from "../../../data/attractionsData";
import { TreePine, Truck, Triangle, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
import InvestmentCard from "@/components/investation/InvestmentCard";
import {
  investmentData,
  getCategoryConfig,
} from "../../../data/investmentData";

export default function PotensiDesaPage() {
  const router = useRouter();

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

  const [activeTab, setActiveTab] = useState("Semua");
  const [activeInvestmentCategory, setActiveInvestmentCategory] =
    useState("Semua");

  // Get unique categories from data
  const categories = [
    "Semua",
    ...Array.from(
      new Set(attractionsData.map((attraction) => attraction.category))
    ),
  ];

  // Get unique investment categories
  const investmentCategories = [
    "Semua",
    ...Array.from(
      new Set(investmentData.map((investment) => investment.category))
    ),
  ];

  // Filter attractions based on active tab
  const filteredAttractions =
    activeTab === "Semua"
      ? attractionsData
      : attractionsData.filter(
          (attraction) => attraction.category === activeTab
        );

  // Filter investments based on active category
  const filteredInvestments =
    activeInvestmentCategory === "Semua"
      ? investmentData
      : investmentData.filter(
          (investment) => investment.category === activeInvestmentCategory
        );

  const handleInvestmentClick = (slug: string) => {
    router.push(`/investasi/${slug}`);
  };

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
        <div className="bg-white py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const isActive = activeTab === category;

                // Get category color
                const getCategoryColors = () => {
                  if (category === "Semua") {
                    return {
                      active: "bg-gray-600 text-white",
                      inactive: "bg-gray-100 text-gray-600 hover:bg-gray-100",
                    };
                  }

                  const colorConfig = categoryColors[category];
                  if (!colorConfig) {
                    return {
                      active: "bg-gray-600 text-white",
                      inactive: "bg-white text-gray-600 hover:bg-gray-100",
                    };
                  }

                  return {
                    active: `${colorConfig.bg} text-white`,
                    inactive: `${colorConfig.bgLight} ${colorConfig.text} ${colorConfig.hover}`,
                  };
                };

                const colors = getCategoryColors();

                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      isActive ? colors.active : colors.inactive
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <PotensiCard
          attractions={filteredAttractions}
          categoryColors={categoryColors}
        />
      </div>

      <section className="py-20 bg-white">
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

          {/* Investment Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {investmentCategories.map((category) => {
              const isActive = activeInvestmentCategory === category;

              // Get category config for styling
              let categoryConfig = null;
              if (category !== "Semua") {
                categoryConfig = getCategoryConfig(category as any);
              }

              // Define colors for each category
              const getActiveColors = () => {
                if (category === "Semua") {
                  return "bg-gray-600 text-white";
                }

                const colorMap = {
                  Pertanian: "bg-green-600 text-white",
                  Peternakan: "bg-orange-600 text-white",
                  Wisata: "bg-blue-600 text-white",
                  Industri: "bg-purple-600 text-white",
                };

                return (
                  colorMap[category as keyof typeof colorMap] ||
                  "bg-gray-600 text-white"
                );
              };

              const getInactiveColors = () => {
                if (category === "Semua") {
                  return "bg-gray-100 text-gray-600 hover:bg-gray-100";
                }

                const colorMap = {
                  Pertanian: "bg-green-50 text-green-600 hover:bg-green-100",
                  Peternakan:
                    "bg-orange-50 text-orange-600 hover:bg-orange-100",
                  Wisata: "bg-blue-50 text-blue-600 hover:bg-blue-100",
                  Industri: "bg-purple-50 text-purple-600 hover:bg-purple-100",
                };

                return (
                  colorMap[category as keyof typeof colorMap] ||
                  "bg-white text-gray-600 hover:bg-gray-100"
                );
              };

              return (
                <button
                  key={category}
                  onClick={() => setActiveInvestmentCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    isActive ? getActiveColors() : getInactiveColors()
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInvestments.map((investment) => {
              const config = getCategoryConfig(investment.category);
              const IconComponent = config.icon;

              return (
                <div key={investment.id} className="p-4 rounded-xl">
                  <InvestmentCard
                    icon={
                      <IconComponent
                        className={`w-6 h-6 ${config.iconColor}`}
                      />
                    }
                    title={investment.title}
                    description={investment.description}
                    roi={investment.roi}
                    minInvestment={investment.investasiMinimal}
                    period={investment.periode}
                    buttonColor={config.buttonColor}
                    bgcolor={config.bgColor}
                    onButtonClick={() => handleInvestmentClick(investment.slug)}
                  />
                </div>
              );
            })}
          </div>

          {filteredInvestments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada investasi yang tersedia untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
