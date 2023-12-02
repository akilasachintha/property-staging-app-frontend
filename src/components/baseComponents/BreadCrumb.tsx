import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb() {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter((item) => item);

    return (
        <div className="px-3 py-2 bg-white rounded-lg shadow-sm mb-5">
            <Link to="/" className="text-primaryGold text-sm text-center hover:underline">Home</Link>
            {pathNames.map((value, index) => {
                const isLast = index === pathNames.length - 1;
                const to = `/${pathNames.slice(0, index + 1).join('/')}`;

                // Capitalize the first letter of the path name
                const displayName = value.charAt(0).toUpperCase() + value.slice(1);

                return isLast ? (
                    <span key={to} className="mx-2 text-sm text-center">/ {displayName}</span>
                ) : (
                    <span key={to} className="mx-2">/ <Link to={to} className="text-primaryGold text-sm text-center hover:underline">{displayName}</Link></span>
                );
            })}
        </div>
    );
}
