import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
function App() {
  const [products, setproduct] = useState([]);
  const [addData, setaddData] = useState({
    name: "",
    price: "",
  });
  const [indexDelete, setindexDelete] = useState(-1);
  const [modalopen, setModalopen] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products`);
        setproduct(res.data);
      } catch (error) {
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
          <td>{val.price}</td>
          <td>
            <button
              className="btn btn-danger mr-3"
              onClick={() => deleteDataModal(index)}
            >
              Delete
            </button>
            <button className="btn btn-secondary ml-5">Edit</button>
          </td>
        </tr>
      );
    });
  };

  const deleteData = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:5000/products/${id}`);
      setproduct(res.data);
      setindexDelete(-1);
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

  const addDataToBe = async () => {
    const dataToBe = addData;
    try {
      let res = await axios.post(`http://localhost:5000/products`, dataToBe);
      setproduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
        <div className="mx-5">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
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
        </div>
      </center>
    </div>
  );
}

export default App;
