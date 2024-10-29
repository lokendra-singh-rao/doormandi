"use client"

import Carousel from "../Shared/Carousel";

export default function Hero() {

  const slides = [
    {
      title:"Ausi",
      image:"/offerslide1.webp"
    },
    {
      title:"Ausi",
      image:"/offerslide2.webp"
    },
    {
      title:"Ausi",
      image:"/offerslide1.webp"
    },
    {
      title:"Ausi",
      image:"/offerslide2.webp"
    }
  ]

  return (
    <section className="hero rounded-md px-2 py-2 xs:px-4 xs:py-4 md:px-10 md:py-6 z-0 relative">
      <Carousel slides={slides}/>
    </section>
  );
}
