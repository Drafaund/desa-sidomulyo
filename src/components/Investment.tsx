import React from "react";
import { Sprout, Tractor, Mountain, Factory } from "lucide-react";

const InvestmentOpportunities = () => {
  const opportunities = [
    {
      id: 1,
      title: "Agriculture",
      description:
        "Rich fertile land perfect for various crops and sustainable farming.",
      icon: Sprout,
      color: "from-green-400 to-green-600",
      features: ["Organic farming", "Rice cultivation", "Vegetable gardens"],
    },
    {
      id: 2,
      title: "Livestock",
      description: "Established livestock farming with growth potential.",
      icon: Tractor,
      color: "from-blue-400 to-blue-600",
      features: ["Cattle farming", "Poultry", "Fish farming"],
    },
    {
      id: 3,
      title: "Eco-tourism",
      description:
        "Natural beauty perfect for sustainable tourism development.",
      icon: Mountain,
      color: "from-emerald-400 to-emerald-600",
      features: ["Nature tours", "Agro-tourism", "Cultural experiences"],
    },
    {
      id: 4,
      title: "Agro-Industry",
      description: "Processing facilities for agricultural products.",
      icon: Factory,
      color: "from-orange-400 to-orange-600",
      features: ["Food processing", "Packaging", "Distribution"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Investment Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the diverse agricultural and economic potential that makes
            Sidomulyo an ideal investment destination.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {opportunities.map((opportunity) => {
            const IconComponent = opportunity.icon;
            return (
              <div
                key={opportunity.id}
                className="group relative bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${opportunity.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${opportunity.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 mb-6">{opportunity.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  {opportunity.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center text-sm text-gray-500"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                  style={{
                    background: `linear-gradient(to right, ${
                      opportunity.color.includes("green")
                        ? "#10b981, #059669"
                        : opportunity.color.includes("blue")
                        ? "#3b82f6, #2563eb"
                        : opportunity.color.includes("emerald")
                        ? "#10b981, #047857"
                        : "#f97316, #ea580c"
                    })`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Invest in Sidomulyo?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us in developing sustainable and profitable opportunities in
              one of East Java most promising villages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Contact Investment Team
              </button>
              <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;
