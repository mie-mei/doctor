import { toast } from "react-hot-toast";
import "../styles/components/AppointmentCard.css";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppointmentCard = ({
  appointment,
  panelType,
  onAppointmentCanceled,
  onAppointmentUpdated,
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (!appointment || !appointment.appointment_id) {
      toast.error("Invalid appointment data.");
      return;
    }

    fetch(
      `${backendUrl}routes/appointments.php?id=${appointment.appointment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          console.log("appointment id", appointment.appointment_id);
          toast.success("Appointment canceled successfully.");
          // Trigger a re-fetch of appointments
          if (onAppointmentCanceled) {
            onAppointmentCanceled(appointment.appointment_id);
          }
        } else {
          toast.error("Failed to cancel the appointment.");
        }
      })
      .catch((error) => {
        console.error("Error canceling the appointment:", error);
        toast.error("An error occurred while canceling the appointment.");
      });
  };

  const handleEdit = () => {
    navigate(`/edit-appointment/${appointment.appointment_id}`);
  };

  const handleDone = () => {
    if (!appointment || !appointment.appointment_id) {
      toast.error("Invalid appointment data.");
      return;
    }

    fetch(
      `${backendUrl}routes/appointments.php?id=${appointment.appointment_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Done",
          date: appointment.date,
          time: appointment.time,
          reason: appointment.reason,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Appointment marked as done successfully.");
          // Trigger a re-fetch of appointments
          if (onAppointmentUpdated) {
            onAppointmentUpdated(appointment.appointment_id, {
              status: "done",
            });
          }
        } else {
          toast.error("Failed to mark the appointment as done.");
        }
      })
      .catch((error) => {
        console.error("Error marking the appointment as done:", error);
      });
  };

  return (
    <div className="appointment-card">
      <h3>
        {panelType === "doctor" ? appointment?.patient_name : "Dr. Mohammed"}
      </h3>
      <p>
        <strong>Date:</strong> {appointment?.date}
      </p>
      <p>
        <strong>Time:</strong> {appointment?.time}
      </p>
      <p>
        <strong>Reason:</strong> {appointment?.reason}
      </p>

      {panelType === "doctor" ? (
        <button className="done-button" onClick={handleDone}>
          Mark as Done
        </button>
      ) : (
        <>
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}

      <button className="cancel-button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};
