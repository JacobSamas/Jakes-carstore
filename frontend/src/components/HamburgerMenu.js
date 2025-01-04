"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function HamburgerMenu({
  isOpen,
  onClose,
  isAuthenticated,
  handleLoginLogout,
}) {
  if (!isOpen) return null;

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-opacity-50 z-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      transition={{ duration: 0.3 }}
    >
      <div
        className="fixed top-0 right-0 w-64 h-full bg-white flex flex-col shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col items-start px-6 space-y-4">
          <Link href="/cars" onClick={onClose} className="text-lg">
            Cars
          </Link>
          <Link href="/sell" onClick={onClose} className="text-lg">
            Sell a Car
          </Link>
          <Link href="/contact" onClick={onClose} className="text-lg">
            Contact Us
          </Link>
          <Link href="/about" onClick={onClose} className="text-lg">
            About Us
          </Link>
          <button
            onClick={() => {
              handleLoginLogout();
              onClose();
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
