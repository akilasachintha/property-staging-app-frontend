import logo from "../assets/logo.png";
import {FaCog, FaHome, FaSignOutAlt, FaTimes, FaUser} from "react-icons/fa";
import {Link, useMatch} from "react-router-dom";
import React, {Dispatch, SetStateAction} from "react";
import useAuthHook from "../hooks/useAuthHook";
import { FaFileWaveform } from "react-icons/fa6";
import {useAuthContext} from "../context/AuthContext";

interface SideBarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar : React.FC<SideBarProps> = ({isMenuOpen, setIsMenuOpen}) => {
    const {logoutHook} = useAuthHook();
    const {userRole} = useAuthContext();

    const handleLogout = () => {
        logoutHook();
    };

    const isDashboard = useMatch({
        path: '/',
    });

    const isAgents = useMatch('/agents');
    const isSettings = useMatch('/settings');
    const isEnquiry = useMatch('/enquiry');

    return (
        <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0 ease-out transition-medium' : '-translate-x-full ease-in transition-medium'} w-64 bg-gradient-to-b from-black to-gray-900 border-r dark:bg-primaryBlack dark:border-gray-800 dark:text-gray-300 overflow-auto z-30 md:relative md:translate-x-0`}>
            <div className="flex items-center justify-around px-6 pt-4">
                <Link to="/" className="flex items-center justify-center">
                    <img src={logo} alt="Logo" className="h-16 mr-3 w-auto mx-auto rounded-full" />
                    <h2 className="ml-3 mt-2 font-bold text-lg">Casabella Studios</h2>
                </Link>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                    <FaTimes className="w-6 h-6 text-gray-600 hover:text-gray-500" />
                </button>
            </div>
            <nav className="mt-6">
                <div>
                    <Link to="/" className={`flex items-center px-4 py-2 mt-2 text-${isDashboard ? 'primaryBlack' : 'primaryGold'} dark:text-${isDashboard ? 'primaryBlack' : 'primaryGold'} hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded ${isDashboard ? 'bg-primaryGold dark:bg-primaryGold font-bold' : ''}`}>
                        <FaHome className="mx-4"/>
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/enquiry" className={`flex items-center px-4 py-2 mt-2 text-${isEnquiry ? 'primaryBlack' : 'primaryGold'} dark:text-${isEnquiry ? 'primaryBlack' : 'primaryGold'} hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded ${isEnquiry ? 'bg-primaryGold dark:bg-primaryGold font-bold' : ''}`}>
                        <FaFileWaveform className="mx-4"/>
                        <span>Enquiries</span>
                    </Link>
                    {userRole === 'Admin' && (
                        <Link to="/agents" className={`flex items-center px-4 py-2 mt-2 text-${isAgents ? 'primaryBlack' : 'primaryGold'} dark:text-${isAgents ? 'primaryBlack' : 'primaryGold'} hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded ${isAgents ? 'bg-primaryGold dark:bg-primaryGold font-bold' : ''}`}>
                            <FaUser className="mx-4"/>
                            <span>Agents</span>
                        </Link>
                    )}
                    <Link to="/settings" className={`flex items-center px-4 py-2 mt-2 text-${isSettings ? 'primaryBlack' : 'primaryGold'} dark:text-${isSettings ? 'primaryBlack' : 'primaryGold'} hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded ${isSettings ? 'bg-primaryGold dark:bg-primaryGold font-bold' : ''}`}>
                        <FaCog className="mx-4"/>
                        <span>Settings</span>
                    </Link>
                </div>
            </nav>
            <button onClick={handleLogout} className="absolute bottom-0 flex items-center w-full px-4 py-2 mt-2 mb-10 text-primaryGold dark:text-primaryGold hover:bg-primaryGold dark:hover:bg-primaryGold hover:text-primaryBlack dark:hover:text-primaryBlack rounded">
                <FaSignOutAlt className="mx-4"/>
                <span>Logout</span>
            </button>
        </div>
    );
}

export default SideBar;