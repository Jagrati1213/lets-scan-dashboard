import { message } from "antd";
import { Axios } from "../global";
import { MenuListResponseType } from "../types";

export const createMenuItemHandler = async (
  values: FormData
): Promise<MenuListResponseType["data"]> => {
  try {
    const response = await Axios.post("menu/create-menu", values, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { success, statusText, data } = response.data;
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return data;
  } catch (error: any) {
    console.log("ERROR IN CREATE ITEM FOR MENU,", error);
    return error;
  }
};

export const getMenuList = async (): Promise<MenuListResponseType["data"]> => {
  try {
    const response = await Axios.get("menu");
    const { data } = response.data;
    return data;
  } catch (error: any) {
    console.log("ERROR IN FETCH MENULIST,", error);
    return error;
  }
};
