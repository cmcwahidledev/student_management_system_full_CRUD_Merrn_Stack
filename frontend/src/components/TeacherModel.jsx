// components/StudentModel.jsx
import React, { useState } from 'react';
import { FaTimes, FaSave, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast'
import axios from 'axios';
import { useEffect } from 'react';

const TeacherModel = ({ isOpen, onClose, mode, isSelect, getTeacher }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            phone: '',
            subject: '',
            gender: '',
            salary: '',
            address: '',
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
                const res = await axios.put(`http://localhost:5000/api/teacher/${isSelect._id}`, formData, {
                    headers: { Authorization: token }
                });
                console.log(isSelect.id)
                toast.success(res.data.message);
            } else {
                const token = localStorage.getItem("token");
                console.log(token)
                const res = await axios.post("http://localhost:5000/api/teacher-add", formData, {
                    headers: { "Authorization": token }
                });
                toast.success(res.data.message);
            }
            onClose();
            getTeacher();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response);
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {mode == "add" ? 'Add New Teacher' : 'Update Teacher'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                        <label className="block text-gray-700 font-medium mb-2">Subject</label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        >
                            <option value="">Select Subject</option>
                            <option value="IT">IT</option>
                            <option value="CS">CS</option>
                        </select>
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
                        <label className="block text-gray-700 font-medium mb-2">Salary</label>
                        <input
                            type="tel"
                            name="salary"
                            placeholder='phone'
                            value={formData.salary}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                        />
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

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            {mode == "add" ? <><FaSave />Save Teacher</> : <><FaEdit />Update Teacher</>}
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

export default TeacherModel;