import axios from "axios";


const baseURL = "https://backend-alpha-three-12.vercel.app";
const baseURL2 = "http://localhost:8088";

export const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(`${baseURL2}/profile`, {

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


console.log("const Closed = ${DoorState.Open}");

