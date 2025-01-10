import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiBase} from "../config/api.js";
import {NavBar} from "../components/navigation/NavBar.jsx";
import {useUserDataContext} from "../user-context-provider.jsx";

const Admin = () => {
    const { userData } = useUserDataContext();

    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editUserName, setEditUserName] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    if (!userData) {
        console.log("User not logged in.");
        navigate('/');
    }

    useEffect(() => {
        if (userData) {
            fetchUsers();
        }
    }, [userData]);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${apiBase}/users`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            console.log("Received JSON: ", data);
            if (data && data.length > 0) {
                setUsers(data);
            } else {
                throw new Error(`Error: No users found.`);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setErrorMessage('Failed to load users.');
        }
    };

    const startEditing = (user) => {
        setEditingUserId(user.id);
        setEditUserName(user.name);
    };

    const handleEdit = async () => {
        try {
            const res = await fetch(`${apiBase}/users/${editingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editUserName, admin_id: userData.id }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const updatedUser = await res.json();

            setUsers(
                users.map((user) =>
                    user.id === editingUserId ? { ...user, name: updatedUser.name } : user
                )
            );

            setEditingUserId(null);
            setEditUserName('');
        } catch (error) {
            console.error('Failed to update user:', error);
            setErrorMessage('Failed to update the user.');
        }
    };

    const handleDelete = async (userId) => {
        try {
            const res = await fetch(`${apiBase}/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
            setErrorMessage('Failed to delete the user.');
        }
    };


    return (
        <div>
            <h1>Admin User Management</h1>
            <NavBar />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Existing user list */}
            {users.length === 0 ? (
                <p>No users to display.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {editingUserId === user.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editUserName}
                                        onChange={(e) => setEditUserName(e.target.value)}
                                    />
                                    <button onClick={handleEdit}>Save</button>
                                    <button onClick={() => setEditingUserId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span>{user.username}</span>
                                    <button onClick={() => startEditing(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Admin;