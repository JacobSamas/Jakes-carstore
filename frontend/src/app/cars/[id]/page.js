"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import FeaturedCars from "@/components/FeaturedCars";
import Link from "next/link";

export default function CarDetailsPage() {
  const { id } = useParams(); // Get the car ID from the route
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/cars/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading car details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-6">
          <ul className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/cars" className="hover:underline">
                Cars
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-bold">{car.title}</li>
          </ul>
        </nav>

        {/* Car Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            <Image
              src={car.image || "/placeholder-car.jpg"}
              alt={car.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {car.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{car.description}</p>
            <p className="text-2xl font-semibold text-primary mb-4">
              ${car.price.toLocaleString()}
            </p>
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded ${
                car.condition === "new"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {car.condition.charAt(0).toUpperCase() + car.condition.slice(1)}
            </span>

            {/* Call-to-Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                className="px-6 py-3 bg-primary text-white rounded hover:bg-opacity-90 shadow-lg transition transform hover:scale-105"
                onClick={() =>
                  toast.success("Contact seller functionality coming soon!")
                }
              >
                Contact Seller
              </button>
              <button
                className="px-6 py-3 bg-secondary text-white rounded hover:bg-opacity-90 shadow-lg transition transform hover:scale-105"
                onClick={() => toast.info("Buy now functionality coming soon!")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Car Specifications
          </h2>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold">Year:</td>
                <td className="py-2">{car.year || "Not Specified"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Mileage:</td>
                <td className="py-2">{car.mileage || "Not Specified"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Fuel Type:</td>
                <td className="py-2">{car.fuelType || "Not Specified"}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Transmission:</td>
                <td className="py-2">{car.transmission || "Not Specified"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Featured Cars Section */}
      <FeaturedCars />
    </section>
  );
}
