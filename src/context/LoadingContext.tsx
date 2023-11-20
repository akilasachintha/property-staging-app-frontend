import {createContext, FC, ReactNode, useContext, useState} from 'react';

export type LoadingContextType = {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

type LoadingProviderProps = {
    children: ReactNode;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    showLoading: () => {},
    hideLoading: () => {},
});

export const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if(!context) {
        throw new Error('useLoadingContext must be used within LoadingProvider');
    }
    return context;
}

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}