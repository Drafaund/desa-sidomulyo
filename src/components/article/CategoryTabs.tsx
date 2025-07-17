// src/components/article/CategoryTabs.tsx
import React from "react";

interface CategoryTabsProps {
  categories: string[];
  activeTab: string;
  bgColor: string;
  setActiveTab: (category: string) => void;
  enableCategoryColors?: boolean; // New prop to enable category-specific colors
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeTab,
  bgColor,
  setActiveTab,
  enableCategoryColors = false,
}) => {
  // Category color mapping
  const getCategoryColors = (category: string, isActive: boolean) => {
    // If category colors are disabled, use default blue colors
    if (!enableCategoryColors) {
      return isActive
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }

    // Category-specific colors
    const colorMap = {
      Pertanian: {
        active: "bg-green-600 text-white",
        inactive: "bg-green-50 text-green-600 hover:bg-green-100",
      },
      Peternakan: {
        active: "bg-orange-600 text-white",
        inactive: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      },
      Perikanan: {
        active: "bg-blue-600 text-white",
        inactive: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      },
      Pariwisata: {
        active: "bg-red-600 text-white",
        inactive: "bg-red-50 text-red-600 hover:bg-red-100",
      },
      Industri: {
        active: "bg-purple-600 text-white",
        inactive: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      },
      Semua: {
        active: "bg-gray-600 text-white",
        inactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
      },
    };

    const colors =
      colorMap[category as keyof typeof colorMap] || colorMap.Semua;
    return isActive ? colors.active : colors.inactive;
  };

  return (
    <div className={`${bgColor} shadow-sm sticky top-0 z-10`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 py-4">
          {categories.map((category) => {
            const isActive = activeTab === category;
            const colorClasses = getCategoryColors(category, isActive);

            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${colorClasses}`}
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

export default CategoryTabs;
