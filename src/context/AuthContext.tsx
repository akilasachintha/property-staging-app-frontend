import React, { createContext, useState, useEffect, useContext } from 'react';

export interface AuthContextProps {
    isLoggedIn: boolean;
    token: string | null;
    userRole: string | null;
    login: (incomingToken: string, incomingUserRole: string) => boolean;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    token: null,
    userRole: null,
    login: () => false,
    logout: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    const login = (incomingToken: string, incomingUserRole: string) => {
        setIsLoggedIn(true);
        setToken(incomingToken);
        setUserRole(incomingUserRole);

        localStorage.setItem('token', incomingToken);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', incomingUserRole);

        console.log('login');
        console.log(incomingToken);
        console.log(incomingUserRole);

        return true;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setUserRole(null);

        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserRole = localStorage.getItem('userRole');

        if (storedToken && storedLoggedIn === 'true' && storedUserRole) {
            setIsLoggedIn(true);
            setToken(storedToken);
            setUserRole(storedUserRole);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
