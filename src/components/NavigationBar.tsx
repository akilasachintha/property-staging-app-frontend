import userPhoto from "../assets/user.png";
import { FaChevronDown, FaPowerOff, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, {Dispatch, SetStateAction, useState} from "react";
import useAuthHook from "../hooks/useAuthHook";
import { useAuthContext } from "../context/AuthContext";

interface NavigationBarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logoutHook } = useAuthHook();
    const { userFullName, userRole } = useAuthContext();

    const handleLogout = () => {
        logoutHook();
    };

    const userName = userFullName ? userFullName : 'User';

    const dropdownItems = [
        {
            label: 'Account Settings',
            icon: <FaUserCircle className="mr-2" />,
            link: '/account-settings',
        },
        {
            label: 'Logout',
            icon: <FaPowerOff className="mr-2" />,
            onClick: handleLogout,
        },
    ];

    return (
        <header className="sticky top-0 py-4 px-6 bg-white border-b dark:bg-white dark:text-gray-300 z-10 rounded-r">
            <div className="flex items-center justify-between">
                <h2 className="ml-2 text-lg text-gray-700 dark:text-gray-700 md:block hidden">Welcome back, {userName}!</h2>
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center">
                        <img src={userPhoto} alt="User" className="h-10 w-10 rounded-full mr-4" />
                        <div className="flex flex-col">
                            <span className="text-gray-800 dark:text-gray-900 mr-2">{userName}</span>
                            <span className="text-left text-xs">{userRole}</span>
                        </div>
                        <FaChevronDown className="ml-5 w-4 h-4 text-gray-600 hover:text-gray-500" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                            {dropdownItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.link ? (
                                        <Link to={item.link} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primaryGold hover:text-white rounded-t-md">
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <button onClick={item.onClick} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primaryGold hover:text-white rounded-b-md">
                                            {item.icon}
                                            {item.label}
                                        </button>
                                    )}
                                </React.Fragment>
                            ))}
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
    );
}

export default NavigationBar;