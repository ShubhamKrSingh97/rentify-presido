// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken, saveUserId, setIsAuthenticated, saveRole } from "../session";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/auth/login', formData)
    .then(res=>{
      saveToken(res.data.token);
      setIsAuthenticated(true);
      saveUserId(res.data.userId);
      saveRole(res.data.role)
      navigate('/')
    })
    .catch(err=>{
      console.log(err)
      alert(err.response.data)
      setFormData({
        email: '',
        password: '',
      })
    })
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
      {/* {error && <p className="text-danger text-center">{error.msg}</p>} */}
      <form onSubmit={onSubmit}>
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
        <button type="submit" className="btn btn-primary w-100" >
          Login
        </button>
      </form>
      <div className="text-center mt-3">
        <p className="mb-0">Don't have an account?</p>
        <Link to="/register" className="btn btn-link">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
