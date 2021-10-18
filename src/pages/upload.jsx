import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../helpers/Apiurl";

const Upload = () => {
  const [file, setfile] = useState(null);

  const onFileChange = (e) => {
    console.log(e.target.files);
    // isi state file dengan foto dengan menggunakan event.target.files
    // evennt.target.files adalah array so kita ambil satu saja karena penggennya satu
    if (e.target.files[0]) {
      setfile(e.target.files[0]);
    } else {
      setfile(null);
    }
  };

  const UploadClick = async () => {
    try {
      const formData = new FormData();
      // foto dimasuukan kedalam form data, tes itu tergantung name yang ditulis di backend
      formData.append("tes", file);

      let data = {
        nama: "dino",
      };

      formData.append("data", JSON.stringify(data));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(`${API_URL}/products/tesupload`, formData, config);
      alert("berhasil upload");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {/* <h1>tes</h1> */}
      <div className="mt-5">
        <input type="file" placeholder="file" onChange={onFileChange} />
        {file ? <img src={URL.createObjectURL(file)} /> : null}
        <button onClick={UploadClick}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
