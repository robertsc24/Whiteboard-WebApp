import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  let history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const loginApiEndpoint = '/api/auth/login'; // Replace with your actual endpoint
    
    try {
      const response = await fetch(loginApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Adjust according to your token response
        setIsAuthenticated(true);
        history.push('/'); // Redirect to the drawing board
      } else {
        // Handle errors, e.g. show an error message
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network or other errors here
      console.error('There was an error logging in', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        name="username" 
        value={credentials.username} 
        onChange={handleInputChange} 
        placeholder="Username" 
        required 
      />
      <input 
        type="password" 
        name="password" 
        value={credentials.password} 
        onChange={handleInputChange} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

