// src/app/PotensiDesa/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Phone, Mail, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../utils/supabase";

// Types
interface Attraction {
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

// Category colors config
const categoryColors: { [key: string]: any } = {
  Pertanian: {
    bg: "bg-green-600",
    bgLight: "bg-green-50",
    text: "text-green-600",
    hover: "hover:bg-green-100",
  },
  Peternakan: {
    bg: "bg-orange-600",
    bgLight: "bg-orange-50",
    text: "text-orange-600",
    hover: "hover:bg-orange-100",
  },
  Wisata: {
    bg: "bg-blue-600",
    bgLight: "bg-blue-50",
    text: "text-blue-600",
    hover: "hover:bg-blue-100",
  },
  Industri: {
    bg: "bg-purple-600",
    bgLight: "bg-purple-50",
    text: "text-purple-600",
    hover: "hover:bg-purple-100",
  },
};

export default function PotensiDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("attractions")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // No rows returned
            setAttraction(null);
          } else {
            throw new Error(`Error fetching attraction: ${error.message}`);
          }
        } else {
          // Transform data to match expected interface
          const transformedAttraction: Attraction = {
            ...data,
            image_url: data.image_url,
            full_description: data.full_description,
            operating_hours: data.operating_hours,
          };

          setAttraction(transformedAttraction);
        }
      } catch (err) {
        console.error("Error fetching attraction:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchAttraction();
    }
  }, [slug]);

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
          <Link href="/PotensiDesa">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Kembali ke Potensi Desa
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Potensi tidak ditemukan
          </h1>
          <p className="text-gray-600 mb-4">
            Potensi dengan slug "{slug}" tidak ditemukan.
          </p>
          <Link href="/PotensiDesa">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Kembali ke Potensi Desa
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColor = categoryColors[attraction.category] || {
    bg: "bg-gray-600",
    bgLight: "bg-gray-50",
    text: "text-gray-600",
    hover: "hover:bg-gray-100",
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
        <Image
          src={attraction.image_url}
          alt={attraction.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-4">
              <span
                className={`${categoryColor.bg} text-white px-4 py-2 rounded-full text-sm font-medium mr-4`}
              >
                {attraction.category}
              </span>
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {attraction.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {attraction.description}
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
                Tentang {attraction.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {attraction.full_description}
              </p>
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
                    <p className="text-gray-600">
                      {attraction.contact.address}
                    </p>
                  </div>
                </div>

                {attraction.contact.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Telepon</p>
                      <a
                        href={`tel:${attraction.contact.phone}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {attraction.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {attraction.contact.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a
                        href={`mailto:${attraction.contact.email}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {attraction.contact.email}
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
                    {attraction.operating_hours.days}
                  </p>
                  <p className="text-gray-600">
                    {attraction.operating_hours.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Lokasi</h3>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={attraction.location.embedUrl}
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
      </div>
    </div>
  );
}
