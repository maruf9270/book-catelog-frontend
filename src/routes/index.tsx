import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/Homepage/HomePage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AllBooks from "../pages/AllBooks/AllBooks";
import AddBooks from "../pages/AddBooks/AddBooks";
import SingleBook from "../pages/singleBook/singleBook";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/all-books",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/add-book",
        element: <AddBooks></AddBooks>,
      },
      {
        path: "/book/:id",
        element: <SingleBook></SingleBook>,
      },
    ],
  },
]);

export default routes;
