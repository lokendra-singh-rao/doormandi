import Image from "next/image";

export default function FeaturedSection() {
  return (
    <section className="featured-products p-10 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="product-card bg-white shadow-md p-4 rounded-lg">
            <Image src="/images/tomato.jpg" alt="Tomato" width={150} height={150} />
            <h3 className="mt-2 font-semibold">Tomatoes</h3>
            <p>Fresh, juicy tomatoes perfect for any dish.</p>
          </div>
          <div className="product-card bg-white shadow-md p-4 rounded-lg">
            <Image src="/images/apple.jpg" alt="Apple" width={150} height={150} />
            <h3 className="mt-2 font-semibold">Apples</h3>
            <p>Crisp and sweet apples sourced from local farms.</p>
          </div>
          <div className="product-card bg-white shadow-md p-4 rounded-lg">
            <Image src="/images/spinach.jpg" alt="Spinach" width={150} height={150} />
            <h3 className="mt-2 font-semibold">Spinach</h3>
            <p>Green leafy goodness packed with nutrients.</p>
          </div>
        </div>
      </section>
  )
}
