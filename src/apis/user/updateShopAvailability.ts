import { message } from "antd";
import { Axios } from "../../global";
import { UserResponseType } from "../../types";

export const updateShopAvailability = async (
  val: boolean
): Promise<UserResponseType["data"]> => {
  try {
    const response = await Axios.put(
      "api/v1/user/open-shop",
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
    console.log("ERROR IN UPDATE SHOP AVAILABILITY", error);
    return error;
  }
};
