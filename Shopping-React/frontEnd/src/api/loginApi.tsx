import axios from "axios";

export const signup = async (data: any) => {
  try {
    const response = await axios.post(
      "https://backend-alpha-three-12.vercel.app/signup",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("An error occurred during registration");
  }
};

export const login = async (data: any) => {
  try {
    const response = await axios.post(
      "https://backend-alpha-three-12.vercel.app/login",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("An error occurred during login");
  }
};
