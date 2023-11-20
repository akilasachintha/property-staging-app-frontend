import React, { createContext, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import { AuthContextProps, useAuthContext } from 'context/AuthContext';
import { LoadingContextType, useLoadingContext } from 'context/LoadingContext';
import { ToastContextType, useToastContext } from 'context/ToastContext';

const BASE_URL = 'https://localhost:44300/api/v1';
// const BASE_URL = 'https://property-staging-backend.azurewebsites.net/api/v1';

const createAxiosInstance = (
    authContext: AuthContextProps,
    loadingContext: LoadingContextType,
    toastContext: ToastContextType
): AxiosInstance => {
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            loadingContext.showLoading();

            return config;
        },
        (error) => {
            loadingContext.hideLoading();
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            loadingContext.hideLoading();

            if (response.status === 401) {
                authContext.logout();
                toastContext.showMessage('Unauthorized access. Please login again.', 'error');
                return Promise.reject(response);
            }

            if (response.status >= 400 && response.status < 500) {
                console.log('Client error', response.status, response.data);
                return Promise.reject(response);
            }

            if (response.status >= 500) {
                console.log('Server error', response.status, response.data);
                toastContext.showMessage('Server error. Please try again later.', 'error');
                return Promise.reject(response);
            }

            if (response && response.data && response.data.error !== null) {
                toastContext.showMessage(response.data.error, 'error');
            }

            return response;
        },
        (error) => {
            loadingContext.hideLoading();

            if (error.message && error.message.includes('ECONNREFUSED')) {
                toastContext.showMessage(
                    'Unable to connect to the server. Please check your internet connection and try again.',
                    'error'
                );
            } else if (!error.response) {
                toastContext.showMessage('Network error. Please check your internet connection and try again.', 'error');
            } else if (error.response && error.response.data && error.response.data.error) {
                toastContext.showMessage(error.response.data.error, 'error');
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

type AxiosProviderProps = {
    children: React.ReactNode;
};

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
    const authContext = useAuthContext();
    const loadingContext = useLoadingContext();
    const toastContext = useToastContext();

    const axiosInstance = createAxiosInstance(authContext, loadingContext, toastContext);

    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxiosContext = () => {
    const context = useContext(AxiosContext);
    if (context === undefined) {
        throw new Error('useAxiosContext must be used within a AxiosProvider');
    }
    return context;
};
