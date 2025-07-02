"use client";
import React, { useState } from "react";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-green-600 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>Desa Sidomulyo, Kec. Sidorejo, Magetan, Jawa Timur</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+62 351 123456</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span>info@sidomulyo-village.id</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Sidomulyo Village
              </h1>
              <p className="text-sm text-gray-600">Discover Hidden Gems</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              href="#village-potential"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Potensi Desa
            </Link>

            <Link
              href="#articles"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Artikel
            </Link>
            <Link
              href="/Contact"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Kontak
            </Link>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Explore Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <a
                href="/home"
                className="text-gray-700 hover:text-green-600 font-medium py-2"
              >
                Home
              </a>

              <a
                href="#village-potential"
                className="text-gray-700 hover:text-green-600 font-medium py-2"
              >
                Village Potential
              </a>

              <a
                href="#articles"
                className="text-gray-700 hover:text-green-600 font-medium py-2"
              >
                Artikel
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-green-600 font-medium py-2"
              >
                Kontak
              </a>
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium w-full mt-4">
                Explore Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
