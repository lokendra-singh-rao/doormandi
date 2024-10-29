import { CreditCard, Shield, Truck, Facebook, Twitter, Instagram } from "lucide-react";
import Upi from "./UpiIcon";

const icons = {
  CreditCard,
  Upi,
  Shield,
  Truck,
  Facebook,
  Twitter,
  Instagram,
};

interface IconTooltipProps {
  method: keyof typeof icons;
  title: string;
}
export default function IconTooltip({ method, title }: IconTooltipProps) {
  const IconComponent = icons[method] || CreditCard;

  return (
    <div className="relative flex justify-center items-center">
      <div className="group">
        <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-green-500 cursor-pointer" />
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 hidden group-hover:flex items-center justify-center px-3 py-1 rounded bg-gray-800 text-white text-xs shadow-lg">{title}</div>
      </div>
    </div>
  );
}
