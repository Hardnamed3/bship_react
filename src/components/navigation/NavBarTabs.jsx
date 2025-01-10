import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./NavBarTab";
import {useUserDataContext} from "../../user-context-provider.jsx";

export const NavBarTabs = () => {
    const { isAuthenticated } = useAuth0();
    const {userData} = useUserDataContext();

    let isAdmin = false;
    if (userData !== null) {
        isAdmin = userData?.isAdmin;
    }

    return (
        <div className="nav-bar__tabs">
            <NavBarTab path="/" label="Home" />
            {isAuthenticated && (
                <>
                    <NavBarTab path="/profile" label="Profile" />
                    <NavBarTab path="/messages" label="Messages" />
                </>
            )}
            {isAdmin && (
                <NavBarTab path="/admin" label="Admin" />
            )}
        </div>
    );
};