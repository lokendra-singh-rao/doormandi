/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, Clock8, ChevronDown } from "lucide-react";

import LocationModal from "../LocationModel/LocationModel";

interface AddressType {
  houseNo: number;
  street: string;
  city: string;
  state: string;
}
interface LocationState {
  type: string;
  address: AddressType;
  deliveryTime: string;
}

export default function Navbar() {
  const [location, setLocation] = useState<LocationState>({
    type: "Home",
    address: {
      houseNo: 1,
      street: "Jitzz Residency",
      city: "Jaipur",
      state: "Rajasthan",
    },
    deliveryTime: "8 minutes",
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchSlideItems = ['Search "apple"', 'Search "potato"', 'Search "orange"', 'Search "peas"', 'Search "banana"', 'Search "cauliflower"', 'Search "grapes"', 'Search "brinjal"', 'Search "pineapple"', 'Search "spinach"'];

  useEffect(() => {
    setLocation({
      type: "Home",
      address: {
        houseNo: 1,
        street: "Jitzz Residency",
        city: "Jaipur",
        state: "Rajasthan",
      },
      deliveryTime: "8 minutes",
    });
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
      <nav className="bg-white p-4 w-full flex relative sm:sticky left-0 top-0 flex-col gap-2 xs:gap-4 mx-auto shadow-md z-[998]">
        <div className="w-full mx-auto flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
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
              <span className="text-sm text-gray-600 font-semibold">
                Delivery in <span className="text-green-500 font-semibold">{location.deliveryTime}</span>
              </span>
              <span className="text-sm font-medium text-gray-800 flex items-center">
                {location.address.state}, {location.address.street}
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
              <input type="text" className="pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} ref={inputRef1} onBlur={() => setInputFocus(false)} />
              {!inputFocus && searchQuery.length < 1 && (
                <div
                  className="overflow-hidden h-full cursor-text peer-focus:hidden z-0 w-full absolute top-0 left-0"
                  onClick={() => {
                    setInputFocus(true);
                    inputRef1.current?.focus();
                  }}
                >
                  {searchSlideItems.map((item, index) => {
                    return (
                      <div key={index} className={`select-none mt-3 placeholderAnimation animationText${index + 1}`}>
                        {item}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Login and Cart */}
          <div className="flex items-center gap-4">
            <button type="button" className="flex items-center">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <button type="button" className="text-white bg-green-500 hover:bg-green-600 rounded-lg font-semibold px-3 py-2 text-sm">
              Login
            </button>
          </div>
        </div>

        <div className="font-medium w-full text-gray-800 flex items-center sm:hidden justify-between" onClick={handleLocationClick}>
          <div className="flex items-center w-full gap-1 xs:gap-2 text-base justify-between sm:text-lg">
            <div className="flex items-center gap-1 font-bold text-sm xs:text-base">
              <div className="">{location.type}</div>-<div className="font-semibold">{location.address.houseNo}, {location.address.street}</div>
              <ChevronDown size={20} className="opacity-80" />
            </div>
            <span className="flex items-center gap-1 text-sm  xs:text-base xs:flex">
              <Clock8 size={16} className="opacity-50" />
              <span className="text-green-500 font-semibold">8 mins</span>
            </span>
          </div>
        </div>
        <div className="flex-1 h-full w-full flex md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1.5 h-5 w-5" />
            <input type="text" className="pl-12 pr-4 py-1 xs:py-2 border w-full border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} ref={inputRef2} onBlur={() => setInputFocus(false)} />
            {!inputFocus && searchQuery.length < 1 && (
              <div
                className="overflow-hidden h-full cursor-text peer-focus:hidden z-0 w-full absolute top-0 left-0"
                onClick={() => {
                  setInputFocus(true);
                  inputRef2.current?.focus();
                }}
              >
                {searchSlideItems.map((item, index) => {
                  return (
                    <div key={index} className={`select-none placeholderAnimation mt-[6px] animationText${index + 1}`}>
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Location Modal */}
      <LocationModal isOpen={isLocationModalOpen} onClose={handleCloseModal} />
    </>
  );
}
