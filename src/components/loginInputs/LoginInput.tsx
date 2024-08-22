import LoginInputProps from "../../interfaces/LoginInputProps";

const LoginInput = ({
  name,
  dataToSubmit,
  setDataToSubmit,
}: LoginInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {name}
      </label>
      <div className="mt-2">
        <input
          value={dataToSubmit[name]}
          onChange={(e) =>
            setDataToSubmit({
              ...dataToSubmit,
              [name]: e.target.value,
            })
          }
          id={name}
          name={name}
          type={name == "password" ? "password" : "text"}
          required
          autoComplete={name}
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
export default LoginInput;
