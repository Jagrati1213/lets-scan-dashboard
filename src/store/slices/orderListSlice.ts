import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderItemT } from "../../types";
import { getOrdersApi } from "../../apis/order/getOrders";

interface orderListProp {
  orders: orderItemT[];
}

const initialState: orderListProp = {
  orders: [],
};

export const fetchOrderListAction = createAsyncThunk(
  "orderList/fetchOrderList",
  async (param: string) => {
    try {
      const data = await getOrdersApi(param);
      if (data) return data;
    } catch (error: any) {
      return error;
    }
  }
);

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderListAction.fulfilled, (state, action) => {
      if (!action.payload) state.orders = [];
      state.orders = action?.payload;
    });
  },
});

export const {} = orderListSlice.actions;
export default orderListSlice.reducer;
