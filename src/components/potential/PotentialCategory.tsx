// src/components/potensi/PotentialCategoryTabs.tsx
"use client";
import React from "react";

interface CategoryColor {
  bg: string;
  hover: string;
  text: string;
  bgLight: string;
  borderLight: string;
}

interface PotentialCategoryTabsProps {
  categories: string[];
  activeTab: string;
  bgColor: string;
  setActiveTab: (category: string) => void;
  categoryColors: Record<string, CategoryColor>;
}

const PotentialCategoryTabs: React.FC<PotentialCategoryTabsProps> = ({
  categories,
  activeTab,
  bgColor,
  setActiveTab,
  categoryColors,
}) => {
  return (
    <div className={`${bgColor} shadow-sm sticky top-0 z-10`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 py-4">
          {categories.map((category) => {
            const colors = categoryColors[category];
            const isActive = activeTab === category;

            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? `${colors.bg} text-white shadow-lg`
                    : `${colors.bgLight} ${colors.text} ${colors.hover} hover:shadow-md`
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PotentialCategoryTabs;
