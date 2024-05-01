import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = useHistory();

    const handleLogin = async (event) => {
        event.preventDefault(); 
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Save the token (if using JWT)
                setIsAuthenticated(true);
                history.push('/'); // Redirect to the board
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message}`); 
            }
        } catch (error) {
            // Catch any network errors and log them to the console
            console.error('Login error:', error);
            alert('Failed to connect to the server. Please try again later.');
        }
    };

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
