import { message } from "antd";
import { Axios } from "../../global";
import { transitionsResponseT } from "../../types";

export const getTransitions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<transitionsResponseT["data"] | undefined> => {
  try {
    const response = await Axios.get("api/v1/vendor/transitions", {
      params: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    });
    const { success, statusText, data } = response.data;
    if (success) {
      return data;
    } else message.error(statusText);
  } catch (error: any) {
    return error;
  }
};
