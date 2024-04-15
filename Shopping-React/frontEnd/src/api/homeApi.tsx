import axios from "axios";
const baseURL2 = process.env.VITE_BASE_URL;



export const checkAuth = async () => {
  try {
    const response = await axios.get(`${baseURL2}/home`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking authentication:", error);
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
