import { api } from "../../api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),
    deleteAWishlist: builder.mutation({
      query: (id: string) => ({
        url: `/wishlist/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useDeleteAWishlistMutation } = wishlistApi;
