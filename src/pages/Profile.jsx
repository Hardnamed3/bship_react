import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiBase} from "../config/api.js";
import {NavBar} from "../components/navigation/NavBar.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {useUserDataContext} from "../user-context-provider.jsx";

const Profile = () => {
    const { user, logout: auth0Logout} = useAuth0();
    const {userData, updateUser, logout: contextLogout} = useUserDataContext();

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    if (!userData) {
        console.log("User not logged in.");
        navigate('/');
    }
    const [profile, setProfile] = useState({ username: userData?.username || user.nickname, email: userData?.email || user.email });

    console.log("profile for page is:",profile);
    console.log("user from auth0 is:", user);
    console.log("userData is:", userData);



    //currently not functional with auth0
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiBase}/users/${userData.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(profile),
            });
            const data = await res.json();
            if (res.ok) {
                console.log("Received JSON: ", data);
                updateUser(data);
                setErrorMessage('Profile updated successfully.');
            } else {
                setErrorMessage('Profile update failed.');
            }
        } catch (error) {
            console.error('Update profile error:', error);
            setErrorMessage('Failed to connect to the server.');
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`${apiBase}/users/${userData.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                alert('Profile deleted successfully.');
                handleLogout()
            } else {
                alert('Failed to delete profile.');
            }
        } catch (error) {
            console.error('Delete profile error:', error);
            alert('Failed to connect to the server.');
        }
    };

    const handleLogout = () => {
        contextLogout();
        auth0Logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    return (
        <div>
            <h1>Profile</h1>
            <NavBar />
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="Email"
                    required
                />
                <button type="submit">Update</button>
            </form>
            <button onClick={handleDelete}>Delete Account
            </button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Profile;