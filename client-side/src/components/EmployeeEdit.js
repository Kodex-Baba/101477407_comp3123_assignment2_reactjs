import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeEdit = () => {
    const { id } = useParams(); // Get employee ID from URL
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployee(response.data.employee);
                setError(null);
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                console.error('Error fetching employee details:', err);
                setError('Failed to load employee details');
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3001/api/v1/employees/${id}`,
                employee,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            alert('Employee updated successfully');
            navigate('/employees'); // Redirect to the Employee Dashboard
        } catch (err) {
            console.error('Error updating employee:', err);
            setError('Failed to update employee');
        }
    };

    const handleCancel = () => {
        navigate('/employees'); // Navigate back to employee dashboard
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Edit Employee</h3>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Go Back</button>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        className="form-control"
                                        value={employee.first_name || ''}
                                        placeholder="First Name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        className="form-control"
                                        value={employee.last_name || ''}
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={employee.email || ''}
                                        placeholder="Email"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Position:</label>
                                    <input
                                        type="text"
                                        name="position"
                                        className="form-control"
                                        value={employee.position || ''}
                                        placeholder="Position"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Salary:</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        className="form-control"
                                        value={employee.salary || ''}
                                        placeholder="Salary"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Date of Joining:</label>
                                    <input
                                        type="date"
                                        name="date_of_joining"
                                        className="form-control"
                                        value={employee.date_of_joining ? employee.date_of_joining.slice(0, 10) : ''}
                                        placeholder="Date of Joining"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Department:</label>
                                    <input
                                        type="text"
                                        name="department"
                                        className="form-control"
                                        value={employee.department || ''}
                                        placeholder="Department"
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" onClick={handleCancel} className="btn btn-danger">
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeEdit;
