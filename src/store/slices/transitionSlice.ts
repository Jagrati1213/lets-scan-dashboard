import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transitionItemT } from "../../types";
import { getTransitions } from "../../apis/transitions/getTransitions";

interface transitionListProp {
  transitions: transitionItemT[];
  totalCount: number;
  loading: boolean;
}

const initialState: transitionListProp = {
  transitions: [],
  totalCount: 0,
  loading: false,
};

export const fetchTransitionsAction = createAsyncThunk(
  "transitionList/fetchTransition",
  async () => {
    try {
      const data = await getTransitions();
      if (data) return data;
    } catch (error: any) {
      return error;
    }
  }
);

const transitionSlice = createSlice({
  name: "transitionList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransitionsAction.fulfilled, (state, action) => {
      if (!action.payload) state.transitions = [];
      const { transitions, totalCount } = action?.payload;
      state.transitions = transitions;
      state.totalCount = totalCount;
      state.loading = false;
    });
    builder.addCase(fetchTransitionsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchTransitionsAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {} = transitionSlice.actions;
export default transitionSlice.reducer;
