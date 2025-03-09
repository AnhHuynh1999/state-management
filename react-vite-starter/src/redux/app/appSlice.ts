import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  mode: string;
} = {
  mode: "light",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeMode(state, action) {
      state.mode = action.payload;
    },
    // Add any additional reducers here
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { changeMode } = appSlice.actions;

export default appSlice.reducer;
