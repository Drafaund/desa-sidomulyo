import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Desa Sidomulyo</h3>
                <p className="text-gray-400 text-sm">Sidorejo, Magetan</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Terwujudnya Masyarakat Desa Sidomulyo yang Transparan Adil dan
              Merata
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://www.instagram.com/kita.sidomulyo/"
                className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.tiktok.com/@sidomulyokita?is_from_webapp=1&sender_device=pc"
                className="w-10 h-10 bg-gray-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                aria-label="Tiktok"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Jelajahi */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Jelajahi
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/PotensiDesa"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  Potensi Desa
                </Link>
              </li>
              <li>
                <Link
                  href="/Artikel"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Artikel
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Layanan
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#tourism-guidance"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Tourism Guidance
                </a>
              </li>
              <li>
                <a
                  href="#investment-consultation"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Investment Consultation
                </a>
              </li>
              <li>
                <a
                  href="#cultural-tours"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Cultural Tours
                </a>
              </li>
              <li>
                <a
                  href="#agricultural-programs"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Agricultural Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak Info - Uncommented and fixed */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Kontak
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin
                  size={18}
                  className="text-green-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300 text-sm">
                    Desa Sidomulyo, Kecamatan Sidorejo,
                    <br />
                    Kabupaten Magetan,
                    <br />
                    Jawa Timur, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-green-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+62 851 3596 4679</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-green-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  desasidomulyo07@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-400">
            <p>
              © 2025 Desa Sidomulyo. Developed by{" "}
              <span>
                <Link
                  href="https://www.linkedin.com/in/faundrapratamasukma/"
                  className="text-green-400 hover:underline"
                >
                  Faundra Pratama Sukma
                </Link>
              </span>{" "}
              Team KKN Magetan Gemawan UGM.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
