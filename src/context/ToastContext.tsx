import React, { createContext, useContext, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';

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

    const getIcon = (type: 'error' | 'success' | 'warning' | 'info') => {
        switch(type) {
            case 'success':
                return <AiOutlineCheckCircle />;
            case 'error':
                return <AiOutlineCloseCircle />;
            case 'warning':
                return <AiOutlineWarning />;
            case 'info':
                return <AiOutlineInfoCircle />;
            default:
                return null;
        }
    };

    const closeToast = () => {
        setMessage('');
    };

    return (
        <ToastContext.Provider value={{ message, type, showMessage }}>
            {children}
            {message && (
                <div style={{
                    zIndex: 9999,
                    position: 'fixed',
                    top: '8px',
                    left: '8px',
                    right: '8px',
                }}
                     className={`rounded flex px-2 py-2 text-white justify-center text-center transition-all duration-500 ease-in-out ${message ? 'opacity-100' : 'opacity-0'} ${type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-primaryGold' : type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'}`}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            {getIcon(type)}
                            <span className="ml-2">{message}</span>
                        </div>
                        <AiOutlineClose onClick={closeToast} className="cursor-pointer" />
                    </div>
                </div>

            )}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => useContext(ToastContext);
