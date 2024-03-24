import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star5 } from "../../components/Star";
import ListPage from "../../features/Product";
import { fetchProducts } from "../../api/productApi"; // Import hàm fetchProducts từ file api.js
interface HomeProps {
  searchTerm: string;
}
interface Product {
  id: string;
  title: string;
  price: number;
  images: any;
}
const Home: React.FC<HomeProps> = ({ searchTerm }) => {
  console.log("home", searchTerm);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        if (!searchTerm) {
          const fetchedProducts = await fetchProducts(); // Assuming fetchProducts returns an array of products
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchInitialProducts();
  }, [searchTerm]);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Tính toán tổng số trang dựa trên số lượng sản phẩm đã được lọc
  const totalItems = searchTerm ? searchTerm.length : products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Tính chỉ số của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const currentProducts = searchTerm
    ? searchTerm.slice(indexOfFirstProduct, indexOfLastProduct)
    : products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.isArray(currentProducts) &&
          currentProducts.map((product, index) => (
            <div className="col-span-1" key={product.id || index}>
              <Link to={`/products/${product.id}`}>
                <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
                  <div className="relative w-full pt-[100%]">
                    <img
                      src={product.images[0]}
                      className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                      alt={product.title}
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
        totalPages={totalPages}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default Home;
