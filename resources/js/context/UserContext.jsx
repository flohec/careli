import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed via npm

// Create the UserContext
export const useUser = () => useContext(UserContext);
const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user', { withCredentials: true });
                setUser(response.data.data || null);
            } catch (error) {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user', { withCredentials: true });
            setUser(response.data.data || null);
        } catch (error) {
            setUser(null);
        }
    };

    const login = async (email, password) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: 'Login error.' };
        }
    };

    const logout = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
            });

            const data = await response.json();
            setUser(null);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: 'Logout error.' };
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

