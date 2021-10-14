import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../helpers/Apiurl";

const Login = () => {
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
    confirmPass: "",
  });

  const onInputChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onloginSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;

    try {
      // boleh pake ini
      //   const res = await axios.get(
      //     `${API_URL}/auth/login?username=${username}&password=${password}`
      //   );
      //   atau yang dibawah ini
      const options = {
        params: {
          username: username,
          password: password,
        },
      };
      const res = await axios.get(`${API_URL}/auth/login`, options);
      console.log(res.data);
      alert("berhasil");
    } catch (error) {
      alert(error.response.data.message || "error server");
    }
  };

  return (
    <div className="container-page d-flex justify-content-center align-items-center">
      <div className="container-input py-4 px-3 w-25 shadow">
        <h1>Login</h1>
        <form onSubmit={onloginSubmit}>
          <input
            type="text"
            className="form-control my-2 mt-2 shadow-sm"
            placeholder="username"
            name="username"
            value={loginData.username}
            onChange={onInputChange}
          />
          <input
            type="password"
            className="form-control my-2 shadow-sm"
            placeholder="password"
            name="password"
            value={loginData.password}
            onChange={onInputChange}
          />
          <div>
            <span>
              Lupa password? <Link to="/register">mau buat akun?</Link>
            </span>
          </div>
          <div className="my-1">
            <button className="btn btn-outline-primary shadow mr-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
