import { message } from "antd";
import { Axios } from "../../global";
import { MenuFormT, MenuResponseT } from "../../types";

// CREATE MENU ITEM
export const createMenuItemHandler = async (
  values: MenuFormT
): Promise<MenuResponseT["data"] | undefined> => {
  try {
    const response = await Axios.post("api/v1/menu/create-menu", values, {
      headers: { "Content-Type": "application/json" },
    });

    const { success, statusText, data } = response.data;
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return data;
  } catch (error: any) {
    message.error("CREATE MENU FAILED!");
    return;
  }
};
