import { message } from "antd";
import { Axios } from "../../global";
import { AuthFieldT, VenderResponseT } from "../../types";

export const signIn = async ({
  username,
  password,
}: AuthFieldT): Promise<VenderResponseT | undefined> => {
  try {
    const response = await Axios.post("api/v1/vendor/login", {
      username: username?.toLowerCase(),
      password: password,
    });
    const { success, statusText, data } = response.data;
    if (success) {
      message.success({ content: statusText, duration: 1 });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      return data.vendor;
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
