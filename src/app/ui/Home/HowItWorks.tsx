export default function HowItWorks() {
  return (
    <section className="how-it-works p-10 text-center">
      <h2 className="text-3xl font-bold">How It Works</h2>
      <div className="steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="step bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold">1. Choose Your Items</h3>
          <p>Select from a wide variety of fresh fruits and vegetables.</p>
        </div>
        <div className="step bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold">2. Place Your Order</h3>
          <p>Checkout and schedule delivery at a convenient time.</p>
        </div>
        <div className="step bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold">3. Enjoy Freshness</h3>
          <p>Receive farm-fresh produce directly at your door.</p>
        </div>
      </div>
    </section>
  );
}
