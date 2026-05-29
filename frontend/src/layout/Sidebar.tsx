import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaExclamationTriangle,
  FaHistory,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        <div className="logo">
          <div className="logo-icon">
            <FaLeaf />
          </div>

          <div>
            <h1>Breathe ESG</h1>
            <p>ESG Monitoring Platform</p>
          </div>
        </div>

        <nav className="sidebar-menu">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
          >
            <FaUpload />
            Upload CSV
          </NavLink>

          <NavLink
            to="/suspicious"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
          >
            <FaExclamationTriangle />
            Suspicious Records
          </NavLink>

          

          

          <NavLink
            to="/audit"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
          >
            <FaHistory />
            Audit Logs
          </NavLink>

         

        </nav>
      </div>

      <div className="sidebar-bottom">

        <div className="user-icon">
          <FaShieldAlt />
        </div>

        <div>
          <strong>Analyst</strong>
          <p>ESG Compliance Team</p>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;