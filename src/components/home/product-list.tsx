import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { ProductCard } from "../ui/product-card";

interface Product {
  title: string;
  orginalPrice: number;
  discount: number;
  salePrice: number;
  qauntity: number;
  unit: string;
  imageUrl: string;
}

export default function ProductList({ title, products }: { title: string; products: Product[] }) {
  return (
    <section id={title.toLowerCase().split(" ").join("-")} className="px-0 lg:px-10 flex flex-col gap-y-2">
      <h1 className="px-4 lg:px-0 text-2xl xs:text-3xl font-bold">{title}</h1>
      <Carousel
        opts={{
          dragFree: true
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {products.map((product, index) => (
            <CarouselItem key={index} className="pl-1 basis-[50%] xs:basis-[40%] sm:basis-[30%] md:basis-[20%] lg:basis-1/6 xl:basis-[15%]">
              <div className="p-0.5 xs:p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex absolute left-[-1rem]" />
        <CarouselNext className="hidden lg:flex absolute right-[-1rem]" />
      </Carousel>
    </section>
  );
}
