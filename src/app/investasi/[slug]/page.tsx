// src/app/investasi/[slug]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase";
import {
  ArrowLeft,
  Phone,
  Mail,
  User,
  CheckCircle,
  Clock,
  Target,
  AlertCircle,
  Leaf,
  Fence,
  TicketsPlane,
  Factory,
} from "lucide-react";

// Interface untuk data investment dari Supabase
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

// Configuration untuk kategori
const getCategoryConfig = (category: string) => {
  const configs = {
    Pertanian: {
      icon: Leaf,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    Peternakan: {
      icon: Fence,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
    Wisata: {
      icon: TicketsPlane,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    Industri: {
      icon: Factory,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  };

  return configs[category as keyof typeof configs] || configs.Pertanian;
};

export default function InvestmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [investment, setInvestment] = useState<Investment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("investments")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          setError("Investasi tidak ditemukan");
          return;
        }

        setInvestment(data);
      } catch (err) {
        console.error("Error fetching investment:", err);
        setError("Gagal memuat data investasi");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchInvestment();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data investasi...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !investment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Investasi tidak ditemukan"}
          </h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const config = getCategoryConfig(investment.category);
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Peluang Investasi
          </button>

          <div className="flex items-start gap-6">
            <div
              className={`w-16 h-16 ${config.bgColor} rounded-xl flex items-center justify-center`}
            >
              <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {investment.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.iconColor}`}
                >
                  {investment.category}
                </span>
              </div>

              <p className="text-gray-600 text-lg mb-4">
                {investment.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-500">ROI</div>
                    <div className="font-bold text-green-600">
                      {investment.roi}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">
                      Investasi Minimal
                    </div>
                    <div className="font-bold text-gray-900">
                      {investment.investasi_minimal}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-500">Periode</div>
                    <div className="font-bold text-gray-900">
                      {investment.periode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detail Description */}
            {investment.detail_description && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Deskripsi Lengkap
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {investment.detail_description}
                </p>
              </div>
            )}

            {/* Benefits */}
            {investment.benefits && investment.benefits.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Keuntungan & Manfaat
                </h2>
                <ul className="space-y-3">
                  {investment.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {investment.requirements && investment.requirements.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Persyaratan
                </h2>
                <ul className="space-y-3">
                  {investment.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timeline */}
            {investment.timeline && investment.timeline.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Timeline Pengembangan
                </h2>
                <div className="space-y-4">
                  {investment.timeline.map((phase, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          config.buttonColor.split(" ")[0]
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600">{phase}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            {investment.contact && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Kontak Person
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {investment.contact.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Koordinator Investasi
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a
                      href={`tel:${investment.contact.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {investment.contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a
                      href={`mailto:${investment.contact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {investment.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Investment Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ringkasan Investasi
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kategori</span>
                  <span className="font-semibold">{investment.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI</span>
                  <span className="font-semibold text-green-600">
                    {investment.roi}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modal Minimal</span>
                  <span className="font-semibold">
                    {investment.investasi_minimal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Periode</span>
                  <span className="font-semibold">{investment.periode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
