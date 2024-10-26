import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";
import Hero from "./ui/Home/Hero";
import FeaturedSection from "./ui/Home/FeaturedSection";
import HowItWorks from "./ui/Home/HowItWorks";
import CustomerTestimonials from "./ui/Home/CustomerTestimonials";
import AboutUs from "./ui/Home/AboutUs";

export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedSection/>
      <HowItWorks/>
      <CustomerTestimonials/>
      <AboutUs/>
    </div>
  );
}
