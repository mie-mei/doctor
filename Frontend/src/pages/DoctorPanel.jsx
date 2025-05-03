import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { LogoutButton } from "../components/LogoutButton";
import { AppointmentCard } from "../components/AppointmentCard";
import { PatientCard } from "../components/PatientCard";
import { checkAuth } from "../utilities/CheckAuth";
import "../styles/pages/DoctorPanel.css";
import toast from "react-hot-toast";

const DoctorPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function verifyUser() {
      const auth = await checkAuth();
      if (!auth.authenticated || auth.role !== "doctor") {
        navigate("/login");
        toast.error("Unauthorized access!");
      }
    }
    verifyUser();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === "appointments") {
      fetch(
        "http://localhost/doctor-appointments/backend/routes/appointments.php",
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then(setAppointments)
        .catch(() => toast.error("Failed to fetch appointments."));
    } else if (activeTab === "availability") {
      fetch(
        "http://localhost/doctor-appointments/backend/routes/availability.php",
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then(setAvailability)
        .catch(() => toast.error("Failed to fetch availability."));
    } else if (activeTab === "patients") {
      fetch(
        "http://localhost/doctor-appointments/backend/routes/auth/users.php?role=patient"
      )
        .then((res) => res.json())
        .then(setPatients)
        .catch(() => toast.error("Failed to fetch patients."));
    }
  }, [activeTab]);

  return (
    <div className="doctor-panel">
      <header className="panel-header">
        <Logo />
        <div className="user-info">
          <span className="user-name">Dr. Mohammed</span>
          <LogoutButton />
        </div>
      </header>

      <div className="panel-container">
        <aside className="panel-sidebar">
          <nav className="panel-nav">
            {["appointments", "availability", "patients"].map((tab) => (
              <button
                key={tab}
                className={`nav-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </aside>

        <main className="panel-content">
          {activeTab === "appointments" && (
            <div className="appointments-section">
              <h2>Upcoming Appointments</h2>
              <div className="appointments-list">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.appointment_id}
                      appointment={appointment}
                    />
                  ))
                ) : (
                  <p>No upcoming appointments</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "availability" && (
            <div className="availability-section">
              <h2>Manage Your Availability</h2>
              <div className="availability-list">
                {availability.length > 0 ? (
                  availability.map((item, index) => (
                    <div key={index}>
                      {item.week_day}: {item.start_time} - {item.end_time}
                    </div>
                  ))
                ) : (
                  <p>No availability data found.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "patients" && (
            <div className="patients-section">
              <h2>Your Patients</h2>
              <div className="patients-list">
                {patients.map((patient) => (
                  <PatientCard key={patient.user_id} patient={patient} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorPanel;
