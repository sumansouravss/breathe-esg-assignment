import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

import api from "../services/api";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaUpload,
  FaEdit,
} from "react-icons/fa";

interface AuditLog {
  id: number;
  action: string;
  notes: string;
  user: string;
  created_at: string;
}

function AuditLogsPage() {

  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchLogs = async () => {

    try {

      const response =
        await api.get(
          "/audit/logs/"
        );

      setLogs(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const loadLogs = async () => {

      await fetchLogs();

    };

    void loadLogs();

  }, []);

  const getActionIcon = (
    action: string
  ) => {

    switch (action) {

      case "APPROVED":
        return (
          <FaCheckCircle className="audit-approved" />
        );

      case "REJECTED":
        return (
          <FaTimesCircle className="audit-rejected" />
        );

      case "CREATED":
        return (
          <FaUpload className="audit-created" />
        );

      default:
        return (
          <FaEdit className="audit-updated" />
        );

    }

  };

  if (loading) {

    return (
      <div className="loading-page">

        <h2>
          Loading audit logs...
        </h2>

      </div>
    );

  }

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <div className="page-header">

          <div>

            <h1>
              Audit Timeline
            </h1>

            <p>
              Full analyst activity,
              ingestion history and
              compliance traceability
            </p>

          </div>

        </div>

        <div className="audit-timeline">

          {logs.map((log) => (

            <div
              className="audit-card"
              key={log.id}
            >

              <div className="audit-icon">

                {getActionIcon(
                  log.action
                )}

              </div>

              <div className="audit-content">

                <div className="audit-top">

                  <h3>
                    {log.action}
                  </h3>

                  <span>

                    {new Date(
                      log.created_at
                    ).toLocaleString()}

                  </span>

                </div>

                <p>
                  {log.notes}
                </p>

                <div className="audit-user">

                  Analyst:{" "}

                  <strong>
                    {log.user}
                  </strong>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default AuditLogsPage;