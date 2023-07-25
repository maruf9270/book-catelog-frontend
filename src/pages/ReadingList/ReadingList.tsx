import Loading from "../../components/loading";
import { useGetReadingListQuery } from "../../redux/features/readingList/readingListApi";
import { book } from "../../types/bookInterfact";

const ReadingList = () => {
  const { data, isLoading } = useGetReadingListQuery(undefined);
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data[0]?.books.map((book) => (
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
                <td>{book?.status}</td>
                <th>
                  <button className="btn bg-red-600 hover:bg-red-700 text-white btn-ghost btn-xs">
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

export default ReadingList;
