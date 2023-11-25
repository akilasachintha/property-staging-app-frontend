import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="bg-primaryGold w-1/2 text-primaryBlack py-2 px-4 rounded text-sm">
            {children}
        </button>
    );
}

export default Button;
