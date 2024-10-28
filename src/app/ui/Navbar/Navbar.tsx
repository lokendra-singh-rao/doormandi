/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { LocateIcon, Search, ShoppingCart, Zap } from "lucide-react";
import LocationModal from "../LocationModel/LocationModel";

interface LocationState {
  type: string;
  address: string;
  deliveryTime: string;
}

export default function Navbar() {
  const [location, setLocation] = useState<LocationState>({
    type: "Home",
    address: "Gurugram, Haryana, India",
    deliveryTime: "8 minutes",
  });

  useEffect(() => {
    setLocation({ type: "Home", address: "Gurugram, Haryana, India", deliveryTime: "8 minutes" });
  }, []);

  const searchSlideItems = ['Search "milk"', 'Search "bread"', 'Search "sugar"', 'Search "butter"', 'Search "paneer"', 'Search "chips"', 'Search "curd"', 'Search "rice"', 'Search "chocolate"', 'Search "egg"'];

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);

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
      <nav className="bg-white  p-4 flex flex-col gap-4 max-w-7xl mx-auto">
        <div className="w-full mx-auto flex items-center justify-between sm:gap-8 gap-4">
          {/* Logo and Location */}
          {/* Logo */}
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
              Door<span className="text-green-500 hover:text-green-600">Mandi</span>
            </h1>
            {/* <span className="block sm:hidden">|</span>
            <span className="flex items-center gap-2 sm:hidden">
              <Zap className="opacity-50 " />
              <span className="text-green-500 font-bold">8 mins</span>
            </span> */}
          </div>
          {/* Location Dropdown */}
          <div className="sm:flex hidden items-center cursor-pointer" onClick={handleLocationClick} role="button" tabIndex={0}>
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
          <div className="flex-1 h-full hidden md:flex ">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5" />
              <input
                type="text"
                className="pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer"
                onFocus={() => {
                  setInputFocus(true);
                }}
              />
              <div className="overflow-hidden h-full peer-focus:hidden -z-0">
                {searchSlideItems.map((item, index) => {
                  return (
                    <div key={index} className={`placeholderAnimation animationText${index + 1}`}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Login and Cart */}
          <div className="flex items-center gap-4">
            <button type="button" className="flex items-center">
              <ShoppingCart className="h-6 w-6" />
              {/* <span>My Cart</span> */}
            </button>
            <button type="button" className="text-white bg-green-500 hover:bg-green-600 rounded-lg font-semibold px-3 py-2 text-sm">
              Login
            </button>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-800 flex items-center">
          {location.address}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="flex-1 h-full w-full flex md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-5 w-5" />
            <input type="text" className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer" />
            <div className="overflow-hidden h-full peer-focus:hidden -z-0">
              {searchSlideItems.map((item, index) => {
                return (
                  <div key={index} className={`placeholderAnimation animationText${index + 1}`}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Location Modal */}
      <LocationModal isOpen={isLocationModalOpen} onClose={handleCloseModal} />
    </>
  );
}
