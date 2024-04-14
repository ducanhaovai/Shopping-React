import axios from "axios";
import { AxiosError } from "axios";
const baseURL2 = "https://shopping-clone.site/api";
//const baseURL2 = "https://34.16.213.194:8088";

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

export const changeUserPassword = async (
  oldPassword: any,
  newPassword: any
) => {
  try {
    const token = getTokenFromCookie();
    const response = await axios.post(
      `${baseURL2}/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Change user password response:", response);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error changing password");
    }
  }
};
