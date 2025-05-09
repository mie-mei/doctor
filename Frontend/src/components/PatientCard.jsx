import React from "react";
import "../styles/components/PatientCard.css";

export const PatientCard = ({ patient }) => {
  return (
    <div className="patient-card">
      <div className="patient-info">
        <h3>{patient.name}</h3>
        <p>
          <strong>Email:</strong> {patient.email}
        </p>
      </div>
    </div>
  );
};
