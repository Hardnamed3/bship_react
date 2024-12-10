import React, {createContext, useContext, useEffect, useState} from "react";

export const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    // Update user and store in localStorage
    const updateUser = (userData) => {
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    // Logout method to clear user data
    const logout = () => {
        setUserData(null);
        localStorage.removeItem('userData');
    };

    return (
        <UserDataContext.Provider value={{ userData: userData, updateUser, logout }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserDataContext = () => {
    const context = useContext(UserDataContext);
    if (context === null) {
        throw new Error('useContextUser must be used within a UserDataProvider');
    }
    return context;
};

export default UserDataProvider;