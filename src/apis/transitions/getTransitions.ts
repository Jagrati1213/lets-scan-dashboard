import { message } from "antd";
import { Axios } from "../../global";
import { transitionsResponseT } from "../../types";

export const getTransitions = async (): Promise<
  transitionsResponseT["data"]
> => {
  try {
    const response = await Axios.get("api/v1/vendor/transitions");
    const { data } = response.data;
    return data;
  } catch (error: any) {
    return error;
  }
};
