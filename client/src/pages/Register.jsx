import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, saveUserId, setIsAuthenticated, saveRole } from "../session";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "buyer",
    password: "",
  });

  const { firstname, lastname, email, phone, role, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/register', formData)
    .then(res=>{
      saveToken(res.data.token);
      setIsAuthenticated(true);
      saveUserId(res.data.userId);
      saveRole(res.data.role)
      navigate('/')
    })
    .catch(err=>{
      console.log(err)
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        role: "buyer",
        password: "",
      })
    })
  };


  return (
    <div className="container mt-5">
      <div className='flex-row-center'>
        <Logo/>
        <h1 className="text-center mb-4 header">Register</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            name="role"
            value={role}
            onChange={onChange}
            className="form-select"
            required
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-control"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
