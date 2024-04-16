import axios from "axios";

const baseURL2 = import.meta.env.VITE_BASE_URL;

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
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await axios.get(
      `${baseURL2}/search-products?title=${encodedSearchTerm}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export const fetchProductsByCategory = async (categoryId: string) => {
  const response = await fetch(
    `${baseURL2}/api/categories/${categoryId}/products`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseURL2}/categories`);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addToCart = async (productId: string, quantity: number) => {
  try {
    const response = await axios.post(`${baseURL2}/cart`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const fetchProduct = async (productId: number) => {
  try {
    const response = await axios.get(`${baseURL2}/api/products/${productId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};
