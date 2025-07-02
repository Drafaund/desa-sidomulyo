import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
                <h3 className="text-xl font-bold">Sidomulyo Village</h3>
                <p className="text-gray-400 text-sm">Discover Hidden Gems</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover the beauty and potential of Sidomulyo Village, Sidorejo,
              Magetan, East Java. From stunning natural landscapes to rich
              agricultural heritage.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-700 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#tourism"
                  className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  Tourism
                </a>
              </li>
              <li>
                <a
                  href="#village-potential"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Village Potential
                </a>
              </li>
              <li>
                <a
                  href="#investment"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Investment
                </a>
              </li>
              <li>
                <a
                  href="#articles"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Services
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

          {/* Contact Info - Uncommented and fixed */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 text-green-400">
              Contact
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
                <p className="text-gray-300 text-sm">+62 351 123456</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-green-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  info@sidomulyo-village.id
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {currentYear} Sidomulyo Village. Developed by KKN Team
              Universitas.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a
                href="#privacy"
                className="hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-green-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#sitemap"
                className="hover:text-green-400 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
