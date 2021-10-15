import axios from "axios";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import { API_URL } from "./helpers/Apiurl";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Verified from "./pages/verified";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const keeplogin = async () => {
    // ambil token di localstorage
    let token = localStorage.getItem("token-access");
    const res = await axios.get(`${API_URL}/auth/keep/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // sama aja seperti action biasa cuman versi lite
    dispatch({ type: "LOGIN", payload: res.data });
  };

  useEffect(() => {
    keeplogin();
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/verified" exact component={Verified} />
      </Switch>
    </div>
  );
}

export default App;
