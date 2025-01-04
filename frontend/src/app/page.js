'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import Features from '@/components/Features';

export default function HomePage() {
  const quotes = [
    'Find your dream car today at unbeatable prices.',
    'Drive your dreams with Jake’s Carstore.',
    'Quality cars, incredible prices, trusted sellers.',
    'Unmatched deals on the car of your dreams.',
    'The ultimate destination for car enthusiasts.',
  ];
  const [currentQuote, setCurrentQuote] = useState(0);

  const heroRef = useRef();

  useEffect(() => {
    // GSAP Scroll Animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    // Quote Auto-Changer
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="hero py-20 bg-primary text-white relative overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-primary"></div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto text-center px-4">
          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Jake&apos;s Carstore
          </motion.h1>

          {/* Dynamic Quote */}
          <motion.p
            key={currentQuote}
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {quotes[currentQuote]}
          </motion.p>

          {/* Call-to-Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Link
              href="/cars"
              className="px-6 py-3 bg-secondary text-white font-bold rounded hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Cars
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <Features />
    </div>
  );
}
