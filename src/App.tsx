import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import "./App.css";
import routes from "./routes";

import { useAccessTokenMutation } from "./redux/user/userApi";
import { useAppDispatch } from "./hooks/hooks";
import { setUser } from "./redux/user/userSlice";
import { setLoading } from "./redux/loading/loadingSlice";

function App() {
  const [getAccessToken, { isError, data }] = useAccessTokenMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading({ loading: true }));
    if (!data && !isError) {
      getAccessToken(undefined);
    }
    if (data) {
      localStorage.setItem("loggedIn", true as unknown as string);
      localStorage.setItem("user", data?.data.accessToken);
      dispatch(setUser(data?.data));
      dispatch(setLoading({ loading: false }));
    }
    if (isError) {
      dispatch(setLoading({ loading: false }));
    }
  }, [data, dispatch, getAccessToken, isError]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
