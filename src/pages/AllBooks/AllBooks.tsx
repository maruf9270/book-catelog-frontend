import { useState } from "react";
import { useGetProductsQuery } from "../../redux/book/bookApi";
import Loading from "../../components/loading";
import { book } from "../../types/bookInterfact";
import Card from "../../components/Card";
import { useAppDispatch } from "../../hooks/hooks";
import { api } from "../../redux/api/apiSlice";

const AllBooks = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPublicationDate, setSelectedPublicationDate] = useState("");

  let searchAndFilter = "?";
  if (searchTerm) {
    searchAndFilter = searchAndFilter + `searchTerm=${searchTerm}`;
  }
  if (selectedGenre) {
    searchAndFilter = searchAndFilter + `&genre=${selectedGenre}`;
  }
  if (selectedPublicationDate) {
    searchAndFilter =
      searchAndFilter + `&publicationDate=${selectedPublicationDate}`;
  }

  const { data, isLoading } = useGetProductsQuery(searchAndFilter);

  return (
    <>
      {" "}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:items-stretch p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 h-10 mt-6"
        />

        <div className="flex flex-col items-center lg:flex-row mt-4 lg:mt-0 lg:ml-4 space-y-2 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-32">
            <label className="block font-medium">Publication Date:</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              value={selectedPublicationDate}
              onChange={(e) => setSelectedPublicationDate(e.target.value)}
            >
              <option value="">None</option>
              {data?.data.map((book: book) => (
                <option value={book.publicationDate}>
                  {book.publicationDate}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full lg:w-32">
            <label className="block font-medium">Genre:</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">None</option>
              {data?.data.map((book: book) => (
                <option value={book.genre}>{book.genre}</option>
              ))}
              {/* Add more genres as needed */}
            </select>
          </div>

          <div className="">
            <button
              className="w-full lg:w-auto px-4 py-2 bg-blue-500 text-white rounded-md h-10 "
              onClick={() => dispatch(api.util.invalidateTags(["books"]))}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loading></Loading>
        </div>
      ) : data?.data.length ? (
        <div className="flex flex-wrap  justify-evenly gap-4 mx-auto">
          {data?.data?.map((book: book) => (
            <Card book={book}></Card>
          ))}
        </div>
      ) : (
        "No Book Found"
      )}
    </>
  );
};

export default AllBooks;
