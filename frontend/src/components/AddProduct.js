import React, { useState } from "react";
import { useNavigate} from 'react-router-dom'

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const addProduct = async () => {
    console.warn(!name);
    if (!name || !price || !category || !company)
    {
      setError(true)
      return false;
    }

    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    console.warn(result);
    navigate("/")
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      {error && !name && <span className="invalid-input">Enter valid name</span>}

      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />
      {error && !price && <span className="invalid-input">Enter valid price</span>}

      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />
      {error && !category && <span className="invalid-input">Enter valid category</span>}

      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />
      {error && !company && <span className="invalid-input">Enter valid company</span>}
      <button className="appButton" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
