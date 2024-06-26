import { message } from "antd";
import { Axios } from "../../global";
import { MenuFormT, MenuIsActiveResponseT } from "../../types";

// CREATE MENU ITEM
export const createMenuItemHandler = async (
  values: MenuFormT
): Promise<MenuIsActiveResponseT> => {
  try {
    const response = await Axios.post("api/v1/menu/create-menu", values, {
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
