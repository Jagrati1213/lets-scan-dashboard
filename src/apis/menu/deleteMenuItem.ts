import { message } from "antd";
import { Axios } from "../../global";
import { DeleteMenuResponseT } from "../../types";

// DELETE MENU ITEM
export const deleteMenuItemHandler = async ({
  menuId,
}: {
  menuId: string | null;
}): Promise<DeleteMenuResponseT["success"] | undefined> => {
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
    message.error("DELETE MENU FAILED");
    return;
  }
};
