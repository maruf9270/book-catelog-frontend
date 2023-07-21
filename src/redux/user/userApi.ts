import { api } from "../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => ({
        url: "/auth/sign-up/",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        body: loginData,
        method: "POST",
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = userApi;
