import React from 'react';
import { useLoadingContext } from "context/LoadingContext";

const LoadingPage: React.FC = () => {
    const { isLoading } = useLoadingContext();

    if (!isLoading) return null;

    return (
        <div style={{zIndex: 99999}}  className="flex items-center justify-center h-screen bg-black bg-opacity-30 absolute inset-0 z-40">
            <div className="flex flex-col items-center justify-center p-5 bg-white rounded">
                <svg className="animate-spin h-12 w-12 text-primaryBlack mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-primaryBlack text-lg">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
