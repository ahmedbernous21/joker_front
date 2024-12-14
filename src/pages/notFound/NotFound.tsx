import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 bg-[#F1F1F1] text-center text-3xl"
      style={{ minHeight: "calc(100vh - 112px)" }}
    >
      <p className="text-primaryColor text text-7xl font-bold sm:text-9xl">
        404
      </p>
      <p className="text-2xl text-gray-700">Page Not Found</p>
      <p className="text-sm text-gray-500">
        The resource you are looking for could not be found on this server.
      </p>
      <Link
        to="/"
        className="mt-4 rounded-full bg-blue-600 px-8 py-2 text-xl text-white shadow-lg duration-300 hover:bg-blue-400"
      >
        Go To HomePage
      </Link>
    </div>
  );
};

export default NotFound;
