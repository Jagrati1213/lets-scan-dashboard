import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderItemT } from "../../types";
import { getOrdersApi } from "../../apis/order/getOrders";

interface orderListProp {
  orders: orderItemT[];
  totalOrder: number;
  loading: boolean;
}

const initialState: orderListProp = {
  orders: [],
  totalOrder: 0,
  loading: false,
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
  reducers: {
    updateOrderItemAction: (state, action) => {
      const newData = action?.payload;
      const index = state.orders.findIndex((item) => item?._id === newData._id);
      if (index !== -1) {
        state.orders[index] = newData;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderListAction.fulfilled, (state, action) => {
      if (!action.payload) state.orders = [];
      const { orders, totalOrder } = action?.payload;
      state.orders = orders;
      state.totalOrder = totalOrder;
      state.loading = false;
    });
    builder.addCase(fetchOrderListAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchOrderListAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { updateOrderItemAction } = orderListSlice.actions;
export default orderListSlice.reducer;
