import axios from "axios";
const baseURL2 = import.meta.env.VITE_BASE_URL;

export const checkAuth = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${baseURL2}/home`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${baseURL2}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
