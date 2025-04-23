"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Logo } from "../components/Logo"
import "../styles/PatientPanel.css"

const PatientPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [appointments, setAppointments] = useState([])
  const [doctorAvailability, setDoctorAvailability] = useState([])
  const [isBookingAppointment, setIsBookingAppointment] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    doctor_id: 1,
    date: "",
    time: "",
    reason: "",
  })
  const [selectedDay, setSelectedDay] = useState(null)
  const [availableTimes, setAvailableTimes] = useState([])

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching appointments
    setAppointments([
      {
        appointment_id: 1,
        doctor_name: "Dr. Mohammed",
        date: "2025-04-25",
        time: "10:00 AM",
        reason: "Annual checkup",
        status: "upcoming",
      },
      {
        appointment_id: 2,
        doctor_name: "Dr. Mohammed",
        date: "2025-03-15",
        time: "2:30 PM",
        reason: "Follow-up consultation",
        status: "completed",
      },
    ])

    // Simulate fetching doctor availability
    setDoctorAvailability([
      {
        doctor_id: 1,
        doctor_name: "Dr. Mohammed",
        availability: [
          { day: "Monday", start_time: "09:00", end_time: "17:00" },
          { day: "Tuesday", start_time: "09:00", end_time: "17:00" },
          { day: "Wednesday", start_time: "09:00", end_time: "17:00" },
          { day: "Thursday", start_time: "09:00", end_time: "17:00" },
          { day: "Friday", start_time: "09:00", end_time: "13:00" },
        ],
      },
    ])
  }, [])

  const handleDaySelect = (day) => {
    setSelectedDay(day)

    // Generate available time slots based on doctor's availability
    const doctorSchedule = doctorAvailability[0].availability.find((a) => a.day === day)

    if (doctorSchedule) {
      const start = Number.parseInt(doctorSchedule.start_time.split(":")[0])
      const end = Number.parseInt(doctorSchedule.end_time.split(":")[0])

      const times = []
      for (let hour = start; hour < end; hour++) {
        times.push(`${hour.toString().padStart(2, "0")}:00`)
        times.push(`${hour.toString().padStart(2, "0")}:30`)
      }

      setAvailableTimes(times)
    } else {
      setAvailableTimes([])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    })
  }

  const handleBookAppointment = () => {
    // In a real app, this would send a POST request to the server
    const appointmentDate = new Date(newAppointment.date)
    const formattedDate = appointmentDate.toISOString().split("T")[0]

    const newAppointmentItem = {
      appointment_id: appointments.length + 1,
      doctor_name: "Dr. Mohammed",
      date: formattedDate,
      time: newAppointment.time,
      reason: newAppointment.reason,
      status: "upcoming",
    }

    setAppointments([...appointments, newAppointmentItem])
    setIsBookingAppointment(false)
    setNewAppointment({
      doctor_id: 1,
      date: "",
      time: "",
      reason: "",
    })
    setSelectedDay(null)
    setAvailableTimes([])
  }

  const getUpcomingAppointments = () => {
    return appointments.filter((appointment) => appointment.status === "upcoming")
  }

  const getPastAppointments = () => {
    return appointments.filter((appointment) => appointment.status === "completed")
  }

  return (
    <div className="patient-panel">
      <header className="panel-header">
        <Logo />
        <div className="user-info">
          <span className="user-name">John Smith</span>
          <Link to="/" className="logout-button">
            Logout
          </Link>
        </div>
      </header>

      <div className="panel-container">
        <aside className="panel-sidebar">
          <nav className="panel-nav">
            <button
              className={`nav-button ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`nav-button ${activeTab === "book" ? "active" : ""}`}
              onClick={() => setActiveTab("book")}
            >
              Book Appointment
            </button>
            <button
              className={`nav-button ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Appointment History
            </button>
          </nav>
        </aside>

        <main className="panel-content">
          {activeTab === "dashboard" && (
            <div className="dashboard-section">
              <h2>Your Dashboard</h2>

              <div className="dashboard-summary">
                <div className="summary-card">
                  <h3>Upcoming Appointments</h3>
                  <span className="summary-count">{getUpcomingAppointments().length}</span>
                </div>
                <div className="summary-card">
                  <h3>Past Appointments</h3>
                  <span className="summary-count">{getPastAppointments().length}</span>
                </div>
              </div>

              <div className="upcoming-appointments">
                <h3>Upcoming Appointments</h3>
                {getUpcomingAppointments().length > 0 ? (
                  <div className="appointments-list">
                    {getUpcomingAppointments().map((appointment) => (
                      <div className="appointment-card" key={appointment.appointment_id}>
                        <div className="appointment-header">
                          <h4>{appointment.doctor_name}</h4>
                          <span className="appointment-date">{appointment.date}</span>
                        </div>
                        <div className="appointment-details">
                          <p>
                            <strong>Time:</strong> {appointment.time}
                          </p>
                          <p>
                            <strong>Reason:</strong> {appointment.reason}
                          </p>
                        </div>
                        <div className="appointment-actions">
                          <button className="action-button">Reschedule</button>
                          <button className="action-button cancel">Cancel</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data-message">No upcoming appointments</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "book" && (
            <div className="book-section">
              <h2>Book an Appointment</h2>

              {!isBookingAppointment ? (
                <div className="booking-intro">
                  <p>Ready to schedule your next appointment with Dr. Mohammed?</p>
                  <button className="primary-button" onClick={() => setIsBookingAppointment(true)}>
                    Start Booking
                  </button>
                </div>
              ) : (
                <div className="booking-form">
                  <div className="form-group">
                    <label>Select a Date:</label>
                    <input
                      type="date"
                      name="date"
                      value={newAppointment.date}
                      onChange={(e) => {
                        handleInputChange(e)
                        // Get day of week from selected date
                        const date = new Date(e.target.value)
                        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        const day = days[date.getDay()]
                        handleDaySelect(day)
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {selectedDay && (
                    <>
                      <div className="form-group">
                        <label>Available Time Slots:</label>
                        {availableTimes.length > 0 ? (
                          <div className="time-slots">
                            {availableTimes.map((time, index) => (
                              <button
                                key={index}
                                className={`time-slot ${newAppointment.time === time ? "selected" : ""}`}
                                onClick={() => setNewAppointment({ ...newAppointment, time })}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="no-slots-message">No available time slots for this day</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Reason for Visit:</label>
                        <textarea
                          name="reason"
                          value={newAppointment.reason}
                          onChange={handleInputChange}
                          placeholder="Please describe the reason for your visit"
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="form-actions">
                        <button
                          className="cancel-button"
                          onClick={() => {
                            setIsBookingAppointment(false)
                            setSelectedDay(null)
                            setAvailableTimes([])
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="primary-button"
                          onClick={handleBookAppointment}
                          disabled={!newAppointment.date || !newAppointment.time || !newAppointment.reason}
                        >
                          Book Appointment
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="history-section">
              <h2>Appointment History</h2>

              {getPastAppointments().length > 0 ? (
                <div className="appointments-list">
                  {getPastAppointments().map((appointment) => (
                    <div className="appointment-card past" key={appointment.appointment_id}>
                      <div className="appointment-header">
                        <h4>{appointment.doctor_name}</h4>
                        <span className="appointment-date">{appointment.date}</span>
                      </div>
                      <div className="appointment-details">
                        <p>
                          <strong>Time:</strong> {appointment.time}
                        </p>
                        <p>
                          <strong>Reason:</strong> {appointment.reason}
                        </p>
                      </div>
                      <div className="appointment-actions">
                        <button className="action-button">View Details</button>
                        <button className="action-button secondary">Book Follow-up</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data-message">No appointment history</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default PatientPanel
