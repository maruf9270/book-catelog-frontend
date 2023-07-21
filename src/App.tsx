import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import routes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
