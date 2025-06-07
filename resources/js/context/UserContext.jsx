import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed via npm

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user'); // Adjust the endpoint to match your backend
                if (response.data.data) {
                    setUser(response.data.data); // Set user data if logged in
                } else {
                    setUser(null); // Set to null if not logged in
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null); // Handle errors gracefully
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
