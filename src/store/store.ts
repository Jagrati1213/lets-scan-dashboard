import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import menuListSlice from "./slices/menuListSlice";
import vendorSlice from "./slices/vendorSlice";
import orderListSlice from "./slices/orderListSlice";
import transitionSlice from "./slices/transitionSlice";

export const store = configureStore({
  reducer: {
    authSlice: vendorSlice,
    menuListSlice: menuListSlice,
    orderListSlice: orderListSlice,
    transitionSlice: transitionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
