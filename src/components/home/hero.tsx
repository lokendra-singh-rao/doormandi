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
    <div className="w-full flex justify-center items-center py-4">
      <Carousel
        className="w-full lg:w-[90vw]"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Image src={slide.image} alt={slide.title} width={1920} height={1080} className="rounded-none lg:rounded-lg" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}
