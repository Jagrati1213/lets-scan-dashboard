import { Axios } from "../../global";
import { UserResponseType } from "../../types";

export const getUserDetails = async (): Promise<UserResponseType["data"]> => {
  try {
    const response = await Axios.get<UserResponseType>("api/v1/user");
    const { data } = response.data;
    return data;
  } catch (error: any) {
    console.log("ERROR IN FETCH USER DETAILS", error);
    return error;
  }
};
