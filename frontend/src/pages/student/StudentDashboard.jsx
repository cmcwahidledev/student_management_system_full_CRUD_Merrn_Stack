import axios from 'axios';
import React from 'react'
import { NavLink } from 'react-router-dom';

const StudentDashboard = () => {

    const [student, setStudent] = React.useState(null);

    React.useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("tokenStudent");

                const res = await axios.get(
                    "http://localhost:5000/api/student-profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStudent(res.data.data);
                console.log(res.data.data);

            } catch (error) {
                console.log(error);
            }

        };

        fetchProfile();

    }, []);

    const removeToken = () => {
        localStorage.removeItem("tokenStudent");
    };

    return (
        <div className='min-h-screen p-8'>

            <div className='bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8
             text-white shadow-xl mb-8'>
                <h1 className='text-4xl font-bold '>Welcome, {student?.name}</h1>
                <p className='mt-2 text-indigo-100'>Student Dashboard</p>
            </div>


            <div className='bg-white rounded-3xl shadow-lg mt-10 overflow-hidden'>
                <div className='bg-indigo-600 text-white p-5 flex justify-between'>
                    <h2 className='text-2xl font-bold'>My Info</h2>
                    <button onClick={() => removeToken} className='bg-red-500 px-5 cursor-pointer rounded-lg'>
                        <NavLink to="/student-login">LogOut</NavLink>
                    </button>

                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-slate-100'>
                            <tr>
                                <th className='p-4'>Student Name</th>
                                <th className='p-4'>Courses Name</th>
                                <th className='p-4'>Teacher Name</th>
                                <th className='p-4'>Grade Student</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b hover:bg-slate-50 text-center'>
                                <td className='p-4 font-semibold'>{student?.name}</td>
                                <td className='p-4 font-semibold'>{student?.course?.name}</td>
                                <td className='p-4 font-semibold'>{student?.teacher?.name}</td>
                                <td className='p-4 font-semibold'>{student?.grade?.grade || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard