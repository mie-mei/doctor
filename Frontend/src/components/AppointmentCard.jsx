import React from "react";
import { toast } from "react-hot-toast";
import "../styles/components/AppointmentCard.css";

export const AppointmentCard = ({ appointment }) => {
  // Debugging: Log the appointment object
  console.log("Appointment object:", appointment);

  const handleCancel = () => {
    if (!appointment || !appointment.appointment_id) {
      toast.error("Invalid appointment data.");
      return;
    }

    fetch(
      `http://localhost/doctor-appointments/backend/routes/appointments.php?id=${appointment.appointment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          console.log("appointment id", appointment.appointment_id);
          toast.success("Appointment canceled successfully.");
          window.location.reload(); // Refresh the page
        } else {
          toast.error("Failed to cancel the appointment.");
        }
      })
      .catch((error) => {
        console.error("Error canceling the appointment:", error);
        toast.error("An error occurred while canceling the appointment.");
      });
  };

  const handleDone = () => {
    if (!appointment || !appointment.appointment_id) {
      toast.error("Invalid appointment data.");
      return;
    }

    fetch(
      `http://localhost/doctor-appointments/backend/routes/appointments.php?id=${appointment.appointment_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Done" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          console.log("appointment id", appointment.appointment_id);
          toast.success("Appointment marked as done successfully.");
          window.location.reload(); // Refresh the page
        } else {
          toast.error("Failed to mark the appointment as done.");
        }
      })
      .catch((error) => {
        console.error("Error marking the appointment as done:", error);
        toast.error("An error occurred while marking the appointment as done.");
      });
  };

  return (
    <div className="appointment-card">
      <h3>{appointment?.patient_name}</h3>
      <p>
        <strong>Date:</strong> {appointment?.date}
      </p>
      <p>
        <strong>Time:</strong> {appointment?.time}
      </p>
      <p>
        <strong>Reason:</strong> {appointment?.reason}
      </p>

      <button className="done-button" onClick={handleDone}>
        Mark as Done
      </button>

      <button className="cancel-button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};
