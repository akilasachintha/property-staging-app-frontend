import React, { useState } from 'react';
import {Link, Outlet, useMatch} from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaTimes, FaSignOutAlt, FaChevronDown, FaUserCircle, FaPowerOff } from 'react-icons/fa';
import logo from 'assets/logo.png';
import userPhoto from 'assets/user.png';
import Breadcrumb from "components/BreadCrumb";
import useAuthHook from "hooks/useAuthHook";
import {useAuthContext} from "../../context/AuthContext";

export default function AgentDashboardPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {logoutHook} = useAuthHook();
    const {userFullName} = useAuthContext();

    const handleLogout = () => {
        logoutHook();
    };

    const userName = userFullName || 'Admin';

    const isDashboard = useMatch({
        path: '/',
    });

    const isUsers = useMatch('/profile');
    const isSettings = useMatch('/settings');

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0 ease-out transition-medium' : '-translate-x-full ease-in transition-medium'} w-64 bg-white border-r dark:bg-primaryBlack dark:border-gray-800 dark:text-gray-300 overflow-auto z-30 md:relative md:translate-x-0 rounded-b`}>
                <div className="flex items-center justify-around px-6 pt-4">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-32 w-auto mx-auto rounded-full" />
                    </div>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                        <FaTimes className="w-6 h-6 text-gray-600 hover:text-gray-500" />
                    </button>
                </div>
                <nav className="mt-6">
                    <div>
                        <Link to="/" className={`flex items-center px-4 py-2 mt-2 text-primaryGold dark:text-primaryGold hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded ${isDashboard ? 'bg-gray-100 dark:bg-primaryGold text-primaryBlack font-bold dark:text-primaryBlack' : ''}`}>
                            <FaHome className="mx-4"/>
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/profile" className={`flex items-center px-4 py-2 mt-2 text-primaryGold dark:text-primaryGold hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded ${isUsers ? 'bg-gray-100 dark:bg-primaryGold text-primaryBlack font-bold dark:text-primaryBlack' : ''}`}>
                            <FaUser className="mx-4"/>
                            <span>Users</span>
                        </Link>
                        <Link to="/settings" className={`flex items-center px-4 py-2 mt-2 text-primaryGold dark:text-primaryGold hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded ${isSettings ? 'bg-gray-100 dark:bg-primaryGold text-primaryBlack font-bold dark:text-primaryBlack' : ''}`}>
                            <FaCog className="mx-4"/>
                            <span>Settings</span>
                        </Link>
                    </div>
                </nav>
                <button onClick={handleLogout} className="absolute bottom-0 flex items-center w-full px-4 py-2 mt-2 mb-10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg">
                    <FaSignOutAlt className="mx-4"/>
                    <span>Logout</span>
                </button>
            </div>
            <div className="flex flex-col flex-1 w-full overflow-auto">
                <header className="sticky top-0 py-4 px-6 bg-white border-b dark:bg-primaryBlack dark:text-gray-300 z-10 rounded-r">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg text-primaryGold dark:text-primaryGold">Welcome back, {userName}!</h2>
                        <div className="relative">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center">
                                <img src={userPhoto} alt="User" className="h-8 w-8 rounded-full mr-4" />
                                <span className="text-gray-800 dark:text-gray-300 mr-2">{userName}</span>
                                <FaChevronDown className="w-4 h-4 text-gray-600 hover:text-gray-500" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                                    <Link to="/account-settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primaryGold hover:text-white rounded-t-md">
                                        <FaUserCircle className="mr-2"/>
                                        Account Settings
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primaryGold hover:text-white rounded-b-md">
                                        <FaPowerOff className="mr-2"/>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden ml-4">
                            <svg className="w-6 h-6 text-gray-600 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </header>
                <main className="p-6 flex-grow overflow-auto rounded-lg">
                    <Breadcrumb />
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
