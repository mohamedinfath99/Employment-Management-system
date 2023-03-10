import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    const [userList, setUserList] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");

    const PAGE_SIZE = 5;

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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleSort = () => {
        if (sortOrder === "asc") {
            setSortOrder("desc");
        } else {
            setSortOrder("asc");
        }
    }

    const filteredList = filterType ? userList.filter(user => user.employeeType === filterType) : userList;

    const sortedList = sortOrder === "asc" ?
        filteredList.sort((a, b) => (a.displayName > b.displayName) ? 1 : -1) :
        filteredList.sort((a, b) => (a.displayName < b.displayName) ? 1 : -1);

    const indexOfLastUser = currentPage * PAGE_SIZE;
    const indexOfFirstUser = indexOfLastUser - PAGE_SIZE;
    const currentUsers = sortedList.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2 d-flex justify-content-end align-items-center'>

                    <select style={{ fontSize: '16px', width: '200px' }} name="employeeType" className="form-select ms-2" id="employeeType" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
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

                {currentUsers.length > 0 &&
                    <table className="table mt-4">
                        <thead>
                            <tr className="table-light">
                                <th scope="col" onClick={handleSort}>Display Name</th>
                                <th scope="col">Emp ID</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Emp.Type</th>
                                <th scope="col">Experience</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{user.displayName}</td>
                                        <td>{String(index + 1).padStart(3, '0')}</td>
                                        <td>{user.designation}</td>
                                        <td>{user.employeeType}</td>
                                        <td>{user.experience}</td>
                                        <td>
                                            <NavLink to={`/edit/${user._id}`} className="text-decoration-none">
                                                <span className='editButton  me-5'>Edit</span>
                                            </NavLink>
                                            <span className='deleteButton' onClick={() => deleteUser(user._id)}>Delete</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }

                {currentUsers.length === 0 &&
                    <div className='text-center mt-5'>
                        <h2>No users found!</h2>
                    </div>
                }

                <div className="mt-3">
                    {currentUsers.length > 0 &&
                        <nav>
                            <ul className="pagination justify-content-center">
                                {Array(Math.ceil(sortedList.length / PAGE_SIZE)).fill().map((_, index) => {
                                    return (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    }
                </div>
            </div>
        </div>
    )

}

export default HomePage;