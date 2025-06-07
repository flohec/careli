import React, { useState } from 'react';

const LoginTest = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Login successful: ${data.message}`);
                setIsLoggedIn(true);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while logging in.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setIsLoggedIn(false);
                setEmail('');
                setPassword('');
            } else {
                setMessage('Logout failed.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            setMessage('An error occurred while logging out.');
        }
    };

    return (
        <div>
            <h1>Login Test</h1>

            {!isLoggedIn ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginTest;

