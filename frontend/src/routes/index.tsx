import React from "react";
import { Routes, Route, RouterProps } from "react-router-dom";
import { Login, Dashboard } from "../pages";
import PrivateRoutes from "./private-routes";

const RoutesApp: React.FC = () => (
  <Routes>
    <Route element={<PrivateRoutes />}>
      <Route path="/Dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/" element={<Login />} />
  </Routes>
);

export default RoutesApp;
