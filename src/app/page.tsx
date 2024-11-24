import AboutUs from "@/components/home/about-us";
import { Categories } from "@/components/home/categories";
import CustomerTestimonials from "@/components/home/customer-testimonials";
import FeaturedSection from "@/components/home/featured-section";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";

export default async function Home() {

  return (
    <div>
      <Hero />
      <Categories/>
      <FeaturedSection />
      <HowItWorks />
      <CustomerTestimonials />
      <AboutUs />
    </div>
  );
}
