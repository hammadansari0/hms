
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Login.css';
import VectorLogo from './VectorLogo.png';

// import Dashboard from './Dashboard';

const PLogin = () => {
    const navigate = useNavigate();
    const [p_number, setUsername] = useState('');
    const [pw, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [isLoggedIn, setLoggedIn] = useState(false);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log(p_number);
        // console.log(pw);
        try {

            const response = await fetch('/plogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    p_number,
                    pw,
                }),
            });

            if (response.ok) {
                console.log('Login successful!');
                // navigate(`/dashboard?name=${username}`);
                // navigate('/dashboard', { state: { name: {username} } });
                localStorage.setItem('p_number', p_number);
                const num = localStorage.getItem('p_number');
                console.log("number saved in the localstorage"+num);
                navigate('/patient');

            } else {
                console.log('Login failed!');

            }
        } catch (error) {
            console.error('Error during login:', error);
        }
        console.log(p_number);
        console.log(pw);
    };







    return (


        <div className='Login-Card'>
            <div className="login-container">
                <img src={VectorLogo} alt='logo' className='login-logo' />
                <h1>Patient Login</h1>


                <form onSubmit={handleLogin}>
                    <label htmlFor="username" className='label'>Phone Number:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={p_number}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className='label'>OTP:</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={pw}
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
            </div>
        </div>


        //         <div>
        //     {isLoggedIn ? (
        //         // Redirect to Dashboard
        //         <Dashboard name={username} />
        //     ) : (
        //         <div className='Login-Card'>
        //             <div className="login-container">
        //                 <img src={VectorLogo} alt='logo' className='login-logo' />
        //                 <h1> Staff Login</h1>

        //                 <form onSubmit={handleLogin}>
        //                     <label htmlFor="username" className='label'>Username:</label>
        //                     <input
        //                         type="text"
        //                         id="username"
        //                         name="username"
        //                         value={username}
        //                         onChange={(e) => setUsername(e.target.value)}
        //                         required
        //                     />

        //                     <label htmlFor="password" className='label'>Password:</label>
        //                     <div className="password-input-container">
        //                         <input
        //                             type={showPassword ? 'text' : 'password'}
        //                             id="password"
        //                             name="password"
        //                             value={password}
        //                             onChange={(e) => setPassword(e.target.value)}
        //                             required
        //                         />
        //                         <span
        //                             className="password-toggle"
        //                             onClick={() => setShowPassword(!showPassword)}
        //                         >
        //                             {showPassword ? 'Hide' : 'Show'}
        //                         </span>
        //                     </div>

        //                     <button type="submit">Login</button>
        //                 </form>
        //             </div>
        //         </div>
        //     )}
        // </div>

    );
};

export default PLogin;
