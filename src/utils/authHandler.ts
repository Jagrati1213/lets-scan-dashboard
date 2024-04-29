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
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const signInHandler = async ({ username, password }: AuthFieldTypes) => {
  const response = await apiClient.post("signin", {
    username: username,
    password: password,
  });
  try {
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
