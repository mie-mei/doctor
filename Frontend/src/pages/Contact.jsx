import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { ContactInfoCard } from "../components/ContactInfoCard";
import "../styles/Contact.css";

export const Contact = () => (
  <>
    <div className="contact-navbar-container">
      <NavBar />
    </div>
    <div className="contact-page">
      <div className="contact-header">
        <img
          src="../src/assets/clinic.png"
          alt="Hospital Building"
          className="contact-header-image"
        />
      </div>

      <div className="contact-info-container">
        <h3>Get In Touch</h3>
        <h1>Contact Us</h1>
        <p>
          We're here to help and answer any questions you might have. We look
          forward to hearing from you.
        </p>

        <div className="contact-grid">
          <div className="contact-info-grid">
            <ContactInfoCard
              icon="📍"
              title="Our Address"
              details={["Alem Bank, Addis Ababa, Ethiopia"]}
            />
            <ContactInfoCard
              icon="✉️"
              title="Email Us"
              details={["drmohammed@gmail.com"]}
            />
            <ContactInfoCard
              icon="📞"
              title="Call Us"
              details={["+251975033303"]}
            />
          </div>

          <div className="contact-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.52909553238!2d31.363192399999996!3d30.050364899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583dd067795321%3A0xd0f37cab7fb5e352!2sDr%20Mohammed%20Abd%20El-Qader%2C%20Al%20Asherah%2C%20Nasr%20City%2C%20Cairo%20Governorate%204442514%2C%20Egypt!5e0!3m2!1sen!2sdz!4v1745360610282!5m2!1sen!2sdz"
              width="100%"
              height="700" /* Increase the height here */
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);
