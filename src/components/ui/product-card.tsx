import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent, CardFooter } from "./card";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import Separator from "./separator";

interface ProductCardProps {
  title: string;
  orginalPrice: number;
  discount: number;
  salePrice: number;
  qauntity: number;
  unit: string;
  imageUrl: string;
}

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <Card className="p-0 space-y-2">
      <CardContent className="p-4 pt-0 relative">
        <div className="h-full w-full flex justify-center">
          <Image className="p-3" src={product.imageUrl} alt={product.title} width={150} height={150} loading="lazy" />
        </div>
        <h1 className="font-semibold text-sm">{product.title}</h1>
        <p className="text-gray-800 text-xs">
          {product.qauntity} {product.unit}
        </p>
        <Button variant={"default"} className="absolute top-0 right-0 rounded-none rounded-bl-lg px-1.5 h-5 py-0 my-0 rounded-tr-lg text-xs cursor-default">
          {product.discount}% off
        </Button>
      </CardContent>
      <CardFooter className="p-4 pt-0 justify-between">
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">₹{product.salePrice}</span>
          <span className="text-xs font-semibold line-through text-gray-500">₹{product.orginalPrice}</span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"}>Add</Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Select Quantity</h4>
                <p>for {product.title}</p>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">₹{(product.salePrice / product.qauntity) * 0.5} per 0.5 kg</span>
                  <Button variant={"outline"}>Add</Button>
                </div>
                <Separator text=""/>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">₹{(product.salePrice / product.qauntity) * 1} per 1 kg</span>
                  <Button variant={"outline"}>Add</Button>
                </div>
                <Separator text=""/>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">₹{(product.salePrice / product.qauntity) * 2} per 2 kg</span>
                  <Button variant={"outline"}>Add</Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};
