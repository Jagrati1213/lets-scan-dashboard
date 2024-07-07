import { message } from "antd";
import { Axios } from "../../global";
import { DeleteMenuResponseT } from "../../types";

// DELETE MENU ITEM
export const deleteMenuItemHandler = async ({
  menuId,
}: {
  menuId: string | null;
}): Promise<DeleteMenuResponseT> => {
  try {
    const response = await Axios.delete(`api/v1/menu/delete-menu/${menuId}`);

    const { success, statusText } = response.data;
    if (success) {
      message.success({ content: statusText, duration: 1 });
      return success;
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
