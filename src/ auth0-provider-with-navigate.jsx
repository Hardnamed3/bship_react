import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_APP_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_APP_AUTH0_AUDIENCE;
    const scope = import.meta.env.VITE_APP_AUTH0_SCOPE;

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri)) {
        console.log("domain or clientId or redirectUri is not set");
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience: audience,
                scope: scope
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};