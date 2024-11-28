import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Input } from "./input";

interface Product {
  title: string;
  orginalPrice: number;
  discount: number;
  salePrice: number;
  qauntity: number;
  unit: string;
  imageUrl: string;
}

interface CartItemProps {
  product: Product;
  //   onQuantityChange: (quantity: number) => void;
  //   onRemove: () => void;
}

export const CartItem = ({ product }: CartItemProps) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="border-none p-1 flex items-center justify-start gap-4">
        <div className="p-4">
          <Image width={70} height={70} src={product.imageUrl} alt={product.title} />
        </div>
        <div className="space-y-1.5 flex-1">
          <div>
            <h1 className="font-bold">{product.title}</h1>
            <p className="text-sm">₹{product.salePrice}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <strong>Quantity:</strong> {product.qauntity} {product.unit}
            </p>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="icon" className="h-[26px] w-[26px] shrink-0 border-none rounded-full" onClick={() => {}}>
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <Input type="tel" value={10} className="text-center align-middle w-10 px-0 h-[26px]" />
              <Button variant="outline" size="icon" className="h-[26px] w-[26px] shrink-0 border-none rounded-full" onClick={() => {}}>
                <Plus />
                <span className="sr-only">Decrease</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
