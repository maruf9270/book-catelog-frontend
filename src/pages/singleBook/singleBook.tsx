import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAddToWishlistMutation,
  useDeletBookMutation,
  useGetReviewQuery,
  useGetSingleBookQuery,
  usePostReviewMutation,
} from "../../redux/book/bookApi";
import { useEffect } from "react";
import Loading from "../../components/loading";
import { toast } from "react-toastify";
import { error } from "../../types/error";
import { windowModel } from "../../types/window";

import { useAddtoWishlistMutation } from "../../redux/features/readingList/readingListApi";
import { useAppSelector } from "../../hooks/hooks";

const SingleBook = () => {
  const { user } = useAppSelector((state) => state);

  const Window = window as unknown as windowModel;
  const param = useParams();

  const { data, isLoading } = useGetSingleBookQuery(param?.id as string);
  const [postReview, { isSuccess, error, isError }] = usePostReviewMutation();
  const [
    deleteBook,
    { isSuccess: deleteSuccess, isError: deleteError, error: deleteMessage },
  ] = useDeletBookMutation();
  const bookReviews = useGetReviewQuery(data?.data?._id);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const review = form?.review?.value;
    const reviewObject = {
      book: data?.data?._id,
      review: review,
    };

    postReview(reviewObject);
    form.reset();
  };

  // FOr reading list
  const [
    addToReadingList,
    {
      isSuccess: readingListSuccess,
      isError: readingListError,
      error: readingListMessage,
    },
  ] = useAddtoWishlistMutation();
  const navigate = useNavigate();
  const [addToWishliat, actionData] = useAddToWishlistMutation();
  console.log(data?.data?.user?._id);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Review posted successfully");
    }
    if (isError) {
      const Error = error as error;
      const meaasge = Error?.data?.message;
      toast.error(meaasge);
    }
    if (actionData.isSuccess) {
      toast.success("Book added to your Wishlist");
    }
    if (actionData.isError) {
      const Error = actionData.error as error;

      toast.error(Error.data.message);
    }
    if (deleteSuccess) {
      toast.success("Book Deleted successfully");
      navigate("/all-books");
    }
    if (deleteError) {
      const Error = deleteMessage as error;
      toast.error(Error.data.message);
    }

    if (readingListSuccess) {
      toast.success("Book Added to reading list");
    }
    if (readingListError) {
      const Error = readingListMessage as error;
      toast.error(Error?.data?.message);
    }
  }, [
    isSuccess,
    isError,
    error,
    bookReviews,
    actionData.isSuccess,
    actionData.isError,
    actionData.error,
    deleteError,
    deleteSuccess,
    deleteMessage,
    navigate,
    readingListError,
    readingListSuccess,
    readingListMessage,
  ]);

  console.log(data?.data?._id);
  if (isLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Confermation</h3>
          <p className="py-4">Are you sure you want to delete the book</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn bg-blue-600 text-white hover:bg-blue-700">
              No
            </button>
            <button
              className="btn bg-red-600 text-white hover:bg-red-700"
              onClick={() => deleteBook(param?.id as string)}
            >
              Confirm
            </button>
          </div>
        </form>
      </dialog>

      <div className="flex flex-col mt-8">
        <div className="md:flex">
          <div className="md:w-1/2 p-4">
            {/* Book Image */}
            <img
              src={data?.data?.image?.image}
              alt="Book Cover"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 p-4 items-start flex flex-col">
            {/* Book Information */}
            <h1 className="text-2xl font-bold mb-2">
              <b>Title:</b> {data?.data?.title}
            </h1>
            <p className="text-lg mb-2">
              <b>Autor:</b> {data?.data?.author}
            </p>
            <p className="text-lg mb-2">
              <b>Genre:</b> {data?.data?.genre}
            </p>
            <p className="text-lg mb-4">
              <b> Publication Date:</b> {data?.data?.publicationDate}
            </p>

            {/* Buttons */}
            <div className="flex flex-col">
              <div className="">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
                  onClick={() => addToWishliat(data?.data?._id)}
                >
                  Add to Wishlist
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    addToReadingList({
                      book: data?.data?._id as string,
                      status: "read-soon",
                    })
                  }
                >
                  Add to Reading List
                </button>
              </div>
              {user.user._id.toString() == data?.data?.user?._id.toString() ? (
                <>
                  <div className="my-2">
                    <Link to={`/edit/${data?.data?._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => Window?.my_modal_5.showModal()}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>
          <div className="bg-gray-200 p-4 rounded-lg">
            {/* Dummy Review Comments */}

            {bookReviews.isLoading ? (
              <Loading></Loading>
            ) : bookReviews?.data?.data.length ? (
              bookReviews?.data?.data?.map(
                (review: {
                  user: { _id: string; name: string };
                  review: string;
                }) => (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">{review?.user?.name}</h3>
                    <p>{review?.review}</p>
                  </div>
                )
              )
            ) : (
              "No Review yet"
            )}
          </div>

          {/* Post Comment Box */}
          {user.user._id ? (
            <form className="mt-4" onSubmit={(e) => handleSubmit(e)}>
              <textarea
                name="review"
                className="w-full p-2 rounded"
                placeholder="Write your review here..."
              />
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <>
              <Link to={"/login"} className="text-blue-600">
                Login
              </Link>{" "}
              to Write review
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleBook;
