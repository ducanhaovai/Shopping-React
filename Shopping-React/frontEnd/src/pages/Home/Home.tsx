import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8088/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 justify-center align-middle">
      <h1 className="text-3xl font-semibold mb-8">Home Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-md shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>

              <p className="text-red-500 font-bold">${product.price}</p>
            </div>
            <button className="bg-red-500 text-white font-semibold py-2 px-4 w-auto  focus:outline-none hover:bg-red-600 ">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
