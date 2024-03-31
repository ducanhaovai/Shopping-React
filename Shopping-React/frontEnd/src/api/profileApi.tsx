import axios from "axios";

const baseURL = "https://backend-alpha-three-12.vercel.app";
const baseURL2 = "http://localhost:8088";

export const fetchUserProfile = async () => {
  try {
    // Trích xuất token từ cookie
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    // Gửi yêu cầu GET tới endpoint /profile với token trong header Authorization
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
export const updateUserProfile = async (accessToken: string, userData: any) => {
  try {
    const response = await axios.post(`${baseURL2}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating user profile");
  }
};
