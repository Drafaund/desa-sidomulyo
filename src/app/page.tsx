import { Play, ArrowRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import TourismAttractions from "@/components/Tourism";
import InvestmentOpportunities from "@/components/Investment";
import ArticlesSection from "@/components/Articles";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="relative min-w-full flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-blue-500"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 w-full p-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Sidomulyo
                </span>{" "}
                Village
              </h1>

              <p className="text-xl lg:text-2xl mb-8 text-green-50 leading-relaxed">
                Explore the hidden gems of Sidorejo, Magetan, East Java. From
                stunning natural landscapes to rich agricultural heritage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Video
                </button>

                <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center">
                  Explore Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">15+</div>
                  <div className="text-green-100">Tourist Spots</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-green-100">Hectares</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">2K+</div>
                  <div className="text-green-100">Residents</div>
                </div>
              </div> */}
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/sawah.jpeg"
                  alt="Sidomulyo Village"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div> */}
      </section>

      <TourismAttractions />
      <InvestmentOpportunities />
      <ArticlesSection />
    </main>
  );
}
