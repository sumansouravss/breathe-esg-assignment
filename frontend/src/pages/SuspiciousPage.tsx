import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

interface SuspiciousRecord {
  id: number;
  category: string;
  activity_value: number;
  unit: string;
  status: string;
}

function SuspiciousPage() {
  const [records, setRecords] = useState<SuspiciousRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuspiciousRecords = async (): Promise<void> => {
    try {
      const response = await api.get(
        "/emissions/suspicious/"
      );

      setRecords(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadRecords = async () => {
      await fetchSuspiciousRecords();
    };

    void loadRecords();
  }, []);

  const approveRecord = async (
    id: number
  ): Promise<void> => {
    try {
      await api.post(
        `/emissions/approve/${id}/`
      );

      await fetchSuspiciousRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectRecord = async (
    id: number
  ): Promise<void> => {
    try {
      await api.post(
        `/emissions/reject/${id}/`
      );

      await fetchSuspiciousRecords();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-page">
        Loading suspicious records...
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        {/* PAGE HEADER */}

        <div className="page-header-card">
          <div className="page-header-left">
            <div
              className="page-icon"
              style={{
                background: "#ef4444",
              }}
            >
              ⚠️
            </div>

            <div>
              <h2>
                Suspicious Emission Records
              </h2>

              <p
                style={{
                  color: "#6b7280",
                  marginTop: "6px",
                }}
              >
                Records flagged for analyst review
              </p>
            </div>
          </div>

          <div className="suspicious-count-badge">
            {records.length} Records
          </div>
        </div>

        {/* FILTER BAR */}

        <div className="filters-card">
          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search suspicious records..."
            />
          </div>

          <select>
            <option>
              All Status
            </option>

            <option>
              PENDING
            </option>

            <option>
              APPROVED
            </option>

            <option>
              REJECTED
            </option>
          </select>
        </div>

        {/* TABLE */}

        <div className="table-card">
          <div className="table-top">
            <h2>
              Review Queue
            </h2>

            <div className="table-actions">
              <button className="small-btn">
                Filter
              </button>

              <button className="small-btn export-btn">
                Export CSV
              </button>
            </div>
          </div>

          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Value</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {records.map(
                  (record) => (
                    <tr
                      key={
                        record.id
                      }
                      className="high-risk-row"
                    >
                      <td>
                        #
                        {
                          record.id
                        }
                      </td>

                      <td>
                        {
                          record.category
                        }
                      </td>

                      <td
                        className={
                          record.activity_value <
                          0
                            ? "negative-value"
                            : ""
                        }
                      >
                        {
                          record.activity_value
                        }
                      </td>

                      <td>
                        {
                          record.unit
                        }
                      </td>

                      <td>
                        <span
                          className={
                            record.status ===
                            "APPROVED"
                              ? "badge approved"
                              : record.status ===
                                "REJECTED"
                              ? "badge rejected"
                              : "badge pending"
                          }
                        >
                          {
                            record.status
                          }
                        </span>
                      </td>

                      <td>
                        <span className="badge high">
                          High
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button
                            className="approve-btn"
                            onClick={() =>
                              approveRecord(
                                record.id
                              )
                            }
                          >
                            ✓
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              rejectRecord(
                                record.id
                              )
                            }
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {records.length ===
            0 && (
            <div
              style={{
                textAlign:
                  "center",
                padding:
                  "40px",
                color:
                  "#6b7280",
              }}
            >
              No suspicious records found 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuspiciousPage;