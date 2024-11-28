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
    <Card className="border-2 shadow-none">
      <CardContent className="p-1 flex items-center justify-start gap-4">
        <div>
          <Image width={70} height={70} src={product.imageUrl} alt={product.title} />
        </div>
        <div className="space-y-1.5 flex-1">
          <div>
            <h1 className="text-[15px]">{product.title}</h1>
            <p className="text-sm font-semibold">₹{product.salePrice}</p>
          </div>
          <div className="flex items-center justify-between pb-1 pr-1">
            <p className="text-sm">
              {product.qauntity} {product.unit}
            </p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-[26px] w-[26px] rounded-full" onClick={() => {}}>
                <Minus strokeWidth={2.5} />
                <span className="sr-only">Decrease</span>
              </Button>
              <Input type="tel" value={99} className="text-center rounded-full align-middle w-[30px] px-0 h-[30px]" />
              <Button variant="ghost" size="icon" className="h-[26px] w-[26px] rounded-full" onClick={() => {}}>
                <Plus strokeWidth={2.5} />
                <span className="sr-only">Decrease</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
