'use client';

import React, { useEffect, useRef } from 'react';
import { FaCar, FaTags, FaHandshake, FaWallet } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const cardsRef = useRef([]);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && cardsRef.current.length > 0) {
      // GSAP Animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current, // Trigger the entire grid
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  const features = [
    {
      icon: <FaCar className="text-secondary text-4xl mb-4" />,
      title: 'Wide Selection',
      description: 'Choose from a variety of cars for every budget and need.',
    },
    {
      icon: <FaTags className="text-secondary text-4xl mb-4" />,
      title: 'Affordable Prices',
      description: 'Get the best deals and competitive prices on all cars.',
    },
    {
      icon: <FaHandshake className="text-secondary text-4xl mb-4" />,
      title: 'Trusted Sellers',
      description: 'Buy from verified and trusted sellers with confidence.',
    },
    {
      icon: <FaWallet className="text-secondary text-4xl mb-4" />,
      title: 'Easy Financing',
      description: 'Flexible financing options to make car buying hassle-free.',
    },
  ];

  return (
    <section className="pt-20 bg-gray-50">
      <div className="container mx-auto text-center px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          Why Choose Jake&apos;s Carstore?
        </h2>

        {/* Features Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="p-6 bg-white rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              {/* Feature Icon */}
              {feature.icon}

              {/* Feature Title */}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
