// pages/Student.jsx
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import TeacherModel from '../../components/TeacherModel';
import LayOut from '../../components/LayOut';
import axios from 'axios';

const Teacher = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSelect, setIsSelect] = useState(null);
    const [search, setSearch] = useState('');
    const [mode, setMode] = useState("add");

    const [data, setData] = useState([]);

    const [page, sePage] = useState(1);

    const GetSearchIngData = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/teacher", {
            headers: { "Authorization": token }
        });
        setData(res.data);
    }

    const studentFilter = data.filter(teacher => {
        if (search === GetSearchIngData()) {
            return false;
        }
        return teacher.name.toLowerCase().includes(search.toLowerCase())
    })

    const prePageRow = 5;
    const start = (page - 1) * prePageRow;
    const rows = studentFilter.slice(start, start + prePageRow);

    const getTeacher = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/teacher", {
                headers: { "Authorization": token }
            });
            setData(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        getTeacher();
    }, []);

    const handleDeleteTeacher = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/teacher/${id}`, {
                headers: { "Authorization": token }
            });
        } catch (error) {
            console.log(error.response);
        } finally {
            getStudent();
        }
    };

    const handleOpenAdd = () => {
        setIsModalOpen(true);
        setMode("add");
    }

    const handleOpenEdit = (selectData) => {
        setIsModalOpen(true);
        setMode("Edit");
        setIsSelect(selectData)
    }

    return (
        <LayOut>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Teacher Management</h2>
                        <p className="text-gray-500">Manage all teacher in the system</p>
                    </div>
                    <button
                        onClick={() => { handleOpenAdd(); setIsSelect(null) }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <FaPlus /> Add New Teacher
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Search teacher..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value) }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Total: {rows.length} teacher</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 ">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rows.map((teacher, ind) => (
                                    <tr key={teacher._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{ind + 1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher.subject}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher.gender}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher.salary}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{teacher.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => { handleOpenEdit(teacher) }}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTeacher(teacher._id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {rows.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No teacher found
                            </div>
                        )}
                    </div>
                </div>

                <TeacherModel
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                    }}
                    isSelect={isSelect}
                    mode={mode}
                    getTeacher={getTeacher}
                />
            </div>
        </LayOut>
    );
};

export default Teacher;