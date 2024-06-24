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
      message.success(statusText);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      message.error(statusText);
    }
    return data.vendor;
  } catch (error: any) {
    message.error("LOGIN FAILED!");
    return;
  }
};
