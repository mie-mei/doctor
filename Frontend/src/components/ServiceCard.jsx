import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/ServiceCard.css";

export const ServiceCard = ({ image, title, description }) => (
  <div className="service-card">
    <img src={image} alt={title} className="service-card-image" />
    <h3 className="service-card-title">{title}</h3>
    <p className="service-card-description">{description}</p>
    <Link to="/register" className="service-card-link">
      Learn more →
    </Link>
  </div>
);