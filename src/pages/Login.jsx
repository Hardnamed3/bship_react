import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {apiBase} from "../config/api.js";

const Login = ({ setUser }) => {
    Login.propTypes = {
        setUser: PropTypes.func.isRequired,
    };
    const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiBase}/users/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                //body: JSON.stringify({username, password}),
                body: JSON.stringify({username}),
            });
            const data = await res.json();
            if (res.ok) {
                //console.log("Received JSON: ", data);
                setUser({userId: data.id, username: data.username, email: data.email});
                navigate('/');
            } else {
                setErrorMessage(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Failed to connect to the server.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {/*<input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />*/}
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Login;