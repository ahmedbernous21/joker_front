const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 text-3xl"
      style={{ minHeight: "calc(100vh - 108px)" }}
    >
      <p className="text-7xl text-red-400">404</p>
      <p>Not Found</p>
      <p className="text-sm">the resource requested could not be found on this server</p>
    </div>
  );
};
export default NotFound;
