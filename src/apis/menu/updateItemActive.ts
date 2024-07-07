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
        ? message.success({ content: "ITEM IS ACTIVE", duration: 1 })
        : message.warning({ content: "ITEM IS INACTIVE", duration: 1 });
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
