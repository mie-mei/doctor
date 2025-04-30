import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { LogoutButton } from "../components/LogoutButton";
import { AppointmentCard } from "../components/AppointmentCard"; // Import AppointmentCard
import { toast } from "react-hot-toast"; // Import toast
import "../styles/pages/PatientPanel.css";

const PatientPanel = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments for the logged-in user
  useEffect(() => {
    fetch(
      "http://localhost/doctor-appointments/backend/routes/auth/checkAuth.php",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((authResponse) => authResponse.json())
      .then((authData) => {
        console.log("User ID:", authData.user_id);

        if (!authData.authenticated || authData.role !== "patient") {
          navigate("/login");
          toast.error("You must log in as a patient to access this page.");
          throw new Error("Unauthorized access");
        }

        // Fetch appointments for the user
        return fetch(
          `http://localhost/doctor-appointments/backend/routes/appointments.php?user_id=${authData.user_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
      })
      .then((appointmentsResponse) => appointmentsResponse.json())
      .then((appointmentsData) => {
        console.log("Fetched appointments:", appointmentsData);
        setAppointments(appointmentsData);
        toast.success("Appointments loaded successfully!");
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleCancel = (appointment) => {
    console.log("Canceling appointment:", appointment);
    toast.success(`Appointment with ${appointment.patient_name} canceled.`);
    // Add logic to cancel the appointment (e.g., send a DELETE request to the backend)
  };

  return (
    <div className="patient-panel">
      <header className="panel-header">
        <Logo />
        <div className="user-info">
          <span className="user-name">Patient Panel</span>
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
                onCancel={handleCancel} // Pass the cancel handler
              />
            ))}
          </div>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
};

export default PatientPanel;
