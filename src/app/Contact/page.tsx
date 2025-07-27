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
      href: "https://wa.me/1234567890",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Kirim pertanyaan Anda",
      action: "Kirim Email",
      color: "from-blue-400 to-blue-600",
      href: "mailto:samiunbasirun555@gmail.com",
    },
    {
      icon: MapPin,
      title: "Kunjungi Kami",
      description: "Sidorejo, Magetan, Jawa Timur",
      action: "Lihat Lokasi",
      color: "from-red-400 to-red-600",
      href: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mx-40">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Main Title */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-medium text-green-700 mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  Terhubung dengan Desa Sidomulyo
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mari Berkenalan
                  </span>
                  <br />
                  <span className="text-gray-800">dengan Kami</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/1234567890"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat WhatsApp
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-2xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Telepon Kami
                </a>
              </div>
            </div>

            {/* Right Content - Enhanced Visual */}
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <Mail className="w-8 h-8 text-white" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin className="w-6 h-6 text-white" />
                </div>

                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/billboard-kontak.png"
                    alt="Hubungi Desa Sidomulyo"
                    width={400}
                    height={200}
                    className="w-full h-auto object-cover"
                  />

                  {/* Overlay with Contact Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="text-white">
                      <div className="flex items-center text-sm mb-2">
                        <Clock className="w-4 h-4 mr-1" />
                        Online 24/7
                      </div>
                      <div className="font-semibold">Desa Sidomulyo</div>
                      <div className="text-sm opacity-90">
                        Sidorejo, Magetan, Jawa Timur
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 -right-8 w-32 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
                <div className="absolute top-1/3 -left-8 w-24 h-1 bg-gradient-to-l from-blue-400 to-transparent rounded-full"></div>
              </div>

              {/* Background Decorative Circles */}
              <div className="absolute -z-10 top-10 right-10 w-40 h-40 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -z-10 bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12 fill-white"
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Cara Menghubungi
              </h3>

              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className="group bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {method.title}
                        </h4>
                        <p className="text-gray-600 mb-3">
                          {method.description}
                        </p>
                        <a
                          href={method.href}
                          className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${method.color} bg-clip-text text-transparent hover:underline`}
                        >
                          {method.action}
                          <Send className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Kirim Pesan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
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
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Ceritakan tentang ketertarikan Anda pada Desa Sidomulyo..."
                    required
                  ></textarea>
                </div>

                {/* Status Message */}
                {statusMessage && (
                  <div
                    className={`p-4 rounded-xl text-sm flex items-center space-x-2 ${
                      isSuccess
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Mengirim...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Kirim Pesan</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
