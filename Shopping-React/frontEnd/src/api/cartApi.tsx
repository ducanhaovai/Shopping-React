import axios from "axios";
//const baseURL2 = "http://shopping-clone.site:8088/";

const baseURL2 = "http://localhost:8088";
export const addToCart = async (
  productId: string | undefined,
  quantity: number
) => {
  try {
    const response = await axios.post(
      `${baseURL2}/cart/add`,
      {
        productId,
        quantity, 
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    console.log("Response data from addToCart:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get(`${baseURL2}/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
};
export const removeFromCart = async (productId: number) => {
  try {
    const response = await axios.post(
      `${baseURL2}/cart/delete`,
      { id: productId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    console.log("Response data from removeFromCart:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};
