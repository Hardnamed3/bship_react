import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "../buttons/Login-button.jsx";
import { LogoutButton } from "../buttons/Logout-button.jsx";
import { SignupButton } from "../buttons/Signup-button.jsx";
import {NavBarTabs} from "./NavBarTabs.jsx";

export const NavBarButtons = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="nav-bar__buttons">
            {!isAuthenticated && (
                <>
                    <SignupButton />
                    <LoginButton />
                </>
            )}
            {isAuthenticated && (
                <>
                    <LogoutButton />
                </>
            )}
        </div>
    );
};

export const NavBar = () => {
    return (
        <div className="nav-bar">
            <NavBarTabs />
            <NavBarButtons />
        </div>
    );
};