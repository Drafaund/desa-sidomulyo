"use client";
import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Siap untuk menjelajahi peluang investasi atau merencanakan kunjungan
            Anda ke Desa Sidomulyo?
          </p>
        </div>
      </div>

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
