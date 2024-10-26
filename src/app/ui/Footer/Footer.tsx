"use client";
import { Phone, Facebook, Twitter, Instagram, Truck, Shield } from "lucide-react";
import { useState } from "react";
import IconTooltip from "../Icons/IconTooltip";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="px-6 md:px-8 lg:px-12 w-full bg-gray-900 text-gray-300 pt-12 pb-8">
      {/* Top Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between  gap-8">
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Get Fresh Updates</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 rounded-lg border-gray-700 bg-gray-800 text-gray-300 shadow-inner px-4 py-2" />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-green-500 cursor-pointer transition" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-green-500 cursor-pointer transition" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-green-500 cursor-pointer transition" />
            </div>
          </div>

          {/* App Downloads */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Mobile App Coming Soon!</h3>
            <div className="flex space-x-4">
              <div className="w-32 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-600 cursor-pointer transition">App Store</div>
              <div className="w-32 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-600 cursor-pointer transition">Play Store</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-12">
        <div className="flex items-center justify-between gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-gray-100 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-400 hover:text-gray-100 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-gray-100 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/impact" className="text-gray-400 hover:text-gray-100 transition">
                  Social Impact
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Help & Support</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="/contact" className="text-gray-400 hover:text-gray-100 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-gray-100 transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-gray-100 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-gray-100 transition">
                  Returns Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/delivery-areas" className="text-gray-400 hover:text-gray-100 transition">
                  Delivery Areas
                </a>
              </li>
              <li>
                <a href="/wholesale" className="text-gray-400 hover:text-gray-100 transition">
                  Wholesale
                </a>
              </li>
              <li>
                <a href="/corporate" className="text-gray-400 hover:text-gray-100 transition">
                  Corporate Orders
                </a>
              </li>
              <li>
                <a href="/subscription" className="text-gray-400 hover:text-gray-100 transition">
                  Subscription Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-gray-100 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-gray-100 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/security" className="text-gray-400 hover:text-gray-100 transition">
                  Security
                </a>
              </li>
              <li>
                <a href="/compliance" className="text-gray-400 hover:text-gray-100 transition">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 pt-8">
        <div className="flex items-center justify-between  gap-8">
          {/* Copyright */}
          <div className="text-gray-400 w-1/3">© {new Date().getFullYear()} Doormandi. All rights reserved.</div>

          {/* Payment Methods */}
          <div className="flex items-center justify-center space-x-4 w-1/3">
            <IconTooltip method="CreditCard" title={"Credit/Debit Card"} />
            <IconTooltip method="Upi" title={"UPI"} />
          </div>

          {/* Certifications */}
          <div className="flex justify-end space-x-4 w-1/3">
            <Shield className="w-8 h-8 text-gray-400" />
            <Truck className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
