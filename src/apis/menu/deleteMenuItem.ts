import { message } from "antd";
import { Axios } from "../../global";
import { DeleteMenuResponseT } from "../../types";

// DELETE MENU ITEM
export const deleteMenuItemHandler = async ({
  menuId,
}: {
  menuId: string | null;
}): Promise<DeleteMenuResponseT["success"]> => {
  try {
    const response = await Axios.delete(`api/v1/menu/delete-menu/${menuId}`);

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
