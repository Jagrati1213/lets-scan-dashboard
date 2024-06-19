import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VenderResponseT, VenderStateT } from "../../types";
import { message } from "antd";
import { getUserDetails } from "../../apis/user/userDetails";

// SET IN LOCAL STORAGE
const localStorageIsAuthenticated =
  localStorage.getItem("isAuthenticated") === "true";

// INITIAL STATE
const initialState: VenderStateT = {
  vendor: null,
  isAuthenticated: localStorageIsAuthenticated,
};

// CREATE ASYNC THUNK FOR USER
export const fetchUserDetailsAction = createAsyncThunk<VenderResponseT["data"]>(
  "auth/fetchUserDetails",
  async () => {
    try {
      const data = await getUserDetails();
      return data;
    } catch (error: any) {
      console.log("ERROR IN API OF GET DETAILS, ", error);
      return error;
    }
  }
);

// USER SLICE
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetailsAction: (state, action) => {
      const newUser = action?.payload;
      state.vendor = newUser;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logoutAction: (state) => {
      state.vendor = null;
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", "false");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      const newUser = action?.payload;
      state.vendor = newUser;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    });
    builder.addCase(fetchUserDetailsAction.rejected, () => {
      message.error("AUTHENTICATION FAILED, TRY AGAIN!");
    });
  },
});

export const { setUserDetailsAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
