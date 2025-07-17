import React from "react";
import { TreePine, Truck, Triangle, Users } from "lucide-react";

// Category config for investments
const getCategoryConfig = (category: string) => {
  const configs = {
    Pertanian: {
      icon: TreePine,
      iconColor: "text-green-600",
      buttonColor: "bg-green-600 hover:bg-green-700",
      bgColor: "bg-green-50",
    },
    Peternakan: {
      icon: Truck,
      iconColor: "text-orange-600",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      bgColor: "bg-orange-50",
    },
    Perikanan: {
      icon: Triangle,
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      bgColor: "bg-blue-50",
    },
    Pariwisata: {
      icon: Triangle,
      iconColor: "text-red-600",
      buttonColor: "bg-red-600 hover:bg-red-700",
      bgColor: "bg-red-50",
    },
    Industri: {
      icon: Users,
      iconColor: "text-purple-600",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      bgColor: "bg-purple-50",
    },
  };

  return configs[category as keyof typeof configs] || configs.Pertanian;
};

interface InvestmentCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  roi: string;
  minInvestment: string;
  period: string;
  category: string; // New prop untuk category
  buttonText?: string;
  buttonColor?: string;
  bgcolor?: string;
  onButtonClick?: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  icon,
  title,
  description,
  roi,
  minInvestment,
  period,
  category,
  buttonText = "Pelajari Lebih Lanjut",
  buttonColor,
  bgcolor,
  onButtonClick,
}) => {
  // Get category configuration
  const categoryConfig = getCategoryConfig(category);

  // Use category config as default, but allow props to override
  const finalButtonColor = buttonColor || categoryConfig.buttonColor;
  const finalBgColor = bgcolor || categoryConfig.bgColor;
  const finalIcon =
    icon ||
    React.createElement(categoryConfig.icon, {
      className: `w-6 h-6 ${categoryConfig.iconColor}`,
    });

  return (
    <div
      className={`${finalBgColor} rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 ${finalBgColor} rounded-full flex items-center justify-center mr-4 border-2 border-white shadow-sm`}
        >
          {finalIcon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-600 font-semibold">
              ROI: {roi}
            </span>
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      {/* Investment Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Investasi Minimal</div>
          <div className="text-lg font-bold text-gray-900">{minInvestment}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Periode</div>
          <div className="text-lg font-bold text-gray-900">{period}</div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className={`w-full ${finalButtonColor} text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        {buttonText}
      </button>
    </div>
  );
};

export default InvestmentCard;
