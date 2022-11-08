import React, { useState } from "react";
import "../App.css";

const initialProduct = {
  name: "",
  price: "",
  category: "",
  company: "",
  userId: "",
};
const AddProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const [error, setError] = useState(false);
  const user = localStorage.getItem("user");
  const collectData = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.company
    ) {
      setError(true);
      return;
    }
    let result = await fetch("http://localhost:8000/product", {
      method: "post",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    if (result) {
      setProduct(initialProduct);
    }
  };

  return (
    <div className='product'>
      <h2>Add Product</h2>
      <input
        className='inputbox'
        type='text'
        onChange={(e) =>
          setProduct({
            ...product,
            name: e.target.value,
            userId: JSON.parse(user).data._id,
          })
        }
        placeholder='Enter Product Name'
        value={product.name}
      />
      {error && !product.name && (
        <span className='invalid-input'>Please Enter Valid Name</span>
      )}
      <input
        className='inputbox'
        type='text'
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        placeholder='Enter Product Price'
        value={product.price}
      />
      {error && !product.price && (
        <span className='invalid-input'>Please Enter Valid Price</span>
      )}
      <input
        className='inputbox'
        type='text'
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        placeholder='Enter Product Category'
        value={product.category}
      />
      {error && !product.category && (
        <span className='invalid-input'>Please Enter Valid Category</span>
      )}
      <input
        className='inputbox'
        type='text'
        onChange={(e) => setProduct({ ...product, company: e.target.value })}
        placeholder='Enter Product Company'
        value={product.company}
      />
      {error && !product.company && (
        <span className='invalid-input'>Please Enter Valid Company Name</span>
      )}
      <button type='button' onClick={collectData}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
