
import { useState } from 'react';

export function useAuth() {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const login = (username: string, password: string) => {
        if (username === "admin" && password === "password") {
            const fakeToken = "mock-jwt-token";
            localStorage.setItem("token", fakeToken);
            setToken(fakeToken);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return { token, login, logout, isAuthenticated: !!token };
}
