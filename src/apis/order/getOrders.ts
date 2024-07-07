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
      message.error({ content: "SORRY, ORDER IS NOT ACCURATE", duration: 1 });
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
      ? message.error({
          content: error.response.data.statusText,
          duration: 1,
        })
      : message.error({
          content: "An error occurred. Please try again.",
          duration: 1,
        });
    throw error;
  }
};
