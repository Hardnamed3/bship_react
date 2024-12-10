import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navigation/NavBar.jsx";
import { apiBase } from "../config/api.js";
import { useAuth0 } from "@auth0/auth0-react";
import {useUserDataContext} from "../user-context-provider.jsx";

export const CallbackPage = () => {
    const { user, isAuthenticated } = useAuth0();
    const { updateUser } = useUserDataContext();

    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const authenticateUser = async () => {
            if (isAuthenticated && user) {
                try {
                    const res = await fetch(`${apiBase}/users/authenticate`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ auth0_sub: user.sub, email: user.email, username: user.nickname }),
                    });

                    const data = await res.json();

                    if (res.ok) {
                        // Assuming you have a way to set user state globally
                        // This might be through context, redux, or another state management method
                        // setUser({userId: data.id, username: data.username, email: data.email});
                        updateUser(data);
                    } else {
                        setErrorMessage(data.message || 'Login failed.');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    setErrorMessage('Failed to connect to the server.');
                }
            }
        };

        authenticateUser();
    }, [isAuthenticated, updateUser, user]);

    return (
        <div className="page-layout">
            <NavBar />
            <p>Callback page</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="page-layout__content" />
        </div>
    );
};

export default CallbackPage;