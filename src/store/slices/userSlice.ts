import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserResponseType, UserStateType } from "../../types";
import { message } from "antd";
import { getUserDetails } from "../../apis/getUserHandler";

// INITIAL STATE
const initialState: UserStateType = {
  user: { _id: null, username: null, email: null },
};

// CREATE ASYNC THUNK FOR USER
export const fetchUserDetailsAction = createAsyncThunk<
  UserResponseType["data"]
>("auth/fetchUserDetails", async () => {
  try {
    const data = await getUserDetails();
    return data;
  } catch (error: any) {
    console.log("ERROR IN API OF GET DETAILS, ", error);
    return error;
  }
});

// USER SLICE
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetailsAction: (state, action) => {
      const newUser = action?.payload;
      state.user = newUser;
    },
    logoutAction: (state) => {
      state.user = {
        _id: null,
        username: null,
        email: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      const newUser = action?.payload;
      state.user = newUser;
    });
    builder.addCase(fetchUserDetailsAction.rejected, () => {
      message.error("AUTHENTICATION FAILED, TRY AGAIN!");
    });
  },
});

export const { setUserDetailsAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
