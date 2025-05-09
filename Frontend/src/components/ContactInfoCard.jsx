import React from "react";
import "../styles/components/ContactInfoCard.css";

export const ContactInfoCard = ({ icon, title, details }) => (
  <div className="contact-info-card">
    <div className="contact-icon-wrapper">
      <span className="icon-text">{icon}</span>
    </div>
    <h2>{title}</h2>
    {details.map((detail, index) => (
      <p key={index}>{detail}</p>
    ))}
  </div>
);
