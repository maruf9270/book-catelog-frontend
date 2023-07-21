import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  error: boolean;
  message: string;
}
const initialState: InitialState = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  error: false,
  message: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signUp: (s) => {
      s.email = "fdkjdkj";
    },
  },
});

export const { signUp } = userSlice.actions;
export default userSlice.reducer;
