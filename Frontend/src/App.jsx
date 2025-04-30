import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home.jsx"
import { Contact } from "./pages/Contact.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DoctorPanel from "./pages/DoctorPanel.jsx"
import PatientPanel from "./pages/PatientPanel.jsx"
import "./App.css"

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-panel" element={<DoctorPanel />} />
        <Route path="/patient-panel" element={<PatientPanel />} />
      </Routes>
    </Router>
  )
}

export default App
