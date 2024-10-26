export default function CustomerTestimonials() {
  return (
    <section className="testimonials bg-gray-100 p-10 text-center">
      <h2 className="text-3xl font-bold">Customer Testimonials</h2>
      <div className="testimonials-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="testimonial bg-white shadow-md p-4 rounded-lg">
          <p>"Amazing quality and fast delivery! Love the freshness."</p>
          <h3 className="mt-2 font-semibold">- John D.</h3>
        </div>
        <div className="testimonial bg-white shadow-md p-4 rounded-lg">
          <p>"Doormandi makes healthy eating so convenient."</p>
          <h3 className="mt-2 font-semibold">- Sarah W.</h3>
        </div>
        <div className="testimonial bg-white shadow-md p-4 rounded-lg">
          <p>"Great selection and very affordable prices!"</p>
          <h3 className="mt-2 font-semibold">- Mark T.</h3>
        </div>
      </div>
    </section>
  );
}
