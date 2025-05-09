import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import "../styles/components/NavBar.css";

export const NavBar = () => (
  <nav className="navbar">
    <Logo />
    <Link to="/">Home</Link>
    <a href="#services-section">Services</a> {/* Scroll to services-section */}
    <a href="#testimonials-section">Testimonials</a>{" "}
    {/* Scroll to testimonials-section */}
    <Link to="/contact">Contact</Link>
  </nav>
);
