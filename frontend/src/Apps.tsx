import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TollPlazaManagement from "./Pages/TollPlazaManagement";
import UserManagement from "./Pages/UserManagement";
import { RevenueTransactionProvider } from "./contexts/RevenueTransactionContext";
import Reports from "./Pages/Reports";
import "./index.css";
import "./print.css";
// import CombinedOperations from "./components/operations/CombinedOperations";
import { TollPlazaProvider } from "./contexts/TollPlazaContext";
import BoothTransaction from "./components/operations/BoothTransactions";
import RevenueReport from "./components/Reports/RevenueReport";
import JourneyMaster from "./components/operations/JourneyMaster";
import VehicleMaster from "./components/operations/VehicleMaster";
import TollFees from "./components/operations/TollFees";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import BoothSelection from "./components/operations/TollCollection/BoothSelection";
const PrivateRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAuthenticated = !!localStorage.getItem("token");
  const hasRequiredRole = user && allowedRoles.includes(user.role);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
const App: React.FC = () => {
  return (
    <>
      {/* React Router Section */}
      <TollPlazaProvider>
        <RevenueTransactionProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/unauthorized"
              element={<div>You are not authorized to view this page.</div>}
            />
 <Route path="*" element={<Navigate to="/login" replace />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute allowedRoles={["admin", "supervisor"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
         
            <Route
              path="/users"
              element={
                <PrivateRoute allowedRoles={["admin","supervisor"]}>
                  <UserManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute allowedRoles={["admin", "supervisor"]}>
                  <Reports />
                </PrivateRoute>
              }
            />
            <Route
              path="/booth-transactions"
              element={
                <PrivateRoute
                  allowedRoles={["admin", "supervisor", "operator"]}
                >
                  <BoothTransaction />
                </PrivateRoute>
              }
            />
            <Route
              path="/booth-selection"
              element={
                <PrivateRoute allowedRoles={["operator"]}>
                  <BoothSelection />
                </PrivateRoute>
              }
            />
            <Route
              path="/revenue-report"
              element={
                <PrivateRoute allowedRoles={["admin", "supervisor"]}>
                  <RevenueReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/journey-master"
              element={
                <PrivateRoute allowedRoles={["admin", "supervisor"]}>
                  <JourneyMaster />
                </PrivateRoute>
              }
            />
            <Route
              path="/vehicle-master"
              element={
                <PrivateRoute allowedRoles={["admin", "supervisor"]}>
                  <VehicleMaster />
                </PrivateRoute>
              }
            />
            <Route
              path="/tollfee-rules"
              element={
                <PrivateRoute allowedRoles={["admin", "supervisor"]}>
                  <TollFees />
                </PrivateRoute>
              }
            />
          </Routes>
        </RevenueTransactionProvider>
      </TollPlazaProvider>
    </>
  );
};

export default App;
