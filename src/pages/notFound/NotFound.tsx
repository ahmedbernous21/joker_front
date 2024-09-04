import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex flex-col text-center items-center justify-center gap-2 text-3xl"
      style={{ minHeight: "calc(100vh - 108px)" }}
    >
      <p className="text-7xl text-red-400">404</p>
      <p>Not Found</p>
      <p className="text-sm">the resource requested could not be found on this server</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-300 text-xl duration-300 text-white rounded-xl px-6 py-1">Go To HomePage</Link>
    </div>
  );
};
export default NotFound;
