import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import DoctorPanel from "./pages/DoctorPanel.jsx";
import PatientPanel from "./pages/PatientPanel.jsx";
import "./App.css";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor" element={<DoctorPanel />} />
          <Route path="/patient" element={<PatientPanel />} />
        </Routes>
    </Router>
  );
}

export default App;
