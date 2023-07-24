import { api } from "../api/apiSlice";
import { book } from "../../types/bookInterfact";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/book/",
      providesTags: ["books"],
    }),
    uploadBook: builder.mutation({
      query: (book: book) => ({
        url: "/book/",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (book: string) => `/book/${book}`,
    }),
    postReview: builder.mutation({
      query: (review: { book: string; review: string }) => ({
        url: "/review/",
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUploadBookMutation,
  useGetSingleBookQuery,
  usePostReviewMutation,
} = productApi;
