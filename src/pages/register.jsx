import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../helpers/Apiurl";

const Register = () => {
  const [registerData, setregisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const onInputChange = (e) => {
    setregisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPass } = registerData;
    if (password === confirmPass) {
      let dataBody = {
        username,
        email,
        password,
      };
      try {
        const res = await axios.post(`${API_URL}/auth/register`, dataBody);
        console.log(res.data);
        alert("berhasil");
      } catch (error) {
        alert(error.response.data.message || "error server");
      }
    } else {
      alert("beda ");
    }
  };

  return (
    <div className="container-page d-flex justify-content-center align-items-center">
      <div className="container-input py-4 px-3 w-25 shadow">
        <h1>Register</h1>
        <form onSubmit={onRegisterSubmit}>
          <input
            type="text"
            className="form-control my-2 mt-2 shadow-sm"
            placeholder="username"
            name="username"
            value={registerData.username}
            onChange={onInputChange}
          />
          <input
            type="email"
            className="form-control my-2  shadow-sm"
            placeholder="email"
            value={registerData.email}
            name="email"
            onChange={onInputChange}
          />
          <input
            type="password"
            className="form-control my-2  shadow-sm"
            placeholder="password"
            value={registerData.password}
            name="password"
            onChange={onInputChange}
          />
          <input
            type="password"
            className="form-control my-2 shadow-sm "
            placeholder="confirm password"
            name="confirmPass"
            value={registerData.confirmPass}
            onChange={onInputChange}
          />
          <div>
            <span>sudah punya akun ?</span> <Link to="/login">Klik</Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-primary shadow mr-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
