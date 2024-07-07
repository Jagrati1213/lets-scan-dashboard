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
      message.success({ content: statusText, duration: 1 });
      return data;
    } else {
      throw new Error(statusText);
    }
  } catch (error: any) {
    error.response
      ? message.error({
          content: error.response.data.statusText,
          duration: 1,
        })
      : message.error({
          content: "An error occurred. Please try again.",
          duration: 1,
        });
    throw error;
  }
};
