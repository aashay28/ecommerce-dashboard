import React, { useEffect, useState } from "react";
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
  console.log("products", products);
  return (
    <div className='product-list'>
      <h3>Product List</h3>
      <ul className='heading'>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
      </ul>
      {products?.data?.map((item, i) => {
        return (
          <ul>
            <li>{i + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Home;
