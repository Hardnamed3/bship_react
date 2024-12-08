import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homeStyles from '../styles/Home.module.css';
import PropTypes from "prop-types";
import { apiBase } from '../config/api.js';
import {NavBar} from "../components/navigation/NavBar.jsx";

const Home = ({ user, setUser }) => {
    Home.propTypes = {
        setUser: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    const isLoggedIn = !!user;
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    console.log("User is:", user)

    // Fetch messages when the component loads
    useEffect(() => {
        fetchMessages();
    }, []);

    // Function to fetch all messages from the backend
    const fetchMessages = async () => {
        try {
            const res = await fetch(`${apiBase}/messages`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setMessages(data); // Update state with the messages
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch messages');
        }
    };

    const handleLogout = () => {
        setUser(null); // Clear user state
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome</h1>
            <NavBar />
            <h2>All Messages</h2>
            <ul className={homeStyles.list}>
                {messages.map((msg) => (
                    <li className={homeStyles.listItem} key={msg.id}>
                        <strong>{msg.username}: </strong>
                        {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;