import { message } from "antd";
import { Axios } from "../../global";
import { AuthFieldT, VenderResponseT } from "../../types";

export const signUp = async ({
  username,
  email,
  password,
  resName,
}: AuthFieldT): Promise<VenderResponseT | boolean> => {
  const response = await Axios.post("api/v1/vender/register", {
    username: username.toLowerCase(),
    email: email,
    password: password,
    restaurant: resName,
  });
  const { success, statusText, data } = await response.data;

  try {
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return data;
  } catch (error: any) {
    console.log("ERROR IN REGISTRATION!, ", error);
    return message.error(
      `ERROR IN REGISTRATION, ${error ? error?.message : error}`
    );
  }
};
