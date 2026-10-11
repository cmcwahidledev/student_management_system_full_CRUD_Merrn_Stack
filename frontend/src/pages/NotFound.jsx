import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-6">

            <div className="text-center">

                {/* 404 Number */}
                <h1 className="text-[120px] md:text-[160px] font-extrabold text-blue-600 leading-none">
                    404
                </h1>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center animate-bounce">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                    </div>
                </div>


                <h2 className="text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>


                <p className="mt-3 text-gray-500 max-w-md mx-auto">
                    Sorry, the page you are looking for does not exist or has
                    been moved.
                </p>


                <Link
                    to="/"
                    className="inline-block mt-8 px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
                >
                    Back To Home
                </Link>


            </div>

        </div>
    );
}

export default NotFound