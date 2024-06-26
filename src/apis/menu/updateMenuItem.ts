import { message } from "antd";
import { Axios } from "../../global";
import { MenuIsActiveResponseT, MenuUpdateT } from "../../types";

// UPDATE MENU ITEM
export const updateMenuItemHandler = async (
  values: MenuUpdateT
): Promise<MenuIsActiveResponseT> => {
  try {
    const response = await Axios.put("api/v1/menu/update-menu", values, {
      headers: { "Content-Type": "application/json" },
    });
    const { success, statusText, data } = response.data;
    if (success) {
      message.success(statusText);
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
