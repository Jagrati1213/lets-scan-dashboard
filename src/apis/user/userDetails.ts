import { message } from "antd";
import { Axios } from "../../global";
import { VenderResponseT } from "../../types";

export const getUserDetails = async (): Promise<
  VenderResponseT["data"]["vendor"] | undefined
> => {
  try {
    const response = await Axios.get("api/v1/vendor");
    const { data } = response.data;
    return data.vendor;
  } catch (error: any) {
    error.response
      ? message.error(error.response.data.statusText)
      : message.error("An error occurred. Please try again.");
    throw error;
  }
};
