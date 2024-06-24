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
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return data;
  } catch (error: any) {
    message.error("UPDATE SHOP FAILED!");
    return;
  }
};
