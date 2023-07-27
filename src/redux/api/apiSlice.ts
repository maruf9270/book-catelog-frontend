import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-cotalog-backend.vercel.app/api/v1",
    prepareHeaders: (headers: Headers) => {
      // Add your custom headers here
      headers.set("Authorization", localStorage.getItem("user") as string);
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["books", "review", "singleBook", "wishlist", "readingList"],
  endpoints: () => ({}),
});
