import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Home.css";
import { NavBar } from "../components/NavBar.jsx";
import { Footer } from "../components/Footer.jsx";

import { ServiceCard } from "../components/ServiceCard";
import { TestimonialCard } from "../components/TestimonialCard";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-section">
        <NavBar />
        <div className="hero-section_description">
          <h1>
            Your Health, Our <span>Priority</span> - Building a{" "}
            <span style={{ color: "#6EAB36" }}>Healthier</span> Community{" "}
            <span style={{ color: "#6EAB36" }}>Together</span>
          </h1>
          <p>
            Welcome to Dr. Mohammed's Clinic, where your well-being is our top
            priority. With years of experience and state-of-the-art medical
            technology, we provide personalized and comprehensive care in a
            comfortable environment.
          </p>
        </div>
        <button onClick={() => navigate("/register")}>
          Book An Appointment →
        </button>
      </div>

      <div id="services-section" className="services-section">
        <h1>Our Specialized Services</h1>
        <p>
          Dr. Mohammed provides expert medical care across various specialties,
          ensuring you receive personalized attention and treatment for all your
          healthcare needs. Each service is delivered with the highest standard
          of care and attention to detail.
        </p>
        <div className="services-section_cards">
          <ServiceCard
            image="/Services/Cardiology.jpg"
            title="Cardiology"
            description="Expert heart care and cardiovascular health management with Dr. Mohammed."
          />
          <ServiceCard
            image="/Services/Neurology.jpg"
            title="Neurology"
            description="Specialized neurological care and treatment for nervous system disorders."
          />
          <ServiceCard
            image="/Services/Orthopedics.jpg"
            title="Orthopedics"
            description="Comprehensive care for bone and joint conditions, from diagnosis to treatment."
          />
          <ServiceCard
            image="/Services/Pediatrics.jpg"
            title="Pediatrics"
            description="Gentle and expert care for children's health and development."
          />
          <ServiceCard
            image="/Services/Dermatology.jpg"
            title="Dermatology"
            description="Professional skin care and treatment for various dermatological conditions."
          />
          <ServiceCard
            image="/Services/Radiology.jpg"
            title="Radiology"
            description="Advanced diagnostic imaging services for accurate medical assessment."
          />
        </div>
      </div>

      <div id="testimonials-section" className="testimonials-section">
        <h1>What Our Patients Say</h1>
        <p>
          Don't just take our word for it - hear from our valued patients about
          their experiences at our clinic. Their stories reflect our commitment
          to excellence in healthcare and patient satisfaction.
        </p>
        <div className="testimonials-section_cards">
          <TestimonialCard
            image="/Testimonials/pfp-1.jpg"
            title="Amazing Service"
            description="The staff was incredibly helpful and professional. Highly recommend!"
            name="John Doe"
            role="CEO at TechCorp"
          />
          <TestimonialCard
            image="/Testimonials/pfp-2.jpeg"
            title="Exceptional Care"
            description="I felt very comfortable and well taken care of during my visit."
            name="Jameela Mars"
            role="Manager at HealthPlus"
          />
          <TestimonialCard
            image="/Testimonials/pfp-3.jpg"
            title="Highly Recommended"
            description="The doctors and staff were very attentive and knowledgeable."
            name="Andy smith"
            role="Freelancer"
          />
        </div>
      </div>

      <div className="footer-section">
        <Footer />
      </div>
    </>
  );
}

export default Home;
