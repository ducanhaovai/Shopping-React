import axios from "axios";

const baseURL2 = "https://104.198.10.136:8088";

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
