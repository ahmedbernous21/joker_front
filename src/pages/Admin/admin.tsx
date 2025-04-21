import { useState, useEffect } from "react";
import HttpClient from "../../httpClient";
import Sidebar from "../../components/sideBar/sideBar";
import Loader from "../../components/loaders/Loader";
import { toast } from "react-hot-toast";
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

// Define interface for the article object based on the Django model
interface Article {
  id: number;
  article: string;
  description: string;
  phone: string;
  text: string;
  color: string;
  size: string;
  creation_date: string;
  is_seen: boolean;
  state: string;
  is_delivered: boolean;
  price: number;
  uuid: string;
}

// Interface for the form data
interface ArticleFormData {
  article: string;
  description: string;
  color: string;
  size: string;
  price: number;
}

const Admin: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formData, setFormData] = useState<ArticleFormData>({
    article: "t_shirt",
    description: "",
    color: "white",
    size: "M",
    price: 0,
  });

  const menuItems = [
    { label: "Overview", href: "/dashboard/overview/" },
    { label: "Articles", href: "/dashboard/articles/" },
    { label: "Logout", href: "#" },
  ];

  const articlesPerPage = 8;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await HttpClient.get<Article[]>("requests/");
      setArticles(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        await HttpClient.put(`requests/${editingId}/`, formData);
        toast.success("Article updated successfully!");
      } else {
        await HttpClient.post("requests/", formData);
        toast.success("Article created successfully!");
      }

      setIsModalOpen(false);
      setIsEditing(false);
      setEditingId(null);
      resetForm();
      fetchArticles(); // Refresh the articles list
    } catch (err) {
      console.error("Error saving article:", err);
      toast.error(`Failed to ${isEditing ? "update" : "create"} article.`);
    }
  };

  const resetForm = (): void => {
    setFormData({
      article: "t_shirt",
      description: "",
      color: "white",
      size: "M",
      price: 0,
    });
  };

  const handleEditClick = (article: Article): void => {
    setFormData({
      article: article.article,
      description: article.description || "",
      color: article.color,
      size: article.size,
      price: article.price,
    });
    setEditingId(article.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await HttpClient.delete(`requests/${id}/`);
        toast.success("Article deleted successfully!");
        fetchArticles();
      } catch (err) {
        console.error("Error deleting article:", err);
        toast.error("Failed to delete article.");
      }
    }
  };

  const toggleDetails = (id: number): void => {
    setDetailsVisible(detailsVisible === id ? null : id);
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter(
    (article) =>
      article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.state?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader
          backgroundColor="transparent"
          color="#3b82f6"
          className="h-12 w-12"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <div className="text-center text-xl text-red-500">{error}</div>
        <button
          onClick={fetchArticles}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar title="Admin Dashboard" menuItems={menuItems} />

      <div className="flex-1 p-6 md:p-10">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">
            Articles
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
            </div>

            <button
              onClick={() => {
                resetForm();
                setIsEditing(false);
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-500 focus:outline-none"
            >
              <FaPlus size={14} />
              <span>Create New</span>
            </button>
          </div>
        </header>

        {filteredArticles.length === 0 ? (
          <div className="mt-20 text-center text-lg text-gray-500">
            No articles found. Try creating a new one!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-xl font-semibold capitalize text-gray-800">
                      {article.article.replace("_", " ")}
                    </h2>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        article.state === "finished"
                          ? "bg-green-100 text-green-800"
                          : article.state === "progress"
                            ? "bg-blue-100 text-blue-800"
                            : article.state === "unseen"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {article.state}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-gray-600">
                    {article.description || "No description available"}
                  </p>

                  {detailsVisible === article.id && (
                    <div className="mt-4 space-y-4 rounded-lg bg-gray-50 p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded bg-white p-2 shadow-sm">
                          <span className="text-xs text-gray-500">Color</span>
                          <p className="font-medium capitalize">
                            {article.color}
                          </p>
                        </div>
                        <div className="rounded bg-white p-2 shadow-sm">
                          <span className="text-xs text-gray-500">Size</span>
                          <p className="font-medium">{article.size || "N/A"}</p>
                        </div>
                        <div className="rounded bg-white p-2 shadow-sm">
                          <span className="text-xs text-gray-500">Price</span>
                          <p className="font-medium">{article.price} DA</p>
                        </div>
                        <div className="rounded bg-white p-2 shadow-sm">
                          <span className="text-xs text-gray-500">
                            Delivered
                          </span>
                          <p className="font-medium">
                            {article.is_delivered ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>

                      {article.phone && (
                        <div className="rounded bg-white p-2 shadow-sm">
                          <span className="text-xs text-gray-500">Phone</span>
                          <p className="font-medium">{article.phone}</p>
                        </div>
                      )}

                      {article.text && (
                        <div className="rounded bg-white p-2 shadow-sm">
                          <span className="text-xs text-gray-500">Text</span>
                          <p className="font-medium">{article.text}</p>
                        </div>
                      )}

                      <div className="rounded bg-white p-2 shadow-sm">
                        <span className="text-xs text-gray-500">
                          Created At
                        </span>
                        <p className="font-medium">
                          {new Date(article.creation_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(article)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <FaEdit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(article.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <FaTrash size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                    <button
                      onClick={() => toggleDetails(article.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <FaEye size={14} />
                      <span>
                        {detailsVisible === article.id ? "Hide" : "View"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredArticles.length > articlesPerPage && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`rounded-lg border px-3 py-1 ${
                      currentPage === 1
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-lg px-3 py-1 ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`rounded-lg border px-3 py-1 ${
                      currentPage === totalPages
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for creating/editing article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Edit Article" : "Create New Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Article Type
                </label>
                <select
                  name="article"
                  value={formData.article}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="t_shirt">T-Shirt</option>
                  <option value="sweet_shirt">Sweatshirt</option>
                  <option value="mug">Mug</option>
                  <option value="key_ring">Key Ring</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter article description"
                />
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., White, Black, Red"
                  required
                />
              </div>

              {(formData.article === "t_shirt" ||
                formData.article === "sweet_shirt") && (
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              )}

              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Price (DA)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                >
                  {isEditing ? "Save Changes" : "Create Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
