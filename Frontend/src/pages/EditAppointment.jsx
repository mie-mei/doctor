import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AppointmentForm from "../components/AppointmentForm";

const EditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch appointment details by ID
    fetch(
      `https://doctor-appointments-5pb4.onrender.com/routes/appointments.php?id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.appointment_id) {
          setInitialData({
            weekDay: data.week_day || "Sunday",
            selectedSlot: data.time || "",
            reason: data.reason || "",
          });
          setUserId(data.user_id);
        } else {
          toast.error("Failed to load appointment.");
        }
      });
  }, [id, navigate]);

  const handleEdit = ({ weekDay, selectedSlot, reason, date }) => {
    fetch(
      `http://doctorappointments.atwebpages.com/doctor-appointments/Backend/routes/appointments.php?id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          week_day: weekDay,
          date,
          time: selectedSlot,
          reason,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Appointment updated successfully!");
          navigate("/patient-panel");
        } else {
          toast.error("Failed to update appointment.");
        }
      })
      .catch(() => toast.error("Error updating appointment."));
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div className="patient-panel-root">
      <div className="patient-panel">
        <div className="panel-content">
          <h2>Edit Appointment</h2>
          <AppointmentForm
            userId={userId}
            initialWeekDay={initialData.weekDay}
            initialSelectedSlot={initialData.selectedSlot}
            initialReason={initialData.reason}
            onSubmit={handleEdit}
            isEdit
          />
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;
