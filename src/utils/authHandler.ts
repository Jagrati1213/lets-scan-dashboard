import { message } from "antd";
import { apiClient } from "../global";
import { AuthFieldTypes } from "../types";

export const signUpHandler = async ({
  username,
  email,
  password,
}: AuthFieldTypes) => {
  const response = await apiClient.post("register", {
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
  } catch (error) {
    console.log(error);
  }
};

export const signInHandler = async ({ username, password }: AuthFieldTypes) => {
  const response = await apiClient.post("login", {
    username: username.toLowerCase(),
    password: password,
  });

  try {
    const { success, statusText, data } = await response.data;
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
