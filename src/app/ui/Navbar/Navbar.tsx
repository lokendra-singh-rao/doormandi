/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import LocationModal from "../LocationModel/LocationModel";

interface LocationState {
  address: string;
  deliveryTime: string;
}

export default function Navbar() {
  const [location, setLocation] = useState<LocationState>({
    address: "Gurugram, Haryana, India",
    deliveryTime: "8 minutes",
  });

  useEffect(() => {
    setLocation({ address: "Gurugram, Haryana, India", deliveryTime: "8 minutes" });
  }, []);

  const searchSlideItems = ['Search "milk"', 'Search "bread"', 'Search "sugar"'];

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);

  const handleLocationClick = (): void => {
    setIsLocationModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsLocationModalOpen(false);
  };

  return (
    <>
      {/* LOGO */}
      {/* LOCATION DROPDOWN */}
      {/* SEARCH */}
      {/* CART */}
      {/* ACCOUNT */}
      <nav className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Location */}

          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
            Door<span className="text-green-500 hover:text-green-600">Mandi</span>
          </h1>

          {/* Location Dropdown */}
          <div className="flex items-center cursor-pointer" onClick={handleLocationClick} role="button" tabIndex={0}>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Delivery in {location.deliveryTime}</span>
              <span className="text-sm font-medium text-gray-800 flex items-center">
                {location.address}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 " />
              <input type="text" placeholder={searchSlideItems[0]} className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50" />
            </div>
          </div>

          {/* Login and Cart */}
          <div className="flex items-center space-x-6">
            <button type="button" className="flex items-center space-x-2 ">
              <ShoppingCart className="h-6 w-6" />
              {/* <span>My Cart</span> */}
            </button>
            <button type="button" className="text-white bg-green-500 hover:bg-green-600 rounded-lg font-semibold px-4 py-2 ">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Location Modal */}
      <LocationModal isOpen={isLocationModalOpen} onClose={handleCloseModal} />
    </>
  );
}
