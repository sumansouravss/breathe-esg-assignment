import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import UploadCenter from "./pages/UploadCenter";

import SuspiciousPage from "./pages/SuspiciousPage";

import AuditLogsPage from "./pages/AuditLogsPage";



function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}

        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* UPLOAD CENTER */}

        <Route
          path="/upload"
          element={<UploadCenter />}
        />

        {/* SUSPICIOUS RECORDS */}

        <Route
          path="/suspicious"
          element={<SuspiciousPage />}
        />

        {/* AUDIT LOGS */}

        <Route
          path="/audit"
          element={<AuditLogsPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;