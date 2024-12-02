import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const AppNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/login'); // Redirect to login page
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Employee Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mx-auto"> {/* This centers the Nav items */}
                    <ul style={{ listStyleType: 'none' }}>
                        {/* Conditionally render the Employee Dashboard link */}
                        {location.pathname !== '/employees' && (
                            <li>
                                <Link to="/employees">Employee Dashboard</Link>
                            </li>
                        )}
                    </ul>
                </Nav>
                <Nav className="ml-auto"> {/* Pushes the logout button to the far right */}
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
