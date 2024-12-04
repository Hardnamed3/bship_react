import React, {useState} from 'react';
import PropTypes from "prop-types";
import {apiBase} from "../config/api.js";

const _unused_Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiBase}/users`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                //body: JSON.stringify({username, email, password}),
                body: JSON.stringify({username, email}),
            });
            const data = await res.json();
            if (res.ok) {
                setErrorMessage('Registration successful!');
            } else {
                setErrorMessage(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Failed to connect to the server.');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default _unused_Register;