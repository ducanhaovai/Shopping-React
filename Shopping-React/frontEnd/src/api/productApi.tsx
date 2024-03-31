import axios from "axios";

const baseURL = "https://backend-alpha-three-12.vercel.app";
const baseURL2 = "http://localhost:8088";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseURL2}/products`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const searchProducts = async (searchTerm: string) => {
  try {
    const response = await axios.get(

      `${baseURL2}/search-products?title=${searchTerm}`

    );
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
