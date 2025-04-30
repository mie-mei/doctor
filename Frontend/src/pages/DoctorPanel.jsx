import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { LogoutButton } from "../components/LogoutButton";
import { checkAuth } from "../utilities/CheckAuth";
import "../styles/pages/DoctorPanel.css";
import toast from "react-hot-toast";


const DoctorPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyUser() {
      const auth = await checkAuth();

      if (!auth.authenticated) {
        navigate("/login");
        toast.error("You must log in first!");
      } else if (auth.role !== "doctor") {
        navigate("/patient-panel");
        toast.success("You are not authorized to access this page!");
      }
    }

    verifyUser();
  }, [navigate]);


  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [isAddingAvailability, setIsAddingAvailability] = useState(false);
  const [newAvailability, setNewAvailability] = useState({
    week_day: "Monday",
    start_time: "09:00",
    end_time: "17:00",
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching appointments
    setAppointments([
      {
        appointment_id: 1,
        patient_name: "John Smith",
        date: "2025-04-25",
        time: "10:00 AM",
        reason: "Annual checkup",
      },
      {
        appointment_id: 2,
        patient_name: "Sarah Johnson",
        date: "2025-04-26",
        time: "2:30 PM",
        reason: "Follow-up consultation",
      },
      {
        appointment_id: 3,
        patient_name: "Michael Brown",
        date: "2025-04-27",
        time: "11:15 AM",
        reason: "Prescription renewal",
      },
    ]);

    // Simulate fetching availability
    setAvailability([
      {
        availabaility_id: 1,
        week_day: "Monday",
        start_time: "09:00",
        end_time: "17:00",
      },
      {
        availabaility_id: 2,
        week_day: "Tuesday",
        start_time: "09:00",
        end_time: "17:00",
      },
      {
        availabaility_id: 3,
        week_day: "Wednesday",
        start_time: "09:00",
        end_time: "17:00",
      },
      {
        availabaility_id: 4,
        week_day: "Thursday",
        start_time: "09:00",
        end_time: "17:00",
      },
      {
        availabaility_id: 5,
        week_day: "Friday",
        start_time: "09:00",
        end_time: "13:00",
      },
    ]);
  }, []);

  const handleAddAvailability = () => {
    // In a real app, this would send a POST request to the server
    const newAvailabilityItem = {
      availabaility_id: availability.length + 1,
      ...newAvailability,
    };
    setAvailability([...availability, newAvailabilityItem]);
    setIsAddingAvailability(false);
    setNewAvailability({
      week_day: "Monday",
      start_time: "09:00",
      end_time: "17:00",
    });
  };

  const handleDeleteAvailability = (id) => {
    // In a real app, this would send a DELETE request to the server
    setAvailability(
      availability.filter((item) => item.availabaility_id !== id)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvailability({
      ...newAvailability,
      [name]: value,
    });
  };

  return (
    <div className="doctor-panel">
      <header className="panel-header">
        <Logo />
        <div className="user-info">
          <span className="user-name">Dr. Mohammed</span>
          <LogoutButton /> {/* Use the LogoutButton component here */}
        </div>
      </header>

      <div className="panel-container">
        <aside className="panel-sidebar">
          <nav className="panel-nav">
            <button
              className={`nav-button ${
                activeTab === "appointments" ? "active" : ""
              }`}
              onClick={() => setActiveTab("appointments")}
            >
              Appointments
            </button>
            <button
              className={`nav-button ${
                activeTab === "availability" ? "active" : ""
              }`}
              onClick={() => setActiveTab("availability")}
            >
              Availability
            </button>
            <button
              className={`nav-button ${
                activeTab === "patients" ? "active" : ""
              }`}
              onClick={() => setActiveTab("patients")}
            >
              Patients
            </button>
          </nav>
        </aside>

        <main className="panel-content">
          {activeTab === "appointments" && (
            <div className="appointments-section">
              <h2>Upcoming Appointments</h2>
              <div className="appointments-list">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      className="appointment-card"
                      key={appointment.appointment_id}
                    >
                      <div className="appointment-header">
                        <h3>{appointment.patient_name}</h3>
                        <span className="appointment-date">
                          {appointment.date}
                        </span>
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
                        <button className="action-button cancel">Cancel</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-data-message">No upcoming appointments</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "availability" && (
            <div className="availability-section">
              <div className="section-header">
                <h2>Manage Your Availability</h2>
                <button
                  className="add-button"
                  onClick={() => setIsAddingAvailability(true)}
                >
                  Add New Availability
                </button>
              </div>

              {isAddingAvailability && (
                <div className="add-availability-form">
                  <h3>Add New Availability</h3>
                  <div className="form-group">
                    <label>Day of Week:</label>
                    <select
                      name="week_day"
                      value={newAvailability.week_day}
                      onChange={handleInputChange}
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start Time:</label>
                    <input
                      type="time"
                      name="start_time"
                      value={newAvailability.start_time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time:</label>
                    <input
                      type="time"
                      name="end_time"
                      value={newAvailability.end_time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      className="cancel-button"
                      onClick={() => setIsAddingAvailability(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="save-button"
                      onClick={handleAddAvailability}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              <div className="availability-list">
                <div className="availability-header">
                  <span className="day-column">Day</span>
                  <span className="time-column">Hours</span>
                  <span className="actions-column">Actions</span>
                </div>
                {availability.map((item) => (
                  <div
                    className="availability-item"
                    key={item.availabaility_id}
                  >
                    <span className="day-column">{item.week_day}</span>
                    <span className="time-column">
                      {item.start_time} - {item.end_time}
                    </span>
                    <span className="actions-column">
                      <button className="edit-button">Edit</button>
                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDeleteAvailability(item.availabaility_id)
                        }
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "patients" && (
            <div className="patients-section">
              <h2>Your Patients</h2>
              <div className="patients-list">
                <div className="patient-card">
                  <div className="patient-info">
                    <h3>John Smith</h3>
                    <p>
                      <strong>Email:</strong> john.smith@example.com
                    </p>
                    <p>
                      <strong>Last Visit:</strong> April 25, 2025
                    </p>
                  </div>
                  <div className="patient-actions">
                    <button className="action-button">View History</button>
                    <button className="action-button">Contact</button>
                  </div>
                </div>
                <div className="patient-card">
                  <div className="patient-info">
                    <h3>Sarah Johnson</h3>
                    <p>
                      <strong>Email:</strong> sarah.j@example.com
                    </p>
                    <p>
                      <strong>Last Visit:</strong> April 26, 2025
                    </p>
                  </div>
                  <div className="patient-actions">
                    <button className="action-button">View History</button>
                    <button className="action-button">Contact</button>
                  </div>
                </div>
                <div className="patient-card">
                  <div className="patient-info">
                    <h3>Michael Brown</h3>
                    <p>
                      <strong>Email:</strong> michael.b@example.com
                    </p>
                    <p>
                      <strong>Last Visit:</strong> April 27, 2025
                    </p>
                  </div>
                  <div className="patient-actions">
                    <button className="action-button">View History</button>
                    <button className="action-button">Contact</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorPanel;
