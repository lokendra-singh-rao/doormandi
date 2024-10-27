import Hero from "./ui/Home/Hero";
import FeaturedSection from "./ui/Home/FeaturedSection";
import HowItWorks from "./ui/Home/HowItWorks";
import CustomerTestimonials from "./ui/Home/CustomerTestimonials";
import AboutUs from "./ui/Home/AboutUs";
import Navbar from "./ui/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedSection />
      <HowItWorks />
      <CustomerTestimonials />
      <AboutUs />
    </div>
  );
}
