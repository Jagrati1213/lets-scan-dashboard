import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userState {
  userName: string | null;
  password: string | null;
}

// Define the initial state using that type
const initialState: userState = {
  userName: null,
  password: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
