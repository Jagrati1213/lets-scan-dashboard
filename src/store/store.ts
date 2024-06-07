import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "./slices/userSlice";
import menuListSlice from "./slices/menuListSlice";

export const store = configureStore({
  reducer: {
    authSlice: userSlice,
    menuListSlice: menuListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
