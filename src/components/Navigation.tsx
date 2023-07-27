import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logOut } from "../redux/user/userSlice";
import { useLogOutMutation } from "../redux/user/userApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Navber = () => {
  const diapatch = useAppDispatch();
  const user = useAppSelector((state) => state?.user);
  const [logouta, { isError, isLoading, isSuccess }] = useLogOutMutation();
  const handleLogout = () => {
    logouta(undefined);
    diapatch(logOut());
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged out successfully");
    }
    if (isError) {
      toast.error("Something is Wrong. Try again letter");
    }
  }, [isLoading, isError, isSuccess]);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/all-books"}>All Books</Link>
            </li>
            {user.loggedIn ? (
              <>
                <li>
                  <Link to={"/add-book"}>Add Book</Link>
                </li>
                <li>
                  <Link to={"/wishlist"}>Wishlist</Link>
                </li>
                <li>
                  <Link to={"/reading-list"}>Reading-List</Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Book Catelog
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/all-books"}>All Books</Link>
          </li>
          {user.loggedIn ? (
            <>
              <li>
                <Link to={"/add-book"}>Add Book</Link>
              </li>
              <li>
                <Link to={"/wishlist"}>Wishlist</Link>
              </li>
              <li>
                <Link to={"/reading-list"}>Reading-List</Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {!user.loggedIn ? (
          <>
            <Link className="btn mx-1" to={"/login"}>
              Login
            </Link>
            <Link className="btn" to={"/sign-up"}>
              Sign Up
            </Link>
          </>
        ) : (
          ""
        )}

        {user.loggedIn ? (
          <>
            <button className="btn " onClick={() => handleLogout()}>
              Log Out
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navber;
