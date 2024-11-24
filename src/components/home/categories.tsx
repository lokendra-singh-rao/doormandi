"use client"
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export const Categories = () => {
  const categories = [
    // { title: "All", image: "/logo.png" },
    { title: "Fruits", image: "/fruits-category.png" },
    { title: "Vegetables", image: "/vegetables-category.png" },
    { title: "Exotic Fruits", image: "/exotic-fruits-category.png" },
    { title: "Exotic Vegetables", image: "/exotic-vegetables-category.png" },
  ];

  const handleScroll = ({ id }: { id: string }) => {
    const targetElement = document.getElementById(id);
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0; // Get the navbar height

    if (targetElement) {
      const yOffset = -navbarHeight; // Offset for the navbar
      const yPosition = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 lg:px-10 flex flex-col gap-y-4">
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="flex gap-x-4 flex-wrap">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col justify-center items-center gap-y-2" onClick={() => handleScroll({id:category.title.toLowerCase().split(" ").join("-")})}>
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
