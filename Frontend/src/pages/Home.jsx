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
            Providing Quality <span>Healthcare</span> for a{" "}
            <span style={{ color: "#6EAB36" }}>Brighter</span> and{" "}
            <span style={{ color: "#6EAB36" }}>Healthy</span> Future
          </h1>
          <p>
            At our hospital, we are dedicated to providing exceptional medical
            care to our patients and their families. Our experienced team of
            medical professionals, cutting-edge technology, and compassionate
            approach make us a leader in the healthcare industry.
          </p>
        </div>
        <button onClick={() => navigate("/register")}>Book An Appointment →</button>
      </div>

      <div id="services-section" className="services-section">
        <h1>Our Services</h1>
        <p>
          We offer a wide range of medical services to meet the needs of our
          patients. Providing the highest quality care in a comfortable and
          welcoming environment.
        </p>
        <div className="services-section_cards">
          <ServiceCard
            image="../src/assets/Services/Cardiology.jpg"
            title="Cardiology"
            description="Comprehensive heart care services."
          />
          <ServiceCard
            image="../src/assets/Services/Neurology.jpg"
            title="Neurology"
            description="Advanced neurological treatments."
          />
          <ServiceCard
            image="../src/assets/Services/Orthopedics.jpg"
            title="Orthopedics"
            description="Expert care for bones and joints."
          />
          <ServiceCard
            image="../src/assets/Services/Pediatrics.jpg"
            title="Pediatrics"
            description="Comprehensive care for children."
          />
          <ServiceCard
            image="../src/assets/Services/Dermatology.jpg"
            title="Dermatology"
            description="Skin care and treatments."
          />
          <ServiceCard
            image="../src/assets/Services/Radiology.jpg"
            title="Radiology"
            description="State-of-the-art imaging services."
          />
        </div>
      </div>

      <div id="testimonials-section" className="testimonials-section">
        <h1>Testimonials</h1>
        <p>
          We offer a wide range of medical services to meet the needs of our
          patients. Providing the highest quality care in a comfortable and
          welcoming environment.
        </p>
        <div className="testimonials-section_cards">
          <TestimonialCard
            image="../src/assets/Testimonials/pfp-1.jpg"
            title="Amazing Service"
            description="The staff was incredibly helpful and professional. Highly recommend!"
            name="John Doe"
            role="CEO at TechCorp"
          />
          <TestimonialCard
            image="../src/assets/Testimonials/pfp-2.jpeg"
            title="Exceptional Care"
            description="I felt very comfortable and well taken care of during my visit."
            name="Jameela Mars"
            role="Manager at HealthPlus"
          />
          <TestimonialCard
            image="../src/assets/Testimonials/pfp-3.jpg"
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
