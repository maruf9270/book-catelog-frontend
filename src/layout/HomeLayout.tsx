import { ToastContainer } from "react-toastify";
import Navber from "../components/Navigation";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <ToastContainer />
    </div>
  );
};

export default HomeLayout;
