// components/Navbar.jsx
import React from 'react';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div>
                <p className="text-gray-500 text-sm">Welcome back, Admin</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-64"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <button className="relative">
                    <FaBell className="text-2xl text-gray-600 hover:text-blue-600 transition" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </button>

                <button className="flex items-center gap-2">
                    <FaUserCircle className="text-3xl text-gray-600" />
                    <span className="text-gray-700 font-medium">Admin</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;