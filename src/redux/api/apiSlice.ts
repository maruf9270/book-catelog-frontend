import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers: Headers) => {
      // Add your custom headers here
      headers.set("authorization", localStorage.getItem("user") as string);
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["books", "review", "singleBook", "wishlist"],
  endpoints: () => ({}),
});
