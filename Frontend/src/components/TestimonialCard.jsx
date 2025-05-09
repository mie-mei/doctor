import React from "react";
import "../styles/components/TestimonialCard.css";

export const TestimonialCard = ({ image, name, title, description, role }) => (
  <div className="testimonial-card">
    <img src={image} alt={name} className="testimonial-card-image" />
    <h3 className="testimonial-card-title">“{title}”</h3>
    <p className="testimonial-card-description">{description}</p>
    <p className="testimonial-card-name">{name}</p>
    <p className="testimonial-card-role">{role}</p>
  </div>
);
