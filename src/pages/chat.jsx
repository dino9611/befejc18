import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import io from "socket.io-client";
import { API_URL } from "../helpers/Apiurl";

const Chat = () => {
  const [name, setname] = useState("");
  const [connect, setconnect] = useState(false);
  const [bales, setbales] = useState("");
  const [respond, setrespond] = useState("");
  const [inputMes, setinputMes] = useState("");
  const [inputMesRoom, setinputMesRoom] = useState("");
  const [message, setmessage] = useState([]);
  const [messageRoom, setmessageRoom] = useState([]);
  const [nsp, setnsp] = useState("");

  useEffect(() => {
    const sockets = io(API_URL);
  }, []);

  const joinChat = async (nsp) => {
    const socket = io(API_URL + nsp);
    console.log(API_URL + nsp);
    if (name) {
      //pastikan name terisis
      // get message yang lain
      let res = await axios.get(`${API_URL}/mess?nsp=${nsp}`);
      setmessage(res.data);
      setnsp(nsp);
      socket.emit("bebas", { name });
      //socket.emit(namaevent,data) data bisa apapun tipenya bisa string atau object
      setconnect(true);
      socket.on("balas", (data) => {
        console.log(data);
        setbales(data);
      });
      socket.on("pesan", (data) => {
        console.log(data);
        setmessage(data);
      });
    }
  };

  const joinRoom = (room) => {
    const socket = io(API_URL);
    socket.emit("joinRoom", { name, room });
    socket.on("respond", (data) => {
      console.log("data dari socket", data);
      setrespond(data);
    });
    socket.on("messageRoom", (chat) => {
      console.log("data dari socket", chat);
      setmessageRoom(chat);
    });
  };

  const sendMessage = async () => {
    try {
      await axios.post(`${API_URL}/sendmess?cnl=${nsp}`, {
        name,
        pesan: inputMes,
      });
      //   alert("berhasil kirim meesage");
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessageroom = async (room) => {
    try {
      await axios.post(`${API_URL}/sendmess?cnl=${nsp}`, {
        name,
        pesan: inputMesRoom,
        room,
      });
      //   alert("berhasil kirim meesage");
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (e) => {
    if (e.target.name === "username") {
      setname(e.target.value);
    } else if (e.target.name === "room") {
      setinputMesRoom(e.target.value);
    } else {
      setinputMes(e.target.value);
    }
  };

  const disconnect = () => {
    // const socket = io(API_URL);
    // socket.emit("putus");
    // alert("");
  };

  const leaveRoom = () => {
    const socket = io(API_URL);
    socket.emit("leaveRoom", { name, room: "room1" });
  };
  return (
    <div>
      <div className="container">
        <h1>SOCKET</h1>
        <div>{connect ? name : null}</div>
        <div>{bales}</div>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="form-control"
          onChange={onInputChange}
          value={name}
        />

        <button onClick={() => joinChat("/")} className="btn btn-primary">
          Join
        </button>
        <button
          onClick={() => joinChat("/channel")}
          className="btn btn-primary"
        >
          Join channel
        </button>
        <div className="row">
          <div className="col-md-9">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pesan</th>
                </tr>
              </thead>
              <tbody>
                {message.map((val) => {
                  return (
                    <tr>
                      <td>{val.name}</td>
                      <td>{val.pesan}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <input
              type="text"
              placeholder="pesan"
              className="form-control"
              onChange={onInputChange}
              value={inputMes}
            />
          </div>
          <div className="col-md-3">
            <button onClick={sendMessage}>send</button>
            <button onClick={disconnect}>disconnect</button>
          </div>
        </div>
        <h1>Room 1</h1>
        <div>{respond}</div>
        <button onClick={() => joinRoom("room1")}>join Room 1</button>
        <button onClick={() => joinRoom("room2")}>join Room 2</button>
        <div className="row">
          <div className="col-md-9">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pesan</th>
                </tr>
              </thead>
              <tbody>
                {messageRoom.map((val) => {
                  return (
                    <tr>
                      <td>{val.name}</td>
                      <td>{val.pesan}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <input
              type="text"
              placeholder="pesan"
              name="room"
              className="form-control"
              onChange={onInputChange}
              value={inputMesRoom}
            />
          </div>
          <div className="col-md-3">
            <button onClick={() => sendMessageroom("room1")}>send</button>
            <button onClick={() => sendMessageroom("room2")}>send2</button>
            <button onClick={leaveRoom}>disconnect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
