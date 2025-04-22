import React from 'react';
import { Link } from 'react-router-dom';

const DoctorPanel = () => (
  <div>
    <h1>Welcome to the Doctor Appointment App</h1>
    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
  </div>
);

export default DoctorPanel;
