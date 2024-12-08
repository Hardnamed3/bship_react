import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import _unused_Register from './pages/_unused_Register.jsx';
import _unused_Login from './pages/_unused_Login.jsx';
import Messages from './pages/Messages.jsx';
import Profile from './pages/Profile.jsx';
import { CallbackPage } from "./pages/callback-page.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/page-loader.jsx";
import { AuthenticationGuard } from "./components/authentication-guard";

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
        <Routes>
            <Route path="/" element={<Home user={user}  setUser={setUser}/>} />
            {/*<Route path="/register" element={<_unused_Register />} />*/}
            {/*<Route path="/login" element={<_unused_Login setUser={setUser} />} />*/}
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
            {/*<Route
                path="/profile"
                element={<Profile user={user} setUser={setUser} />} />*/}
            <Route path="/callback" element={<CallbackPage />} />
        </Routes>
    );
};

export default App;