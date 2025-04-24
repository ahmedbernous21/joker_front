import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaHistory,
  FaArrowLeft,
  FaSyncAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface Order {
  id: number | string;
  date: string;
  name: string;
  articleType: string;
  color: string;
  size: string;
  price: number;
  status: string;
  frontImage: string | null;
  backImage: string | null;
}

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  useEffect(() => {
    try {
      // Load orders from localStorage
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

      // Validate each order has required fields
      const validOrders = savedOrders.filter((order: any) => {
        return order.id && order.date && order.name && order.price;
      });

      // Sort by date, newest first
      const sortedOrders = validOrders.sort(
        (a: Order, b: Order) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]); // Reset to empty array on error
    }
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case "t_shirt":
        return "T-Shirt";
      case "sweet_shirt":
        return "Sweatshirt";
      case "mug":
        return "Mug";
      case "key_ring":
        return "Key Ring";
      default:
        return type.replace("_", " ");
    }
  };

  const handleOrderAgain = (order: Order) => {
    try {
      // Store the order details in sessionStorage to use in the shop page
      sessionStorage.setItem(
        "reorderItem",
        JSON.stringify({
          type: order.articleType,
          color: order.color,
          size: order.size,
          name: order.name,
        }),
      );

      toast.success("Redirecting to design page");

      // Navigate to the design page
      setTimeout(() => {
        navigate("/design/");
      }, 1000);
    } catch (error) {
      console.error("Error preparing reorder:", error);
      toast.error("Failed to prepare reorder. Please try again.");
    }
  };

  const getStepStatus = (orderStatus: string, stepName: string) => {
    const statusOrder = ["processing", "shipped", "delivered", "completed"];
    const orderIndex = statusOrder.indexOf(orderStatus.toLowerCase());
    const stepIndex = statusOrder.indexOf(stepName.toLowerCase());

    if (orderIndex >= stepIndex) {
      return "bg-green-500"; // completed step
    }
    return "bg-gray-300"; // pending step
  };


  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft /> Back to Home
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            
          </div>
          <p className="mt-2 text-gray-600">View and track all your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-md">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <FaShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              No orders yet
            </h2>
            <p className="mb-6 text-gray-500">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/design/"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Orders List - only visible when no order is selected */}
            {!selectedOrder &&
              currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="relative p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      {order.frontImage && (
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={order.frontImage}
                            alt="Front design"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-image.png"; // Fallback image
                              e.currentTarget.onerror = null;
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getProductTypeLabel(order.articleType)} -{" "}
                          {order.color}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {order.size}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {order.price} DA
                        </p>
                      </div>
                    </div>

                    <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                      View Details
                    </button>
                  </div>
                </div>
              ))}

            {/* Pagination controls */}
            {!selectedOrder && orders.length > ordersPerPage && (
              <div className="col-span-full mt-6 flex justify-center">
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

            {/* Order Details - only visible when an order is selected */}
            {selectedOrder && (
              <div className="col-span-full overflow-hidden rounded-lg bg-white shadow-md">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <FaArrowLeft /> Back to orders
                    </button>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(selectedOrder.status)}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Order #{selectedOrder.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(selectedOrder.date)}
                    </p>
                  </div>

                  <div className="mb-8 rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Product Details
                    </h3>
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          Product:
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {selectedOrder.name}
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-700">
                          Type:
                        </p>
                        <p className="text-gray-900">
                          {getProductTypeLabel(selectedOrder.articleType)}
                        </p>
                        <p className="mt-2 text-sm font-medium text-gray-700">
                          Color:
                        </p>
                        <p className="text-gray-900">{selectedOrder.color}</p>
                        <p className="mt-2 text-sm font-medium text-gray-700">
                          Size:
                        </p>
                        <p className="text-gray-900">{selectedOrder.size}</p>
                        <p className="mt-4 text-lg font-bold text-gray-900">
                          {selectedOrder.price} DA
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 md:w-1/2">
                        {selectedOrder.frontImage && (
                          <div>
                            <p className="mb-2 text-sm font-medium text-gray-700">
                              Front Design:
                            </p>
                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
                              <img
                                src={selectedOrder.frontImage}
                                alt="Front design"
                                className="mx-auto h-auto max-h-48 w-auto object-contain"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-image.png"; // Fallback image
                                  e.currentTarget.onerror = null;
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {selectedOrder.backImage && (
                          <div>
                            <p className="mb-2 text-sm font-medium text-gray-700">
                              Back Design:
                            </p>
                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
                              <img
                                src={selectedOrder.backImage}
                                alt="Back design"
                                className="mx-auto h-auto max-h-48 w-auto object-contain"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder-image.png"; // Fallback image
                                  e.currentTarget.onerror = null;
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      Order Timeline
                    </h3>
                    <div className="relative pl-8">
                      <div className="absolute bottom-0 left-0 top-0 w-px bg-gray-300"></div>

                      <div className="relative mb-6 pb-6">
                        <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-green-500"></div>
                        <div className="pl-6">
                          <p className="font-medium text-gray-900">
                            Order Placed
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(selectedOrder.date)}
                          </p>
                        </div>
                      </div>

                      <div className="relative mb-6 pb-6">
                        <div
                          className={`absolute -left-2 top-0 h-4 w-4 rounded-full ${getStepStatus(selectedOrder.status, "processing")}`}
                        ></div>
                        <div className="pl-6">
                          <p
                            className={`font-medium ${["processing", "shipped", "delivered", "completed"].includes(selectedOrder.status.toLowerCase()) ? "text-gray-900" : "text-gray-500"}`}
                          >
                            Processing
                          </p>
                          <p className="text-sm text-gray-500">
                            Your order is being processed
                          </p>
                        </div>
                      </div>

                      <div className="relative mb-6 pb-6">
                        <div
                          className={`absolute -left-2 top-0 h-4 w-4 rounded-full ${getStepStatus(selectedOrder.status, "shipped")}`}
                        ></div>
                        <div className="pl-6">
                          <p
                            className={`font-medium ${["shipped", "delivered", "completed"].includes(selectedOrder.status.toLowerCase()) ? "text-gray-900" : "text-gray-500"}`}
                          >
                            Shipping
                          </p>
                          <p className="text-sm text-gray-500">
                            Your order will be shipped soon
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <div
                          className={`absolute -left-2 top-0 h-4 w-4 rounded-full ${getStepStatus(selectedOrder.status, "delivered")}`}
                        ></div>
                        <div className="pl-6">
                          <p
                            className={`font-medium ${["delivered", "completed"].includes(selectedOrder.status.toLowerCase()) ? "text-gray-900" : "text-gray-500"}`}
                          >
                            Delivered
                          </p>
                          <p className="text-sm text-gray-500">
                            Estimated delivery date:{" "}
                            {new Date(
                              new Date(selectedOrder.date).getTime() +
                                7 * 24 * 60 * 60 * 1000,
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleOrderAgain(selectedOrder)}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                    >
                      <FaHistory className="h-4 w-4" />
                      Order Again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
