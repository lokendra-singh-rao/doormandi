import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function Hero() {
  const slides = [
    {
      title: "Ausi",
      image: "/offerslide1.webp",
    },
    {
      title: "Ausi",
      image: "/offerslide2.webp",
    },
    {
      title: "Ausi",
      image: "/offerslide1.webp",
    },
    {
      title: "Ausi",
      image: "/offerslide2.webp",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="py-2 px-1 md:p-0"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <Image src={slide.image} alt={slide.title} width={1600} height={900} className="md:rounded-none rounded-lg" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex absolute left-2" />
      <CarouselNext className="hidden md:flex absolute right-2" />
    </Carousel>
  );
}
