import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    const [userList, setUserList] = useState([]);
    const [filterType, setFilterType] = useState("");

    const fetchData = async () => {
        const res = await fetch("/api/v1/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setUserList(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        const res = await fetch(`/api/v1/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const deleteData = await res.json();
        if (res.status === 422 || !deleteData) {
            console.log("error");
        } else {
            console.log("user deleted");
            fetchData();
        }
    }

    const filteredList = filterType ? userList.filter(user => user.employeeType === filterType) : userList;

    return (
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2 d-flex justify-content-end align-items-center'>

                    <select style={{fontSize: '16px', width: '200px'}} name="employeeType" className="form-select ms-2" id="employeeType" value={filterType} onChange={(e) => setFilterType(e.target.value) }>
                        <option value="">--Employee Types--</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract Basis">Contract Basis</option>
                        <option value="Others">Others</option>
                    </select>

                    <NavLink to="/register">
                        <button className='btn btn-primary ms-2'>Add People</button>
                    </NavLink>

                </div>

                {filteredList.length > 0 &&
                    <table className="table mt-4">
                        <thead>
                            <tr className="table-light">
                                <th scope="col">Display Name</th>
                                <th scope="col">Emp ID</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Emp.Type</th>
                                <th scope="col">Experience</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{user.displayName}</td>
                                    <td>{String(index + 1).padStart(3, '0')}</td>
                                    <td>{user.designation}</td>
                                    <td>{user.employeeType}</td>
                                    <td>{user.experience} years</td>
                                    <td className='d-flex justify-content-between'>
                                        <NavLink to={`edit/${user._id}`}>
                                            <span className='text-primary'>Edit</span>
                                        </NavLink>
                                        <span className='text-danger' onClick={() => deleteUser(user._id)}>Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                {filteredList.length === 0 && (
                    <p className="text-center mt-4">No results found for selected employee type.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;