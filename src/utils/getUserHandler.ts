import { apiClient } from "../global";

export const getUserDetails = async () => {
  try {
    const response = await apiClient.post("user-details");
    const { data } = await response.data;
    return data;
  } catch (error) {
    console.log("ERROR IN API OF GET DETAILS, ", error);
  }
};
