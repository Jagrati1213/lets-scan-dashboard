import { message } from "antd";
import { apiClient } from "../global";
import { AuthFieldTypes } from "../types";

export const signUpHandler = async ({
  username,
  email,
  password,
}: AuthFieldTypes) => {
  const response = await apiClient.post("signup", {
    username: username,
    email: email,
    password: password,
  });
  try {
    const data = await response.data;
    if (data.status === 201) {
      message.success(data.message);
      await signInHandler({ username, password });
    } else {
      message.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const signInHandler = async ({ username, password }: AuthFieldTypes) => {
  const response = await apiClient.post("signin", {
    username: username,
    password: password,
  });
  try {
    const data = await response.data;
    if (data.status === 200) {
      message.success(data.message);
    } else message.error(data.message);
  } catch (error) {
    console.log(error);
    return;
  }
};
