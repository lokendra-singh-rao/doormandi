import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { ProductCard } from "../ui/product-card";

export default function FeaturedSection() {
  const featuredProducts = [
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
    { title: "Apples", orginalPrice: 200, discount: 40, salePrice: 160, qauntity: 1, unit: "kg", imageUrl: "/apple.jpg" },
  ];
  return (
    <section className="px-10 py-8 flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold">Featured</h1>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {featuredProducts.map((product, index) => (
            <CarouselItem key={index} className="pl-1 basis-10/12 xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex absolute left-[-1rem]" />
        <CarouselNext className="hidden md:flex absolute right-[-1rem]" />
      </Carousel>
    </section>
  );
}
