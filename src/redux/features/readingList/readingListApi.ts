import { api } from "../../api/apiSlice";

const readingList = api.injectEndpoints({
  endpoints: (builder) => ({
    getReadingList: builder.query({
      query: () => "/reading-list",
      providesTags: ["readingList"],
    }),
    addtoWishlist: builder.mutation({
      query: (param: { book: string; status: string }) => ({
        url: `/reading-list`,
        method: "POST",
        body: JSON.stringify(param),
      }),
      invalidatesTags: ["readingList"],
    }),
    updateReadingList: builder.mutation({
      query: (param: { book: string; status: string }) => ({
        url: "/reading-list",
        method: "PATCH",
        body: JSON.stringify(param),
      }),
      invalidatesTags: ["readingList"],
    }),
  }),
});

export const {
  useAddtoWishlistMutation,
  useGetReadingListQuery,
  useUpdateReadingListMutation,
} = readingList;
