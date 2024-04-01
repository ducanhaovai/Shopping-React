import axios from "axios";

const baseURL = "https://backend-alpha-three-12.vercel.app";
const baseURL2 = "http://localhost:8088";

const getTokenFromCookie = () => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const fetchUserProfile = async () => {
  try {
    const token = getTokenFromCookie();

    const response = await axios.get(`${baseURL2}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};

export const updateUserProfile = async (data: any) => {
  try {
    const response = await axios.post(`${baseURL2}/profile-update`, data);

    console.log("Update user profile response:", response);

    return response.data;
  } catch (error) {
    throw new Error("Error updating user profile");
  }
};
