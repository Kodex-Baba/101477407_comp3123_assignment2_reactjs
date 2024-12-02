import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchEmployees();
        }
    }, [navigate]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/employees', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setEmployees(response.data.data);
            setFilteredEmployees(response.data.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError('Failed to fetch employee data');
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredEmployees(
            employees.filter((employee) =>
                `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(query) ||
                employee.email.toLowerCase().includes(query) ||
                employee.position.toLowerCase().includes(query)
            )
        );
    };

    const handleDelete = async (employeeId) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this employee?');
            if (confirmed) {
                await axios.delete(`http://localhost:3001/api/v1/employees?eid=${employeeId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Employee deleted successfully!');
                fetchEmployees();
            }
        } catch (err) {
            console.error('Error deleting employee:', err);
            alert('Failed to delete employee.');
        }
    };
/*
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

 */

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{color: 'goldenrod'}}>Employee Dashboard</h2>
            </div>
            <div className="mb-3">
                <button
                    className="btn btn-success"
                    onClick={() => navigate('/employees/create')}
                >
                    Add Employee
                </button>
            </div>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={handleSearch}

                style={{maxWidth: '300px', width: 'auto'}}
            />
            {error && <p className="text-danger">{error}</p>}
            <table className="table custom-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody >
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                        <tr key={employee._id} >
                            <td>
                                {employee.first_name} {employee.last_name}
                            </td>
                            <td>{employee.email}</td>
                            <td>{employee.position}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => navigate(`/employees/view/${employee._id}`)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(employee._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">
                            No employees found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDashboard;
