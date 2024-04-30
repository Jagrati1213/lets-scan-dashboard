import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userState {
  user: {
    userName: string | null;
    email: string | null;
    id: string | null;
  };
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    id: null,
    userName: null,
    email: null,
  },
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const newUser = action?.payload.user;
      state.user = { ...newUser };
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
