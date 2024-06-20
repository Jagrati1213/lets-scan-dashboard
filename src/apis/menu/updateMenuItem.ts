import { message } from "antd";
import { Axios } from "../../global";
import { MenuResponseT, MenuUpdateT } from "../../types";

// UPDATE MENU ITEM
export const updateMenuItemHandler = async (
  values: MenuUpdateT
): Promise<MenuResponseT["data"]> => {
  try {
    const response = await Axios.put("api/v1/menu/update-menu", values, {
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
    console.log("ERROR IN UPDATE MENU,", error);
    return error;
  }
};
