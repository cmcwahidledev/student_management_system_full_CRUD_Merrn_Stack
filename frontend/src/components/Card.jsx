// components/Card.jsx
import React from 'react';

const Card = ({ title, value, icon, color, trend }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
                    {trend && (
                        <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {trend.value} from last month
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default Card;