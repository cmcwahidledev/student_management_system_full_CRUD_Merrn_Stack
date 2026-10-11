// components/StudentModel.jsx
import React, { useState } from 'react';
import { FaTimes, FaSave, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast'
import axios from 'axios';
import { useEffect } from 'react';

const StudentModel = ({ isOpen, onClose, mode, isSelect, getStudent }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            phone: '',
            age: '',
            gender: '',
            address: '',
            course: '',
            teacher: '',
            grade: '',
        }
    );

    useEffect(() => {
        if (isSelect) {
            setFormData(isSelect)
        }
    }, [isSelect])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSelect) {
                const token = localStorage.getItem("token");
                console.log(token)
                const res = await axios.put(`http://localhost:5000/api/student/${isSelect._id}`, formData, {
                    headers: { Authorization: token }
                });
                console.log(isSelect.id)
                toast.success(res.data.message);
            } else {
                const token = localStorage.getItem("token");
                console.log(token)
                const res = await axios.post("http://localhost:5000/api/student-add", formData, {
                    headers: { Authorization: token }
                });
                toast.success(res.data.message);
            }
            onClose();
            getStudent();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response);
        }
    };

    const [nameData, setNameData] = useState([])
    const [teacherData, setTeacherData] = useState([])
    const [grade, setGrade] = useState([])

    const getCourseName = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/course", {
                headers: { "Authorization": token }
            });
            setNameData(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getCourseName();
    }, []);


    const getTeacherName = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/teacher", {
                headers: { "Authorization": token }
            });
            setTeacherData(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getTeacherName();
    }, []);


    const getGrade = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/grade", {
                headers: { "Authorization": token }
            });
            setGrade(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getGrade();
    }, []);

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {mode ? 'Add New Student' : 'Update Student'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder='name'
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='email'
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Age</label>
                            <input
                                type="number"
                                name="age"
                                placeholder='age'
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                            >
                                <option value="">Select gender</option>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                placeholder='address'
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                            />
                        </div>
                    </div>


                    <div>

                        <label className="block text-gray-700 font-medium mb-2">Course</label>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        >
                            {nameData.map(courseName => (
                                <>
                                    <option key={courseName.id} value="">Select Course</option>
                                    <option value={courseName._id}>{courseName._id}</option>
                                </>
                            ))}
                        </select>

                        <label className="block text-gray-700 font-medium mb-2 mt-2">Teacher</label>
                        <select
                            name="teacher"
                            value={formData.teacher}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        >
                            {teacherData.map(teacherName => (
                                <>
                                    <option key={teacherName.id} value="">Select Teacher</option>
                                    <option value={teacherName._id}>{teacherName._id}</option>
                                </>
                            ))}
                        </select>

                        <label className="block text-gray-700 font-medium mb-2 mt-2">Grade</label>
                        <select
                            name="grade"
                            value={grade.grade}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        >
                            {grade.map(grade => (
                                <>
                                    <option key={grade.id} value="">Select Grade</option>
                                    <option value={grade._id}>{grade._id}</option>
                                </>
                            ))}
                        </select>

                    </div>


                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            {mode == "add" ? <><FaSave />Save Student</> : <><FaEdit />Update Student</>}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentModel;