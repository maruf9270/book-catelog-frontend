import { Link } from "react-router-dom";
import { book } from "../types/bookInterfact";

interface IProps {
  book: book;
}
const Card = ({ book }: IProps) => {
  const { title, _id, image } = book;

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
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
