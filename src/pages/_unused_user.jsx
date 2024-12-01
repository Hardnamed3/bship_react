import { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/_unused_original.css'

function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [messages, setMessages] = useState([]);

    const userId = 1;

    // Fetch messages on initial load
    useEffect(() => {
        fetchMessages();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, user_id: userId }),
            });
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setResponse(data.message);
            fetchMessages();  // Refresh the list of all messages
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to connect to backend');
        }
    };

    // Function to fetch all messages from the backend
    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:8080/messages', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setMessages(data);  // Update state with the messages
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch messages');
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <p>Response from server: {response}</p>

            <h2>All Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;