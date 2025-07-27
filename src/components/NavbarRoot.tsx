"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavbarRoot = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  // Fungsi untuk memeriksa apakah link aktif
  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  // Fungsi untuk scroll ke section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileDropdownOpen(false);
    setIsMenuOpen(false);
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

  const dropdownItems = [
    { label: "Sambutan Kepala Desa", id: "sambutan-kepala-desa" },
    { label: "Sejarah Desa", id: "sejarah-desa" },
    { label: "Visi & Misi", id: "visi-misi" },
  ];

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

            {/* Tentang Desa Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                href="/TentangDesa"
                className={`font-medium transition-colors relative flex items-center space-x-1 ${
                  isActive("/TentangDesa")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
              >
                <span>Tentang Desa</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                {isActive("/TentangDesa") && (
                  <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-green-500 rounded-full"></span>
                )}
              </Link>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <Link
                    href="/TentangDesa"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Tentang Desa
                  </Link>
                  {dropdownItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Navigasi ke halaman TentangDesa terlebih dahulu jika belum di halaman tersebut
                        if (pathname !== "/TentangDesa") {
                          window.location.href = `/TentangDesa#${item.id}`;
                        } else {
                          scrollToSection(item.id);
                        }
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
                onClick={() => setIsMenuOpen(false)}
              >
                Home
                {isActive("/") && (
                  <span className="absolute left-0 bottom-0 w-16 h-0.5 bg-green-500"></span>
                )}
              </Link>

              {/* Mobile Tentang Desa Dropdown */}
              <div>
                <button
                  onClick={toggleMobileDropdown}
                  className={`font-medium py-2 relative flex items-center justify-between w-full ${
                    isActive("/TentangDesa")
                      ? "text-green-500"
                      : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                  }`}
                >
                  <span>Tentang Desa</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isMobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isActive("/TentangDesa") && (
                    <span className="absolute left-0 bottom-0 w-24 h-0.5 bg-green-500"></span>
                  )}
                </button>

                {/* Mobile Dropdown Items */}
                {isMobileDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/TentangDesa"
                      className={`block py-2 transition-colors ${
                        isScrolled
                          ? "text-gray-600 hover:text-green-600"
                          : "text-white/80 hover:text-green-400"
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileDropdownOpen(false);
                      }}
                    >
                      Tentang Desa
                    </Link>
                    {dropdownItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (pathname !== "/TentangDesa") {
                            window.location.href = `/TentangDesa#${item.id}`;
                          } else {
                            scrollToSection(item.id);
                          }
                        }}
                        className={`block w-full text-left py-2 transition-colors ${
                          isScrolled
                            ? "text-gray-600 hover:text-green-600"
                            : "text-white/80 hover:text-green-400"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/PotensiDesa"
                className={`font-medium py-2 relative ${
                  isActive("/PotensiDesa")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
                onClick={() => setIsMenuOpen(false)}
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
                onClick={() => setIsMenuOpen(false)}
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
                onClick={() => setIsMenuOpen(false)}
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
