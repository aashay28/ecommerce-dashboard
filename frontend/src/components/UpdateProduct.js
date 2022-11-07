import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    const result = await (await fetch(
      `http://localhost:8000/product/${params.id}`
    ),
    {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }).json();
    setProduct(result.data);
  };
  console.log("product", product);
  const user = localStorage.getItem("user");
  const collectData = async () => {
    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.company
    ) {
      return;
    }
    let result = await fetch(`http://localhost:8000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    if (result) {
      setProduct("");
      navigate("/");
    }
  };

  return (
    <div className='product'>
      <h2>Update Product</h2>
      {!product && <h2>Please Select the Product</h2>}
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
        value={product.name || ""}
      />

      <input
        className='inputbox'
        type='text'
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        placeholder='Enter Product Price'
        value={product.price || ""}
      />

      <input
        className='inputbox'
        type='text'
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
        placeholder='Enter Product Category'
        value={product.category || ""}
      />

      <input
        className='inputbox'
        type='text'
        onChange={(e) => setProduct({ ...product, company: e.target.value })}
        placeholder='Enter Product Company'
        value={product.company || ""}
      />

      <button type='button' onClick={collectData}>
        update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
