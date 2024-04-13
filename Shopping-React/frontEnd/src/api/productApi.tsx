import axios from "axios";

//const baseURL2 = "https://34.16.213.194:8088";

const baseURL2 = "https://shopping-clone.site:8088";
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
    const response = await axios.get(`${baseURL2}/api/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
