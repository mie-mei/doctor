import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(`${backendUrl}routes/auth/logout.php`, {
      method: "POST",
      credentials: "include",
    })
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
