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
    getReview: builder.query({
      query: (id: string) => `/review/${id}`,
      providesTags: ["review"],
    }),
    postReview: builder.mutation({
      query: (review: { book: string; review: string }) => ({
        url: "/review/",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUploadBookMutation,
  useGetSingleBookQuery,
  usePostReviewMutation,
  useGetReviewQuery,
} = productApi;
