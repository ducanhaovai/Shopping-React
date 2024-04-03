import { SetStateAction, useState } from "react";
import Footer from "../../components/Footer/Footer";
import HomeHeader from "../../components/HomeHeader";
import Aside from "../../components/Aside";
import Tophome from "../../components/TopHome";

import Home from "../../pages/Home";
import { fetchProductsByCategory } from "../../api/productApi";

export default function HomeLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const handleCategoryClick = async (categoryId: string) => {
    console.log(`Category clicked: ${categoryId}`);
    try {
      const fetchedProducts = await fetchProductsByCategory(categoryId);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };
  return (
    <div className="flex h-screen flex-col justify-between">
      <HomeHeader
        handleSearch={(value: SetStateAction<string>) => setSearchTerm(value)}
      />
      <div className="flex-grow">
        <div className="container pb-4">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <Aside onCategoryClick={handleCategoryClick} />
            </div>
            <div className="col-span-9">
              <Tophome />
              <Home searchTerm={searchTerm} category={products} products={[]} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
