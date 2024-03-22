import axios from "axios";

const productApi = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:8088/api/products/:productId`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default productApi;
