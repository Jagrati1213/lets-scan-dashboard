import { message } from "antd";
import { Axios } from "../../global";

interface changeFoodActiveProps {
  activeVal: boolean;
  menuId: string | null;
}
export const changeFoodType = async ({
  activeVal,
  menuId,
}: changeFoodActiveProps) => {
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
    } else {
      message.error(statusText);
    }
    return data;
  } catch (error) {
    console.log("ERROR IN UPDATE MENU ITEMS", error);
  }
};
