import { auth } from "@/auth";
import AboutUs from "@/components/home/about-us";
import CustomerTestimonials from "@/components/home/customer-testimonials";
import FeaturedSection from "@/components/home/featured-section";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import Navbar from "@/components/navbar/navbar";
import PublicNavbar from "@/components/navbar/public-navbar";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session ? <Navbar /> : <PublicNavbar />}
      <Hero />
      <FeaturedSection />
      <HowItWorks />
      <CustomerTestimonials />
      <AboutUs />
    </div>
  );
}
