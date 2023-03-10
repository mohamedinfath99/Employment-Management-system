import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {


  const [inputValue, setInputValue] = useState({
    fullName: "",
    nameWithInitials: "",
    displayName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    mobileNumber: "",
    designation: "",
    employeeType: "",
    joinedDate: "",
    experience: "",
    salary: "",
    personalNotes: "",
  })


  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputValue((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const adddata = async (e) => {
    e.preventDefault();

    const requiredFields = ["fullName", "nameWithInitials", "gender", "dateOfBirth", "email", "mobileNumber", "designation", "employeeType", "joinedDate"];
    const isEmpty = requiredFields.some((field) => !inputValue[field]);

    if (isEmpty) {
      alert("Please fill all the required fields.");
      return;
    }

    const res = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputValue)
    })

    const data = await res.json();
    console.log(data);

    if (res.status === 404 || !data) {
      alert('error');
      console.log("error");
    } else {
      alert("data added")
      console.log("data added");
    }
  }

  return (
    <div className='container'>
      
      <form className='mt-4'>
        <div className='row'>

          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Full Name</label>
            <input type="text" name="fullName" className="form-control" onChange={setData} value={inputValue.fullName} id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Name With Initials</label>
            <input type="text" name="nameWithInitials" className="form-control" onChange={setData} value={inputValue.nameWithInitials} id="exampleInputPassword1" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Preferred / Display Name</label>
            <input type="text" name="displayName" className="form-control" onChange={setData} value={inputValue.displayName} id="exampleInputPassword1" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="gender" className="form-label">Gender</label>
            <select name="gender" className="form-select" onChange={setData} value={inputValue.gender} id="gender">
              <option value="">--Select the gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Date of Birth</label>
            <input type="date" name="dateOfBirth" className="form-control" onChange={setData} value={inputValue.dateOfBirth} id="exampleInputPassword1" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Email</label>
            <input type="email" name="email" className="form-control" onChange={setData} value={inputValue.email} id="exampleInputPassword1" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Mobile Number</label>
            <input type="text" name="mobileNumber" className="form-control" onChange={setData} value={inputValue.mobileNumber} id="exampleInputPassword1" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Designation</label>
            <input type="text" name="designation" className="form-control" onChange={setData} value={inputValue.designation} id="exampleInputPassword1" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="employeeType" className="form-label">Employee Type</label>
            <select name="employeeType" className="form-control" onChange={setData} value={inputValue.employeeType} id="employeeType">
              <option value="">--Select Employee Type--</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Joined Date</label>
            <input type="date" name="joinedDate" className="form-control" onChange={setData} value={inputValue.joinedDate} id="exampleInputPassword1" />
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="experience" className="form-label">Experience</label>
            <select name="experience" className="form-control" onChange={setData} value={inputValue.experience} id="experience">
              <option value="">--Select Years of Experience--</option>
              <option value="1">1 </option>
              <option value="2">2 </option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5 or Above">5  or Above</option>
            </select>
          </div>

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Salary</label>
            <input type="text" name="salary" className="form-control" onChange={setData} value={inputValue.salary} id="exampleInputPassword1" />
          </div>


          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Personal Notes</label>
            <textarea className="form-control" onChange={setData} value={inputValue.personalNotes} name="personalNotes" id="exampleInputPassword1" rows={4} />
          </div>

          <div className='registerButton d-flex justify-content-end'>
            <span className='cancelBtn'>Cancel</span>
            <button type="submit" className="btn btn-primary" onClick={adddata}>Add People</button>
          </div>

        </div>
      </form>

    </div>
  )
}

export default Register
