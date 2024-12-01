import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const Messages = ({ user }) => {
    Messages.propTypes = {
        user: PropTypes.object.isRequired
    };

    const [messages, setMessages] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editMessageContent, setEditMessageContent] = useState('');
    const [newMessageContent, setNewMessageContent] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    if (!user) {
        console.log("User not logged in.");
        navigate('/');
    }

    useEffect(() => {
        if (user) {
            fetchMessages();
        }
    }, [user]);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`http://localhost:8080/messages/user/${user.userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            if (data && data.length > 0) {
                setMessages(data);
            } else {
                throw new Error(`Error no messages found`);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            setErrorMessage('Failed to load messages.');
        }
    };


    const handleCreateMessage = async () => {
        try {
            const res = await fetch('http://localhost:8080/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessageContent, user_id: user.userId }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const createdMessage = await res.json();
            setMessages([...messages, createdMessage]); // Add new message to the list
            setNewMessageContent(''); // Clear the input field
        } catch (error) {
            console.error('Failed to create message:', error);
            setErrorMessage('Failed to create the message.');
        }
    };

    const startEditing = (message) => {
        setEditingMessageId(message.id);
        setEditMessageContent(message.message);
    };

    const handleEdit = async () => {
        try {
            const res = await fetch(`http://localhost:8080/messages/${editingMessageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: editMessageContent, user_id: user.userId }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const updatedMessage = await res.json();

            // Update local state with the edited message
            setMessages(
                messages.map((msg) =>
                    msg.id === editingMessageId ? { ...msg, message: updatedMessage.message } : msg
                )
            );

            setEditingMessageId(null);
            setEditMessageContent('');
        } catch (error) {
            console.error('Failed to update message:', error);
            setErrorMessage('Failed to update the message.');
        }
    };

    const handleDelete = async (messageId) => {
        try {
            const res = await fetch(`http://localhost:8080/messages/${messageId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            // Refresh messages after deleting
            setMessages(messages.filter((msg) => msg.id !== messageId));
        } catch (error) {
            console.error('Failed to delete message:', error);
            setErrorMessage('Failed to delete the message.');
        }
    };

    return (
        <div>
            <h1>Your Messages</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {/* Create New Message */}
            <div>
                <input
                    type="text"
                    placeholder="Write a new message"
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                />
                <button onClick={handleCreateMessage}>Create</button>
            </div>

            {/* Existing message list */}
            {messages.length === 0 ? (
                <p>No messages to display.</p>
            ) : (
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            {editingMessageId === msg.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editMessageContent}
                                        onChange={(e) => setEditMessageContent(e.target.value)}
                                    />
                                    <button onClick={handleEdit}>Save</button>
                                    <button onClick={() => setEditingMessageId(null)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span>{msg.message}</span>
                                    <button onClick={() => startEditing(msg)}>Edit</button>
                                    <button onClick={() => handleDelete(msg.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Messages;