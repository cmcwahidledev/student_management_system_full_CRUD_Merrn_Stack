import { Link } from "react-router-dom";

const Options = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6">

            <div className="text-center">

                <h1 className="text-4xl font-bold text-gray-800">
                    Student Management System
                </h1>

                <p className="mt-3 text-gray-500 text-lg">
                    Select how you want to continue
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Admin Card */}
                    <Link
                        to="/admin-login"
                        className="group bg-white rounded-3xl shadow-lg p-10 w-80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-blue-600 group-hover:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.121 17.804A9 9 0 1118.364 4.56M15 11a3 3 0 11-6 0 3 3 0 016 0zm-3 5c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
                                />
                            </svg>

                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-800">
                            Admin
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Manage students, teachers, courses and reports.
                        </p>

                    </Link>

                    {/* Student Card */}
                    <Link
                        to="/student-login"
                        className="group bg-white rounded-3xl shadow-lg p-10 w-80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-green-600 group-hover:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                                />
                            </svg>

                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-800">
                            Student
                        </h2>

                        <p className="mt-2 text-gray-500">
                            View your profile, teacher and enrolled courses.
                        </p>

                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Options;