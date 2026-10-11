// components/StudentModel.jsx
import React, { useState } from 'react';
import { FaTimes, FaSave, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast'
import axios from 'axios';
import { useEffect } from 'react';

const StudentModel = ({ isOpen, onClose, mode, isSelect, getCourse }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState(
        {
            name: '',
            code: '',
            teacher: '',
            duration: '',
            fee: ''
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
                const res = await axios.put(`http://localhost:5000/api/course/${isSelect._id}`, formData, {
                    headers: { Authorization: token }
                });
                console.log(isSelect.id)
                toast.success(res.data.message);
            } else {
                const token = localStorage.getItem("token");
                console.log(token)
                const res = await axios.post("http://localhost:5000/api/course-add", formData, {
                    headers: { Authorization: token }
                });
                toast.success(res.data.message);
            }
            onClose();
            getCourse();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response);
        }
    };

    const [nameData, setNameData] = useState([])

    const getTeacherName = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/teacher", {
                headers: { "Authorization": token }
            });
            setNameData(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getTeacherName();
    }, [])

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {mode == "add" ? 'Add New Course' : 'Update Course'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Course Name</label>
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
                        <label className="block text-gray-700 font-medium mb-2">Code</label>
                        <input
                            type="text"
                            name="code"
                            placeholder='code'
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        />
                    </div>

                    <div>

                        <label className="block text-gray-700 font-medium mb-2">Teacher</label>
                        <select
                            name="teacher"
                            value={formData.teacher}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        >
                            {nameData.map(teacherName => (
                                <>
                                    <option key={teacherName._id} value="">Select Teacher</option>
                                    <option value={teacherName._id}>{teacherName._id}</option>
                                </>
                            ))}
                        </select>

                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Duration</label>
                        <input
                            type="number"
                            name="duration"
                            placeholder='duration'
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Fee</label>
                        <input
                            type="number"
                            name="fee"
                            placeholder='fee'
                            value={formData.fee}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        />
                    </div>


                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            {mode == "add" ? <><FaSave />Save Course</> : <><FaEdit />Update Course</>}
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