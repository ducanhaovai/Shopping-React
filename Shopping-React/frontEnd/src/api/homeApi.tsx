import axios from "axios";
const baseURL2 = import.meta.env.VITE_BASE_URL;

export const checkAuth = async () => {
  const response = await axios.get(`${baseURL2}/home`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.get(`${baseURL2}/logout`);
  return response.data;
};
