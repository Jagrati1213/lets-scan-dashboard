import { message } from "antd";
import { Axios } from "../../global";
import { transitionsResponseT } from "../../types";

export const getTransitions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<transitionsResponseT["data"] | unknown> => {
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
    } else throw new Error(statusText);
  } catch (error: any) {
    error.response
      ? message.error(error.response.data.statusText)
      : message.error("An error occurred. Please try again.");
    throw error;
  }
};
