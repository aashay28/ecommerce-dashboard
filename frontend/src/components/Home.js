import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const result = await (
      await fetch("http://localhost:8000/all-product")
    ).json();
    setProducts(result);
  };
  const DeleteHandler = async (id) => {
    let result = await fetch(`http://localhost:8000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  return (
    <div className='product-list'>
      <h3>Product List</h3>
      <ul className='heading'>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Actions</li>
      </ul>
      {products?.data?.map((item, i) => {
        return (
          <ul key={item._id}>
            <li>{i + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => DeleteHandler(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`} style={{ marginLeft: "1rem" }}>
                <button>Update</button>
              </Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Home;
