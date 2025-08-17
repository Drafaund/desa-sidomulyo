"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const TentangDesaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "sambutan" | "sejarah" | "visi-misi"
  >("sambutan");

  // Effect untuk menangani hash URL dan navigasi langsung ke section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");

      switch (hash) {
        case "sambutan-kepala-desa":
          setActiveTab("sambutan");
          break;
        case "sejarah-desa":
          setActiveTab("sejarah");
          break;
        case "visi-misi":
          setActiveTab("visi-misi");
          break;
        default:
          break;
      }
    };

    // Jalankan saat pertama kali load
    handleHashChange();

    // Listen untuk perubahan hash
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Effect untuk scroll ke section setelah tab berubah
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Small delay to ensure tab content is rendered
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Tentang Desa Sidomulyo
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Mengenal lebih dekat sejarah, visi misi, dan kepemimpinan Desa
            Sidomulyo, Kecamatan Sidorejo, Magetan
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-1 py-4">
            <button
              onClick={() => setActiveTab("sambutan")}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "sambutan"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              Sambutan Kepala Desa
            </button>
            <button
              onClick={() => setActiveTab("sejarah")}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "sejarah"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              Sejarah Desa
            </button>
            <button
              onClick={() => setActiveTab("visi-misi")}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "visi-misi"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              Visi & Misi
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Sambutan Kepala Desa */}
        {activeTab === "sambutan" && (
          <section id="sambutan-kepala-desa" className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 p-6 sm:p-8 md:p-12 order-2 md:order-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 sm:mb-6">
                    Sambutan Kepala Desa
                  </h2>
                  <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-base sm:text-lg italic text-green-700 mb-4 sm:mb-6">
                      {` Assalamu'alaikum Warahmatullahi Wabarakatuh dan Salam
                      sejahtera untuk kita semua.`}
                    </p>
                    <p className="text-sm sm:text-base">
                      Selamat datang di website resmi Desa Sidomulyo, Kecamatan
                      Sidorejo, Kabupaten Magetan. Sebagai Kepala Desa, saya
                      merasa bangga dapat mempersembahkan profil dan kemajuan
                      desa kami kepada seluruh masyarakat.
                    </p>
                    <p className="text-sm sm:text-base">
                      Desa Sidomulyo memiliki potensi wisata alam yang luar
                      biasa, didukung dengan sektor pertanian dan peternakan
                      yang berkembang pesat. Kami berkomitmen untuk terus
                      mengembangkan infrastruktur dan fasilitas yang menarik
                      sekaligus pusat ekonomi yang berkemajuan.
                    </p>
                    <p className="text-sm sm:text-base">
                      Mari bersama-sama membangun Desa Sidomulyo yang lebih
                      maju, sejahtera, dan bertaqwa sama tinggi.
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-green-800 text-sm sm:text-base">
                      Siswo Pranoto
                    </p>
                    <p className="text-green-600 text-sm sm:text-base">
                      Kepala Desa Sidomulyo
                    </p>
                  </div>
                </div>
                <div className="md:w-1/3 bg-gradient-to-br from-green-100 to-green-200 p-6 sm:p-8 flex items-center justify-center order-1 md:order-2 min-h-[200px] md:min-h-auto">
                  <div className="text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-green-300 rounded-2xl mb-4 flex items-center justify-center mx-auto">
                      <span className="text-green-700 text-lg font-semibold">
                        <Image
                          src="/kepala-desa.jpg"
                          alt="Kepala Desa Sidomulyo"
                          width={240}
                          height={240}
                          className="rounded-full w-full h-full object-cover"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sejarah Desa */}
        {activeTab === "sejarah" && (
          <section id="sejarah-desa" className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3 sm:mb-4">
                Sejarah Desa Sidomulyo
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Asal usul Desa Sidomulyo dari penyatuan dua kelurahan bersejarah
              </p>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {/* Asal Usul */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4 sm:mb-6 text-center">
                  Asal Usul Desa Sidomulyo
                </h3>
                <div className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-500 mb-6 sm:mb-8">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    <strong>Desa Sidomulyo</strong> merupakan hasil penyatuan
                    dari dua desa/kelurahan, yaitu{" "}
                    <strong>Kelurahan Gangging</strong> dan{" "}
                    <strong>Kelurahan Ngijo</strong>. Berikut adalah sejarah dan
                    pembagian wilayah dari masing-masing kelurahan sebelum
                    penggabungan:
                  </p>
                </div>
              </div>

              {/* Kelurahan Gangging */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold flex items-center flex-wrap">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 bg-white text-green-600 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold mr-3 sm:mr-4 mb-2 sm:mb-0">
                      1
                    </span>
                    Kelurahan Gangging
                  </h3>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4">
                        Dukuh-dukuh yang Ada:
                      </h4>
                      <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                          Dukuh Gangging Utara
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                          Dukuh Gangging Selatan
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                          Dukuh Klatak
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                          Dukuh Kendal
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                          Dukuh Dukuh
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4">
                        Asal-Usul Nama Gangging
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Dahulu, di lereng Gunung Lawu terdapat sebuah hutan yang
                        dibuka oleh seorang kyai dari daerah Mataram bernama{" "}
                        <strong>Kyai Gangging</strong>. Beliau datang untuk
                        menyebarkan agama Islam. Setelah membabat hutan dan
                        mendirikan pemukiman, Kyai Gangging wafat dan dimakamkan
                        di wilayah tersebut.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                    <h5 className="font-bold text-blue-800 mb-3 text-sm sm:text-base">
                      Kondisi Saat Ini:
                    </h5>
                    <ul className="space-y-2 text-blue-700 text-sm sm:text-base">
                      <li>
                        • Dukuh Gangging Utara dan Selatan →{" "}
                        <strong>Dusun Gangging</strong> (10 RT, 2 RW)
                      </li>
                      <li>
                        • <strong>Makam Kyai Gangging</strong> terletak di RT 07
                        Desa Sidomulyo
                      </li>
                      <li>
                        • Dukuh Klatak dan Kendal →{" "}
                        <strong>Dusun Klatak</strong> (3 RT, 1 RW)
                      </li>
                      <li>
                        • Dukuh Dukuh digabung dengan Dukuh Gondang →{" "}
                        <strong>Dusun Gondang</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h5 className="font-bold text-green-800 mb-3 text-sm sm:text-base">
                      Kepala Desa Gangging:
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                      {[
                        "Irodikromo",
                        "Martodiryo",
                        "Martodiwiryo",
                        "Sutowiryo",
                        "Prawirodiryo",
                        "Ngali",
                        "Isman",
                        "Sonowijoyo",
                      ].map((nama, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 p-2 rounded text-xs sm:text-sm text-center font-medium text-gray-700"
                        >
                          {idx + 1}. {nama}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Kelurahan Ngijo */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold flex items-center flex-wrap">
                    <span className="w-6 h-6 sm:w-8 sm:h-8 bg-white text-green-700 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold mr-3 sm:mr-4 mb-2 sm:mb-0">
                      2
                    </span>
                    Kelurahan Ngijo
                  </h3>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="grid gap-6 sm:gap-8">
                    {/* Dukuh Ngijo */}
                    <div className="border-l-4 border-green-400 pl-4 sm:pl-6">
                      <h4 className="text-lg sm:text-xl font-bold text-green-800 mb-3">
                        A. Dukuh Ngijo
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3 text-sm sm:text-base">
                        {` Nama "Ngijo" berasal dari dua pohon beringin besar dan
                        rimbun yang berwarna hijau. Pohon tersebut dikeramatkan
                        dan sering digunakan untuk kegiatan adat. Karena daun
                        beringin yang hijau, masyarakat menamai daerah ini`}{" "}
                        <strong>Dukuh Ngijo</strong>.
                      </p>
                      <div className="bg-green-50 p-3 rounded">
                        <span className="text-green-700 font-semibold text-sm sm:text-base">
                          Saat ini: Dusun Ngijo (13 RT, 2 RW)
                        </span>
                      </div>
                    </div>

                    {/* Dukuh Manggis */}
                    <div className="border-l-4 border-orange-400 pl-4 sm:pl-6">
                      <h4 className="text-lg sm:text-xl font-bold text-green-800 mb-3">
                        B. Dukuh Manggis
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Wilayah ini dulunya adalah hutan, dan ketika dibuka,
                        ditemukan banyak pohon manggis besar yang berbuah
                        sepanjang waktu. Oleh karena itu dinamakan{" "}
                        <strong>Dukuh Manggis</strong>.
                      </p>
                    </div>

                    {/* Dukuh Ngrobyong */}
                    <div className="border-l-4 border-amber-400 pl-4 sm:pl-6">
                      <h4 className="text-lg sm:text-xl font-bold text-green-800 mb-3">
                        C. Dukuh Ngrobyong
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3 text-sm sm:text-base">
                        {`Saat dibuka, daerah ini memiliki pohon kopi besar dan
                        subur, dengan daun yang rimbun menyentuh tanah. Dalam
                        bahasa Jawa, kondisi ini disebut "Ngrobyong". Maka
                        wilayah ini dinamakan`}{" "}
                        <strong>Dukuh Ngrobyong</strong>.
                      </p>
                      <div className="bg-amber-50 p-3 rounded">
                        <span className="text-amber-700 font-semibold text-sm sm:text-base">
                          Saat ini: Dukuh Manggis + Ngrobyong → Dusun Ngrobyong
                          (8 RT, 1 RW)
                        </span>
                      </div>
                    </div>

                    {/* Dukuh Gondang */}
                    <div className="border-l-4 border-blue-400 pl-4 sm:pl-6">
                      <h4 className="text-lg sm:text-xl font-bold text-green-800 mb-3">
                        D. Dukuh Gondang
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-3 text-sm sm:text-base">
                        Nama Dukuh Gondang berasal dari banyaknya pohon gondang
                        besar di daerah ini saat pertama kali dibuka.
                      </p>
                      <div className="bg-blue-50 p-3 rounded">
                        <span className="text-blue-700 font-semibold text-sm sm:text-base">
                          Saat ini: Digabung dengan dukuh dari Kelurahan
                          Gangging → Dusun Gondang (11 RT, 2 RW)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <h5 className="font-bold text-green-800 mb-3 text-sm sm:text-base">
                      Kepala Desa Ngijo:
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {[
                        "Sutowiryo",
                        "Markawi",
                        "Wonodiryo",
                        "Kertodikromo",
                        "Rono",
                        "Sudarmo",
                      ].map((nama, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 p-2 rounded text-xs sm:text-sm text-center font-medium text-gray-700"
                        >
                          {idx + 1}. {nama}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Penggabungan */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-center">
                    🤝 Penggabungan Kelurahan
                  </h3>
                </div>
                <div className="p-6 sm:p-8 text-center">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
                    Setelah melalui proses penyatuan antara Kelurahan Gangging
                    dan Kelurahan Ngijo, desa gabungan tersebut diberi nama:
                  </p>
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 sm:p-8 rounded-xl sm:rounded-2xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                      DESA SIDOMULYO
                    </h2>
                    <p className="text-green-100 text-sm sm:text-base md:text-lg">
                      Gabungan dari dua kelurahan bersejarah
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Visi & Misi */}
        {activeTab === "visi-misi" && (
          <section id="visi-misi" className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3 sm:mb-4">
                Visi & Misi Desa
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Komitmen kami dalam membangun Desa Sidomulyo yang maju,
                sejahtera, dan berkelanjutan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Visi */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-green-800">
                    Visi
                  </h3>
                </div>
                <div className="bg-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-green-500">
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    Terwujudnya masyarakat Desa Sidomulyo yang transparan, adil,
                    dan merata.
                  </p>
                </div>
              </div>

              {/* Misi */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-green-800">
                    Misi
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Meningkatkan kualitas pelayanan kepada seluruh masyarakat ",
                    "Meningkatkan kualitas pendidikan",
                    "Meningkatkan pelayanan di bidang kesehatan",
                    "Meningkatkan sumber daya manusia khususnya bagi aparat pemerintahan desa Sidomulyo",
                    "Menggali, mengelola, serta mengembangkan potensi sumber daya alam yang ada di desa Sidomulyo",
                    "Meningkatkan stabilitas keamanan dan ketertiban ",
                    "Meningkatkan taraf hidup masyarakat",
                    "Menciptakan lingkungan yang indah, bersih dan sehat",
                    "Memperlancar jalur transportasi pertanian",
                  ].map((misi, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {misi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Data Statistik Desa */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Data Desa Sidomulyo
            </h2>
            <p className="text-lg sm:text-xl text-green-100">
              Informasi statistik dan demografi Desa Sidomulyo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "👥", value: "4.650", label: "Total Penduduk" },
              { icon: "🏠", value: "1.513", label: "Kepala Keluarga" },
              { icon: "📏", value: "480 ha", label: "Luas Desa (hektare)" },
              { icon: "🏘️", value: "5", label: "Dusun" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-green-400 font-medium text-xs sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangDesaPage;
