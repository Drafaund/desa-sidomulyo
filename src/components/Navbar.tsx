"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
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

  // Effect untuk menangani scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div
        className={`bg-green-600 text-white hidden md:block transition-all duration-300 ease-in-out overflow-hidden ${
          isScrolled ? "h-0 py-0" : "h-auto py-2"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <Link href="https://maps.app.goo.gl/dxBpZ1AzjcPuh5Xy5">
                <div className="flex items-center space-x-2">
                  <MapPin size={14} />
                  <span>
                    Desa Sidomulyo, Kec. Sidorejo, Magetan, Jawa Timur
                  </span>
                </div>
              </Link>
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+62 851 3596 4679</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span>desasidomulyo07@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex justify-between items-center py-4">
          {/* Logo Clickable*/}
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
              <h1 className="text-xl font-bold text-gray-800">
                Desa Sidomulyo
              </h1>
              <p className="text-sm text-gray-600"> Sidorejo, Magetan</p>
            </div>
          </Link>

          {/* Desktop Menu - dengan spacing yang lebih balanced */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10">
            <Link
              href="/"
              className={`font-medium transition-colors relative ${
                isActive("/")
                  ? "text-green-500"
                  : "text-gray-700 hover:text-green-600"
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
                className={`font-medium transition-colors relative flex items-center space-x-1 ${
                  isActive("/TentangDesa")
                    ? "text-green-500"
                    : "text-gray-700 hover:text-green-600"
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
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/TentangDesa"
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
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
                  : "text-gray-700 hover:text-green-600"
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
                  : "text-gray-700 hover:text-green-600"
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
                  : "text-gray-700 hover:text-green-600"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                href="/"
                className={`font-medium py-2 relative ${
                  isActive("/")
                    ? "text-green-500"
                    : "text-gray-700 hover:text-green-600"
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
                      : "text-gray-700 hover:text-green-600"
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
                      className="block py-2 text-gray-600 hover:text-green-600"
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
                        className="block w-full text-left py-2 text-gray-600 hover:text-green-600"
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
                    : "text-gray-700 hover:text-green-600"
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
                    : "text-gray-700 hover:text-green-600"
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
                    : "text-gray-700 hover:text-green-600"
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

export default Navbar;
