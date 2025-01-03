'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            <section className="hero py-20 bg-primary text-white">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Jake&apos;s Carstore</h1>
                    <p className="text-lg mb-6">Find your dream car today at unbeatable prices.</p>
                    <Link
                        href="/cars"
                        className="px-6 py-3 bg-secondary text-white font-bold rounded hover:bg-opacity-90"
                    >
                        Browse Cars
                    </Link>
                </div>
            </section>
            <section className="py-12 container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white shadow rounded">
                        <Image src="/images/hero-car.png" alt="Wide Selection" width={80} height={80} />
                        <h3 className="text-lg font-bold mt-4">Wide Selection</h3>
                        <p className="mt-2">Choose from a variety of cars for every budget and need.</p>
                    </div>
                    <div className="text-center p-6 bg-white shadow rounded">
                        <Image src="/images/hero-car.png" alt="Affordable Prices" width={80} height={80} />
                        <h3 className="text-lg font-bold mt-4">Affordable Prices</h3>
                        <p className="mt-2">Get great deals on high-quality vehicles.</p>
                    </div>
                    <div className="text-center p-6 bg-white shadow rounded">
                        <Image src="/images/hero-car.png" alt="Trusted Platform" width={80} height={80} />
                        <h3 className="text-lg font-bold mt-4">Trusted Platform</h3>
                        <p className="mt-2">Join thousands of satisfied customers.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
