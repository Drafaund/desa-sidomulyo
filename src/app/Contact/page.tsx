"use client";
import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Clock,
  Users,
} from "lucide-react";
import Image from "next/image";

// Interface untuk form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Interface untuk contact method
interface ContactMethod {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  action: string;
  color: string;
  href: string;
}

// MAIN PAGE COMPONENT - INI YANG AKAN DIEXPORT DEFAULT
export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Type untuk form submit event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage(
          "Pesan berhasil dikirim! Kami akan segera menghubungi Anda."
        );
        setIsSuccess(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatusMessage(
          result.error ||
            "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi."
        );
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatusMessage(
        "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi."
      );
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Type untuk input change event
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat langsung dengan tim kami",
      action: "Chat Sekarang",
      color: "from-green-400 to-green-600",
      href: "https://wa.me/6285135964679",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Kirim pertanyaan Anda",
      action: "Kirim Email",
      color: "from-blue-400 to-blue-600",
      href: "mailto:desasidomulyo07@gmail.com",
    },
    {
      icon: MapPin,
      title: "Kunjungi Kami",
      description: "Sidorejo, Magetan, Jawa Timur",
      action: "Lihat Lokasi",
      color: "from-red-400 to-red-600",
      href: "https://maps.app.goo.gl/ZLW784xRuuxGLPEa8",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-8 sm:top-12 md:top-20 right-4 sm:right-6 md:right-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center lg:px-30">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Main Title */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-xs sm:text-sm font-medium text-green-700 mb-4">
                  <Users className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                  Terhubung dengan Desa Sidomulyo
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mari Berkenalan
                  </span>
                  <br />
                  <span className="text-gray-800">dengan Kami</span>
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Kami siap membantu Anda mengenal lebih dekat keindahan dan
                  potensi
                  <span className="font-semibold text-green-600">
                    {" "}
                    Desa Sidomulyo
                  </span>
                  . Hubungi kami kapan saja!
                </p>
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <a
                  href="https://wa.me/6285135964679"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Chat WhatsApp
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 font-semibold rounded-xl sm:rounded-2xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
                >
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Telepon Kami
                </a>
              </div>
            </div>

            {/* Right Content - Enhanced Visual */}
            <div className="relative order-1 lg:order-2">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl mx-4 sm:mx-0">
                {/* Floating Elements */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <Mail className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                </div>

                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                </div>

                {/* Main Image */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                  <Image
                    src="/billboard-kontak.png"
                    alt="Hubungi Desa Sidomulyo"
                    width={400}
                    height={200}
                    className="w-full h-auto object-cover"
                  />

                  {/* Overlay with Contact Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 lg:p-6">
                    <div className="text-white">
                      <div className="flex items-center text-xs sm:text-sm mb-1 sm:mb-2">
                        <Clock className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                        Online 24/7
                      </div>
                      <div className="font-semibold text-sm sm:text-base">
                        Desa Sidomulyo
                      </div>
                      <div className="text-xs sm:text-sm opacity-90">
                        Sidorejo, Magetan, Jawa Timur
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements - Hidden on mobile */}
                <div className="hidden sm:block absolute top-1/2 -right-4 lg:-right-8 w-16 lg:w-32 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
                <div className="hidden sm:block absolute top-1/3 -left-4 lg:-left-8 w-12 lg:w-24 h-1 bg-gradient-to-l from-blue-400 to-transparent rounded-full"></div>
              </div>

              {/* Background Decorative Circles - Hidden on mobile */}
              <div className="hidden sm:block absolute -z-10 top-6 lg:top-10 right-6 lg:right-10 w-24 lg:w-40 h-24 lg:h-40 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="hidden sm:block absolute -z-10 bottom-6 lg:bottom-10 left-6 lg:left-10 w-20 lg:w-32 h-20 lg:h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-8 sm:h-10 lg:h-12 fill-white"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Contact Methods */}
            <div className="space-y-6 sm:space-y-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                Cara Menghubungi
              </h3>

              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className="group bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                      <div
                        className={`flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${method.color} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                          {method.title}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">
                          {method.description}
                        </p>
                        <a
                          href={method.href}
                          className={`inline-flex items-center text-xs sm:text-sm font-medium bg-gradient-to-r ${method.color} bg-clip-text text-transparent hover:underline`}
                        >
                          {method.action}
                          <Send className="ml-1 h-3 sm:h-4 w-3 sm:w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                Kirim Pesan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="Nama lengkap Anda"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="email@contoh.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none text-sm sm:text-base"
                    placeholder="Ceritakan tentang ketertarikan Anda pada Desa Sidomulyo..."
                    required
                  ></textarea>
                </div>

                {/* Status Message */}
                {statusMessage && (
                  <div
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl text-sm flex items-start sm:items-center space-x-2 ${
                      isSuccess
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                    ) : (
                      <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                    )}
                    <span className="text-xs sm:text-sm">{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white"></div>
                      <span>Mengirim...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="h-4 sm:h-5 w-4 sm:w-5" />
                      <span>Kirim Pesan</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Responsive */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Responsive */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-xs sm:text-sm font-medium text-green-700 mb-3 sm:mb-4">
              <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
              Lokasi Kami
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Temukan{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Balai Desa Sidomulyo
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kunjungi langsung kantor Balai Desa Sidomulyo di Sidorejo,
              Magetan, Jawa Timur. Kami siap menyambut kedatangan Anda dengan
              ramah.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Map Container - Responsive */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative bg-white p-1 sm:p-2 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                {/* Decorative Elements - Hidden on mobile */}
                <div className="hidden sm:block absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-8 sm:w-16 h-8 sm:h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl sm:rounded-2xl opacity-20 animate-pulse"></div>
                <div className="hidden sm:block absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-6 sm:w-12 h-6 sm:h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg sm:rounded-xl opacity-20 animate-pulse delay-1000"></div>

                {/* Map iframe - Responsive */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.397247141442!2d111.26245287484284!3d-7.6545633923617205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e798de91598e60d%3A0x19888cf45fec4f94!2sBalai%20Desa%20Sidomulyo!5e1!3m2!1sid!2sid!4v1753417562360!5m2!1sid!2sid"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl sm:rounded-2xl sm:h-[350px] lg:h-[450px]"
                  />
                </div>
              </div>
            </div>

            {/* Location Info - Responsive */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              {/* Address Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start sm:items-center mb-3 sm:mb-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Alamat Lengkap
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Lokasi resmi kantor desa
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong>Balai Desa Sidomulyo</strong>
                  <br />
                  Sidorejo, Magetan
                  <br />
                  Jawa Timur, Indonesia
                </p>
              </div>

              {/* Operating Hours Card */}
              <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start sm:items-center mb-3 sm:mb-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Jam Operasional
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Waktu pelayanan kantor
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm sm:text-base text-gray-700">
                  <div className="flex justify-between">
                    <span>Senin - Kamis</span>
                    <span className="font-medium">07:30 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{`Jum'at`}</span>
                    <span className="font-medium">07:30 - 11:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu - Minggu</span>
                    <span className="text-red-500 font-medium">Tutup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
