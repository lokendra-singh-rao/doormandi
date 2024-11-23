import { Locate, X } from "lucide-react";
import Separator from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LocationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div>
      <div className="bg-black opacity-50 fixed inset-0 z-[999]" onClick={onClose}></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white max-w-max rounded-lg px-6 xs:px-2 py-4 sm:px-6 z-[1000]">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Change Location</h2>
          <Button onClick={onClose} className="text-gray-500 hover:text-gray-700" size={"icon"} variant={"ghost"}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Location options */}
        <div className="flex flex-col xs:flex-row items-center gap-2">
          {/* Detect location button */}
          <Button className="h-10">
            <Locate className="h-6 w-6" />
            Auto Detect
          </Button>

          {/* OR divider */}
          <div className="w-20 text-sm">
            <Separator text="OR" />
          </div>

          {/* Search input */}
          <div className="">
            <Input type="text" placeholder="Search for street..." className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
