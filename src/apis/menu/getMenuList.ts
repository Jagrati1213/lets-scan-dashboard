import { Axios } from "../../global";
import { MenuListResponseType } from "../../types";

// GET MENU LIST
export const getMenuList = async (): Promise<MenuListResponseType["data"]> => {
  try {
    const response = await Axios.get("api/v1/menu");
    const { data } = response.data;
    return data;
  } catch (error: any) {
    console.log("ERROR IN FETCH MENULIST,", error);
    return error;
  }
};
