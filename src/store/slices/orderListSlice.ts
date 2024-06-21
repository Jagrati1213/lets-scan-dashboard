import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderItemT } from "../../types";
import { getOrdersApi } from "../../apis/order/getOrders";

interface orderListProp {
  orders: orderItemT[];
  totalOrder: number;
}

const initialState: orderListProp = {
  orders: [],
  totalOrder: 0,
};

export const fetchOrderListAction = createAsyncThunk(
  "orderList/fetchOrderList",
  async ({
    param,
    page,
    size,
  }: {
    param: string;
    page: number;
    size: number;
  }) => {
    try {
      const data = await getOrdersApi({ param, page, size });
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
      const { orders, totalOrder } = action?.payload;
      state.orders = orders;
      state.totalOrder = totalOrder;
    });
  },
});

export const {} = orderListSlice.actions;
export default orderListSlice.reducer;
