"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:underline">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:underline">
                  Sell a Car
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <p className="mb-2">123 Jake&apos;s Avenue, Car City, USA</p>
            <p className="mb-2">Phone: +1 (800) 123-4567</p>
            <p className="mb-2">
              Email:{" "}
              <a
                href="mailto:info@jakescarstore.com"
                className="hover:underline"
              >
                info@jakescarstore.com
              </a>
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a
                href="mailto:info@jakescarstore.com"
                className="text-white hover:text-gray-300"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-white">
          &copy; {new Date().getFullYear()} Jake&apos;s Carstore. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
