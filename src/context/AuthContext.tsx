import React, {createContext, useContext, useEffect, useState} from 'react';

export interface AuthContextProps {
    isLoggedIn: boolean;
    userFullName: string | null;
    token: string | null;
    userRole: string | null;
    login: (incomingToken: string, incomingUserRole: string, userFullName: string) => boolean;
    logout: () => void;
    setUserFullName: (userFullName: string) => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    userFullName: null,
    token: null,
    userRole: null,
    login: () => false,
    logout: () => {},
    setUserFullName: () => {
    }
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userFullName, setUserFullName] = useState<string | null>(null);

    useEffect(() => {

    }, [isLoggedIn]);

    const login = (incomingToken: string, incomingUserRole: string, incomingUserFullName: string) => {
        setIsLoggedIn(true);
        setToken(incomingToken);
        setUserRole(incomingUserRole);
        setUserFullName(incomingUserFullName);

        localStorage.setItem('token', incomingToken);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', incomingUserRole);
        localStorage.setItem('userFullName', incomingUserFullName);

        return true;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setUserRole(null);
        setUserFullName(null);

        localStorage.setItem('token', '');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('userRole', '');
        localStorage.setItem('userFullName', '');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserRole = localStorage.getItem('userRole');
        const storedUserFullName = localStorage.getItem('userFullName');

        if (storedToken && storedLoggedIn === 'true' && storedUserRole) {
            setIsLoggedIn(true);
            setToken(storedToken);
            setUserRole(storedUserRole);
            setUserFullName(storedUserFullName);
        }
    }, []);

    useEffect(() => {

    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{isLoggedIn, token, userRole, userFullName, login, logout, setUserFullName}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
