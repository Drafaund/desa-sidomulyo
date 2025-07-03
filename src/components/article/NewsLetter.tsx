// src/components/article/Newsletter.tsx
import React, { useState } from "react";
import { Mail } from "lucide-react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih telah berlangganan newsletter!");
    setEmail("");
  };

  return (
    <div className="bg-gray-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Berlangganan Newsletter</h2>
        <p className="text-gray-300 mb-8">
          Dapatkan artikel terbaru dan informasi penting langsung di email Anda
        </p>

        <form
          onSubmit={handleNewsletterSubmit}
          className="max-w-md mx-auto flex gap-4"
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Berlangganan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
