"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaBars } from "react-icons/fa";
import HamburgerMenu from "./HamburgerMenu";

import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      localStorage.removeItem("jwtToken");
      setIsAuthenticated(false);
      toast.success("Logged out successfully!");
    } else {
      toast.info("Redirecting to login...");
      // Redirect to login page logic
    }
  };

  return (
    <>
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4 lg:px-0">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-lg font-bold">Jake&apos;s Carstore</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link href="/cars" className="hover:underline">
              Cars
            </Link>
            <Link href="/sell" className="hover:underline">
              Sell a Car
            </Link>
            <button
              onClick={handleLoginLogout}
              className="px-4 py-2 bg-white text-primary rounded hover:bg-gray-100"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </nav>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Hamburger Menu */}
      <HamburgerMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isAuthenticated={isAuthenticated}
        handleLoginLogout={handleLoginLogout}
      />

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
