import { Link, useLocation } from "react-router-dom";
import { book } from "../types/bookInterfact";

interface IProps {
  book: book;
}
const Card = ({ book }: IProps) => {
  const { title, _id, image } = book;
  const location = useLocation();

  return (
    <div>
      <Link to={`/book/${_id}`}>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={image?.thumbnail} alt={title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {title}
              {location?.pathname === "/" ? (
                <div className="badge badge-secondary">NEW</div>
              ) : (
                ""
              )}
            </h2>

            <div className="card-actions flex flex-col justify-start">
              <div className="">
                <span className="text-lg font-bold">Author:</span>{" "}
                {book?.author}
              </div>
              <div className="">
                <span className="text-lg font-bold">Genre:</span> {book?.genre}
              </div>
              <div className="">
                {" "}
                <span className="text-lg font-bold">Publication Date:</span>
                {book?.publicationDate}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
