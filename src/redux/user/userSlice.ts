import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  user: {
    _id: string;

    name: string;
    email: string;
    phoneNumber: string;
  };
  accessToken: string;
  loggedIn: boolean;
}
const initialState: IInitialState = {
  user: {
    _id: "",
    name: "",
    email: "",
    phoneNumber: "",
  },
  accessToken: "",
  loggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IInitialState>) => {
      state.user._id = action.payload.user._id;
      state.user.name = action.payload.user.name;
      state.user.email = action.payload.user.email;
      state.user.phoneNumber = action.payload.user.phoneNumber;
      state.loggedIn = true;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.user._id = "";
      state.user.name = "";
      state.user.email = "";
      state.user.phoneNumber = "";
      state.loggedIn = false;
      state.accessToken = "";
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
