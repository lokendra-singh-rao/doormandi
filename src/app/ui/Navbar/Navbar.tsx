/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Home, LocateIcon, Search, ShoppingCart, Zap } from "lucide-react";
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
  
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const searchSlideItems = ['Search "apple"', 'Search "potato"', 'Search "orange"', 'Search "peas"', 'Search "banana"', 'Search "cauliflower"', 'Search "grapes"', 'Search "brinjal"', 'Search "pineapple"', 'Search "spinach"'];
  
  useEffect(() => {
    setLocation({ type: "Home", address: "Gurugram, Haryana, India", deliveryTime: "8 minutes" });
  }, []);

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
      <nav className="bg-white p-4 flex flex-col gap-2 xs:gap-4 max-w-7xl mx-auto">
        <div className="w-full mx-auto flex items-center justify-between sm:gap-8 gap-4">
          {/* Logo and Location */}
          {/* Logo */}
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
              Door<span className="text-green-500 hover:text-green-600">Mandi</span>
            </h1>
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
            <div className="flex flex-col relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5" />
              <input type="text" className="pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} ref={inputRef1} onBlur={() => setInputFocus(false)}/>
              {!inputFocus && searchQuery.length < 1 && <div
                className="overflow-hidden h-full cursor-text peer-focus:hidden z-0 w-full absolute top-0 left-0"
                onClick={() => {
                  setInputFocus(true);
                  inputRef1.current.focus();
                }}
              >
                {searchSlideItems.map((item, index) => {
                  return (
                    <div key={index} className={`select-none placeholderAnimation animationText${index + 1}`}>
                      {item}
                    </div>
                  );
                })}
              </div>}
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
        <div className="text-sm font-medium text-gray-800 flex items-center sm:hidden justify-between" onClick={handleLocationClick}>
          <div className="flex items-center gap-1 xs:gap-2 text-base sm:text-lg">
            <Home className="hidden" />
            <div className="flex gap-1 font-bold">
              <div className="">{location.type}</div>-<div className="font-semibold">{location.address.slice(0, 25)}...</div>
            </div>
            <span className="hidden xs:block sm:hidden">|</span>
            <span className=" items-center gap-1 hidden xs:flex sm:hidden">
              <Zap className="opacity-50 hidden" />
              <span className="text-green-500 font-bold">8 mins</span>
            </span>
          </div>
          <svg className="w-5 h-5 ml-1 xs:block hidden" fill="none" stroke="#22C55E" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="block xs:hidden text-sm font-semibold text-gray-900">Delivery in {location.deliveryTime}</div>
        <div className="flex-1 h-full w-full flex md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-5 w-5" />
            <input type="text" className="pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} ref={inputRef2} onBlur={() => setInputFocus(false)}/>
              {!inputFocus && searchQuery.length < 1 && <div
                className="overflow-hidden h-full cursor-text peer-focus:hidden z-0 w-full absolute top-0 left-0"
                onClick={() => {
                  setInputFocus(true);
                  inputRef2.current?.focus();
                }}
              >
                {searchSlideItems.map((item, index) => {
                  return (
                    <div key={index} className={`select-none placeholderAnimation animationText${index + 1}`}>
                      {item}
                    </div>
                  );
                })}
              </div>}
          </div>
        </div>
      </nav>

      {/* Location Modal */}
      <LocationModal isOpen={isLocationModalOpen} onClose={handleCloseModal} />
    </>
  );
}
