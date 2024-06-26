import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VenderResponseT, VenderStateT } from "../../types";
import { message } from "antd";
import { getUserDetails } from "../../apis/user/userDetails";

// SET STATE IN LOCAL

// INITIAL STATE
const initialState: VenderStateT = {
  vendor: null,
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
    return null;
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
    },
    logoutAction: (state) => {
      state.vendor = null;
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
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state) => {
      state.loading = true;
    });
  },
});

export const { setUserDetailsAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
