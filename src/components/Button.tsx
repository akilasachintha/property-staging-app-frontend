import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="bg-primaryGold w-1/2 font-bold text-primaryBlack py-2 px-4 rounded text-sm focus:ring-1 focus:ring-yellow-500 focus:ring-offset-2">
            {children}
        </button>
    );
}

export default Button;
