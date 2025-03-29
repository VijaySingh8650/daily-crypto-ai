import { createSlice } from "@reduxjs/toolkit";
import { deleteUserCookies, getUserFromCookies } from "../../utils/storage";

export type TypeOfInitialState = {
  name: string;
  email: string;
  token: string;
};

const getUserData = getUserFromCookies();

const initialState: TypeOfInitialState = {
  name: getUserData?.name || "",
  email: getUserData?.email || "",
  token: getUserData?.token || "",
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
    logOut: () => {

        deleteUserCookies();
        return {
            name: "",
            email: "",
            token: "",
        };
    }

  },
});

export const { updateAuth, logOut } = autSlice.actions;
export default autSlice.reducer;
