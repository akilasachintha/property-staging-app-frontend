import React, { createContext, useContext, useState } from 'react';

export type ToastContextType = {
    message: string;
    type: 'error' | 'success' | 'warning' | 'info';
    showMessage: (message: string, type: 'error' | 'success' | 'warning' | 'info') => void;
};

type ToastProviderProps = {
    children: React.ReactNode;
}

const ToastContext = createContext<ToastContextType>({
    message: '',
    type: 'info',
    showMessage: () => {},
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'error' | 'success' | 'warning' | 'info'>('info');

    const showMessage = (newMessage: string, newType: 'error' | 'success' | 'warning' | 'info') => {
        setMessage(newMessage);
        setType(newType);

        setTimeout(() => {
            setMessage('');
        }, 3000);

        console.log(newMessage);
    };

    return (
        <ToastContext.Provider value={{ message, type, showMessage }}>
            {children}
            {message && (
                <div className={`fixed top-0 left-0 w-full px-10 py-3 text-white text-center ${type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'}`}>
                    {message}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => useContext(ToastContext);
