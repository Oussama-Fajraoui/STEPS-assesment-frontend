import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/register', {
                username,
                password
            });
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="text-center">
            <img src={"https://steps.tn/wp-content/uploads/2021/10/logo-steps-for-web.png"} alt="Steps Logo" className="mx-auto my-4" />
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className="border px-2 py-1"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="border px-2 py-1"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
                <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
