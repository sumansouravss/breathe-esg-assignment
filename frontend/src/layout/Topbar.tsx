import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

function Topbar() {
  return (
    <div className="topbar">

      <div>
        <h2>Dashboard</h2>
        <p>
          Track, review and manage
          emission records
        </p>
      </div>

      <div className="topbar-right">

        <div
          style={{
            position: "relative",
          }}
        >
          <FaSearch
            style={{
              position: "absolute",
              left: "12px",
              top: "14px",
              color: "#6b7280",
            }}
          />

          <input
            className="search-bar"
            placeholder="Search records..."
          />
        </div>

        <FaBell size={20} />

        <div
          style={{
            background: "white",
            color: "#111827",
            padding: "10px 16px",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          Analyst
        </div>

      </div>

    </div>
  );
}

export default Topbar;