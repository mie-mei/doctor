"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { NavBar } from "../components/NavBar"
import { Footer } from "../components/Footer"
import "../styles/Login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "patient",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // For preview purposes, navigate to the appropriate panel based on user type
    if (formData.userType === "doctor") {
      navigate("/doctor-panel")
    } else {
      navigate("/patient-panel")
    }
  }

  return (
    <>
      <NavBar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account to continue</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>I am a:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    checked={formData.userType === "patient"}
                    onChange={handleChange}
                  />
                  <span>Patient</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="doctor"
                    checked={formData.userType === "doctor"}
                    onChange={handleChange}
                  />
                  <span>Doctor</span>
                </label>
              </div>
            </div>

            <div className="form-group forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
