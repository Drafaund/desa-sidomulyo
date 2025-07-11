import { Play, ArrowRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import InvestmentOpportunities from "@/components/Investment";
import ArticleCard from "@/components/article/ArticleCard";
import { MessageCircle, Send, MapPin } from "lucide-react";
import Link from "next/link";
import { supabase } from "../utils/supabase";

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

// Category colors for Potentials
const categoryColors: { [key: string]: any } = {
  Pertanian: {
    bgLight: "bg-green-50",
    text: "text-green-600",
    borderLight: "border-green-200",
  },
  Peternakan: {
    bgLight: "bg-orange-50",
    text: "text-orange-600",
    borderLight: "border-orange-200",
  },
  Perikanan: {
    bgLight: "bg-blue-50",
    text: "text-blue-600",
    borderLight: "border-blue-200",
  },
  Parwisata: {
    bgLight: "bg-red-50",
    text: "text-red-600",
    borderLight: "border-red-200",
  },
  Industri: {
    bgLight: "bg-purple-50",
    text: "text-purple-600",
    borderLight: "border-purple-200",
  },
};

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
      data?.map((item: any) => ({
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

export default async function Home() {
  // Fetch data from Supabase
  const [latestArticles, latestPotentials] = await Promise.all([
    fetchLatestArticles(),
    fetchLatestPotentials(),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="relative min-w-full flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-blue-500"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 w-full p-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Sidomulyo
                </span>{" "}
                Village
              </h1>

              <p className="text-xl lg:text-2xl mb-8 text-green-50 leading-relaxed">
                Explore the hidden gems of Sidorejo, Magetan, East Java. From
                stunning natural landscapes to rich agricultural heritage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Video
                </button>

                <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center">
                  Explore Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/sawah.jpeg"
                  alt="Sidomulyo Village"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Potensi Section */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Potensi Desa Terbaru
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai potensi unggulan yang dimiliki oleh Desa
              Sidomulyo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPotentials.map((potential) => {
              const categoryColor = categoryColors[potential.category] || {
                bgLight: "bg-gray-50",
                text: "text-gray-600",
                borderLight: "border-gray-200",
              };

              return (
                <div
                  key={potential.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Clickable Card Container */}
                  <Link href={`/PotensiDesa/${potential.slug}`}>
                    <div className="cursor-pointer">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <Image
                          src={potential.image_url}
                          alt={potential.title}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`${categoryColor.bgLight} ${categoryColor.text} px-3 py-1 rounded-full text-sm font-medium border-2 ${categoryColor.borderLight} backdrop-blur-sm`}
                          >
                            {potential.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3
                          className={`text-xl font-semibold text-gray-900 mb-3 group-hover:${categoryColor.text} transition-colors`}
                        >
                          {potential.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {potential.description}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Learn More Button - Outside of Link to avoid nested links */}
                  <div className="px-6 pb-6">
                    <Link href={`/PotensiDesa/${potential.slug}`}>
                      <button
                        className={`group/btn flex items-center ${categoryColor.text} hover:opacity-80 font-medium transition-colors`}
                      >
                        Pelajari Lebih Lanjut
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/PotensiDesa">
              <button className="group bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                Lihat Semua Potensi
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <InvestmentOpportunities />

      {/* Latest Articles Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Berita & Artikel Terbaru
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ikuti perkembangan dan cerita inspiratif dari Desa Sidomulyo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-12">
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
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
            <p className="text-green-100">
              Ready to explore investment opportunities or plan your visit?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/62351123456"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <MessageCircle size={20} />
              <span>Chat Now</span>
            </a>

            {/* Email Button */}
            <a
              href="mailto:info@sidomulyo-village.id"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <Send size={20} />
              <span>Send Email</span>
            </a>

            {/* Visit Button */}
            <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105">
              <MapPin size={20} />
              <span>Get Directions</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
