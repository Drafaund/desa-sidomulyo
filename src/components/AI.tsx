import React, { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

const AIAssistantSection = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);
      setMessage("");
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-white animate-pulse" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ask Our AI Assistant
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get instant answers about Sidomulyo Village, tourism, and investment
            opportunities
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about Sidomulyo..."
                className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="absolute right-2 top-2 bg-gradient-to-r from-green-400 to-blue-400 text-white p-3 rounded-xl hover:from-green-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>

          {/* Sample Questions */}
          <div className="mt-8">
            <p className="text-white/80 text-sm mb-4">Popular questions:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "What are the main attractions?",
                "Investment opportunities?",
                "How to get to Sidomulyo?",
                "Best time to visit?",
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 border border-white/30 hover:border-white/50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: Bot,
              title: "24/7 Available",
              description: "Get answers anytime, anywhere",
            },
            {
              icon: Sparkles,
              title: "Smart Responses",
              description: "AI-powered local knowledge",
            },
            {
              icon: User,
              title: "Personalized",
              description: "Tailored to your interests",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;
