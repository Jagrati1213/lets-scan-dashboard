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
