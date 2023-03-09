import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    const [getuserdata, setUserdata] = useState([]);

    const getdata = async () => {
        const res = await fetch("/api/v1/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setUserdata(data);
    }

    useEffect(() => {
        getdata();
    }, []);

    const deleteUser = async (id) => {
        const res2 = await fetch(`/api/v1/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const deleteData = await res2.json();
        console.log(deleteData);
        if (res2.status === 422 || !deleteData) {
            console.log("error");
        } else {
            console.log("user deleted");
            getdata();
        }
    }

    return (
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2'>
                    <NavLink to="/register">
                        <button className='btn btn-primary'>Add People</button>
                    </NavLink>
                </div>

                {getuserdata.length > 0 &&
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
                            {getuserdata.map((user, index) => (
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
            </div>
        </div>
    );
}

export default HomePage;