import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/user/userApi";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

interface SignUpError {
  data: {
    message: string;
    statusCode: number;
    errorMessages: [{ path: string; message: string }];
  };
}
const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, { isError, isLoading, error, isSuccess }] =
    useSignUpMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const from = e.target as HTMLFormElement;
    const name = from.userName?.value;
    const email = from.email.value;
    const phone = from.phone.value;
    const password = from.password.value;
    const userData = {
      name: name,
      email: email,
      phoneNumber: phone,
      password: password,
    };
    signUp(userData);
  };
  const signUpError = error as FetchBaseQueryError as SignUpError;

  useEffect(() => {
    if (isError) {
      if (signUpError.data.statusCode == 409) {
        toast.error("Email or phone number Already exists");
      }
    }
    if (isSuccess) {
      toast.success("Signed Up successfully. Please Log in");
      navigate("/login");
    }
  }, [isError, isLoading, isSuccess, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] rounded-md">
      <div className=" h-auto flex flex-col items-center justify-center w-96 shadow-xl shadow-slate-300 bg-slate-100 p-4">
        <div className="flex flex-row items-center w-full justify-between">
          <span className="text-3xl font-bold text-slate-900 mx-auto">
            {" "}
            Register
          </span>
        </div>

        {/* Name */}
        <form
          className="w-full  flex flex-col items-center justify-center "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="userName"
              className="input input-bordered w-full max-w-xs"
              required
              disabled={isLoading}
            />
          </div>
          {/* Email */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              required
              disabled={isLoading}
            />
          </div>
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
                {signUpError.data.statusCode == 409
                  ? "Email and phone number already exists"
                  : signUpError?.data?.message}
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
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        {/* Buttons*/}

        <div>
          Already Have an account?{" "}
          <Link className="text-blue-700" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
