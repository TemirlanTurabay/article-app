'use client';

import { createContext, useState, ReactNode } from 'react';
import axios from 'axios';
interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error', error);
        }
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
