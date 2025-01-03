import { useState, useEffect } from "react";
import HttpClient from "../../httpClient";
import Sidebar from "../../components/sideBar/sideBar";

const Admin = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const menuItems = [
    { label: "Overview", href: "/dashboard/overview/" },
    { label: "Articles", href: "/dashboard/articles/" },
    { label: "Logout", href: "#" },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await HttpClient.get("requests/");
        setArticles(response);
      } catch (err) {
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar title="Admin Dashboard" menuItems={menuItems} />

      <div className="flex-1 p-6 md:p-10">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">Articles</h1>
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-500 focus:outline-none">
            Create New Article
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {article.title}
              </h2>
              <p className="mt-2 text-gray-600">{article.description}</p>
              <div className="mt-4">
                <span className="text-sm text-gray-500">
                  By {article.author}
                </span>
                <span className="float-right text-sm text-gray-500">
                  {article.date}
                </span>
              </div>
              <div className="mt-6 flex justify-between">
                <button className="text-blue-600 hover:underline focus:outline-none">
                  Edit
                </button>
                <button className="text-gray-600 hover:underline focus:outline-none">
                  Show Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
