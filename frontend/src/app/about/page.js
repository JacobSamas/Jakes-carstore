'use client';

export default function AboutPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Us</h2>
        <div className="text-lg text-gray-700 space-y-6">
          <p>
            Welcome to <strong>Jake&apos;s Carstore</strong>, your trusted destination for buying and selling cars.
            Founded with the goal of revolutionizing the automotive industry, we are committed to providing you with
            the best cars at unbeatable prices.
          </p>
          <p>
            Our mission is to make car buying and selling seamless, transparent, and enjoyable. We connect car
            enthusiasts and buyers with a diverse inventory that suits every taste and budget.
          </p>
          <p>
            Whether you&apos;re looking for your dream car or looking to sell your current one, Jake&apos;s Carstore
            is here to make the process smooth and hassle-free.
          </p>
        </div>
      </div>
    </section>
  );
}
