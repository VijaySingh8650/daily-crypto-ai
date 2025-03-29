import { createSlice } from "@reduxjs/toolkit";

export type TypeOfInitialState = {
  name: string;
  email: string;
  token: string;
};

const initialState: TypeOfInitialState = {
  name: "",
  email: "",
  token: "",
};

const autSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      return {
        ...state,
        name: action?.payload?.name,
        email: action?.payload?.email,
        token: action?.payload?.token,
      };
    },
  },
});

export const { updateAuth } = autSlice.actions;
export default autSlice.reducer;
