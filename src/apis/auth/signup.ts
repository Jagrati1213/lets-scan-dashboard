import { message } from "antd";
import { Axios } from "../../global";
import { AuthFieldT, VenderResponseT } from "../../types";

export const signUp = async ({
  username,
  email,
  password,
  resName,
}: AuthFieldT): Promise<VenderResponseT | undefined> => {
  try {
    const response = await Axios.post("api/v1/vendor/register", {
      username: username.toLowerCase(),
      email: email,
      password: password,
      restaurant: resName,
    });
    const { success, statusText, data } = await response.data;

    if (success) {
      message.success(statusText);
      return data;
    } else {
      throw new Error(statusText);
    }
  } catch (error: any) {
    error.response
      ? message.error(error.response.data.statusText)
      : message.error("An error occurred. Please try again.");
    throw error;
  }
};
