import { Link } from "react-router-dom";
import { useSignUpMutation } from "../../redux/user/userApi";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
interface SignUpError {
  data: {
    message: string;
    statusCode: string;
  };
}
const SignUp = () => {
  const [signUp, { isError, isLoading, error, data, isSuccess }] =
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
      alert(signUpError?.data?.message);
    }
    if (isSuccess) {
      alert("signed up successfylly");
    }
  }, [isError, isLoading, isSuccess, signUpError?.data?.message]);
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
              <span className="label-text-alt">Top Right label</span>
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
            <label className="label">
              <span className="label-text-alt">Bottom Left label</span>
            </label>
          </div>
          <div className="h-auto w-full flex flex-col justify-center items-center">
            {isError ? (
              <div className="text-sm text-red-800">
                {signUpError?.data?.message || "SomeThine "}
              </div>
            ) : (
              ""
            )}
            <button
              className="btn btn-success w-full"
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