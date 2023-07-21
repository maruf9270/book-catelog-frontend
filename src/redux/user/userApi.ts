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
  }),
});

export const { useSignUpMutation } = userApi;
