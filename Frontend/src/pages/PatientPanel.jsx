import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { LogoutButton } from "../components/LogoutButton";
import { AppointmentCard } from "../components/AppointmentCard";
import { toast } from "react-hot-toast";
import { checkAuth } from "../utilities/CheckAuth";
import "../styles/pages/PatientPanel.css";
import AppointmentForm from "../components/AppointmentForm";

const PatientPanel = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function verifyUser() {
      const auth = await checkAuth();
      if (!auth.authenticated || auth.role !== "patient") {
        navigate("/login");
        return;
      }
      setUserId(auth.user_id);
      setUserName(auth.name);

      fetch(
        `http://localhost/doctor-appointments/backend/routes/appointments.php?user_id=${auth.user_id}`,
        { method: "GET", credentials: "include" }
      )
        .then((res) => res.json())
        .then(setAppointments)
        .catch(() => toast.error("Failed to fetch appointments."))
        .finally(() => setLoading(false));
    }
    verifyUser();
  }, [navigate]);

  return (
    <div className="patient-panel-root">
      <div className="patient-panel">
        <header className="panel-header">
          <Logo />
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <LogoutButton />
          </div>
        </header>

        <div className="panel-content">
          <h2>Your Appointments</h2>
          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.appointment_id}
                  appointment={appointment}
                  panelType="patient"
                  userId={userId}
                />
              ))}
            </div>
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>

        <div className="panel-content">
          <h2>Book an Appointment</h2>
          <AppointmentForm userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default PatientPanel;
