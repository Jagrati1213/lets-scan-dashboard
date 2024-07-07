import { message } from "antd";
import { Axios } from "../../global";
import { VenderResponseT } from "../../types";

export const updateShopAvailability = async (
  val: boolean
): Promise<VenderResponseT["data"] | undefined> => {
  try {
    const response = await Axios.put<VenderResponseT>(
      "api/v1/vendor/open-shop",
      { isOpen: val },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const { success, statusText, data } = response.data;
    if (success) {
      message.success({ content: statusText, duration: 1 });
      return data;
    } else {
      throw new Error(statusText);
    }
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
