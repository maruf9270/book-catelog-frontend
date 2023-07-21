import { api } from "../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/book/",
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
