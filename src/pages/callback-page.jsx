import React from "react";
import { NavBar } from "../components/navigation/NavBar.jsx";


export const CallbackPage = () => {
    return (
        <div className="page-layout">
            <NavBar />
            <p> Callback page</p>
            <div className="page-layout__content" />
        </div>
    );
};