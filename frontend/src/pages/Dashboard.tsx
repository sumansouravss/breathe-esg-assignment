import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

import api from "../services/api";

import {
  FaDatabase,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaServer,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function Dashboard() {

  interface EmissionRecord {
  id: number;
  category: string;
  unit: string;
  value: number;
  status: string;
  is_suspicious: boolean;
  risk_score?: string;
}

const [records, setRecords] =
  useState<EmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // ACTION LOADING
  const [actionLoading, setActionLoading] =
    useState(false);



  // FETCH RECORDS

  const fetchRecords = async () => {

    try {

      const response = await api.get(
        "/emissions/records/"
      );

      setRecords(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };
  useEffect(() => {
    // avoid calling setState synchronously within an effect
    const timer = setTimeout(() => {
      fetchRecords();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // APPROVE RECORD

  const approveRecord = async (
    id: number
  ) => {

    try {

      setActionLoading(true);

      await api.post(
        `/emissions/records/${id}/approve/`
      );

      fetchRecords();

    } catch (error) {

      console.error(error);

    } finally {

      setActionLoading(false);

    }

  };

  // REJECT RECORD

  const rejectRecord = async (
    id: number
  ) => {

    try {

      setActionLoading(true);

      await api.post(
        `/emissions/records/${id}/reject/`
      );

      fetchRecords();

    } catch (error) {

      console.error(error);

    } finally {

      setActionLoading(false);

    }

  };

  // REAL DATA CALCULATIONS

  const totalRecords = records.length;

  const approvedCount = records.filter(
    (r) => r.status === "APPROVED"
  ).length;

  const rejectedCount = records.filter(
    (r) => r.status === "REJECTED"
  ).length;

  const suspiciousCount = records.filter(
    (r) => r.is_suspicious
  ).length;

  // PIE CHART DATA

  const pieData = [
    {
      name: "Approved",
      value: approvedCount,
      color: "#16a34a",
    },

    {
      name: "Suspicious",
      value: suspiciousCount,
      color: "#f59e0b",
    },

    {
      name: "Rejected",
      value: rejectedCount,
      color: "#ef4444",
    },
  ];

  // SAMPLE LINE DATA

  const lineData = [
    { day: "May 21", records: 15 },
    { day: "May 22", records: 43 },
    { day: "May 23", records: 35 },
    { day: "May 24", records: 47 },
    { day: "May 25", records: 56 },
    { day: "May 26", records: 49 },
    { day: "May 27", records: 67 },
  ];

  // CATEGORY DATA

  const categoryMap: { [key: string]: number } = {};

  records.forEach((record) => {

    if (!categoryMap[record.category]) {

      categoryMap[record.category] = 0;

    }

    categoryMap[record.category] += 1;

  });

  const categoryData = Object.keys(
    categoryMap
  ).map((key) => ({
    category: key,
    value: categoryMap[key],
  }));

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="loading-screen">

        <h2>
          Loading dashboard...
        </h2>

      </div>

    );

  }

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon green-bg">

                <FaDatabase />

              </div>

            </div>

            <h4>Total Records</h4>

            <h1>
              {totalRecords}
            </h1>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon blue-bg">

                <FaCheckCircle />

              </div>

            </div>

            <h4>Approved</h4>

            <h1 className="blue">
              {approvedCount}
            </h1>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon red-bg">

                <FaTimesCircle />

              </div>

            </div>

            <h4>Rejected</h4>

            <h1 className="red">
              {rejectedCount}
            </h1>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon orange-bg">

                <FaExclamationTriangle />

              </div>

            </div>

            <h4>Suspicious</h4>

            <h1 className="orange">
              {suspiciousCount}
            </h1>

          </div>

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon purple-bg">

                <FaServer />

              </div>

            </div>

            <h4>Sources Connected</h4>

            <h1>
              3 / 3
            </h1>

          </div>

        </div>

        {/* CHARTS */}

        <div className="charts-grid">

          {/* PIE CHART */}

          <div className="chart-card">

            <h2>
              Record Status Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >

                  {pieData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={entry.color}
                      />

                    )
                  )}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* LINE CHART */}

          <div className="chart-card">

            <h2>
              Records Over Time
            </h2>

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <LineChart data={lineData}>

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="records"
                  stroke="#16a34a"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* BAR CHART */}

          <div className="chart-card">

            <h2>
              Top Emission Categories
            </h2>

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <BarChart
                data={categoryData}
                layout="vertical"
              >

                <XAxis
                  type="number"
                  hide
                />

                <YAxis
                  dataKey="category"
                  type="category"
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#16a34a"
                  radius={[0, 10, 10, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* SOURCE STATUS */}

        <div className="source-card">

          <h2>
            Source Ingestion Status
          </h2>

          <div className="source-grid">

            <div className="source-item">

              <div>

                <h4>SAP</h4>

                <p>
                  Fuel & Procurement
                </p>

              </div>

              <span className="synced">
                Synced
              </span>

            </div>

            <div className="source-item">

              <div>

                <h4>Utility</h4>

                <p>
                  Electricity
                </p>

              </div>

              <span className="synced">
                Synced
              </span>

            </div>

            <div className="source-item">

              <div>

                <h4>Travel</h4>

                <p>
                  Flights & Hotels
                </p>

              </div>

              <span className="synced">
                Synced
              </span>

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="table-card">

          <div className="table-top">

            <h2>
              Suspicious Records
            </h2>

            <div className="table-actions">

              <button className="small-btn">
                Filters
              </button>

              <button className="small-btn export-btn">
                Export CSV
              </button>

            </div>

          </div>

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Category</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Suspicious</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {records.map((record) => (

                <tr
                  key={record.id}
                  className={
                    record.is_suspicious
                      ? "suspicious-row"
                      : ""
                  }
                >

                  <td>
                    #{record.id}
                  </td>

                  <td>
                    {record.category}
                  </td>

                  <td>
                    {record.value}
                  </td>

                  <td>
                    {record.unit}
                  </td>

                  <td>

                    <span
                      className={
                        record.status ===
                        "APPROVED"
                          ? "approved"
                          : record.status ===
                            "REJECTED"
                          ? "rejected"
                          : "pending"
                      }
                    >

                      {record.status}

                    </span>

                  </td>

                  <td>

                    {record.is_suspicious
                      ? "Yes"
                      : "No"}

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="approve-btn"
                        disabled={actionLoading}
                        onClick={() =>
                          approveRecord(
                            record.id
                          )
                        }
                      >

                        {actionLoading
                          ? "..."
                          : "✓"}

                      </button>

                      <button
                        className="reject-btn"
                        disabled={actionLoading}
                        onClick={() =>
                          rejectRecord(
                            record.id
                          )
                        }
                      >

                        {actionLoading
                          ? "..."
                          : "✕"}

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;
