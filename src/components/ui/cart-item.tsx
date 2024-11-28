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
    <Card>
      <CardContent className="p-1 flex items-center justify-start gap-2">
        <div>
          <Image width={80} height={80} src={product.imageUrl} alt={product.title} />
        </div>
        <div className="space-y-1">
          <div>
            <h1 className="font-semibold">{product.title}</h1>
            <p>
              Quantity: {product.qauntity} {product.unit}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-[26px] w-[26px] shrink-0 border-none rounded-full" onClick={() => {}}>
              <Minus />
              <span className="sr-only">Decrease</span>
            </Button>
            <Input type="tel" value={10} className="text-center align-middle w-10 px-0 h-[30px]" />
            <Button variant="outline" size="icon" className="h-[26px] w-[26px] shrink-0 border-none rounded-full" onClick={() => {}}>
              <Plus />
              <span className="sr-only">Decrease</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
