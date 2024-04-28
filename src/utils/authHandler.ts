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
  const data = await response.data;
  return data;
};

export const signInHandler = async ({ username, password }: AuthFieldTypes) => {
  const response = await apiClient.post("signin", {
    username: username,
    password: password,
  });
  const data = await response.data;
  return data;
};
