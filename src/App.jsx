import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import {
  DataManagerRoute,
  ReportFormRoute,
  MapSectionRoute,
  LeaderboardRoute,
  StatisticsDashboardRoute,
  QuickLinksRoute,
} from "./components/index.js";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/data-manager"
              element={
                <ProtectedRoute>
                  <DataManagerRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportFormRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <MapSectionRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderboardRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <StatisticsDashboardRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quick-links"
              element={
                <ProtectedRoute>
                  <QuickLinksRoute />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
