import React from 'react';
import {NavLink} from 'react-router-dom';
import homeStyles from "../../styles/Home.module.css";

export const NavBarTab = ({ path, label }) => {
    return (
        <div>
            <NavLink to={path}>
                <button className={homeStyles.button}>{label}</button>
            </NavLink>
        </div>
    );
};