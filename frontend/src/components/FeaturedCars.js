'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const carouselRef = useRef(null);
  const cardWidth = 352; // Adjust card width + gap dynamically if needed

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
        setLoading(false);

        // GSAP animation for cards
        gsap.fromTo(
          '.car-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 85%',
            },
          }
        );
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const scrollCarousel = (direction) => {
    const maxScroll =
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const currentScroll = carouselRef.current.scrollLeft;
    const newScroll =
      direction === 'left'
        ? Math.max(0, currentScroll - cardWidth)
        : Math.min(maxScroll, currentScroll + cardWidth);

    gsap.to(carouselRef.current, {
      scrollLeft: newScroll,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Update arrow visibility
    setTimeout(() => {
      setShowLeftArrow(newScroll > 0);
      setShowRightArrow(newScroll < maxScroll);
    }, 300); // Delay to allow the scroll animation to complete
  };

  if (loading) {
    return <p className="text-center py-10">Loading featured cars...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-4 relative">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Featured Cars</h2>
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-secondary text-white p-2 rounded-full shadow-md hover:bg-opacity-90"
              aria-label="Scroll left"
              onClick={() => scrollCarousel('left')}
            >
              &lt;
            </button>
          )}

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-hidden scroll-smooth"
          >
            {cars.map((car) => (
              <div
                key={car.id}
                className="car-card min-w-[320px] bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
              >
                <Link href={`/cars/${car.id}`}>
                  <Image
                    src={car.image || '/placeholder-car.jpg'}
                    alt={car.title}
                    width={320}
                    height={200}
                    className="w-full h-48 object-cover"
                    priority
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {car.title}
                  </h3>
                  <p className="text-gray-600">
                    ${car.price.toLocaleString()}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded ${
                      car.condition === 'new'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {car.condition.charAt(0).toUpperCase() +
                      car.condition.slice(1)}
                  </span>
                  <Link href={`/cars/${car.id}`}>
                    <button className="mt-4 w-full px-4 py-2 bg-secondary text-white rounded hover:bg-opacity-90">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-secondary text-white p-2 rounded-full shadow-md hover:bg-opacity-90"
              aria-label="Scroll right"
              onClick={() => scrollCarousel('right')}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
