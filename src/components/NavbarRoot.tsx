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
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Improved dropdown handlers with delay
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay before closing
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
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

      <div className="w-full px-1 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center py-1.5 sm:py-2 md:py-3 lg:py-4">
          {/* Logo - Fixed di kiri */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <Image
                src="/logo_desa_sidomulyo_fix.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
              />
              <div className="min-w-0">
                <h1
                  className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold transition-colors duration-300 leading-tight ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  Desa Sidomulyo
                </h1>
                <p
                  className={`text-[10px] sm:text-xs md:text-sm transition-colors duration-300 leading-tight ${
                    isScrolled ? "text-gray-700" : "text-white/90"
                  }`}
                >
                  Sidorejo, Magetan
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Di tengah hanya untuk desktop */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-3 lg:space-x-5 xl:space-x-7">
              <Link
                href="/"
                className={`font-medium transition-colors relative text-sm lg:text-base ${
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/TentangDesa"
                  className={`font-medium transition-colors relative flex items-center space-x-1 text-sm lg:text-base ${
                    isActive("/TentangDesa")
                      ? "text-green-500"
                      : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                  }`}
                >
                  <span>Tentang Desa</span>
                  <ChevronDown
                    size={14}
                    className={`lg:w-4 lg:h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isActive("/TentangDesa") && (
                    <span className="absolute bottom-[-8px] left-0 w-full h-1 bg-green-500 rounded-full"></span>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-52 lg:w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href="/TentangDesa"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Tentang Desa
                    </Link>
                    {dropdownItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          // Navigasi ke halaman TentangDesa terlebih dahulu jika belum di halaman tersebut
                          if (pathname !== "/TentangDesa") {
                            window.location.href = `/TentangDesa#${item.id}`;
                          } else {
                            scrollToSection(item.id);
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/PotensiDesa"
                className={`font-medium transition-colors relative text-sm lg:text-base ${
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
                className={`font-medium transition-colors relative text-sm lg:text-base ${
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
                className={`font-medium transition-colors relative text-sm lg:text-base ${
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
          </div>

          {/* Mobile Menu Button - Fixed di kanan */}
          <div className="flex-shrink-0 md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-1 sm:p-1.5 md:p-2 rounded-lg hover:bg-gray-100/20 transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              ) : (
                <Menu size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - More compact */}
        {isMenuOpen && (
          <div className="md:hidden py-1.5 sm:py-2 md:py-3 border-t border-gray-100/20">
            <div className="flex flex-col space-y-1.5 px-0.5 sm:px-1">
              <Link
                href="/"
                className={`font-medium py-1.5 relative text-xs sm:text-sm ${
                  isActive("/")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
                {isActive("/") && (
                  <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-green-500"></span>
                )}
              </Link>

              {/* Mobile Tentang Desa Dropdown */}
              <div>
                <button
                  onClick={toggleMobileDropdown}
                  className={`font-medium py-1.5 relative flex items-center justify-between w-full text-xs sm:text-sm ${
                    isActive("/TentangDesa")
                      ? "text-green-500"
                      : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                  }`}
                >
                  <span>Tentang Desa</span>
                  <ChevronDown
                    size={12}
                    className={`sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                      isMobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isActive("/TentangDesa") && (
                    <span className="absolute left-0 bottom-0 w-16 sm:w-20 h-0.5 bg-green-500"></span>
                  )}
                </button>

                {/* Mobile Dropdown Items */}
                {isMobileDropdownOpen && (
                  <div className="pl-1.5 sm:pl-2 mt-1 space-y-1">
                    <Link
                      href="/TentangDesa"
                      className={`block py-1 transition-colors text-xs sm:text-sm ${
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
                        className={`block w-full text-left py-1 transition-colors text-xs sm:text-sm ${
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
                className={`font-medium py-2 relative text-sm ${
                  isActive("/PotensiDesa")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Potensi Desa
                {isActive("/PotensiDesa") && (
                  <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-green-500"></span>
                )}
              </Link>

              <Link
                href="/Artikel"
                className={`font-medium py-2 relative text-sm ${
                  isActive("/Artikel")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Artikel
                {isActive("/Artikel") && (
                  <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-green-500"></span>
                )}
              </Link>

              <Link
                href="/Contact"
                className={`font-medium py-2 relative text-sm ${
                  isActive("/Contact")
                    ? "text-green-500"
                    : `${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-600`
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
                {isActive("/Contact") && (
                  <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-green-500"></span>
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
