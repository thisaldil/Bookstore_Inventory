import React, { useState } from "react";
import {
  BookOpenIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

function Footer() {
  const [subscriptionData, setSubscriptionData] = useState({
    name: "",
    email: "",
  });
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // null, 'success', 'error'
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!subscriptionData.name.trim() || !subscriptionData.email.trim()) {
      setSubscriptionStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriptionData.email)) {
      setSubscriptionStatus("error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://global-crm-1zi3.vercel.app/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subscriptionData.fullName,
            email: subscriptionData.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      console.log("Customer created:", data);

      setSubscriptionStatus("success");
      setSubscriptionData({ name: "", email: "" });
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSubscriptionStatus(null), 3000);
    }
  };

  return (
    <footer className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <BookOpenIcon size={24} className="mr-2" />
              <h3 className="text-xl font-serif font-bold">Readwell Books</h3>
            </div>
            <p className="text-amber-100 mb-4 leading-relaxed">
              Your trusted partner in discovering amazing books. We've been
              connecting readers with their next favorite story since 2020.
            </p>
            <div className="flex space-x-4">
              <FacebookIcon
                size={20}
                className="text-amber-200 hover:text-white cursor-pointer transition"
              />
              <TwitterIcon
                size={20}
                className="text-amber-200 hover:text-white cursor-pointer transition"
              />
              <InstagramIcon
                size={20}
                className="text-amber-200 hover:text-white cursor-pointer transition"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition"
                >
                  Browse Books
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition"
                >
                  New Releases
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition"
                >
                  Book Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white transition"
                >
                  Author Interviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon size={16} className="mr-3 text-amber-300" />
                <span className="text-amber-100">
                  123 Book Street, Reading City, RC 12345
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon size={16} className="mr-3 text-amber-300" />
                <span className="text-amber-100">+1 (555) 123-BOOK</span>
              </div>
              <div className="flex items-center">
                <MailIcon size={16} className="mr-3 text-amber-300" />
                <span className="text-amber-100">hello@readwellbooks.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-amber-100 mb-4">
              Subscribe to our newsletter for book recommendations and exclusive
              offers!
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={subscriptionData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isLoading}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={subscriptionData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {subscriptionStatus === "success" && (
              <div className="mt-3 flex items-center text-green-300">
                <CheckCircleIcon size={16} className="mr-2" />
                <span className="text-sm">You are subscribed 🎉</span>
              </div>
            )}

            {subscriptionStatus === "error" && (
              <div className="mt-3 flex items-center text-red-300">
                <AlertCircleIcon size={16} className="mr-2" />
                <span className="text-sm">
                  Please check your information and try again.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-200 text-sm">
              © 2025 Readwell Books. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-amber-200 hover:text-white text-sm transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-amber-200 hover:text-white text-sm transition"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-amber-200 hover:text-white text-sm transition"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
