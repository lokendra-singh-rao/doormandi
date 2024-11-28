"use client";
import React from "react";
import { Phone } from "lucide-react";
import { useState } from "react";
import IconTooltip from "../icons/IconTooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="px-8 md:px-12 lg:pr-16 lg:pl-32 w-full bg-gray-900 text-gray-300 pt-12 pb-8">
      {/* Top Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-stretch gap-12 lg:gap-16">
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
                <a href="/privacy-policy" className="text-gray-400 hover:text-gray-100 transition">
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

      {/* Main Content */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-start md:justify-items-center items-center justify-between gap-12 lg:gap-16">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-white">Newsletter Signup</h1>
            <p className="py-4 text-sm xs:text-base font-bold">🌱 Stay Fresh with Our Newsletter! 🍏</p>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto flex-wrap flex-col flex-grow sm:flex-row gap-2">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="h-10 flex-1 rounded-lg border-gray-700 bg-gray-800 text-gray-300 shadow-inner px-4 py-2" />
              <Button size={"lg"}>
                Subscribe
              </Button>
            </form>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-white">Connect With Us</h3>
            <div className="flex gap-4">
              <IconTooltip method="Facebook" title={"Facebook"} />
              <IconTooltip method="Twitter" title={"Twitter"} />
              <IconTooltip method="Instagram" title={"Instagram"} />
            </div>
          </div>

          {/* App Downloads */}
          {/* <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-white">Mobile App Coming Soon!</h3>
            <div className="flex gap-2">
              <div className="w-32 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-600 cursor-pointer transition">App Store</div>
              <div className="w-32 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-600 cursor-pointer transition">Play Store</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 pt-8">
        <div className="flex flex-wrap items-center justify-evenly gap-8">
          {/* Copyright */}
          <div className="text-gray-400 text-center">© {new Date().getFullYear()} Doormandi. All rights reserved.</div>

          {/* Payment Methods & Certifications */}
          <div className="flex items-center justify-center space-x-4">
            <IconTooltip method="CreditCard" title={"Secure Checkout"} />
            <IconTooltip method="Shield" title={"Data Protection"} />
            <IconTooltip method="Truck" title={"Safe Delivery"} />
          </div>
        </div>
      </div>
    </footer>
  );
}
