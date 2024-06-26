import { message } from "antd";
import { Axios } from "../../global";
import { MenuIsActiveResponseT } from "../../types";

interface changeFoodActiveProps {
  activeVal: boolean;
  menuId: string | null;
}
export const changeFoodType = async ({
  activeVal,
  menuId,
}: changeFoodActiveProps): Promise<
  MenuIsActiveResponseT["data"] | undefined
> => {
  try {
    const response = await Axios.put(
      "api/v1/menu/active",
      { activeVal, menuId },
      { headers: { "Content-Type": "application/json" } }
    );

    const { success, statusText, data } = response.data;
    if (success) {
      data.isActive
        ? message.success("ITEM IS ACTIVE")
        : message.warning("ITEM IS INACTIVE");
      return data;
    } else {
      throw new Error(statusText);
    }
  } catch (error: any) {
    error.response
      ? message.error(error.response.data.statusText)
      : message.error("An error occurred. Please try again.");
    throw error;
  }
};
