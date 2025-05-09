import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(
      "https://doctor-appointments-5pb4.onrender.com/routes/auth/logout.php",
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error("Logout failed. Please try again.");
        }
      });
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};
