import { SetStateAction, useState } from "react";
import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";
import Aside from "../../components/Aside";
import Tophome from "../../components/TopHome";
import Home from "../../pages/Home";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsByPriceOrder,
} from "../../api/productApi";
import Banner from "../../components/Banner/Banner";

export default function HomeLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [productsByPrice, setProductsByPrice] = useState<any[]>([]);

  const handlePriceChange = (products_price: any[]) => {
    setProductsByPrice(products_price);
    console.log(products_price);
  };
  const handleCategoryClick = async (categoryId: string) => {
    console.log(`Category clicked: ${categoryId}`);
    try {
      const fetchedProducts = await fetchProductsByCategory(categoryId);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const order = event.target.value;
    if (order === "price" || order === "") {
      const newProducts = await fetchProducts();
      setProducts(newProducts);
    } else {
      const newProducts = await fetchProductsByPriceOrder(order);
      setProductsByPrice(newProducts);
    }
  };
  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <HomeHeader
          handleSearch={(value: SetStateAction<string>) => setSearchTerm(value)}
        />
        <Banner />
      </div>
      <div className="flex-grow ">
        <div className="container pb-4">
          <div className="grid grid-cols-12 gap-6 pt-8">
            <div className="col-span-12 sm:col-span-2"> 
              <Aside
                onCategoryClick={handleCategoryClick}
                onPriceChange={handlePriceChange}
              />
            </div>
            <div className="col-span-12 sm:col-span-10 ">
              <Tophome onPriceChange={handleSelectChange} />

              <Home
                searchTerm={searchTerm}
                category={products}
                products={productsByPrice}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
