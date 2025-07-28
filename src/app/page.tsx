"use client";

import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import ArticleCard from "@/components/article/ArticleCard";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { supabase } from "../utils/supabase";
import Carousel from "@/components/Carousel";
import PotensiCard from "@/components/potential/PotentialCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

// Define types for our data
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image_url: string;
  featured: boolean;
  tags: string[];
}

interface Potential {
  id: number;
  slug: string;
  title: string;
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

// Database article interface for raw data from Supabase
interface DatabaseArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string | null;
  image_url: string;
  featured: boolean;
  tags: string[] | null;
}

// Async function to fetch data from Supabase
async function fetchLatestArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching articles:", error);
      return [];
    }

    // Transform the data to match our Article interface
    const transformedData =
      data?.map((item: DatabaseArticle) => ({
        ...item,
        date: item.date
          ? new Date(item.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        tags: item.tags || [],
      })) || [];

    return transformedData;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

async function fetchLatestPotentials(): Promise<Potential[]> {
  try {
    const { data, error } = await supabase
      .from("potential") // Changed from "Potentials" to "potential"
      .select("*")
      .order("id", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching Potentials:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching Potentials:", error);
    return [];
  }
}

const carouselSlides = [
  {
    id: 1,
    image: "/desa-sidomulyo.jpg",
    title: "Selamat Datang di Website Desa Sidomulyo",
    description:
      "Temukan solusi terbaik untuk kebutuhan bisnis Anda dengan layanan profesional kami.",
    buttonText: "Pelajari Lebih Lanjut",
    buttonLink: "/",
  },
  {
    id: 2,
    image: "/sumber-mata-air-gangging.jpg",
    title: "Potensi Desa Sidomulyo",
    description:
      "Jelajahi potensi alam, budaya, dan sumber daya yang kaya di Desa Sidomulyo.",
    buttonText: "Lihat Potensi Desa",
    buttonLink: "/PotensiDesa",
  },
  {
    id: 3,
    image: "/peternakan-sapi-perah.jpg",
    title: "Tim Profesional",
    description: "Tertarik untuk berinvestasi?",
    buttonText: "Hubungi Kami",
    buttonLink: "/Investasi",
  },
  {
    id: 4,
    image: "/perangkat-desa.jpg",
    title: "Tim Profesional",
    description: "Update informasi dan berita Desa Sidomulyo",
    buttonText: "Lihat Artikel",
    buttonLink: "Artikel",
  },
];

export default function Home() {
  const [latestArticles, setLatestArticles] = React.useState<Article[]>([]);
  const [latestPotentials, setLatestPotentials] = React.useState<Potential[]>(
    []
  );

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    // Fetch data
    const fetchData = async () => {
      const [articles, potentials] = await Promise.all([
        fetchLatestArticles(),
        fetchLatestPotentials(),
      ]);
      setLatestArticles(articles);
      setLatestPotentials(potentials);
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Carousel Section */}
      <section data-aos="fade-in" className="w-full">
        <Carousel slides={carouselSlides} autoSlideInterval={5000} />
      </section>

      {/* Village Profile Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Text Content - Left Side */}
            <div
              className="space-y-4 sm:space-y-6 order-2 lg:order-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Profil Desa Sidomulyo
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mb-4 sm:mb-6"></div>
              </div>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                Desa Sidomulyo merupakan desa yang terletak di kaki Gunung Lawu,
                Kabupaten Magetan, Jawa Timur. Desa ini terbentuk dari
                penggabungan dua wilayah, yaitu Kelurahan Gangging dan Kelurahan
                Ngijo, yang masing-masing memiliki sejarah, budaya, dan potensi
                alam yang unik.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                Dikenal dengan keindahan alamnya serta udara yang sejuk,
                Sidomulyo memiliki potensi unggulan di bidang pertanian,
                perkebunan seperti mawar, kopi, dan lemon, serta peternakan sapi
                perah dalam skala kecil. Kehidupan masyarakat yang rukun, budaya
                lokal yang masih lestari, dan nilai sejarah yang kuat menjadikan
                Desa Sidomulyo sebagai salah satu desa yang kaya akan potensi
                sekaligus nilai-nilai kearifan lokal.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 sm:pt-4">
                <div className="flex items-center text-green-700">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="font-medium text-sm sm:text-base">
                    Kaki Gunung Lawu, Magetan
                  </span>
                </div>
              </div>

              {/* Button */}
              <div className="pt-4 sm:pt-6">
                <Link href="/TentangDesa">
                  <button className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                    Lihat Profil Desa
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Image - Right Side */}
            <div
              className="relative order-1 lg:order-2"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
                <Image
                  src="/desa-sidomulyo.jpg"
                  alt="Profil Desa Sidomulyo"
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  width={500}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Decorative elements - Hidden on mobile for cleaner look */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse hidden sm:block"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-full opacity-30 animate-pulse delay-1000 hidden sm:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Potensi Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-green-200 bg-opacity-60 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Potensi Desa Terbaru
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Temukan berbagai potensi unggulan yang dimiliki oleh Desa
              Sidomulyo
            </p>
          </div>

          {/* Use PotensiCard component with default colors */}
          <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1200">
            <PotensiCard potentials={latestPotentials} />
          </div>

          {/* View All Button */}
          <div
            className="text-center mt-8 sm:mt-10 lg:mt-12"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <Link href="/PotensiDesa">
              <button className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                Lihat Semua Potensi
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Berita & Artikel Terbaru
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Ikuti perkembangan dan cerita inspiratif dari Desa Sidomulyo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article, index) => (
              <div
                key={article.id}
                data-aos="fade-up"
                data-aos-delay={400 + index * 200}
                data-aos-duration="800"
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          <div
            className="text-center mt-8 sm:mt-10 lg:mt-12"
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            <Link href="/Artikel">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base  hover:scale-105">
                Lihat Semua Artikel
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
