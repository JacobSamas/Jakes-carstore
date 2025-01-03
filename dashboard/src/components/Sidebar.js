"use client";

import Link from "next/link";
import { FaCar, FaUsers, FaExchangeAlt } from "react-icons/fa";

const handleLogout = () => {
  localStorage.removeItem("jwtToken"); // Remove the token
  router.push("/login"); // Redirect to login page
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 shadow-lg">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              href="/cars"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-out"
            >
              <FaCar className="text-lg" />
              <span>Manage Cars</span>
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-out"
            >
              <FaUsers className="text-lg" />
              <span>Manage Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-out"
            >
              <FaExchangeAlt className="text-lg" />
              <span>Manage Transactions</span>
            </Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-10 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
