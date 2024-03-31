import axios from "axios";
const baseURL = "https://backend-alpha-three-12.vercel.app/";
const baseURL2 = "http://localhost:8088";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/products`);
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
      `${baseURL}/search-products?title=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
