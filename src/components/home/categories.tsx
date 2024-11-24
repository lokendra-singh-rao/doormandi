import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export const Categories = () => {
  const categories = [
    { title: "All", image: "/logo.png" },
    { title: "Fruits", image: "/fruits-category.png" },
    { title: "Vegetables", image: "/vegetables-category.png" },
  ];

  return (
    <section className="px-4 lg:px-10 flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="flex gap-x-4 flex-wrap">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col justify-center items-center gap-y-2">
            <Card className="w-22 xs:w-28 flex items-center justify-center border-0 cursor-pointer">
              <CardContent className="flex flex-col w-full p-1 items-center justify-center bg-green-50/50">
                <Image src={category.image} alt={category.title} width={96} height={96} />
              </CardContent>
            </Card>
            <h3 className="text-sm font-semibold text-center">{category.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
