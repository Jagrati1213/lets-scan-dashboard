import { valueType } from "antd/es/statistic/utils";
import { Axios } from "../../global";
import { message } from "antd";
import { orderItemResponseT } from "../../types";

export const verifyOrderApi = async (
  code: valueType | null,
  orderId: string
): Promise<orderItemResponseT["data"] | undefined> => {
  try {
    const response = await Axios.put(
      "api/v1/vendor/order/verify",
      {
        incomingVerifyCode: code,
        orderId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { success, statusText, data } = response.data;
    if (success) {
      message.success({ content: statusText, duration: 1 });
    } else {
      throw new Error(statusText);
    }
    return data;
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
