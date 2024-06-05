import { message } from "antd";
import { Axios } from "../global";

export const createMenuItemHandler = async (values: FormData) => {
  try {
    const response = await Axios.post("menu/create-menu", values, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { success, statusText } = await response.data;
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
  } catch (error) {
    console.log("ERROR IN CREATE ITEM FOR MENU,", error);
    return;
  }
};
