import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/components/Logo.css";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="logo"
      onClick={() => navigate("/")} // Use navigate to redirect to the home page
      style={{ cursor: "pointer" }}
    >
      <img src="/logo.svg" alt="Logo" />
      <span>Dr.</span> Mohammed
    </div>
  );
};
