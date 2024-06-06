import { message } from "antd";
import { Axios } from "../global";
import { AuthFieldTypes, UserResponseType } from "../types";

export const signUpHandler = async ({
  username,
  email,
  password,
}: AuthFieldTypes) => {
  const response = await Axios.post("user/register", {
    username: username.toLowerCase(),
    email: email,
    password: password,
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

export const signInHandler = async ({
  username,
  password,
}: AuthFieldTypes): Promise<UserResponseType> => {
  const response = await Axios.post("user/login", {
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
