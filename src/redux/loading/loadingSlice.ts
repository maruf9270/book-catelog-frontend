import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "Loading-Slice",
  initialState: { loading: false },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload.loading;
    },
  },
});

export default loadingSlice.reducer;
export const { setLoading } = loadingSlice.actions;
