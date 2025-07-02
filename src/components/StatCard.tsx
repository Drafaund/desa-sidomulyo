import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  jumlah: string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, jumlah, label, color }) => {
  return (
    <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className={`text-3xl font-bold mb-2 ${color}`}>{jumlah}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

export default StatCard;
