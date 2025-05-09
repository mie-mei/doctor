import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { checkAuth } from "../utilities/CheckAuth";
import "../styles/pages/Registration.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyUser() {
      const auth = await checkAuth();
      if (auth.authenticated) {
        navigate(`/${auth.role}-panel`);
      }
    }
    verifyUser();
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      "https://doctor-appointments-5pb4.onrender.com/routes/auth/login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          navigate(`/${data.role}-panel`);
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch(() => toast.error("Failed to log in."));
  };

  return (
    <div className="registration-page">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
    </div>
  );
};

export default Login;
