import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./NavBarTab";

export const NavBarTabs = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="nav-bar__tabs">
            <NavBarTab path="/" label="Home" />
            {isAuthenticated && (
                <>
                    <NavBarTab path="/profile" label="Profile" />
                    <NavBarTab path="/messages" label="Messages" />
                </>
            )}
        </div>
    );
};