import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5050/api/signup', {
                name,
                email,
                password,
                phone,
                profession,
            });
            if (response.status === 201) {
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className='main'>
            <div className='tunerImg'>
                <img className='pic' src='./images/signup.jpg'></img>
            </div>

            <form onSubmit={handleSubmit} className='form'>
                <h1 className='register'>Register</h1>
                <div className='form-input'>
                    <div >
                        <label htmlFor="name" className='name'>Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className='email'>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='password'>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className='cp'>Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className='phone'>Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profession" className='pr'>Profession:</label>
                        <input
                            type="text"
                            id="profession"
                            value={profession}
                            onChange={(event) => setProfession(event.target.value)}
                            required
                        />
                    </div>
                    {error && <div className='text-danger'>{error}</div>}
                </div>

                <button type="submit" className='button'>Signup</button>
                <div >
                    <Link to="/signin" className="text-info">Login here</Link>
                </div>
            </form>
        </div>
    );
};


export default Signup;