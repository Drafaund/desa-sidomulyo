// src/components/article/CategoryTabs.tsx
import React from "react";

interface CategoryTabsProps {
  categories: string[];
  activeTab: string;
  bgColor: string;
  setActiveTab: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeTab,
  bgColor,
  setActiveTab,
}) => {
  return (
    <div className={`${bgColor} shadow-sm sticky top-0 z-10`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 py-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
