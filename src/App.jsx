import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Messages from './pages/Messages.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';
import { CallbackPage } from "./pages/callback-page.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/page-loader.jsx";
import { AuthenticationGuard } from "./components/authentication-guard";
import GDPRBanner from "./components/GDPR/banner.jsx";

const App = () => {
    const [user, setUser] = useState(null); // State to hold user information

    const { isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="page-layout">
                <PageLoader />
            </div>
        );
    }

    return (
        <div className="page-layout">
        <GDPRBanner />
        <Routes>
            <Route path="/" element={<Home user={user}  setUser={setUser}/>} />
            <Route
                path="/messages"
                element={
                    <AuthenticationGuard component={Messages} user={user}/>
                } />
            <Route
                path="/profile"
                element={
                    <AuthenticationGuard component={Profile} user={user} setUser={setUser} />
                } />
            <Route
                path="/admin"
                element={
                    <AuthenticationGuard component={Admin} user={user} setUser={setUser} />
                } />
            <Route path="/callback" element={<CallbackPage />} />
        </Routes>
        </div>
    );
};

export default App;