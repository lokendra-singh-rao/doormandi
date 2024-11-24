import AboutUs from "@/components/home/about-us";
import { Categories } from "@/components/home/categories";
import Hero from "@/components/home/hero";
import ProductList from "@/components/home/product-list";

export default async function Home() {

  const fruits = [
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

  const vegetables = [
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

  const exoticFruits = [
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

  const exoticVegetables = [
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
    <div className="space-y-6">
      <Hero />
      <Categories/>
      <ProductList title="Vegetables" products={vegetables}/>
      <ProductList title="Fruits" products={fruits}/>
      <ProductList title="Exotic Vegetables" products={exoticVegetables}/>
      <ProductList title="Exotic Fruits" products={exoticFruits}/>
      {/* <HowItWorks /> */}
      {/* <CustomerTestimonials /> */}
      <AboutUs />
    </div>
  );
}
