import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Employee.css';

const API_BASE_URL = 'https://localhost:44353/api/employees';

const Employee = () => {
    const [employees, setEmployees] = useState([]); // State for employees data
    const [error, setError] = useState(''); // State for error messages
    const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', gender: '', salary: '' }); // State for new employee data
    const [editing, setEditing] = useState(null); // State for editing employee

    // Fetch all employees on component load
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Fetch all employees
    const fetchEmployees = () => {
        axios.get(API_BASE_URL)
            .then(response => {
                setEmployees(response.data);
                setError('');
            })
            .catch(err => {
                setError(`Failed to fetch employees: ${err.message}`);
            });
    };

    // Add a new employee
    const handleAddEmployee = () => {
        axios.post(API_BASE_URL, newEmployee)
            .then(() => {
                fetchEmployees(); // Refresh data after adding
                setNewEmployee({ firstName: '', lastName: '', gender: '', salary: '' }); // Clear form
                setError('');
            })
            .catch(err => {
                setError(`Failed to add employee: ${err.message}`);
            });
    };

    // Update an employee
    const handleUpdateEmployee = (id) => {
        axios.put(`${API_BASE_URL}/${id}`, newEmployee)
            .then(() => {
                fetchEmployees(); // Refresh data after updating
                setEditing(null); // Exit editing mode
                setNewEmployee({ firstName: '', lastName: '', gender: '', salary: '' }); // Clear form
                setError('');
            })
            .catch(err => {
                setError(`Failed to update employee: ${err.message}`);
            });
    };

    // Delete an employee
    const handleDeleteEmployee = (id) => {
        axios.delete(`${API_BASE_URL}/${id}`)
            .then(() => {
                // Remove employee from the state after successful deletion
                setEmployees(prevEmployees => prevEmployees.filter(emp => emp.ID !== id));
                setError('');
            })
            .catch(err => {
                setError(`Failed to delete employee: ${err.message}`);
            });
    };

    return (
        <div>
            <h1>Employee Management</h1>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/* Add/Edit Employee Form */}
            <div className="employee-form">
                <h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
                <input
                    type="text"
                    placeholder="First Name"
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Gender"
                    value={newEmployee.gender}
                    onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                />
                <button onClick={() => (editing ? handleUpdateEmployee(editing) : handleAddEmployee())}>
                    {editing ? 'Update' : 'Add'}
                </button>
            </div>

            {/* Employee Table */}
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.ID}>
                            <td>{employee.ID}</td>
                            <td>{employee.FirstName}</td>
                            <td>{employee.LastName}</td>
                            <td>{employee.Gender}</td>
                            <td>{employee.Salary}</td>
                            <td>
                                <button
                                    style={{ marginRight: '5px', color: 'white', background: '#0d6efd', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    onClick={() => {
                                        setEditing(employee.ID);
                                        setNewEmployee({
                                            FirstName: employee.FirstName,
                                            LastName: employee.LastName,
                                            Gender: employee.Gender,
                                            Salary: employee.Salary,
                                        }); // Pre-fill form for editing
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ color: 'white', background: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    onClick={() => handleDeleteEmployee(employee.ID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employee;
