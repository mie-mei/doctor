import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "../styles/components/AppointmentForm.css";

const AppointmentForm = ({
  userId,
  initialWeekDay = "Sunday",
  initialSelectedSlot = "",
  initialReason = "",
  onSubmit,
  isEdit = false,
}) => {
  const [weekDay, setWeekDay] = useState(initialWeekDay);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);
  const [reason, setReason] = useState(initialReason);
  const [nextDate, setNextDate] = useState("");

  useEffect(() => {
    setWeekDay(initialWeekDay);
    setSelectedSlot(initialSelectedSlot);
    setReason(initialReason);
  }, [initialWeekDay, initialSelectedSlot, initialReason]);

  const fetchAvailableSlots = () => {
    fetch(
      `http://doctorappointments.atwebpages.com/doctor-appointments/Backend/routes/availability.php?week_day=${weekDay}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAvailableSlots(data.slots);
        setNextDate(data.date);
      })
      .catch(() => toast.error("Failed to fetch available slots."));
  };

  const handleSubmit = () => {
    if (!selectedSlot || !reason) {
      toast.error("Please select a slot and provide a reason.");
      return;
    }
    if (onSubmit) {
      onSubmit({ weekDay, selectedSlot, reason, date: nextDate });
    } else {
      // Default create appointment logic
      fetch(
        "http://doctorappointments.atwebpages.com/doctor-appointments/Backend/routes/appointments.php",
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
    }
  };

  return (
    <div className="booking-form">
      <div className="form-group">
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
      <button className="check-slots-button" onClick={fetchAvailableSlots}>
        Check Available Slots
      </button>
      <div className="available-slots-container">
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
      <div className="form-group">
        <label>Reason:</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please describe the reason for your appointment..."
        />
      </div>
      <button className="book-button" onClick={handleSubmit}>
        {isEdit ? "Save Changes" : "Book Appointment"}
      </button>
    </div>
  );
};

export default AppointmentForm;
