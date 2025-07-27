// src/app/PotensiDesa/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PotensiCard from "@/components/potential/PotentialCard";
import {
  TreePine,
  Truck,
  Triangle,
  Users,
  MapPin,
  ArrowRight,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import InvestmentCard from "@/components/investation/InvestmentCard";
import { supabase } from "../../utils/supabase";
import Image from "next/image";

// Types
interface Potential {
  id: number;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  image_url: string;
  category: string;
  link: string;
  contact: {
    phone?: string;
    email?: string;
    address: string;
  };
  operating_hours: {
    days: string;
    hours: string;
  };
  location: {
    lat: number;
    lng: number;
    embedUrl: string;
  };
}

interface Investment {
  id: number;
  slug: string;
  title: string;
  category: "Pertanian" | "Peternakan" | "Wisata" | "Industri";
  roi: string;
  description: string;
  investasi_minimal: string;
  periode: string;
  detail_description?: string;
  benefits?: string[];
  requirements?: string[];
  timeline?: string[];
  contact?: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function PotensiDesaPage() {
  const router = useRouter();
  const [potentials, setPotentials] = useState<Potential[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch potentials - fixed table name from 'potentials' to 'potential'
        const { data: potentialsData, error: potentialsError } = await supabase
          .from("potential")
          .select("*")
          .order("id", { ascending: true });

        if (potentialsError) {
          throw new Error(
            `Error fetching potentials: ${potentialsError.message}`
          );
        }

        // Fetch investments
        const { data: investmentsData, error: investmentsError } =
          await supabase
            .from("investments")
            .select("*")
            .order("id", { ascending: true });

        if (investmentsError) {
          throw new Error(
            `Error fetching investments: ${investmentsError.message}`
          );
        }

        // Transform potentials data to match expected interface
        const transformedPotentials: Potential[] =
          potentialsData?.map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            description: item.description,
            full_description: item.full_description,
            image_url: item.image_url,
            category: item.category,
            link: item.link,
            contact: item.contact || { address: "" },
            operating_hours: item.operating_hours || { days: "", hours: "" },
            location: item.location || { lat: 0, lng: 0, embedUrl: "" },
          })) || [];

        // Transform investments data to match expected interface
        const transformedInvestments: Investment[] =
          investmentsData?.map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            category: item.category,
            roi: item.roi,
            description: item.description,
            investasi_minimal: item.investasi_minimal,
            periode: item.periode,
            detail_description: item.detail_description,
            benefits: item.benefits,
            requirements: item.requirements,
            timeline: item.timeline,
            contact: item.contact,
          })) || [];

        setPotentials(transformedPotentials);
        setInvestments(transformedInvestments);

        console.log("Potentials loaded:", transformedPotentials.length);
        console.log("Investments loaded:", transformedInvestments.length);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories from data
  const categories = [
    "Semua",
    ...Array.from(new Set(potentials.map((potential) => potential.category))),
  ];

  // Get unique investment categories
  const investmentCategories = [
    "Semua",
    ...Array.from(
      new Set(investments.map((investment) => investment.category))
    ),
  ];

  // Filter potentials based on active tab
  const filteredPotentials =
    activeTab === "Semua"
      ? potentials
      : potentials.filter((potential) => potential.category === activeTab);

  // Filter investments based on active category
  const filteredInvestments =
    activeInvestmentCategory === "Semua"
      ? investments
      : investments.filter(
          (investment) => investment.category === activeInvestmentCategory
        );

  const handleInvestmentClick = (slug: string) => {
    router.push(`/investasi/${slug}`);
  };

  // Helper function to get category colors for tabs
  const getCategoryTabColors = (category: string, isActive: boolean) => {
    const colorMap = {
      Pertanian: {
        active: "bg-green-600 text-white",
        inactive: "bg-green-50 text-green-600 hover:bg-green-100",
      },
      Peternakan: {
        active: "bg-orange-600 text-white",
        inactive: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      },
      Perikanan: {
        active: "bg-blue-600 text-white",
        inactive: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      },
      Pariwisata: {
        active: "bg-red-600 text-white",
        inactive: "bg-red-50 text-red-600 hover:bg-red-100",
      },
      Industri: {
        active: "bg-purple-600 text-white",
        inactive: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      },
      Semua: {
        active: "bg-gray-600 text-white",
        inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      },
    };

    const colors =
      colorMap[category as keyof typeof colorMap] || colorMap.Semua;
    return isActive ? colors.active : colors.inactive;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/macbook-mockup-resized.png"
                    alt="Potensi Desa Sidomulyo"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TreePine className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">850+</p>
                      <p className="text-sm text-gray-600">Hektar Lahan</p>
                    </div>
                  </div>
                </div>

                {/* Small decorative dots */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="absolute top-12 left-8 w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute top-8 left-16 w-1 h-1 bg-yellow-400 rounded-full"></div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                <span>Desa Sidomulyo, Magetan</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Potensi Desa
                  <span className="block text-green-600">Sidomulyo</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Jelajahi kekayaan alam dan berbagai potensi unggulan yang
                  dimiliki desa kami. Dari pertanian yang subur, peternakan yang
                  berkembang, hingga destinasi wisata yang memukau.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TreePine className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Pertanian</p>
                      <p className="text-sm text-gray-600">Lahan subur</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Peternakan</p>
                      <p className="text-sm text-gray-600">320+ ternak</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Triangle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Wisata</p>
                      <p className="text-sm text-gray-600">12 destinasi</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Komunitas</p>
                      <p className="text-sm text-gray-600">2,450 penduduk</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("potensi-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                >
                  <span>Jelajahi Potensi</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("investment-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg border-2 border-green-200 hover:border-green-300"
                >
                  Peluang Investasi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Main Content */}
      <div id="potensi-section" className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Eksplorasi Potensi Desa
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Temukan berbagai sektor unggulan yang menjadi kekuatan ekonomi
                dan daya tarik wisata Desa Sidomulyo.
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white py-6 border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const isActive = activeTab === category;
                const colorClasses = getCategoryTabColors(category, isActive);

                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${colorClasses}`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content - PotensiCard component handles its own colors */}
        <PotensiCard potentials={filteredPotentials} />
      </div>

      {/* Investment Section */}
      <section id="investment-section" className="py-20 bg-white">
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
              const colorClasses = getCategoryTabColors(category, isActive);

              return (
                <button
                  key={category}
                  onClick={() => setActiveInvestmentCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${colorClasses}`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInvestments.map((investment) => (
              <div key={investment.id} className="p-4 rounded-xl">
                <InvestmentCard
                  title={investment.title}
                  description={investment.description}
                  roi={investment.roi}
                  minInvestment={investment.investasi_minimal}
                  period={investment.periode}
                  category={investment.category}
                  onButtonClick={() => handleInvestmentClick(investment.slug)}
                />
              </div>
            ))}
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
