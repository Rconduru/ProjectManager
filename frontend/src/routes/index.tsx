import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Dashboard } from "../pages";
import PrivateRoutes from "./private.routes";
import ErrorPage from "./error.route";
import General from "../pages/general";
import Projects from "../pages/projects";

const RoutesApp: React.FC = () => (
  <Routes>
    <Route element={<PrivateRoutes />}>
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="" element={<General />} />
        <Route path="projects" element={<Projects />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Route>
    <Route path="/" element={<Login />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default RoutesApp;
