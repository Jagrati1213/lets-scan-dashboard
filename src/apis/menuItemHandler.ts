import { message } from "antd";
import { Axios } from "../global";
import {
  MenuImageUploadedTypes,
  MenuListResponseType,
  MenuUpdateBodyProps,
} from "../types";

// CREATE MENU ITEM
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

// FETCH MENU LIST
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

// UPDATE MENU ITEM
export const updateMenuItemHandler = async (values: MenuUpdateBodyProps) => {
  try {
    const response = await Axios.post("menu/update-menu", values, {
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
    console.log("ERROR IN CREATE ITEM FOR MENU,", error);
    return error;
  }
};

// UPLOADED MENU IMAGE
export const uploadMenuItemImage = async (
  image: FormData
): Promise<MenuImageUploadedTypes["data"]> => {
  try {
    const response = await Axios.post("menu/upload-image", image, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { success, statusText, data } = response.data;
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return data?.url;
  } catch (error: any) {
    console.log("ERROR IN CREATE ITEM FOR MENU,", error);
    return error;
  }
};
