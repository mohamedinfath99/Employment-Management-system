import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Edit = () => {


    const [inputValue, setInputValue] = useState({
        fullName: '',
        nameWithInitials: '',
        displayName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        mobileNumber: '',
        designation: '',
        employeeType: '',
        joinedDate: '',
        experience: '',
        salary: '',
        personalNotes: '',
    });

    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setInputValue((preval) => {
            return {
                ...preval,
                [name]: value,
            };
        });
    };

    const { id } = useParams();
    console.log(id);

    const getdata = async () => {
        const res = await fetch(`/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log('error');
        } else {
            setInputValue(data);
            console.log('get data');
        }
    };

    useEffect(() => {
        getdata();
    }, []);



    const updateUser = async (e) => {
        e.preventDefault();

        const { fullName, nameWithInitials, displayName, gender, dateOfBirth, email, mobileNumber, designation, employeeType, joinedDate, experience, salary, personalNotes } = inputValue

        const res2 = await fetch(`/api/v1/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName, nameWithInitials, displayName, gender, dateOfBirth, email, mobileNumber, designation, employeeType, joinedDate, experience, salary, personalNotes
            })
        })


        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 | data2){
            alert("fill the data")
        }
        else {
            alert("data added")
            window.location.href = "/";
        }

    }

    return (
        <div className='container'>
            <NavLink to='/'>Home</NavLink>

            <form className='mt-4'>
                <div className='row'>
                    <div className='mb-3'>
                        <label htmlFor='exampleInputEmail1' className='form-label'>
                            Full Name
                        </label>
                        <input
                            type='text'
                            name='fullName'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.fullName}
                            id='exampleInputEmail1'
                            aria-describedby='emailHelp'
                        />
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Name With Initials
                        </label>
                        <input
                            type='text'
                            name='nameWithInitials'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.nameWithInitials}
                            id='exampleInputPassword1'
                        />
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Preferred / Display Name
                        </label>
                        <input
                            type='text'
                            name='displayName'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.displayName}
                            id='exampleInputPassword1'
                        />
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='gender' className='form-label'>
                            Gender
                        </label>
                        <select
                            name='gender'
                            className='form-select'
                            onChange={setData}
                            value={inputValue.gender}
                            id='gender'
                        >
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Date of Birth
                        </label>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='exampleInputEmail1' className='form-label'>
                            Email address
                        </label>
                        <input
                            type='email'
                            name='email'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.email}
                            id='exampleInputEmail1'
                            aria-describedby='emailHelp'
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Mobile Number
                        </label>
                        <input
                            type='text'
                            name='mobileNumber'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.mobileNumber}
                            id='exampleInputPassword1'
                        />
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Designation
                        </label>
                        <input
                            type='text'
                            name='designation'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.designation}
                            id='exampleInputPassword1'
                        />
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Employee Type
                        </label>
                        <select
                            name='employeeType'
                            className='form-select'
                            onChange={setData}
                            value={inputValue.employeeType}
                            id='employeeType'
                        >
                            <option value='Full Time'>Full Time</option>
                            <option value='Part Time'>Part Time</option>
                        </select>
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Joined Date
                        </label>
                        <input
                            type='text'
                            name='joinedDate'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.joinedDate}
                            id='exampleInputPassword1'
                        />
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Experience
                        </label>
                        <input
                            type='text'
                            name='experience'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.experience}
                            id='exampleInputPassword1'
                        />
                    </div>

                    <div className='mb-3 col-lg-6 col-md-6 col-12'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Salary
                        </label>
                        <input
                            type='text'
                            name='salary'
                            className='form-control'
                            onChange={setData}
                            value={inputValue.salary}
                            id='exampleInputPassword1'
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                            Personal Notes
                        </label>
                        <textarea
                            className='form-control'
                            name='personalNotes'
                            onChange={setData}
                            value={inputValue.personalNotes}
                            id='exampleFormControlTextarea1'
                            rows='3'
                        ></textarea>
                    </div>

                    <div className='mb-3'>
                        <button type='submit' onClick={updateUser} className='btn btn-primary'>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Edit
