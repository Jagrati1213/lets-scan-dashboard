import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuListResponseType, MenuListType } from "../../types";
import { getMenuList } from "../../apis/menuItemHandler";

interface MenuListProp {
  menulist: MenuListType[];
}

const initialState: MenuListProp = {
  menulist: [],
};

// CREATE THUNK FOR FETCH MENULIST
export const fetchMenuListAction = createAsyncThunk<
  MenuListResponseType["data"]
>("menuList/fetchMenuList", async () => {
  try {
    const data = await getMenuList();
    if (data) return data;
  } catch (error: any) {
    console.log("ERROR IN FETCH MENULIST", error);
    return error;
  }
});

// SLICE FOR MENULIST
export const menuListSlice = createSlice({
  name: "menuList",
  initialState,
  reducers: {
    addMenuItemAction: (state, action) => {
      state.menulist.push(action?.payload);
    },
    updateMenuItemAction: (state, action) => {
      const newData = action?.payload;
      const oldMenuItemIndex = state.menulist.findIndex(
        (item) => item._id === newData._id
      );
      state.menulist.splice(oldMenuItemIndex, 1, newData);
    },
    deleteMenuItemAction: (state, action) => {
      const delIndex = state.menulist.findIndex(
        (item) => item._id === action?.payload
      );
      state.menulist.splice(delIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenuListAction.fulfilled, (state, action) => {
      state.menulist = action?.payload;
    });
  },
});

export const { addMenuItemAction, updateMenuItemAction, deleteMenuItemAction } =
  menuListSlice.actions;
export default menuListSlice.reducer;