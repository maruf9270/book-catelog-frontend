import Loading from "../../components/loading";
import {
  useGetReadingListQuery,
  useUpdateReadingListMutation,
} from "../../redux/features/readingList/readingListApi";
import { RBook } from "../../types/readingBook";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ReadingList = () => {
  const [updateReadingStatus, { isSuccess, isError, error }] =
    useUpdateReadingListMutation();
  const { data, isLoading } = useGetReadingListQuery(undefined);
  const handleStatusChange = (e: string, selected: string, bookId: string) => {
    const rData = {
      book: bookId,
      status: e,
    };
    if (e !== selected) {
      updateReadingStatus(rData);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Book status changed successfully");
    }
    if (isError) {
      toast.error("Something went wrong.Try again letter");
    }
  }, [isSuccess, isError, error]);
  if (isLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }
  console.log(data);
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data[0]?.books.map((book: RBook) => (
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={book?.book?.image?.thumbnail}
                          alt="Book image"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {book?.book?.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {book?.book?.author}
                  </span>
                </td>
                <td>{book?.book?.genre}</td>
                <td>{book?.book?.publicationDate}</td>
                <td>
                  <select
                    name="rValue"
                    id=""
                    onChange={(e) =>
                      handleStatusChange(
                        e.target.value,
                        book?.status,
                        book?.book?._id as string
                      )
                    }
                  >
                    <option
                      selected={book?.status === "read-soon"}
                      value="read-soon"
                    >
                      Read-soon
                    </option>
                    <option
                      selected={book?.status === "reading"}
                      value="reading"
                    >
                      Reading
                    </option>
                    <option
                      selected={book?.status === "finished"}
                      value="finished"
                    >
                      Finished
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default ReadingList;
