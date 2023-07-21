import Navber from "../components/Navigation";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
