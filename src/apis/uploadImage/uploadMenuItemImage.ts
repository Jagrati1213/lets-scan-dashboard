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
      return data?.url;
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
