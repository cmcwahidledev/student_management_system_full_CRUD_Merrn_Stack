// pages/Report.jsx
import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileExcel, FaPrint, FaChartLine } from 'react-icons/fa';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import LayOut from '../../components/LayOut';

const Report = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setStudents(JSON.parse(localStorage.getItem('students')) || []);
        setCourses(JSON.parse(localStorage.getItem('courses')) || []);
    }, []);

    const enrollmentData = courses.map(course => ({
        name: course.name,
        students: course.enrolledStudents || 0,
        capacity: course.capacity
    }));

    const studentStatusData = [
        { name: 'Active', value: students.filter(s => s.status === 'Active').length },
        { name: 'Inactive', value: students.filter(s => s.status === 'Inactive').length },
        { name: 'Graduated', value: students.filter(s => s.status === 'Graduated').length }
    ];

    const monthlyData = [
        { month: 'Jan', students: 45 },
        { month: 'Feb', students: 52 },
        { month: 'Mar', students: 58 },
        { month: 'Apr', students: 65 },
        { month: 'May', students: 72 },
        { month: 'Jun', students: 78 }
    ];

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

    const courseDistribution = courses.map(course => ({
        name: course.name,
        students: course.enrolledStudents || 0
    }));

    return (
        <LayOut>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Reports & Analytics</h2>
                        <p className="text-gray-500">View system statistics and reports</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                            <FaFilePdf /> Export PDF
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                            <FaFileExcel /> Export Excel
                        </button>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center gap-2">
                            <FaPrint /> Print
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaChartLine className="text-blue-600" />
                            Student Enrollment Trend
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Student Status Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={studentStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {studentStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Course Enrollment Overview</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={enrollmentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="students" fill="#3B82F6" name="Enrolled Students" />
                            <Bar dataKey="capacity" fill="#F59E0B" name="Capacity" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Statistics</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                                <span className="font-medium">Total Students</span>
                                <span className="text-2xl font-bold text-blue-600">{students.length}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                                <span className="font-medium">Total Courses</span>
                                <span className="text-2xl font-bold text-green-600">{courses.length}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                                <span className="font-medium">Active Students</span>
                                <span className="text-2xl font-bold text-purple-600">
                                    {students.filter(s => s.status === 'Active').length}
                                </span>
                            </div>
                            <div className="flex justify-between p-3 bg-yellow-50 rounded-lg">
                                <span className="font-medium">Average Class Size</span>
                                <span className="text-2xl font-bold text-yellow-600">
                                    {courses.length > 0 ? Math.round(students.length / courses.length) : 0}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Top Courses by Enrollment</h3>
                        <div className="space-y-3">
                            {courseDistribution.sort((a, b) => b.students - a.students).slice(0, 5).map((course, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium">{course.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 rounded-full h-2"
                                                style={{ width: `${(course.students / Math.max(...courseDistribution.map(c => c.students))) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium">{course.students} students</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </LayOut>
    );
};

export default Report;