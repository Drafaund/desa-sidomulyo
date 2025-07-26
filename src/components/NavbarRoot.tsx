"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavbarRoot = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fungsi untuk memeriksa apakah link aktif
  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  // Effect untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0); // Berubah segera setelah scroll dari posisi 0
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-xl"
          : "bg-white/5 backdrop-blur-md shadow-lg"
      }`}
    >
      {/* Main Navigation - dengan background yang berubah */}

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Made clickable */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/logo_desa_sidomulyo_fix.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Desa Sidomulyo
              </h1>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isScrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                Sidorejo, Magetan
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors relative ${
                isActive("/")
                  ? "text-green-500"
                  : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-green-500 rounded-full"></span>
              )}
            </Link>

            <Link
              href="/PotensiDesa"
              className={`font-medium transition-colors relative ${
                isActive("/PotensiDesa")
                  ? "text-green-500"
                  : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
              }`}
            >
              Potensi Desa
              {isActive("/PotensiDesa") && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-green-500 rounded-full"></span>
              )}
            </Link>

            <Link
              href="/Artikel"
              className={`font-medium transition-colors relative ${
                isActive("/Artikel")
                  ? "text-green-500"
                  : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
              }`}
            >
              Artikel
              {isActive("/Artikel") && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-green-500 rounded-full"></span>
              )}
            </Link>

            <Link
              href="/Contact"
              className={`font-medium transition-colors relative ${
                isActive("/Contact")
                  ? "text-green-500"
                  : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
              }`}
            >
              Kontak
              {isActive("/Contact") && (
                <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-green-500 rounded-full"></span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg hover:bg-gray-100/20 transition-colors ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`font-medium py-2 relative ${
                  isActive("/")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
              >
                Home
                {isActive("/") && (
                  <span className="absolute left-0 bottom-0 w-16 h-0.5 bg-green-500"></span>
                )}
              </Link>

              <Link
                href="/PotensiDesa"
                className={`font-medium py-2 relative ${
                  isActive("/PotensiDesa")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
              >
                Potensi Desa
                {isActive("/PotensiDesa") && (
                  <span className="absolute left-0 bottom-0 w-24 h-0.5 bg-green-500"></span>
                )}
              </Link>

              <Link
                href="/Artikel"
                className={`font-medium py-2 relative ${
                  isActive("/Artikel")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
              >
                Artikel
                {isActive("/Artikel") && (
                  <span className="absolute left-0 bottom-0 w-16 h-0.5 bg-green-500"></span>
                )}
              </Link>

              <Link
                href="/Contact"
                className={`font-medium py-2 relative ${
                  isActive("/Contact")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
              >
                Kontak
                {isActive("/Contact") && (
                  <span className="absolute left-0 bottom-0 w-16 h-0.5 bg-green-500"></span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarRoot;
