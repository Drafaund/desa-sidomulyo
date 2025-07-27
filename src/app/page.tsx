"use client";

import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import InvestmentOpportunities from "@/components/Investment";
import ArticleCard from "@/components/article/ArticleCard";
import { MessageCircle, Send, MapPin } from "lucide-react";
import Link from "next/link";
import { supabase } from "../utils/supabase";
import Carousel from "@/components/Carousel";
import PotensiCard from "@/components/potential/PotentialCard";
import AOS from "aos";
import "aos/dist/aos.css";

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
      <section data-aos="fade-in">
        <Carousel slides={carouselSlides} autoSlideInterval={5000} />
      </section>

      {/* Latest Potensi Section */}
      <section className="py-16 bg-gradient-to-b from-green-200 bg-opacity-60 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Potensi Desa Terbaru
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
            className="text-center mt-12"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <Link href="/PotensiDesa">
              <button className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                Lihat Semua Potensi
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section */}
      <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
        <InvestmentOpportunities />
      </div>

      {/* Latest Articles Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Berita & Artikel Terbaru
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ikuti perkembangan dan cerita inspiratif dari Desa Sidomulyo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            className="text-center mt-12"
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            <Link href="/Artikel">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center gap-2">
                Lihat Semua Artikel
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Actions */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-6 w-full">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              Get in Touch
            </h3>
            <p className="text-green-100">
              Ready to explore investment opportunities or plan your visit?
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/62351123456"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              data-aos="slide-right"
              data-aos-delay="600"
            >
              <MessageCircle size={20} />
              <span>Chat Now</span>
            </a>

            {/* Email Button */}
            <a
              href="mailto:info@sidomulyo-village.id"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              data-aos="slide-up"
              data-aos-delay="700"
            >
              <Send size={20} />
              <span>Send Email</span>
            </a>

            {/* Visit Button */}
            <button
              className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              data-aos="slide-left"
              data-aos-delay="800"
            >
              <MapPin size={20} />
              <span>Get Directions</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
