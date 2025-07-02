import React from "react";

interface InvestmentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  roi: string;
  minInvestment: string;
  period: string;
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
  buttonText = "Pelajari Lebih Lanjut",
  buttonColor = "bg-green-600 hover:bg-green-700",
  bgcolor = "bg-green-50",
  onButtonClick,
}) => {
  return (
    <div
      className={`${bgcolor} rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 ${bgcolor} rounded-full flex items-center justify-center mr-4`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <span className="text-sm text-green-600 font-semibold">
            ROI: {roi}
          </span>
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
        className={`w-full ${buttonColor} text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2`}
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
