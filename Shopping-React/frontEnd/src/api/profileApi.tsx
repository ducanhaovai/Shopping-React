import axios from "axios";
const baseURL2 = import.meta.env.VITE_BASE_URL;

const getTokenFromCookie = () => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const fetchUserProfile = async () => {
  const token = getTokenFromCookie();

  const response = await axios.get(`${baseURL2}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserProfile = async (data: any) => {
  const response = await axios.post(`${baseURL2}/profile-update`, data);

  console.log("Update user profile response:", response);

  return response.data;
};

export const changeUserPassword = async (
  oldPassword: any,
  newPassword: any
) => {
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
  return response.data;
};
