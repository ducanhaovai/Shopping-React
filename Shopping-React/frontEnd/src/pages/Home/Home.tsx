import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star5 } from "../../components/Star";
import ListPage from "../../features/Product";
import Button from "../../components/TopHome/components/Button";

const Home = ({ handleSearch }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

    fetchProducts();
  }, []);

  useEffect(() => {}, [searchResults]);

  useEffect(() => {
    if (searchTerm !== "") {
      searchProducts();
      setSearching(true);
    } else {
      setSearching(false);
      setSearchResults([]); // Reset search results when searchTerm is empty
    }
  }, [searchTerm]);

  const searchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8088/search-products?title=${searchTerm}`
      );

      setSearchResults(response.data);
      setSearching(true);
    } catch (error) {
      setSearchResults([]);
      setSearching(false);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const totalItems = searching ? searchResults.length : products.length;
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonLabel) => {
    setActiveButton(buttonLabel);
  };
  return (
    <div>
      <div className="bg-gray-300/40 py-4 px-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div>Sắp xếp theo</div>
            <Button
              label="Phổ biến"
              isActive={activeButton === "Phổ biến"}
              onClick={() => handleButtonClick("Phổ biến")}
            />
            <Button
              label="Mới nhất"
              isActive={activeButton === "Mới nhất"}
              onClick={() => handleButtonClick("Mới nhất")}
            />
            <Button
              label="Bán chạy"
              isActive={activeButton === "Bán chạy"}
              onClick={() => handleButtonClick("Bán chạy")}
            />
            <select className="h-8 px-4 text-left text-sm capitalize text-black outline-none  bg-white text-black hover:bg-slate-100">
              <option value="" className="bg-white text-black">
                Giá
              </option>
              <option value="asc" className="bg-white text-black">
                Giá: Thấp đến cao
              </option>
              <option value="desc" className="bg-white text-black">
                Giá: Cao đến thấp
              </option>
            </select>
          </div>
          <form
            className="col-span-7 flex items-center"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-primary"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button
              type="submit"
              className="bg-primary text-white w-12 h-8 flex items-center justify-center rounded-md transition duration-300 hover:bg-opacity-80 focus:outline-none"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {(searching ? searchResults : products)
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => (
            <div className="col-span-1" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
                  <div className="relative w-full pt-[100%]">
                    <img
                      src={product.images}
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
