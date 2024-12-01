import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Messages from './pages/Messages.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {
    const [user, setUser] = useState(null); // State to hold user information

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user}  setUser={setUser}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/messages" element={<Messages user={user} />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            </Routes>
        </Router>
    );
};

export default App;