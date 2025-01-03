import { FiBell } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
    return (
        <header className="bg-gray-100 p-4 shadow flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <button
                    className="relative p-2 rounded-full hover:bg-gray-200 transition duration-200"
                    aria-label="Notifications"
                >
                    <FiBell className="text-xl text-gray-600" />
                    {/* Notification Badge */}
                    <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        3
                    </span>
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <FaUserCircle className="text-2xl text-gray-600" />
                    <span className="text-gray-800 font-medium">Admin</span>
                </div>
            </div>
        </header>
    );
}
