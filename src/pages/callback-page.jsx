import React, { useState, useEffect } from "react";
import { NavBar } from "../components/navigation/NavBar.jsx";
import { apiBase } from "../config/api.js";
import { useAuth0 } from "@auth0/auth0-react";
import {useUserDataContext} from "../user-context-provider.jsx";
import { jwtDecode } from "jwt-decode";

export const CallbackPage = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const { updateUser } = useUserDataContext();

    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const authenticateUser = async () => {
            if (isAuthenticated && user) {
                try {
                    const token = await getAccessTokenSilently();
                    //decode token
                    const decodedToken = jwtDecode(token);
                    const permissions = decodedToken?.permissions || [];

                    const res = await fetch(`${apiBase}/users/authenticate`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({ auth0_sub: user.sub, email: user.email, username: user.nickname }),
                    });

                    const data = await res.json();

                    if (res.ok) {
                        //add permissions to user
                        const enhancedUserData = {
                            ...data,
                            permissions,
                            isAdmin: permissions.includes("read:users"),
                        };
                        console.log("Updated JSON: ", enhancedUserData);
                        updateUser(enhancedUserData);
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
    }, [isAuthenticated, updateUser, user, getAccessTokenSilently]);

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