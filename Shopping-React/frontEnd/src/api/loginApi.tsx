import axios from "axios";
const baseURL2 = import.meta.env.VITE_BASE_URL;

export const signup = async (data: any) => {
  const response = await axios.post(`${baseURL2}/signup`, data);
  return response.data;
};

export const login = async (data: any) => {
  const response = await axios.post(`${baseURL2}/login`, data);
  return response.data;
};
