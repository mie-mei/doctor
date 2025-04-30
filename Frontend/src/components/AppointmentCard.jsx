import React from "react";
import "../styles/components/AppointmentCard.css";

export const AppointmentCard = ({ appointment, onCancel }) => {
  return (
    <div className="appointment-card">
      <h3>{appointment.patient_name}</h3>
      <p>
        <strong>Date:</strong> {appointment.date}
      </p>
      <p>
        <strong>Reason:</strong> {appointment.reason}
      </p>
      {onCancel && (
        <button className="cancel-button" onClick={() => onCancel(appointment)}>
          Cancel
        </button>
      )}
    </div>
  );
};
