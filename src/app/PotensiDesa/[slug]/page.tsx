// src/app/PotensiDesa/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { supabase, handleSupabaseError } from "../../../utils/supabase";
import { CldImage } from "next-cloudinary";

// Types
interface Contact {
  phone?: string;
  email?: string;
  address: string;
}

interface OperatingHours {
  days: string;
  hours: string;
}

interface Location {
  lat: number;
  lng: number;
  embedUrl: string;
}

interface Potential {
  id: number;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  image_url: string;
  category: string;
  link: string;
  contact: Contact;
  operating_hours: OperatingHours;
  location: Location;
}

// Category colors configuration with proper typing
interface CategoryColorConfig {
  bg: string;
  bgLight: string;
  text: string;
  hover: string;
  borderLight: string;
}

const categoryColors: { [key: string]: CategoryColorConfig } = {
  Pertanian: {
    bg: "bg-green-600",
    bgLight: "bg-green-50",
    text: "text-green-600",
    hover: "hover:bg-green-100",
    borderLight: "border-green-200",
  },
  Peternakan: {
    bg: "bg-orange-600",
    bgLight: "bg-orange-50",
    text: "text-orange-600",
    hover: "hover:bg-orange-100",
    borderLight: "border-orange-200",
  },
  Perikanan: {
    bg: "bg-blue-600",
    bgLight: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:bg-blue-100",
    borderLight: "border-blue-200",
  },
  Pariwisata: {
    bg: "bg-red-600",
    bgLight: "bg-red-50",
    text: "text-red-600",
    hover: "hover:bg-red-100",
    borderLight: "border-red-200",
  },
  Industri: {
    bg: "bg-purple-600",
    bgLight: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:bg-purple-100",
    borderLight: "border-purple-200",
  },
};

export default function PotensiDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [potential, setPotential] = useState<Potential | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPotential = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from Supabase
        const { data, error: supabaseError } = await supabase
          .from("potential")
          .select("*")
          .eq("slug", slug)
          .single();

        if (supabaseError) {
          if (supabaseError.code === "PGRST116") {
            // No rows returned
            setPotential(null);
          } else {
            const errorMessage = handleSupabaseError(supabaseError);
            setError(errorMessage);
          }
          return;
        }

        // Validate and transform data
        if (!data) {
          setPotential(null);
          return;
        }

        // Transform data to match expected interface
        const transformedPotential: Potential = {
          id: data.id,
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          full_description: data.full_description || "",
          image_url: data.image_url || "/placeholder-image.jpg",
          category: data.category || "Umum",
          link: data.link || "",
          contact: {
            phone: data.contact?.phone || "",
            email: data.contact?.email || "",
            address: data.contact?.address || "Alamat tidak tersedia",
          },
          operating_hours: {
            days: data.operating_hours?.days || "Senin - Jumat",
            hours: data.operating_hours?.hours || "08:00 - 17:00",
          },
          location: {
            lat: data.location?.lat || 0,
            lng: data.location?.lng || 0,
            embedUrl: data.location?.embedUrl || "",
          },
        };

        setPotential(transformedPotential);
      } catch (err) {
        console.error("Error fetching potential:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan yang tidak diketahui"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPotential();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data potensi desa...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-700 mb-4">
              Terjadi Kesalahan
            </h1>
            <p className="text-red-600 mb-6">{error}</p>
            <Link href="/PotensiDesa">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Kembali ke Potensi Desa
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!potential) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Potensi Tidak Ditemukan
            </h1>
            <p className="text-gray-600 mb-6">
              Potensi dengan slug `<span className="font-medium">{slug}</span>`
              tidak ditemukan di database.
            </p>
            <Link href="/PotensiDesa">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Kembali ke Potensi Desa
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryColor = categoryColors[potential.category] || {
    bg: "bg-gray-600",
    bgLight: "bg-gray-50",
    text: "text-gray-600",
    hover: "hover:bg-gray-100",
    borderLight: "border-gray-200",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/PotensiDesa">
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali ke Potensi Desa
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="relative w-full h-full">
          <CldImage
            src={potential.image_url}
            alt={potential.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-image.jpg";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-4">
              <span
                className={`${categoryColor.bg} text-white px-4 py-2 rounded-full text-sm font-medium mr-4`}
              >
                {potential.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {potential.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {potential.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tentang {potential.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {potential.full_description}
                </p>
              </div>

              {/* Link jika ada */}
              {potential.link && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={potential.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Kunjungi Website
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Alamat</p>
                    <p className="text-gray-600">{potential.contact.address}</p>
                  </div>
                </div>

                {potential.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Telepon</p>
                      <a
                        href={`tel:${potential.contact.phone}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {potential.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {potential.contact.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a
                        href={`mailto:${potential.contact.email}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {potential.contact.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Jam Operasional
              </h3>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">
                    {potential.operating_hours.days}
                  </p>
                  <p className="text-gray-600">
                    {potential.operating_hours.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {potential.location.embedUrl && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Lokasi</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={potential.location.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
