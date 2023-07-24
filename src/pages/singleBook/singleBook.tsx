import { useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  usePostReviewMutation,
} from "../../redux/book/bookApi";
import { useEffect } from "react";
import Loading from "../../components/loading";
import { toast } from "react-toastify";
import { error } from "../../types/error";

const SingleBook = () => {
  const param = useParams();
  const { data, isLoading } = useGetSingleBookQuery(param?.id as string);
  const [postReview, { isSuccess, error, isError }] = usePostReviewMutation();
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
  useEffect(() => {
    if (isSuccess) {
      toast.success("Review posted successfully");
    }
    if (isError) {
      const Error = error as error;
      const meaasge = Error?.data?.message;
      toast.error(meaasge);
    }
  }, [isSuccess, isError, error]);

  if (isLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  return (
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
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Add to Wishlist
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add to Reading List
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <div className="bg-gray-200 p-4 rounded-lg">
          {/* Dummy Review Comments */}
          <div className="mb-4">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Jane Smith</h3>
            <p>Nulla quis lorem ut libero malesuada feugiat.</p>
          </div>
        </div>

        {/* Post Comment Box */}
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
      </div>
    </div>
  );
};

export default SingleBook;
