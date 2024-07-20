import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star5 } from "../../components/Star";
import ListPage from "../../features/Product";
import { fetchProducts } from "../../api/productApi";
import Loading from "../../components/Loading";
import { CiHeart } from "react-icons/ci";
import { useTranslation } from "react-i18next";

interface HomeProps {
  searchTerm: string;
  products: Product[];
  category: Product[];
}

interface Product {
  rating: any;
  id: string;
  title: string;
  price: number;
  image: any;
  sold: number;
  count: number;
}

const Home: React.FC<HomeProps> = ({ searchTerm, category, products }) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const updatedProducts = products.map((product) => ({
      ...product,
      sold: Math.floor(Math.random() * 100) + 1,
    }));
    setCurrentProducts(updatedProducts);
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
    (product) => !product.image[0].includes('"')
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
            {Array.isArray(filteredProducts) &&
              filteredProducts.map((product, index) => (
                <div className="col-span-1 w-full " key={product.id || index}>
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id || index}
                  >
                    <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
                      <div className="w-full h-auto sm:h-[191px] flex justify-center">
                        <img
                          src={product.image}
                          className="h-full  bg-white object-cover"
                          alt={product.title}
                        />
                      </div>

                      <div className="overflow-hidden p-2">
                        <h2 className="min-h-[2rem] text-xs line-clamp-2">
                          {product.title}
                        </h2>

                        <div className="mt-3 flex items-baseline justify-start flex-wrap">
                          <span className=" ml-4 text-lg text-gray-600 line-through">
                            $120
                          </span>
                          <span className="text-lg text-red-500 ml-auto  ">
                            ${product.price}
                          </span>
                        </div>

                        <div className="flex justify-between m-4 mx-2">
                          <CiHeart />

                          <Star5 />
                          <span className="text-sm text-[var(--text-color)] ml-3">
                            {t("sold")}: {product.rating.count}
                          </span>
                        </div>
                        <div className="flex justify-between mx-2 text-gray-600 text-lg font-light pb-2">
                          <span className="mx-2 text-gray-600 text-sm font-light">
                            HanoiComputer
                          </span>
                          <span className="mx-2 text-gray-600 text-sm font-light">
                            Acer
                          </span>
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
