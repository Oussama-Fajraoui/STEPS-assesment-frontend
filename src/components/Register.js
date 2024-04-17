import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                username,
                password
            });
            console.log('Registration successful:', response.data);
            navigate('/login');  
        } catch (error) {
            if (error.response) {
                console.error('Error registering:', error.response.data);
            } else if (error.request) {
                console.error('Error registering: No response received', error.request);
            } else {
                console.error('Error registering:', error.message);
            }
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="border px-2 py-1"
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="border px-2 py-1"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
        </form>
    );
};

export default Register;
