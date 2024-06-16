import { message } from "antd";
import { Axios } from "../../global";
import { AuthFieldTypes, UserResponseType } from "../../types";

export const signIn = async ({
  username,
  password,
}: AuthFieldTypes): Promise<UserResponseType> => {
  const response = await Axios.post("api/v1/user/login", {
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
