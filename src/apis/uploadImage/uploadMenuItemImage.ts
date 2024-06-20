import { message } from "antd";
import { Axios } from "../../global";
import { UploadImageResponseT } from "../../types";

// UPLOADED MENU IMAGE
export const uploadMenuItemImage = async (
  image: FormData
): Promise<UploadImageResponseT["data"]> => {
  try {
    const response = await Axios.post("api/v1/menu/upload-image", image, {
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
    console.log("ERROR IN UPLOAD IMAGE,", error);
    return error;
  }
};
