import React, { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    getProductDetails();
  },[])

  const getProductDetails= async()=>{
    
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
    })
    
    result = await result.json()
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
  }

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method: 'Put',
        body: JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type':'Application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    result = await result.json()
    if(result){
    navigate("/")
    }
  };
  
  const deleteProduct=async()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this product?")
    if (!confirmDelete) return
    try{
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        method:'delete',
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
    if(!result.ok){
      throw new Error("Failed to delete product.")
    }
    result = await result.json()
    if(result){
      navigate("/")
      }
  } catch (error){
    console.error("Error deleting product:", error)
  }
}

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      
      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />
      
      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />

      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />
      
      <button className="appButton" onClick={updateProduct}>
        Update Product
      </button>
      <button className="appButton" onClick={deleteProduct} >
        Delete Product
      </button>
      
    </div>
  );
};

export default UpdateProduct;
