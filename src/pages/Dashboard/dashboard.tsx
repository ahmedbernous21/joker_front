import { useState, useEffect } from "react";
import HttpClient from "../../httpClient";
import Sidebar from "../../components/sideBar/sideBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate());
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const menuItems = [
    { label: "Overview", href: "overview/" },
    { label: "Articles", href: "/dashboard/articles/" },
    { label: "Logout", href: "#" },
  ];
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const params = new URLSearchParams();
        if (dateRange.startDate)
          params.append("start_date", dateRange.startDate);
        if (dateRange.endDate) params.append("end_date", dateRange.endDate);
        const response = await HttpClient.get(
          `statistics/?${params.toString()}`,
        );
        console.log(response);
        setStatistics(response);
      } catch (err) {
        setError("Failed to load statistics.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStatistics();
  }, [dateRange]);

  const handleDateChange = () => {
    setDateRange({ startDate, endDate });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!statistics) {
    return <div>No statistics available.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar title="Admin Dashboard" menuItems={menuItems} />

      <div className="flex-1 p-6">
        <h2 className="mb-6 text-3xl font-bold">Overview</h2>

        <div className="mb-6">
          <label className="mb-2 block text-gray-700">Select Date Range:</label>
          <div className="flex space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded border border-gray-300 p-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded border border-gray-300 p-2"
            />
            <button
              onClick={handleDateChange}
              className="rounded bg-blue-500 p-2 text-white"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatisticCard
            title="Total Orders"
            value={statistics.total_requests}
            progress={100}
            color="#3b82f6"
          />
          <StatisticCard
            title="Unseen Orders"
            value={statistics.unseen_requests}
            progress={
              (statistics.unseen_requests / statistics.total_requests) * 100
            }
            color="#ef4444"
          />
          <StatisticCard
            title="Conversion Rate"
            value={`${statistics.conversion_rate.toFixed(2)}%`}
            progress={statistics.conversion_rate}
            color="#10b981"
          />
          <StatisticCard
            title="Total Revenue"
            value={`${statistics.total_revenue} da`}
            progress={(statistics.total_revenue / 100000) * 100}
            color="#f59e0b"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatisticCard
            title="In Progress"
            value={statistics.in_progress_requests}
            progress={
              (statistics.in_progress_requests / statistics.total_requests) *
              100
            }
            color="#8b5cf6"
          />
          <StatisticCard
            title="Finished Orders"
            value={statistics.finished_requests}
            progress={
              (statistics.finished_requests / statistics.total_requests) * 100
            }
            color="#6366f1"
          />
          <StatisticCard
            title="Delivered Orders"
            value={statistics.delivered_requests}
            progress={
              (statistics.delivered_requests / statistics.total_requests) * 100
            }
            color="#34d399"
          />
          <StatisticCard
            title="Repetitions"
            value={statistics.repetitions_count}
            progress={(statistics.repetitions_count / 100) * 100} // Assuming a max value of 100 repetitions
            color="#ec4899"
          />
        </div>
      </div>
    </div>
  );
};

const StatisticCard = ({ title, value, progress, color }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 h-24 w-24">
        <CircularProgressbar
          value={progress}
          text={value.toString()}
          styles={buildStyles({
            textColor: color,
            pathColor: color,
            trailColor: "#d1d5db",
          })}
        />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};

export default Dashboard;
