import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent, CardFooter } from "./card";

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
    <Card>
      <CardContent className="relative pb-4">
        <div className="h-full w-full flex justify-center">
          <Image className="p-3" src={product.imageUrl} alt={product.title} width={180} height={180} loading="lazy" />
        </div>
        <h1 className="font-semibold text-sm">{product.title}</h1>
        <p className="text-gray-800 text-xs">{product.qauntity} {product.unit}</p>
          <Button variant={"default"} className="absolute top-0 right-0 rounded-none rounded-bl-lg px-1.5 h-5 py-0 my-0 rounded-tr-lg text-xs cursor-default">
            {product.discount}% off
          </Button>
      </CardContent>
      <CardFooter className="pb-3 justify-between">
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">₹{product.salePrice}</span>
          <span className="text-xs font-semibold line-through text-gray-500">₹{product.orginalPrice}</span>
        </div>
        <Button variant={"outline"}>Add</Button>
      </CardFooter>
    </Card>
  );
};
