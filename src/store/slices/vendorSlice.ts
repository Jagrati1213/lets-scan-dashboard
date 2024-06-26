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
  loading: false,
};

// CREATE ASYNC THUNK FOR USER
export const fetchUserDetailsAction = createAsyncThunk<
  VenderResponseT["data"]["vendor"] | any
>("auth/fetchUserDetails", async () => {
  try {
    const data = await getUserDetails();
    return data;
  } catch (error: any) {
    message.error("GET VENDOR DETAILS FAILED!, ");
    return { vendor: null, isAuthenticated: false };
  }
});

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
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetailsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      const newUser = action?.payload;
      state.loading = false;
      state.vendor = newUser;
      localStorage.setItem("isAuthenticated", "true");
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state) => {
      state.loading = false;
      message.error("ERROR IN VENDOR DETAILS, TRY AGAIN!");
    });
  },
});

export const { setUserDetailsAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
