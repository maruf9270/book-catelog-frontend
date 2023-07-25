import { useEffect } from "react";
import Loading from "../../components/loading";
import {
  useDeleteAWishlistMutation,
  useGetWishlistQuery,
} from "../../redux/features/wishlist/wishlistApi";
import { book } from "../../types/bookInterfact";
import { toast } from "react-toastify";
import { error } from "../../types/error";

const Wishlist = () => {
  const { data, isLoading } = useGetWishlistQuery(undefined);
  const [
    deleteBook,
    {
      isLoading: wishlistLoading,
      isError: wishlistError,
      error: wishlistErrorMessage,
      isSuccess,
    },
  ] = useDeleteAWishlistMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Book removed from wishlist");
    }
    if (wishlistError) {
      const Error = wishlistErrorMessage as error;
      toast.error(Error.data.message);
    }
  }, [wishlistError, wishlistErrorMessage, wishlistLoading, isSuccess]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (!data?.data?.book.length) {
    return <div>No Book found in your wishlist</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Title and Author</th>
              <th>Genre</th>
              <th>Publication Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data?.book.map((book: book) => (
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={book?.image?.thumbnail} alt="Book image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {book?.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {book?.author}
                  </span>
                </td>
                <td>{book?.genre}</td>
                <td>{book?.publicationDate}</td>
                <th>
                  <button
                    className="btn bg-red-600 hover:bg-red-700 text-white btn-ghost btn-xs"
                    onClick={() => deleteBook(book?._id as string)}
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
