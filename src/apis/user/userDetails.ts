import { message } from "antd";
import { Axios } from "../../global";
import { VenderResponseT } from "../../types";

export const getUserDetails = async (): Promise<
  VenderResponseT["data"] | boolean
> => {
  try {
    const response = await Axios.get<VenderResponseT>("api/v1/vender");
    const { data } = response.data;
    return data;
  } catch (error: any) {
    console.log("ERROR IN FETCH USER DETAILS", error);
    return message.error(
      `ERROR IN FETCH USER DETAILS, ${error ? error?.message : error}`
    );
  }
};
