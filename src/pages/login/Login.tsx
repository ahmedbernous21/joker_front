import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import customAxios from "../../customAxios/customAxios";
import LoginInput from "../../components/loginInputs/LoginInput";

const Login = () => {
  const [dataToSubmit, setDataToSubmit] = useState({ email: "", password: "" });
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", dataToSubmit.email);
    formData.append("password", dataToSubmit.password);
    try {
      const { data } = await customAxios.post("/auth/login/", formData);
      console.log("this is the key", data.key);
    } catch (error: any) {
      console.log(JSON.stringify(error.response.data));
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={(e) => loginHandler(e)} className="space-y-6">
          <LoginInput
            name="email"
            dataToSubmit={dataToSubmit}
            setDataToSubmit={setDataToSubmit}
          />
          <LoginInput
            name="password"
            dataToSubmit={dataToSubmit}
            setDataToSubmit={setDataToSubmit}
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="my-2 text-center">
          Don't have An Account{" "}
          <Link className="font-bold text-indigo-600" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
