"use client";
import { ChevronDown, Clock8, ListCheck, Locate, LogOut, MapPin, Search, Settings, ShoppingBasket, ShoppingCart, User2, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { CartItem } from "../ui/cart-item";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import Separator from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

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

  const handleLogOut = () => {
    signOut();
  };

  return (
    <nav id="navbar" className="bg-white px-4 py-2 md:py-4 md:px-6 w-full flex sticky left-0 top-0 flex-col gap-2 mx-auto shadow-md z-[998]">
      <div className="w-full mx-auto flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
        {/* Logo and Location */}
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Link href={"/"} className="text-2xl font-bold text-gray-800 cursor-pointer">
            Door<span className="text-green-500 hover:text-green-600">Mandi</span>
          </Link>
        </div>

        {/* Location Dropdown Desktop*/}
        <Dialog>
          <DialogTrigger>
            <div className="sm:flex hidden items-center cursor-pointer">
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
          </DialogTrigger>
          <DialogContent className="w-max-[90vw] rounded-lg">
            <DialogHeader>
              <DialogTitle>Choose Address</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col xs:flex-row items-center justify-between gap-2">
              <Button className="h-10">
                <Locate className="h-6 w-6" />
                Auto Detect
              </Button>

              <div className="w-20 text-sm">
                <Separator text="OR" />
              </div>

              <div>
                <Input type="text" size={100} placeholder="Search for street..." className="h-10 w-full" />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Search Bar */}
        <div className="flex-1 h-full hidden md:flex ">
          <div className="flex flex-col relative w-full">
            <Search className="absolute left-3 top-2.5 h-5 w-5" />
            <Input type="text" className="pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} ref={inputRef1} onBlur={() => setInputFocus(false)} />
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
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="[&_svg]:size-7" variant={"ghost"} size={"icon"}>
                <ShoppingCart size={7} />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0 flex flex-col items-stretch justify-between z-[1000]">
              <SheetHeader className="bg-green-100 p-4">
                <SheetTitle className="flex gap-2 items-center text-green-600 justify-center font-bold text-3xl">
                  Your Bag <ShoppingBasket size={36} />{" "}
                </SheetTitle>
                <SheetDescription className="text-center">View and manage your selected items before proceeding to a quick and secure checkout.</SheetDescription>
              </SheetHeader>
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-2">
                  <CartItem product={{ title: "Kashmiri Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" }} />
                  <CartItem product={{ title: "Kashmiri Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" }} />
                  <CartItem product={{ title: "Kashmiri Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" }} />
                  <CartItem product={{ title: "Kashmiri Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" }} />
                </div>
              </ScrollArea>
              <SheetFooter className="px-4 pb-2">
                <SheetClose asChild>
                  <Button type="submit" className="w-full" size={"lg"}>
                    Secure Checkout
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
              <UserCircle size={32} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[999] w-36" align="end">
              <DropdownMenuItem className="py-2.5 text-[1rem]">
                <User2 /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 text-[1rem]">
                <ListCheck /> Orders{" "}
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 text-[1rem]">
                <Settings /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[1rem]" onClick={handleLogOut}>
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Location Dialog Mobile */}
      <Dialog>
        <DialogTrigger>
          <div className="font-medium w-full text-gray-800 flex items-center sm:hidden justify-between">
            <div className="flex items-center w-full gap-1 xs:gap-2 text-base justify-between sm:text-lg">
              <div className="flex items-center gap-1 font-bold text-sm xs:text-base">
                <MapPin size={20} className="opacity-80" />
                <div>{location.type}</div>-
                <div className="font-semibold">
                  {location.address.houseNo}, {location.address.street}
                </div>
                <ChevronDown size={20} className="opacity-80" />
              </div>
              <span className="flex items-center gap-1 text-sm  xs:text-base xs:flex">
                <Clock8 size={16} className="opacity-80" />
                <span className="text-green-500 font-semibold">8 mins</span>
              </span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-max-[90vw] rounded-lg">
          <DialogHeader>
            <DialogTitle>Choose Address</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col xs:flex-row items-center gap-2">
            <Button className="h-10">
              <Locate className="h-6 w-6" />
              Auto Detect
            </Button>

            <div className="w-20 text-sm">
              <Separator text="OR" />
            </div>

            <div>
              <Input type="text" size={100} placeholder="Search for street..." className="h-10 w-full" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex-1 h-full w-full flex md:hidden">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-2 h-5 w-5" />
          <Input type="text" className="pl-12 pr-4 py-1.5 border w-full border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 bg-gray-50 z-2 peer" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} ref={inputRef2} onBlur={() => setInputFocus(false)} />
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
                  <div key={index} className={`select-none placeholderAnimation mt-[8px] animationText${index + 1}`}>
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
