// src/Header.js
import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'}>
            <Button className="ms-auto me-3" variant={isDarkMode ? 'light' : 'dark'} onClick={toggleTheme}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Button>
        </Navbar>
    );
};

export default Header;
