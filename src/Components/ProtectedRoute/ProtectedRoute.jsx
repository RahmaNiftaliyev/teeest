import React from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../Config/config.constant";

function PrivateRoutes({ children }) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token ? <Navigate to="/" replace /> : children;
}
export default PrivateRoutes;
