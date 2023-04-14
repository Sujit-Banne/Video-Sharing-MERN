import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'

function Navbar({ onSearchQueryChange }) {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userTokenTime'));
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('userTokenTime');
        setLoggedIn(false);
        navigate('/');
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        onSearchQueryChange(event.target.value);
    };


    return (
        <nav className='navbar'>
            <img src="./images/logo.PNG" alt="logo" className="logo" onClick={() => navigate('/home')} />
            <div className="navbar-search">
                <input type="text" placeholder="Search videos" value={searchQuery} onChange={handleSearchInputChange} />
            </div>
            <div className="navbar-nav">
                {loggedIn ? (
                    <>
                        <NavLink className="item" to="/upload">Upload</NavLink>
                        <NavLink className="item" to="/myvideos">My Videos</NavLink>
                        <button className="item signout" onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <NavLink className="item" to="/signin">Sign In</NavLink>
                        <NavLink className="item" to="/signup">Sign Up</NavLink>
                    </>
                )}
            </div>
        </nav>

    );
}

export default Navbar;


