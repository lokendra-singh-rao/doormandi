import { X } from "lucide-react";

export default function LocationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="">
      <div className="bg-black opacity-50 fixed inset-0" onClick={onClose}></div>
      <div className="absolute top-[5.5rem] left-20 bg-white rounded-lg p-6 mx-4">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Change Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" type="button">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Location options */}
        <div className="flex items-center space-x-4">
          {/* Detect location button */}
          <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 flex-shrink-0" type="button">
            Detect my location
          </button>

          {/* OR divider */}
          <div className="flex items-center space-x-2">
            <div className="h-px w-4 bg-gray-300"></div>
            <span className="text-gray-500 uppercase text-sm">OR</span>
            <div className="h-px w-4 bg-gray-300"></div>
          </div>

          {/* Search input */}
          <div className="flex-grow">
            <input type="text" placeholder="search delivery location" className=" px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
