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
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <div className="col-span-1">
          <a>
            <div
              key={product.id}
              className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md"
            >
              <div className="relative w-full pt-[100%]">
                <img
                  src={product.image}
                  className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                />
              </div>

              <div className="overflow-hidden p-2">
                <h2 className="min-h-[2rem] text-xs line-clamp-2">
                  {product.title}
                </h2>

                <div className="mt-3 flex items-center">
                  <div className="max-w-[50%] truncate text-gray-500 line-through">
                    <span className="text-xs">$</span>
                    <span className="text-sm">120</span>
                  </div>
                  <div className="ml-1 truncate text-primary">
                    <span className="text-sm text-red-500">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <div className="flex items-center"></div>
                  <button className="bg-red-500 text-white font-semibold py-2 px-4 w-auto  focus:outline-none hover:bg-red-600 ">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Home;
