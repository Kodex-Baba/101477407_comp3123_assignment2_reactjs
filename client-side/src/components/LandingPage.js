import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="centered-content">
            <div className="landing-page">
                <header>
                    <h1>Welcome to the Employee Management System</h1>
                </header>
                <main>
                    <div className="card mx-auto" style={{  }}>
                        <div className="card-body">
                            <h2 className="card-title">Manage Your Employees Effectively</h2>
                            <p className="card-text">
                                Sign up to start managing your workforce or log in to access your dashboard.
                            </p>
                            <div className="button-group">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{  }}
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <p>
                        &copy; 2024 Employee Management System. All rights reserved. <br />
                        <a href="https://www.example.com">Learn More</a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
