import { message } from "antd";
import { Axios } from "../../global";
import { MenuResponseT } from "../../types";

// GET MENU LIST
export const getMenuList = async (): Promise<
  MenuResponseT["data"] | undefined
> => {
  try {
    const response = await Axios.get("api/v1/menu");
    const { data } = response.data;
    return data;
  } catch (error: any) {
    message.error({ content: "GET MENU FAILED!", duration: 1 });
    return;
  }
};
