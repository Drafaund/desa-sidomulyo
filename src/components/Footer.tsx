import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto py-8 md:py-12 px-4 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <Image
                src="/logo_desa_sidomulyo_fix.png"
                alt="Logo Desa Sidomulyo"
                width={50}
                height={50}
                className="rounded-full md:w-[60px] md:h-[60px]"
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold">Desa Sidomulyo</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Sidorejo, Magetan
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Terwujudnya Masyarakat Desa Sidomulyo yang Transparan Adil dan
              Merata
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 pt-2 md:pt-4">
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
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-green-400">
              Jelajahi
            </h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/PotensiDesa"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm md:text-base"
                >
                  Potensi Desa
                </Link>
              </li>
              <li>
                <Link
                  href="/Artikel"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm md:text-base"
                >
                  Artikel
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm md:text-base"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak Info */}
          <div className="space-y-4">
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-green-400">
              Kontak
            </h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin
                  size={16}
                  className="text-green-400 mt-1 flex-shrink-0 md:w-[18px] md:h-[18px]"
                />
                <div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                    Desa Sidomulyo, Kecamatan Sidorejo,
                    <br />
                    Kabupaten Magetan,
                    <br />
                    Jawa Timur, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone
                  size={16}
                  className="text-green-400 flex-shrink-0 md:w-[18px] md:h-[18px]"
                />
                <p className="text-gray-300 text-xs md:text-sm">
                  +62 851 3596 4679
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail
                  size={16}
                  className="text-green-400 flex-shrink-0 md:w-[18px] md:h-[18px]"
                />
                <p className="text-gray-300 text-xs md:text-sm break-all">
                  desasidomulyo07@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-green-400">
              Lokasi
            </h4>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281.472009420646!2d111.27257895!3d-7.657826099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e798de91598e60d%3A0x19888cf45fec4f94!2sBalai%20Desa%20Sidomulyo!5e1!3m2!1sid!2sid!4v1753488096445!5m2!1sid!2sid"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg md:h-[200px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-700 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-2 md:flex-row md:justify-center md:space-y-0 text-xs md:text-sm text-gray-400">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Image
                src="/logo-ugm.png"
                alt="Universitas Gadjah Mada"
                width={25}
                height={25}
                className="rounded-full md:w-[30px] md:h-[30px]"
              />
              <Image
                src="/logo-magetan-gemawan.png"
                alt="Logo KKN Magetan Gemawan UGM"
                width={25}
                height={25}
                className="rounded-full md:w-[30px] md:h-[30px]"
              />
            </div>
            <p className="leading-relaxed">
              © 2025 Desa Sidomulyo. Developed by{" "}
              <span className="block md:inline">
                <Link
                  href="https://www.linkedin.com/in/faundrapratamasukma/"
                  className="text-green-400 hover:underline"
                >
                  Faundra Pratama Sukma
                </Link>
              </span>{" "}
              <span className="block md:inline">
                Team KKN Magetan Gemawan UGM.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
