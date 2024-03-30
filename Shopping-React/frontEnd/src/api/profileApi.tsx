import axios from "axios";

const baseURL = "https://backend-alpha-three-12.vercel.app/";
const baseURL2= "https://backend-alpha-three-12.vercel.app/";

export const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(`${baseURL}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};

export const updateUserProfile = async (accessToken: string, userData: any) => {
  try {
    const response = await axios.post(`${baseURL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating user profile");
  }
};

console.log('const Closed = ${DoorState.Open}')