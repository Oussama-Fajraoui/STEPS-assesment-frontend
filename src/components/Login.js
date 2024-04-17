import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/');
        } catch (error) {
            setError('Login failed. You do not have an account, create one please.');
        }
    };

    return (
        <div className="text-center">
            <img src={"https://steps.tn/wp-content/uploads/2021/10/logo-steps-for-web.png"} alt="Steps Logo" className="mx-auto my-4" />
            <form onSubmit={handleLogin} className="space-y-4">
                {error && <div className="text-red-500">{error}</div>}
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                >
                    Login
                </button>
                <p>You don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
