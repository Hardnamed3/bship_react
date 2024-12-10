import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {useUserDataContext} from "../../user-context-provider.jsx";

export const LogoutButton = () => {
    const { logout: auth0Logout } = useAuth0();
    const { logout: contextLogout  } = useUserDataContext();

    const handleLogout = () => {
        contextLogout();
        auth0Logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    return (
        <button className="button__logout" onClick={handleLogout}>
            Log Out
        </button>
    );
};