import React, { ReactNode } from "react";

// Interface untuk props CTAButton
interface CTAButtonProps {
  icon?: ReactNode;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  icon,
  children,
  variant = "primary",
  onClick,
}) => {
  const getButtonClass = (): string => {
    switch (variant) {
      case "primary":
        return "bg-white text-teal-800 hover:bg-gray-100";
      case "secondary":
        return "bg-teal-600 hover:bg-teal-700 text-white";
      case "outline":
        return "bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-800";
      default:
        return "bg-white text-teal-800 hover:bg-gray-100";
    }
  };

  return (
    <button
      className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 ${getButtonClass()}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default CTAButton;
