import React from "react";
import { Navigate } from "react-router-dom";
import { getFromStorage } from "../store/setLocalStorage";

export default function ProtectedRoute({ element }) {
  const token = getFromStorage("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
