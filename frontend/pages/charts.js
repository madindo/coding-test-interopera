import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ChartsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/data`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.salesReps || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const generateChartData = () => {
    const labels = users.map((rep) => rep.name);

    const getTotalByStatus = (status) =>
      users.map((rep) =>
        rep.deals
          .filter((deal) => deal.status === status)
          .reduce((sum, deal) => sum + deal.value, 0)
      );

    return {
      labels,
      datasets: [
        {
          label: "Closed Won ($)",
          data: getTotalByStatus("Closed Won"),
          backgroundColor: "rgba(34, 197, 94, 0.7)", // green-500
          borderColor: "rgba(34, 197, 94, 1)",
          borderWidth: 1,
        },
        {
          label: "Closed Lost ($)",
          data: getTotalByStatus("Closed Lost"),
          backgroundColor: "rgba(239, 68, 68, 0.7)", // red-500
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
        {
          label: "In Progress ($)",
          data: getTotalByStatus("In Progress"),
          backgroundColor: "rgba(251, 191, 36, 0.7)", // yellow-400
          borderColor: "rgba(251, 191, 36, 1)",
          borderWidth: 1,
        },
      ],
    };
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Performance Charts
        </h1>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Closed Won by Sales Rep
            </h2>
            <Bar data={generateChartData()} options={chartOptions} />
          </div>
        )}
      </main>
    </>
  );
}
