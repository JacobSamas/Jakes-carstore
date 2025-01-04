'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCarAlt, FaTag, FaCalendarAlt } from 'react-icons/fa';

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars
    .filter((car) =>
      car.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((car) =>
      condition ? car.condition === condition : true
    )
    .filter((car) =>
      car.price >= priceRange[0] && car.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  if (loading) {
    return <p className="text-center py-10">Loading cars...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Cars</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <input
            type="text"
            placeholder="Search cars by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full md:w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="date-desc">Newest</option>
          </select>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={car.image || '/placeholder-car.jpg'}
                alt={car.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{car.title}</h3>
                <p className="text-gray-600 flex items-center">
                  <FaTag className="mr-2 text-secondary" />
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaCarAlt className="mr-2 text-secondary" />
                  {car.condition.charAt(0).toUpperCase() + car.condition.slice(1)}
                </p>
                <Link href={`/cars/${car.id}`}>
                  <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
