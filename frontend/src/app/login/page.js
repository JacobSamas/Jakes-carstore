'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);
        toast.success('Logged in successfully!');
        router.push('/');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back!</h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your details to log in and continue your journey.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition font-semibold shadow-md"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-primary hover:underline font-semibold">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
