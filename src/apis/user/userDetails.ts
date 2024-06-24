import { message } from "antd";
import { Axios } from "../../global";
import { VenderResponseT } from "../../types";

export const getUserDetails = async (): Promise<
  VenderResponseT["data"]["vendor"] | undefined
> => {
  try {
    const response = await Axios.get("api/v1/vendor");
    const { data } = response.data;
    console.log(data.vendor);
    return data.vendor;
  } catch (error: any) {
    message.error("GET USER DETAILS FAILED!");
    return;
  }
};
