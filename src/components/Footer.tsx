import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo_desa_sidomulyo_fix.png"
                alt="Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
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

          {/* Kontak Info */}
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

          {/* Lokasi */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Lokasi
            </h4>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281.472009420646!2d111.27257895!3d-7.657826099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e798de91598e60d%3A0x19888cf45fec4f94!2sBalai%20Desa%20Sidomulyo!5e1!3m2!1sid!2sid!4v1753488096445!5m2!1sid!2sid"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center text-sm text-gray-400">
            <Image
              src="/logo-ugm.png"
              alt="Universitas Gadjah Mada"
              width={30}
              height={30}
              className="rounded-full mr-2"
            />
            <Image
              src="/logo-magetan-gemawan.png"
              alt="Logo KKN Magetan Gemawan UGM"
              width={30}
              height={30}
              className="rounded-full mr-2"
            />
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
