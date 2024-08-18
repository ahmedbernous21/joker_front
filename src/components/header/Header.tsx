const Header = () => {
  const articles = ["tshirt", "portclé", "mug", "cap", "phonecase", "hoodie"];
  return (
    <header className="w-full bg-white py-4">
      <div className="container flex justify-between">
        <p>Selected Article</p>
        <select
          className="px-2"
        >
          {articles.map((article, index) => (
            <option key={index} value={article}>
              {article}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
export default Header;
