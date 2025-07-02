"use client";

import React from "react";
import Image from "next/image";
import { TreePine, Triangle, Truck } from "lucide-react";

interface PotentialData {
  id: number;
  title: string;
  image: string;
  description: string;
  features: string[];
  buttonColor: string;
  iconColor: string;
}

interface PotentialCardProps {
  data: PotentialData;
}

const PotentialCard: React.FC<PotentialCardProps> = ({ data }) => {
  const IconComponent =
    data.id === 1 ? TreePine : data.id === 2 ? Triangle : Truck;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-1 group">
      {/* Gambar dengan efek zoom saat hover */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 transform group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`p-2 rounded-lg ${
              data.id === 1
                ? "bg-green-100"
                : data.id === 2
                ? "bg-blue-100"
                : "bg-orange-100"
            }`}
          >
            <IconComponent className={`w-6 h-6 ${data.iconColor}`} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{data.title}</h3>
        </div>

        <p className="text-gray-600 mb-4 text-sm">{data.description}</p>

        <div className="space-y-2 mb-6">
          {data.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  data.id === 1
                    ? "bg-green-500"
                    : data.id === 2
                    ? "bg-blue-500"
                    : "bg-orange-500"
                }`}
              ></div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <button
          className={`w-full text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${data.buttonColor}`}
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default PotentialCard;
