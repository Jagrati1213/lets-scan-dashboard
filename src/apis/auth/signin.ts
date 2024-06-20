import { message } from "antd";
import { Axios } from "../../global";
import { AuthFieldT, VenderResponseT } from "../../types";

export const signIn = async ({
  username,
  password,
}: AuthFieldT): Promise<VenderResponseT> => {
  const response = await Axios.post("api/v1/vendor/login", {
    username: username.toLowerCase(),
    password: password,
  });

  try {
    const { success, statusText, data } = response.data;
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return data;
  } catch (error: any) {
    console.log("ERROR IN LOGIN USER,", error);
    return error;
  }
};
