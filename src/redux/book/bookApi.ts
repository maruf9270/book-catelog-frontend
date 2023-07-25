import { api } from "../api/apiSlice";
import { book } from "../../types/bookInterfact";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (options: string) => `/book/${options}`,
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
      providesTags: ["singleBook"],
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
    addToWishlist: builder.mutation({
      query: (id: string) => ({
        url: `/wishlist/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["wishlist"],
    }),
    editBook: builder.mutation({
      query: (book: book) => ({
        url: `/book/${book._id}`,
        method: "PATCH",
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          publicationDate: book.publicationDate,
          ganre: book.genre,
        }),
      }),
      invalidatesTags: ["singleBook", "books"],
    }),
    deletBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUploadBookMutation,
  useGetSingleBookQuery,
  usePostReviewMutation,
  useGetReviewQuery,
  useAddToWishlistMutation,
  useLazyGetProductsQuery,
  useEditBookMutation,
  useDeletBookMutation,
} = productApi;
