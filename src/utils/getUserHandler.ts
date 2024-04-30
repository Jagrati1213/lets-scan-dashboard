import { apiClient } from "../global";

apiClient.defaults.withCredentials = true;

export const refreshTokenHandler = async () => {
  try {
    const response = await apiClient.get("refresh", { withCredentials: true });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUserHandler = async () => {
  try {
    const response = await apiClient.get("user", { withCredentials: true });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
