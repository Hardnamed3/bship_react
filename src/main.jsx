import React from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.jsx'
import { Auth0ProviderWithNavigate } from "./ auth0-provider-with-navigate.jsx";
import './styles/global.css'
import {Auth0Provider} from "@auth0/auth0-react";
//import {Auth0Provider} from "@auth0/auth0-react";


const container = document.getElementById("root");
const root = createRoot(container);
const app = (
    <React.StrictMode>
        <BrowserRouter>
            <Auth0Provider>
                <App />
            </Auth0Provider>
        </BrowserRouter>
    </React.StrictMode>
);
const appWithNavigate = (
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <App />
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    </React.StrictMode>
);

root.render(appWithNavigate);
