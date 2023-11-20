import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="my-6 text-center text-9xl font-extrabold text-primaryBlack">
                        404
                    </h1>
                    <h2 className="mt-2 text-center text-2xl text-primaryBlack">
                        Oops! Page not found...
                    </h2>
                    <p className="mt-2 text-center text-sm text-primaryBlack">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <Link to="/" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primaryBlack hover:bg-gray-900">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
