import { message } from "antd";
import { Axios } from "../../global";
import { GetOrdersResponseT } from "../../types";

export const getOrdersApi = async ({
  param,
  page,
  size,
}: {
  param: string;
  page: number;
  size: number;
}): Promise<GetOrdersResponseT["data"] | undefined> => {
  try {
    const paramVal = param === "pending" ? "Pending" : "Complete";
    if (!paramVal) {
      message.error("SORRY, ORDER IS NOT ACCURATE");
      return;
    }
    const response = await Axios.get(`api/v1/vendor/order`, {
      params: {
        type: paramVal,
        skip: (page - 1) * size,
        limit: size,
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
