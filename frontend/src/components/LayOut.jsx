import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const LayOut = ({ children }) => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex-1 ml-64">
                <Navbar />
                <main className="p-6 bg-gray-100 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default LayOut