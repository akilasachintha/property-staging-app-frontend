import React, { createContext, useContext, useState, FC } from 'react';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineWarning, AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';

type ToastMessageType = {
    message: string;
    type: 'error' | 'success' | 'warning' | 'info';
};

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

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessageType[]>([]);

    const showMessage = (newMessage: string, newType: 'error' | 'success' | 'warning' | 'info') => {
        setMessages(prevMessages => [{ message: newMessage, type: newType }, ...prevMessages]);

        setTimeout(() => {
            setMessages(prevMessages => prevMessages.filter(msg => msg.message !== newMessage));
        }, 3000);
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

    const closeToast = (message: string) => {
        setMessages(prevMessages => prevMessages.filter(msg => msg.message !== message));
    };

    return (
        <ToastContext.Provider value={{ message: '', type: 'info', showMessage }}>
            {children}
            {messages.map((msg, index) => (
                <div key={index} style={{
                    zIndex: 9999,
                    position: 'fixed',
                    top: `${8 + index * 50}px`,
                    left: '8px',
                    right: '8px',
                }}
                     className={`rounded flex px-2 py-2 text-white justify-center text-center transition-all duration-500 ease-in-out ${msg.message ? 'opacity-100' : 'opacity-0'} ${msg.type === 'error' ? 'bg-red-600' : msg.type === 'success' ? 'bg-primaryGold' : msg.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'}`}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            {getIcon(msg.type)}
                            <span className="ml-2">{msg.message}</span>
                        </div>
                        <AiOutlineClose onClick={() => closeToast(msg.message)} className="cursor-pointer" />
                    </div>
                </div>
            ))}
        </ToastContext.Provider>
    );
};

export const useToastContext = () => useContext(ToastContext);
