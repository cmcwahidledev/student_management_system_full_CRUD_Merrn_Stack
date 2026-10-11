// components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaUserGraduate,
    FaBook,
    FaChartBar,
    FaSignOutAlt,
    FaChalkboardTeacher,
    FaGraduationCap
} from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { path: '/admin-dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
        { path: '/admin-students', name: 'Students', icon: <FaUserGraduate /> },
        { path: '/admin-teacher', name: 'Teacher', icon: <FaChalkboardTeacher /> },
        { path: '/admin-courses', name: 'Courses', icon: <FaBook /> },
        { path: '/admin-grade', name: 'Grade', icon: <FaGraduationCap /> },
        { path: '/admin-report', name: 'Report', icon: <FaChartBar /> },
    ];

    const backLogin = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        backLogin("/admin-login")
    };

    return (
        <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white w-64 min-h-screen fixed left-0 top-0 shadow-xl">
            <div className="p-5 border-b border-blue-700">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <FaUserGraduate className="text-3xl" />
                    <span>StudentMS</span>
                </h1>
                <p className="text-sm text-blue-200 mt-1">Management System</p>
            </div>

            <nav className="mt-8">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-6 py-3 mx-2 rounded-lg transition-all duration-300 ${isActive
                                ? 'bg-blue-700 text-white shadow-lg'
                                : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                            }`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-3 mx-2 mt-8 rounded-lg text-blue-100 hover:bg-red-600 hover:text-white transition-all duration-300 w-60"
                >
                    <FaSignOutAlt className="text-xl" />
                    <span className="font-medium">Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;