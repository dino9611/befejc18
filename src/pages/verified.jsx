import React, { useState, useEffect } from "react";
import qs from "query-string";
import axios from "axios";
import { API_URL } from "../helpers/Apiurl";
import { Link } from "react-router-dom";
const Verified = (props) => {
  const [condition, setcondition] = useState(1);

  const fetchdata = async () => {
    const { token } = qs.parse(props.location.search);
    console.log(token);
    try {
      const res = await axios.get(`${API_URL}/auth/verified`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setcondition(2);
    } catch (error) {
      alert(error);
      console.log(error);
      setcondition(3);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []); // componentDidmount

  if (condition === 1) {
    return (
      <div>
        <center>
          <h1>Sedang menuggu Verified</h1>
        </center>
      </div>
    );
  }
  if (condition === 2) {
    return (
      <div>
        <center>
          <h1>Verified berhasil</h1>
          <Link to="/">Home</Link>
        </center>
      </div>
    );
  }
  return (
    <div>
      <center>
        <h1>Gagal Verified</h1>
        <Link to="/">Home</Link>
      </center>
    </div>
  );
};

export default Verified;
