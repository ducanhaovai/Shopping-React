import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(
      "https://backend-alpha-three-12.vercel.app/products"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Hàm searchProducts để tìm kiếm sản phẩm dựa trên từ khóa
export const searchProducts = async (searchTerm: string) => {
  try {
    const response = await axios.get(
      `https://backend-alpha-three-12.vercel.app/search-products?title=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
