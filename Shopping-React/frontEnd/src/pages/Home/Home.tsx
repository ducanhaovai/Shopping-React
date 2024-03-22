import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star5 } from "../../components/Star";
import ListPage from "../../features/Product";

const Home = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false); // Thêm state để theo dõi trạng thái tìm kiếm
  const [initialLoad, setInitialLoad] = useState(true); // Thêm biến trạng thái cho lần load ban đầu

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8088/products");

        console.log("Data from backend:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      searchProducts();
      setSearching(true); // Đặt trạng thái tìm kiếm thành true khi bắt đầu tìm kiếm
      setInitialLoad(false); // Đặt trạng thái ban đầu thành false khi bắt đầu tìm kiếm
    } else {
      setSearching(false); // Đặt trạng thái tìm kiếm thành false khi không có từ khóa tìm kiếm
    }
  }, [searchTerm]);

  const searchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8088/search-products?title=${searchTerm}`
      );
      console.log("Search results from backend:", response.data);
      setSearchResults(response.data);

      setSearching(true);
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
      setSearching(false);
    }
  };

  const handleSearch = (searchTerm) => {
    console.log("Search term sent to parent component:", searchTerm);
    // Thực hiện xử lý dữ liệu tìm kiếm ở đây
  };

  // Lọc danh sách sản phẩm để hiển thị
  const displayItems = searching ? searchResults : products;

  const totalPages = Math.ceil(displayItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
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
          ))
        ) : initialLoad ? (
          <p>Loading...</p>
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <ListPage
        totalPages={totalPages}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Home;
