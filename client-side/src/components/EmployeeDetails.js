import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
    const { id } = useParams(); // Get employee ID from URL
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployee(response.data.employee);
                setError(null);
            } catch (err) {
                console.error('Error fetching employee details:', err);
                setError('Failed to load employee details');
            }
        };

        fetchEmployee();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
            <div className="container mt-0 d-flex justify-content-center align-items-center vh-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Employee Details</h3>
                        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {employee ? (
                            <div>
                                <p><strong>First Name:</strong> {employee.first_name}</p>
                                <p><strong>Last Name:</strong> {employee.last_name}</p>
                                <p><strong>Email:</strong> {employee.email}</p>
                                <p><strong>Position:</strong> {employee.position}</p>
                                <p><strong>Salary:</strong> ${employee.salary.toLocaleString()}</p>
                                <p><strong>Date of Joining:</strong> {formatDate(employee.date_of_joining)}</p>
                                <p><strong>Department:</strong> {employee.department}</p>
                            </div>
                        ) : (
                            <p>Loading employee details...</p>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default EmployeeDetails;
