import axios from "axios";

const baseURL2 = import.meta.env.VITE_BASE_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseURL2}/products`);

    if (Array.isArray(response.data)) {
      const filteredProducts = response.data.filter(
        (product: { image: (string | string[])[] }) =>
          !product.image[0].includes('"')
      );
      return filteredProducts;
    } else {
      console.error("Response data is not an array:", response.data);
      return [];
    }
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

    const filteredProducts = response.data.filter(
      (product: { image: (string | string[])[] }) =>
        !product.image[0].includes('"')
    );
    return filteredProducts;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export const fetchProductsByCategory = async (categoryName: string) => {
  try {
    const response = await axios.get(
      `${baseURL2}/api/categories/${categoryName}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseURL2}/categories`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Unexpected response format:", response.data);
      return [];
    }
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
  const response = await axios.get(`${baseURL2}/api/products/${productId}`);

  if (response.data.image[0].includes('"')) {
    console.error("Product image contains '\"'");
    return null;
  }
  return response.data;
};

export const searchProductsByPrice = async (
  minPrice: number,
  maxPrice: number
) => {
  try {
    const response = await axios.post(`${baseURL2}/search-products-by-price`, {
      minPrice: minPrice,
      maxPrice: maxPrice,
    });

    const filteredProducts = response.data.filter(
      (product: { image: (string | string[])[] }) =>
        !product.image[0].includes('"')
    );
    return filteredProducts;
  } catch (error) {
    console.error("Error searching products by price:", error);
    return [];
  }
};
export const fetchProductsByPriceOrder = async (order: string) => {
  try {
    const response = await axios.post(`${baseURL2}/products-by-price`, {
      order: order,
    });

    const filteredProducts = response.data.filter(
      (product: { image: (string | string[])[] }) =>
        !product.image[0].includes('"')
    );
    return filteredProducts;
  } catch (error) {
    console.error("Error fetching products by price order:", error);
    return [];
  }
};
