import { message } from "antd";
import { Axios } from "../global";
import {
  MenuFormProps,
  MenuListResponseType,
  MenuUpdateBodyProps,
  deleteMenuItemProps,
  imageUploadedTypes,
} from "../types";

// CREATE MENU ITEM
export const createMenuItemHandler = async (
  values: MenuFormProps
): Promise<MenuListResponseType["data"]> => {
  try {
    const response = await Axios.post("menu/create-menu", values, {
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
export const updateMenuItemHandler = async (
  values: MenuUpdateBodyProps
): Promise<MenuListResponseType["data"]> => {
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

// DELETE MENU ITEM
export const deleteMenuItemHandler = async ({
  menuId,
}: {
  menuId: string | null;
}): Promise<deleteMenuItemProps["success"]> => {
  try {
    const response = await Axios.get(`menu/delete-menu/${menuId}`);

    const { success, statusText } = response.data;
    if (success) {
      message.success(statusText);
    } else {
      message.error(statusText);
    }
    return success;
  } catch (error: any) {
    console.log("ERROR IN MENU ITEM DELETE!");
    return error;
  }
};

// UPLOADED MENU IMAGE
export const uploadMenuItemImage = async (
  image: FormData
): Promise<imageUploadedTypes["data"]> => {
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
