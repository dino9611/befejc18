import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Verified from "./pages/verified";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/verified/:token" exact component={Verified} />
    </Switch>
  );
}

export default App;
