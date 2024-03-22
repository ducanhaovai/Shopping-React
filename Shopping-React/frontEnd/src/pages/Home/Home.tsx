import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star5 } from "../../components/Star";
import ListPage from "../../features/Product";
import Button from "../../components/TopHome/components/Button";

const Home = ({ searchTerm }) => {
  console.log("home", searchTerm);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8088/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (!searchTerm) {
      fetchProducts();
      setSearching(false);
    } else {
      setSearchResults([searchTerm]); // Sử dụng searchTerm trực tiếp trong kết quả tìm kiếm
      setSearching(true);
    }
  }, [searchTerm]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItems = searching ? searchResults.length : products.length;

  return (
    <div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {(searchTerm && searching ? searchResults : products) // Check if searchTerm exists and searching is true
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product, index) => (
            <div className="col-span-1" key={product.id || index}>
              <Link to={`/products/${product.id}`}>
                <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
                  <div className="relative w-full pt-[100%]">
                    <img
                      src={product.images}
                      className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                      alt={product.title} // Add alt attribute for accessibility
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
                      <Star5 />
                      <button className="bg-red-500 text-white font-semibold py-2 px-4 w-auto  focus:outline-none hover:bg-red-600 ">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <ListPage
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Home;
