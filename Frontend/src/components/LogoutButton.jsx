import React from "react";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(
      "http://localhost/doctor-appointments/backend/routes/auth/logout.php",
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          navigate("/");
          alert(data.message);
        } else {
          alert("Logout failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};
