import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import "./App.css";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import { useAccessTokenMutation } from "./redux/user/userApi";
import { useAppDispatch } from "./hooks/hooks";
import { setUser } from "./redux/user/userSlice";
import { setLoading } from "./redux/loading/loadingSlice";

function App() {
  const [getAccessToken, { isError, data }] = useAccessTokenMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading({ loading: true }));
    if (!data) {
      getAccessToken(undefined);
    }
    console.log(data?.data);
    if (data) {
      localStorage.setItem("loggedIn", true as unknown as string);
      localStorage.setItem("user", data?.data.accessToken);
      dispatch(setUser(data?.data));
      dispatch(setLoading({ loading: false }));
    }
    if (isError) {
      dispatch(setLoading({ loading: false }));
    }
  }, [data]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
