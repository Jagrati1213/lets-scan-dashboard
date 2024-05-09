import { createSlice } from "@reduxjs/toolkit";

interface userState {
  user: {
    userName: string | null;
    email: string | null;
    id: string | null;
    menuItems: string[];
  };
}

// Define the initial state using that type
const initialState: userState = {
  user: {
    id: null,
    userName: null,
    email: null,
    menuItems: [],
  },
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const newUser = action?.payload;
      state.user = { ...newUser };
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
