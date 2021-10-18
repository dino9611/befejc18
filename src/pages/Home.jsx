import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { API_URL } from "../helpers/Apiurl";

function Home() {
  const [products, setproduct] = useState([]);
  const [addData, setaddData] = useState({
    name: "",
    price: "",
  });
  const [indexDelete, setindexDelete] = useState(-1);
  const [modalopen, setModalopen] = useState(false);

  const [indexEdit, setindexEdit] = useState(-1);
  const [modalEditopen, setModalEditopen] = useState(false);
  const [EditData, setEditData] = useState({
    name: "",
    price: "",
  });

  const [fileAdd, setFile] = useState(null);
  const [fileEdit, setFileedit] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products`);
        console.log(res.data);
        setproduct(res.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    fetchdata();
  }, []); // sama dengan componentdidmount

  const renderData = () => {
    return products.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.name}</td>
          <td width={300}>
            <img src={API_URL + val.image} alt={val.name} height={200} />
          </td>
          <td>{val.price}</td>
          <td>
            <button
              className="btn btn-danger mr-3"
              onClick={() => deleteDataModal(index)}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary ml-5"
              onClick={() => EditDataModal(index)}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  const deleteData = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:5000/products/${id}`);
      setproduct(res.data);
      setModalopen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDataModal = (index) => {
    setindexDelete(index);
    setModalopen(true);
  };

  const onInputChange = (e) => {
    setaddData({ ...addData, [e.target.name]: e.target.value });
  };
  const onEditInputChange = (e) => {
    setEditData({ ...EditData, [e.target.name]: e.target.value });
  };

  const addDataToBe = async () => {
    const formData = new FormData();
    const dataToBe = addData;
    formData.append("data", JSON.stringify(dataToBe));
    formData.append("image", fileAdd);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      let res = await axios.post(
        `http://localhost:5000/products`,
        formData,
        config
      );
      setproduct(res.data);
      setFile(null);
      setaddData({
        name: "",
        price: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async () => {
    const formData = new FormData();
    const dataEdit = {
      name: EditData.name,
      price: EditData.price,
    };
    formData.append("data", JSON.stringify(dataEdit));
    formData.append("image", fileEdit);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let id = products[indexEdit].id; // id dari products didpat dari indexedit yang dipilih
    try {
      let res = await axios.patch(
        `http://localhost:5000/products/${id}`,
        formData,
        config
      );
      setproduct(res.data);
      setModalEditopen(false);
      setEditData({
        name: "",
        price: "",
      });
      setFileedit(null);
    } catch (error) {
      console.log(error);
    }
  };

  const EditDataModal = (index) => {
    setindexEdit(index);
    setEditData(products[index]);
    setModalEditopen(true);
  };

  const renderModalEdit = () => {
    if (indexEdit >= 0) {
      return (
        <Modal
          isOpen={modalEditopen}
          toggle={() => setModalEditopen(!modalEditopen)}
        >
          <ModalHeader>Edit data</ModalHeader>
          <ModalBody>
            <input
              placeholder="edit name"
              className="form-control"
              value={EditData.name}
              name="name"
              onChange={onEditInputChange}
            />
            <input
              type="file"
              className="form-control"
              onChange={onFileChangeEdit}
            />
            {fileEdit ? (
              <>
                <img
                  src={URL.createObjectURL(fileEdit)}
                  height={200}
                  width={200}
                />
                <button onClick={() => setFileedit(null)}>hapus</button>
              </>
            ) : null}
            <input
              placeholder="edit price"
              className="form-control"
              value={EditData.price}
              name="price"
              onChange={onEditInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <button onClick={updateData}>Save</button>
            <button onClick={() => setModalEditopen(!modalEditopen)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      );
    }
    return null;
  };
  // const onChangefile = (e) => {
  //   console.log(e.target.files);
  // };
  // const hiddenFileInput = React.useRef(null);

  // const handleClick = (event) => {
  //   hiddenFileInput.current.click();
  // };
  // const handleChange = (event) => {
  //   const fileUploaded = event.target.files[0];
  //   console.log(fileUploaded);
  // };

  const onFileChange = (e) => {
    console.log(e.target.files);
    // isi state file dengan foto dengan menggunakan event.target.files
    // evennt.target.files adalah array so kita ambil satu saja karena penggennya satu
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };
  const onFileChangeEdit = (e) => {
    console.log(e.target.files);
    // isi state file dengan foto dengan menggunakan event.target.files
    // evennt.target.files adalah array so kita ambil satu saja karena penggennya satu
    if (e.target.files[0]) {
      setFileedit(e.target.files[0]);
    } else {
      setFileedit(null);
    }
  };

  return (
    <div>
      {renderModalEdit()}
      {indexDelete >= 0 ? (
        <Modal isOpen={modalopen} toggle={() => setModalopen(!modalopen)}>
          <ModalHeader>Delete data</ModalHeader>
          <ModalBody>
            Are you sure delete {products[indexDelete]?.name}
          </ModalBody>
          <ModalFooter>
            <button onClick={() => deleteData(products[indexDelete]?.id)}>
              Yes
            </button>
            <button onClick={() => setModalopen(!modalopen)}>No</button>
          </ModalFooter>
        </Modal>
      ) : null}
      <center>
        <h1>Table Products</h1>
        {/* <label className="custom-file-upload">
          <input type="file" multiple onChange={onChangefile} />
          Attach
        </label> */}
        {/* <button onClick={handleClick}>Upload a file</button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        /> */}
        <div className="mx-5">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>price</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>{renderData()}</tbody>
            <tfoot>
              <td></td>
              <td>
                <input
                  placeholder="product name"
                  className="form-control"
                  name="name"
                  value={addData.name}
                  onChange={onInputChange}
                />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  onChange={onFileChange}
                />
              </td>
              <td>
                <input
                  placeholder="price"
                  className="form-control"
                  name="price"
                  value={addData.price}
                  onChange={onInputChange}
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={addDataToBe}>
                  add data
                </button>
              </td>
            </tfoot>
          </Table>
          {fileAdd ? <img src={URL.createObjectURL(fileAdd)} /> : null}
        </div>
      </center>
    </div>
  );
}

export default Home;
