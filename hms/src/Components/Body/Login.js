
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import VectorLogo from './VectorLogo.png';
// import Dashboard from './Dashboard';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [isLoggedIn, setLoggedIn] = useState(false);

    const handleclick = ()=>{
        navigate('/patient-login')
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        try {

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                console.log('Login successful!');
                // navigate(`/dashboard?name=${username}`);
                // navigate('/dashboard', { state: { name: {username} } });
                localStorage.setItem('username', username);
                navigate('/dashboard');

            } else {
                console.log('Login failed!');

            }
        } catch (error) {
            console.error('Error during login:', error);
        }
        console.log(username);
        console.log(password);
    };







    return (


        <div className='Login-Card'>
            <div className="login-container">
                <img src={VectorLogo} alt='logo' className='login-logo' />
                <h1>Login</h1>


                <form onSubmit={handleLogin}>
                    <label htmlFor="username" className='label'>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className='label'>Password:</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>
                    
                    <button type="submit">Login</button>
                    
                    

                </form>
                <button onClick={handleclick}> Patient </button>
            </div>
        </div>


        

    );
};

export default Login;
