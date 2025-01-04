"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "new",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      toast.error('You must be logged in to list a car.');
      router.push('/login');
      return;
    }
  
    try {
      // Build the JSON payload for the request
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price), // Ensure price is a number
        condition: formData.condition,
        ownerId: 1, // Replace with dynamic ownerId if needed
      };
  
      const response = await fetch('http://localhost:5001/api/cars/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload), // Ensure correct JSON structure
      });
  
      if (response.ok) {
        toast.success('Car listed successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          condition: 'new',
          image: null,
        });
        setImagePreview(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to list car.');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Sell Your Car
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200"
        >
          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="e.g., 2022 Honda Civic"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Describe your car in detail"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Enter price in USD"
              required
            />
          </div>

          {/* Condition */}
          <div className="mb-6">
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700"
            >
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Car Preview"
                className="mt-4 rounded-lg shadow-md w-full object-cover"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-white text-lg font-medium rounded hover:bg-opacity-90 transition"
          >
            List Your Car
          </button>
        </form>
      </div>
    </section>
  );
}
