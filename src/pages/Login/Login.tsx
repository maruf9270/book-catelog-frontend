import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/user/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { error } from "../../types/error";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setUser } from "../../redux/user/userSlice";
import { loginData } from "../../types/login";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, data, error, isError }] =
    useLoginMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const phone = form.phone.value;
    const password = form.password.value;
    const loginData = {
      phoneNumber: phone,
      password: password,
    };
    login(loginData);
  };

  const loginError = error as FetchBaseQueryError as error;
  const loginData = data as loginData;
  const user = useAppSelector((state) => state);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      localStorage.setItem("loggedIn", true as unknown as string);
      localStorage.setItem("user", loginData?.data?.accessToken);
      dispatch(setUser(loginData?.data));

      navigate("/");
    }
    if (isError) {
      toast.error(loginError?.data?.message);
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
    }
    if (user?.user?.user?._id) {
      navigate("/");
    }
  }, [
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    navigate,
    loginError?.data?.message,
    loginData?.data?.accessToken,
    loginData,
    dispatch,
    user?.user?.user?._id,
  ]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] rounded-md">
      <div className=" h-auto flex flex-col items-center justify-center w-96 shadow-xl shadow-slate-300 bg-slate-100 p-4">
        <div className="flex flex-row items-center w-full justify-between">
          <span className="text-3xl font-bold text-slate-900 mx-auto">
            {" "}
            Login
          </span>
        </div>

        {/* Name */}
        <form
          className="w-full  flex flex-col items-center justify-center "
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* Phone Number */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
              required
              disabled={isLoading}
            />
          </div>
          {/* Password */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              required
              disabled={isLoading}
            />
          </div>
          <div className="h-auto w-full flex flex-col justify-center items-center p-4">
            {isError ? (
              <div className="text-sm text-red-800">
                {loginError?.data?.message || "Something went Wrong"}
              </div>
            ) : (
              ""
            )}
            <button
              className="btn btn-success w-full mt-2"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        {/* Buttons*/}

        <div>
          Do not have any account?{" "}
          <Link className="text-blue-700" to={"/sign-up"}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
