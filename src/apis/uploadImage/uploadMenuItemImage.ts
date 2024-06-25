import { message } from "antd";
import { Axios } from "../../global";
import { UploadImageResponseT } from "../../types";

// UPLOADED MENU IMAGE
export const uploadMenuItemImage = async (
  image: FormData
): Promise<UploadImageResponseT["data"] | undefined> => {
  try {
    const response = await Axios.post("api/v1/menu/upload-image", image, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { success, statusText, data } = response.data;
    if (success) {
      message.success(statusText);
    } else {
      throw new Error(statusText);
    }
    return data?.url;
  } catch (error: any) {
    error.response
      ? message.error(error.response.data.statusText)
      : message.error("An error occurred. Please try again.");
    throw error;
  }
};
