"use client";
import React, { useState } from "react";
import { MessageCircle, Mail, MapPin, Send } from "lucide-react";

// Interface untuk form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Interface untuk contact method
interface ContactMethod {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  action: string;
  color: string;
  href: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Type untuk form submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  // Type untuk input change event
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick chat with our team",
      action: "Chat Now",
      color: "from-green-400 to-green-600",
      href: "https://wa.me/1234567890",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us your inquiries",
      action: "Send Email",
      color: "from-blue-400 to-blue-600",
      href: "mailto:info@sidomulyo.village",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Sidorejo, Magetan, East Java",
      action: "Get Directions",
      color: "from-red-400 to-red-600",
      href: "#",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to explore investment opportunities or plan your visit?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Methods
            </h3>

            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {method.title}
                      </h4>
                      <p className="text-gray-600 mb-3">{method.description}</p>
                      <a
                        href={method.href}
                        className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${method.color} bg-clip-text text-transparent hover:underline`}
                      >
                        {method.action}
                        <Send className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your interest in Sidomulyo Village..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
