import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import "../styles/components/Footer.css";

export const Footer = () => (
  <footer className="footer-section">
    <div className="footer-content">
      <Logo />
      <div className="footer-links">
        <Link to="/">Home</Link>
        <a href="#services-section">Services</a>{" "}
        {/* Scroll to services-section */}
        <a href="#testimonials-section">Testimonials</a>{" "}
        {/* Scroll to testimonials-section */}
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  </footer>
);
