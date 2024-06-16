import { message } from "antd";
import { Axios } from "../../global";
import { AuthFieldTypes } from "../../types";

export const signUp = async ({
  username,
  email,
  password,
  resName,
}: AuthFieldTypes) => {
  const response = await Axios.post("api/v1/user/register", {
    username: username.toLowerCase(),
    email: email,
    password: password,
    restaurant: resName,
  });
  const { success, statusText } = await response.data;

  try {
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
  } catch (error: any) {
    console.log("ERROR IN REGISTRATION!, ", error);
    return error;
  }
};
