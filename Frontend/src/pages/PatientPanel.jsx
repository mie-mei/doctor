import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { LogoutButton } from "../components/LogoutButton";
import { AppointmentCard } from "../components/AppointmentCard";
import { toast } from "react-hot-toast";
import { checkAuth } from "../utilities/CheckAuth";
import "../styles/pages/PatientPanel.css";

const PatientPanel = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekDay, setWeekDay] = useState("Sunday");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");
  const [userId, setUserId] = useState(null);
  const [nextDate, setNextDate] = useState("");

  useEffect(() => {
    async function verifyUser() {
      const auth = await checkAuth();
      if (!auth.authenticated || auth.role !== "patient") {
        navigate("/login");
        toast.error("Unauthorized access!");
        return;
      }
      setUserId(auth.user_id);

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

  const fetchAvailableSlots = () => {
    fetch(
      `http://localhost/doctor-appointments/backend/routes/availability.php?week_day=${weekDay}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAvailableSlots(data.slots);
        setNextDate(data.date);
      })
      .catch(() => toast.error("Failed to fetch available slots."));
  };

  const createAppointment = () => {
    if (!selectedSlot || !reason) {
      toast.error("Please select a slot and provide a reason.");
      return;
    }

    fetch(
      "http://localhost/doctor-appointments/backend/routes/appointments.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          date: nextDate,
          time: selectedSlot,
          reason,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Appointment created successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to create appointment.");
        }
      })
      .catch(() => toast.error("Error creating appointment."));
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
              />
            ))}
          </div>
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>

      <div className="panel-content">
        <h2>Book an Appointment</h2>
        <div>
          <label>Day:</label>
          <select value={weekDay} onChange={(e) => setWeekDay(e.target.value)}>
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map(
              (day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              )
            )}
          </select>
        </div>
        <button onClick={fetchAvailableSlots}>Check Available Slots</button>
        <div>
          <label>Available Slots:</label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
          >
            <option value="">Select a slot</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button onClick={createAppointment}>Book Appointment</button>
      </div>
    </div>
  );
};

export default PatientPanel;
