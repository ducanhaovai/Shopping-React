import axios from "axios";

const baseURL2 = import.meta.env.VITE_BASE_URL;

export const addToCart = async (
  productId: string | undefined,
  quantity: number
) => {

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
};

export const getCart = async () => {

    const response = await axios.get(`${baseURL2}/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;

};
export const removeFromCart = async (productId: number) => {

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

};
