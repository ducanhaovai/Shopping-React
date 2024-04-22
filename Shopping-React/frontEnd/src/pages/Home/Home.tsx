import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star5 } from "../../components/Star";
import ListPage from "../../features/Product";
import { fetchProducts } from "../../api/productApi";
import Loading from "../../components/Loading";

interface HomeProps {
  searchTerm: string;
  products: Product[];
  category: Product[];
}

interface Product {
  id: string;
  title: string;
  price: number;
  images: any;
}

const Home: React.FC<HomeProps> = ({ searchTerm, category, products }) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        setCurrentProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    if (!searchTerm) {
      fetchInitialProducts();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm && Array.isArray(searchTerm) && searchTerm.length > 0) {
      setCurrentProducts(searchTerm);
    } else if (products && Array.isArray(products) && products.length > 0) {
      setCurrentProducts(products);
    } else if (category && Array.isArray(category) && category.length > 0) {
      setCurrentProducts(category);
    }
  }, [searchTerm, products, category]);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalItems = searchTerm ? searchTerm.length : currentProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const displayedProducts = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const filteredProducts = displayedProducts.filter(
    (product) => !product.images[0].includes('"')
  );
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 ">
            {Array.isArray(filteredProducts) &&
              filteredProducts.map((product, index) => (
                <div className="col-span-1" key={product.id || index}>
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id || index}
                  >
                    <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
                      <div className="w-full h-auto sm:h-[191px]">
                        <img
                          src={product.images[0]}
                          className="h-full w-full bg-white object-cover"
                          alt={product.title}
                        />
                      </div>

                      <div className="overflow-hidden p-2">
                        <h2 className="min-h-[2rem] text-xs line-clamp-2">
                          {product.title}
                        </h2>

                        <div className="mt-3 flex items-baseline justify-start flex-wrap">
                          <span className=" ml-4 text-lg text-gray-600 line-through">
                            120$
                          </span>
                          <span className="text-lg text-red-500 ml-10  ">
                            ${product.price}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-end">
                          <Star5 />
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
        </>
      )}
    </div>
  );
};

export default Home;
