import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DashboardUser from "../pages/DashboardUser/DashboardUser";
import ProtectedRoutes from "./ProtectedRoutes";

const DefaultRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default DefaultRouter;
