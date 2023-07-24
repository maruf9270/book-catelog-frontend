import { toast } from "react-toastify";
import { useUploadBookMutation } from "../../redux/book/bookApi";
import { book } from "../../types/bookInterfact";
import Loading from "../../components/loading";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setLoading } from "../../redux/loading/loadingSlice";

const AddBooks = () => {
  const [uploadBook, { isLoading, isSuccess, isError }] =
    useUploadBookMutation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const form = e.target as HTMLFormElement;
    const bookTitle = form.bookTitle.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const publicationDate = form.publicationDate.value;
    const image = form.image.files[0];
    let imageServer;
    const from = new FormData();
    from.append("image", image);

    fetch(
      "https://api.imgbb.com/1/upload?key=d700aa3754b0d575e642546c26e82c11",
      {
        method: "POST",
        body: from,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        imageServer = {
          image: data.data.display_url,
          thumbnail: data.data.thumb.url,
        };
        const book = {
          title: bookTitle,
          author: author,
          genre: genre,
          publicationDate: publicationDate,
          image: imageServer,
        };
        uploadBook(book as unknown as book);
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Please try again letter");
        dispatch(setLoading(false));
      });
  };
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong tyr again Letter");
      dispatch(setLoading(false));
    }
    if (isSuccess) {
      toast.success("Book added successfully");
      dispatch(setLoading(false));
    }
  }, [isLoading, isError, isSuccess]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Add New Book
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
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {/* <!-- Image Field --> */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    required
                    type="file"
                    name="image"
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
                    {isLoading && loading ? <Loading></Loading> : " Submit"}
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

export default AddBooks;
