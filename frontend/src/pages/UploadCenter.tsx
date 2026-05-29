import { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import api from "../services/api";

import {
  FaCloudUploadAlt,
  FaFileCsv,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

interface UploadHistory {
  id: number;
  file_name: string;
  source_type: string;
  uploaded_by: string;
  uploaded_at: string;
}

interface FailedRow {
  row: number;
  error: string;
}

interface ValidationSummary {
  validRows: number;
  suspiciousRows: number;
  rejectedRows: number;
}

function UploadPage() {
  const [sapFile, setSapFile] =
    useState<File | null>(null);

  const [utilityFile, setUtilityFile] =
    useState<File | null>(null);

  const [travelFile, setTravelFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [uploadHistory, setUploadHistory] =
    useState<UploadHistory[]>([]);

  const [failedRows, setFailedRows] =
    useState<FailedRow[]>([]);

  const [validationSummary, setValidationSummary] =
    useState<ValidationSummary>({
      validRows: 0,
      suspiciousRows: 0,
      rejectedRows: 0,
    });

  const fetchUploadHistory =
    async (): Promise<void> => {
      try {
        const response = await api.get(
          "/ingestion/history/"
        );

        setUploadHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    const loadUploadHistory = async () => {
      await fetchUploadHistory();
    };

    void loadUploadHistory();
  }, []);

  const handleUpload = async (
    file: File | null
  ): Promise<void> => {
    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setFailedRows([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/ingestion/upload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setValidationSummary({
        validRows:
          response.data.records_created || 0,

        suspiciousRows:
          response.data.suspicious_records || 0,

        rejectedRows:
          response.data.failed_rows?.length || 0,
      });

      setFailedRows(
        response.data.failed_rows || []
      );

      await fetchUploadHistory();

      setSuccess(`
Upload Successful!

Records Created: ${response.data.records_created}

Suspicious Records: ${response.data.suspicious_records}
      `);
    } catch (error) {
      console.error(error);
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-header">
          <div>
            <h1>Upload Center</h1>
            <p>
              Upload SAP, Utility and Travel
              ESG datasets
            </p>
          </div>
        </div>

        <div className="upload-grid">

          {/* SAP */}

          <div className="upload-card">
            <div className="upload-icon green-bg">
              <FaFileCsv />
            </div>

            <h2>Upload SAP Data</h2>

            <p>
              Fuel procurement and
              operational emissions
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                setSapFile(
                  e.target.files?.[0] || null
                )
              }
            />

            <button
              className="upload-btn"
              disabled={loading}
              onClick={() =>
                handleUpload(sapFile)
              }
            >
              <FaCloudUploadAlt />
              Upload SAP
            </button>
          </div>

          {/* Utility */}

          <div className="upload-card">
            <div className="upload-icon blue-bg">
              <FaCheckCircle />
            </div>

            <h2>Upload Utility Data</h2>

            <p>
              Electricity and utility
              consumption records
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                setUtilityFile(
                  e.target.files?.[0] || null
                )
              }
            />

            <button
              className="upload-btn"
              disabled={loading}
              onClick={() =>
                handleUpload(utilityFile)
              }
            >
              <FaCloudUploadAlt />
              Upload Utility
            </button>
          </div>

          {/* Travel */}

          <div className="upload-card">
            <div className="upload-icon orange-bg">
              <FaExclamationTriangle />
            </div>

            <h2>Upload Travel Data</h2>

            <p>
              Flights, hotel stays and
              employee transport
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={(e) =>
                setTravelFile(
                  e.target.files?.[0] || null
                )
              }
            />

            <button
              className="upload-btn"
              disabled={loading}
              onClick={() =>
                handleUpload(travelFile)
              }
            >
              <FaCloudUploadAlt />
              Upload Travel
            </button>
          </div>
        </div>

        {/* Upload History */}

        <div className="table-card">
          <h2>Upload History</h2>

          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Source</th>
                <th>Uploaded By</th>
                <th>Uploaded Time</th>
              </tr>
            </thead>

            <tbody>
              {uploadHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.file_name}</td>
                  <td>{item.source_type}</td>
                  <td>{item.uploaded_by}</td>
                  <td>
                    {new Date(
                      item.uploaded_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Validation */}

        <div className="validation-card">
          <h2>
            Upload Validation Summary
          </h2>

          <div className="validation-grid">
            <div className="validation-item">
              <h3>Valid Rows</h3>
              <span className="green-text">
                {validationSummary.validRows}
              </span>
            </div>

            <div className="validation-item">
              <h3>Suspicious Rows</h3>
              <span className="orange-text">
                {
                  validationSummary.suspiciousRows
                }
              </span>
            </div>

            <div className="validation-item">
              <h3>Rejected Rows</h3>
              <span className="red-text">
                {
                  validationSummary.rejectedRows
                }
              </span>
            </div>
          </div>

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {/* Failed Rows */}

        {failedRows.length > 0 && (
          <div className="table-card">
            <h2>Failed Rows Preview</h2>

            <table>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Error</th>
                </tr>
              </thead>

              <tbody>
                {failedRows.map(
                  (row, index) => (
                    <tr key={index}>
                      <td>{row.row}</td>
                      <td>{row.error}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;