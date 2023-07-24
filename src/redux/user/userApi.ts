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
        credentials: "include",
      }),
    }),
    accessToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useAccessTokenMutation } =
  userApi;
