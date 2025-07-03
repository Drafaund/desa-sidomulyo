// src/components/article/LoadMoreButton.tsx
import React from "react";

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <div className="text-center mt-12">
      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Muat Artikel Lainnya
      </button>
    </div>
  );
};

export default LoadMoreButton;
