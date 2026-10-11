// pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaDollarSign, FaGraduationCap } from 'react-icons/fa';
import LayOut from '../../components/LayOut';
import axios from 'axios';

const Dashboard = () => {

    const [dataStudent, setDataStudent] = useState([]);
    const [dataCourse, setDataCourse] = useState([]);
    const [dataTeacher, setDataTeacher] = useState([]);
    const [dataGrade, setDataGrade] = useState([]);

    const studetnLength = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/student", {
                headers: { "Authorization": token }
            })
            setDataStudent(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const courseLength = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/course", {
                headers: { "Authorization": token }
            })
            setDataCourse(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const teacherLength = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/teacher", {
                headers: { "Authorization": token }
            })
            setDataTeacher(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const GradeLength = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/grade", {
                headers: { "Authorization": token }
            })
            setDataGrade(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        studetnLength();
        courseLength();
        teacherLength();
        GradeLength();
    }, []);


    const cardData = [
        {
            title: 'Total Students',
            value: dataStudent.length,
            icon: <FaUserGraduate />,
            color: 'bg-blue-500',
            trend: { isPositive: true, value: '12%' }
        },
        {
            title: 'Total Courses',
            value: dataCourse.length,
            icon: <FaBook />,
            color: 'bg-green-500',
            trend: { isPositive: true, value: '5%' }
        },
        {
            title: 'Total Teachers',
            value: dataTeacher.length,
            icon: <FaChalkboardTeacher />,
            color: 'bg-purple-500',
            trend: { isPositive: false, value: '2%' }
        },
        {
            title: 'Total Grade',
            value: dataGrade.length,
            icon: <FaGraduationCap />,
            color: 'bg-yellow-500',
            trend: { isPositive: true, value: '18%' }
        }
    ];

    return (
        <LayOut>
            <div>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
                    <p className="text-gray-500">Welcome to your dashboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {cardData.map((card, index) => (
                        <Card key={index} {...card} />
                    ))}
                </div>


            </div>
        </LayOut>
    );
};

export default Dashboard;