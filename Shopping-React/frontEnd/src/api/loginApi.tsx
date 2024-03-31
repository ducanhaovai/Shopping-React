import axios from "axios";

const baseURL = "https://backend-alpha-three-12.vercel.app";
const baseURL2 = "http://localhost:8088";
export const signup = async (data: any) => {
  try {
    console.log("Data received for signup:", data);
    const response = await axios.post(`${baseURL2}/signup`, data);

    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("An error occurred during registration");
  }
};

export const login = async (data: any) => {
  try {
    console.log("Data received for login:", data);

    const response = await axios.post(`${baseURL2}/login`, data);

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("An error occurred during login");
  }
};
