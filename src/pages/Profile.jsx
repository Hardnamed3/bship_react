import React, {useState} from 'react';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {apiBase} from "../config/api.js";

const Profile = ({ user, setUser }) => {
    Profile.propTypes = {
        setUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };
    const [profile, setProfile] = useState({ username: user.username, email: user.email });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    if (!user) {
        console.log("User not logged in.");
        navigate('/');
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiBase}/users/${user.userId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(profile),
            });
            const data = await res.json();
            if (res.ok) {
                console.log("Received JSON: ", data);
                setUser({userId: data.id, username: data.username, email: data.email});
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
            const res = await fetch(`${apiBase}/users/${user.userId}`, {
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
        setUser(null); // Clear user state
        navigate('/');
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
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