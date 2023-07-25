import React, { useEffect } from "react";
import {
  useEditBookMutation,
  useGetSingleBookQuery,
} from "../../redux/book/bookApi";
import { useParams } from "react-router-dom";
import { book } from "../../types/bookInterfact";
import Loading from "../../components/loading";
import { toast } from "react-toastify";
import { error } from "../../types/error";

const EditBook = () => {
  const param = useParams();
  const { data, isLoading: bookLoading } = useGetSingleBookQuery(
    param?.id as string
  );
  const [updateBook, { isLoading, isError, isSuccess, error }] =
    useEditBookMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const bookTitle = form.bookTitle.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const publicationDate = form.publicationDate.value;
    const bookData = {
      _id: param?.id,
      title: bookTitle,
      author: author,
      genre: genre,
      publicationDate: publicationDate,
    };
    updateBook(bookData as book);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book Data updated successfully");
    }
    if (isError) {
      const Error = error as error;
      toast.error(Error.data.message);
    }
  }, [isError, isSuccess, error]);
  if (bookLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Update Book
            </h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="bookTitle"
                    required
                    defaultValue={data?.data?.title}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {/* <!-- Author Field --> */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    defaultValue={data?.data?.author}
                    required
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {/* <!-- Genre Field --> */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Genre
                  </label>
                  <input
                    type="text"
                    required
                    name="genre"
                    defaultValue={data?.data?.genre}
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                {/* <!-- Publication Date Field --> */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Publication Date
                  </label>
                  <input
                    required
                    type="date"
                    defaultValue={data?.data?.publicationDate}
                    name="publicationDate"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {/* <!-- Submit Button --> */}
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className=" py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                  >
                    {isLoading ? <Loading /> : " Update book"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
