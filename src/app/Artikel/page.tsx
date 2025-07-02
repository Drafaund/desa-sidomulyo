"use client";
import React, { useState } from "react";
import { Search, Calendar, User, ChevronRight, Mail } from "lucide-react";
import Image from "next/image";

const DesaArticlePage = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");

  const categories = [
    "Semua",
    "Kesehatan",
    "Budaya & Sejarah",
    "Agro & Lingkungan",
    "Pembangunan",
    "Pendidikan",
  ];

  const articles = [
    {
      id: 1,
      title:
        "Inovasi Pertanian Organik di Desa Sidomulyo: Menuju Ketahanan Pangan Berkelanjutan",
      excerpt:
        "Desa Sidomulyo mengembangkan sistem pertanian organik yang tidak hanya ramah lingkungan tetapi juga meningkatkan produktivitas hasil panen. Program ini melibatkan seluruh petani lokal...",
      category: "Agro & Lingkungan",
      author: "Ahmad Rizki",
      date: "15 Desember 2024",
      readTime: "5 min",
      image: "/api/placeholder/400/250",
      featured: true,
    },
    {
      id: 2,
      title: "Program Posyandu Balita: Menurunkan Angka Stunting di Desa",
      excerpt:
        "Upaya konsisten dalam program posyandu yang terintegrasi berhasil menurunkan angka stunting pada balita hingga 40% dalam 2 tahun terakhir...",
      category: "Kesehatan",
      author: "Dr. Sari Indah",
      date: "12 Des 2024",
      readTime: "6 min",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Melestarikan Tari Tradisional Jawa di Era Digital",
      excerpt:
        "Generasi muda Desa Sidomulyo aktif mempelajari dan mengembangkan tari tradisional sebagai warisan budaya yang harus dilestarikan...",
      category: "Budaya & Sejarah",
      author: "Dewi Kusuma",
      date: "10 Des 2024",
      readTime: "7 min",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Pembangunan Infrastruktur Jalan Menuju Desa Wisata",
      excerpt:
        "Proyek perbaikan jalan utama dan akses menuju objek wisata berhasil meningkatkan kunjungan wisatawan hingga 150%...",
      category: "Pembangunan",
      author: "Budi Santoso",
      date: "8 Des 2024",
      readTime: "8 min",
      image: "/api/placeholder/300/200",
    },
    {
      id: 5,
      title: "Budidaya Ikan Lele: Alternatif Ekonomi Kreatif Desa",
      excerpt:
        "Program budidaya ikan lele sistem bioflok memberikan peluang usaha baru bagi warga dengan modal yang terjangkau...",
      category: "Agro & Lingkungan",
      author: "Agus Priyanto",
      date: "6 Des 2024",
      readTime: "4 min",
      image: "/api/placeholder/300/200",
    },
    {
      id: 6,
      title: "Pemberdayaan Ibu-ibu PKK Melalui Usaha Kerajinan Batik",
      excerpt:
        "Kelompok PKK Desa Sidomulyo untuk mendukung usaha kerajinan batik tulis yang menjadi produk unggulan dan sumber pendapatan tambahan...",
      category: "Pemberdayaan",
      author: "Ibu Siti Aminah",
      date: "5 Des 2024",
      readTime: "5 min",
      image: "/api/placeholder/300/200",
    },
    {
      id: 7,
      title: "Program Literasi Digital untuk Pemuda Desa",
      excerpt:
        "Inisiatif pelatihan komputer dan internet untuk pemuda desa dalam rangka meningkatkan daya saing di era digital...",
      category: "Pendidikan",
      author: "Andi Wijaya",
      date: "3 Des 2024",
      readTime: "6 min",
      image: "/api/placeholder/300/200",
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeTab === "Semua" || article.category === activeTab;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Terima kasih telah berlangganan newsletter!");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Artikel & Berita Desa Sidomulyo
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Temukan informasi terkini tentang kesehatan, budaya, agro, dan
            kehidupan desa
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Artikel Terbaru</h2>

        {/* Featured Article */}
        {filteredArticles.find((article) => article.featured) && (
          <div className="mb-12">
            {(() => {
              const featured = filteredArticles.find(
                (article) => article.featured
              );
              return (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <Image
                        width={600}
                        height={400}
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {featured.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 hover:text-blue-600 cursor-pointer">
                        {featured.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{featured.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{featured.date}</span>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                          Baca Selengkapnya
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles
            .filter((article) => !article.featured)
            .map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        article.category === "Kesehatan"
                          ? "bg-red-100 text-red-800"
                          : article.category === "Budaya & Sejarah"
                          ? "bg-purple-100 text-purple-800"
                          : article.category === "Agro & Lingkungan"
                          ? "bg-green-100 text-green-800"
                          : article.category === "Pembangunan"
                          ? "bg-blue-100 text-blue-800"
                          : article.category === "Pendidikan"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Muat Artikel Lainnya
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Berlangganan Newsletter</h2>
          <p className="text-gray-300 mb-8">
            Dapatkan artikel terbaru dan informasi penting langsung di email
            Anda
          </p>

          <div className="max-w-md mx-auto flex gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <button
              onClick={handleNewsletterSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Berlangganan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesaArticlePage;
