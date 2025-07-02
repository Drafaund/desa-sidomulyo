import React from "react";
import { Mail, MessageCircle, Bot } from "lucide-react";

const CallToActionInvest = () => {
  return (
    <section className="bg-green-700 py-16 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Tertarik Berinvestasi?</h2>
        <p className="text-lg mb-8">
          Hubungi kami untuk diskusi lebih lanjut tentang peluang investasi dan
          kemitraan di Desa Sidomulyo
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <a
            href="https://wa.me/1234567890"
            className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold flex items-center space-x-2"
          >
            <MessageCircle size={18} /> <span>WhatsApp Desa</span>
          </a>
          <a
            href="mailto:info@sidomulyo-village.id"
            className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold flex items-center space-x-2"
          >
            <Mail size={18} /> <span>Kirim Email</span>
          </a>
          <a
            href="#"
            className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold flex items-center space-x-2"
          >
            <Bot size={18} /> <span>Chat AI Assistant</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionInvest;
