import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter((item) => item);

    return (
        <div className="p-3 bg-gray-100 rounded-lg shadow-md mb-5">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            {pathNames.map((value, index) => {
                const isLast = index === pathNames.length - 1;
                const to = `/${pathNames.slice(0, index + 1).join('/')}`;

                // Capitalize the first letter of the path name
                const displayName = value.charAt(0).toUpperCase() + value.slice(1);

                return isLast ? (
                    <span key={to} className="mx-2">/ {displayName}</span>
                ) : (
                    <span key={to} className="mx-2">/ <Link to={to} className="text-blue-500 hover:underline">{displayName}</Link></span>
                );
            })}
        </div>
    );
}
