import React from "react";
import "../styles/ServiceCard.css";

export const ServiceCard = ({ image, title, description, link }) => (
  <div className="service-card">
    <img src={image} alt={title} className="service-card-image" />
    <h3 className="service-card-title">{title}</h3>
    <p className="service-card-description">{description}</p>
    <a href={link} className="service-card-link">
      Learn more →
    </a>
  </div>
);