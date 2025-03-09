import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import SignupImage from "./images/signup page.png";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    phone: "",
    location: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
      alert("Signup Successful!");

      // Navigate to the appropriate page based on position
      if (formData.position === "engineer") {
        navigate("/site-engineer");
      } else if (formData.position === "surveyor") {
        navigate("/surveyor");
      } else if (formData.position === "admin") {
        navigate("/dashboard");
      } else {
        alert("Invalid position. Please select a valid option.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Name validation
    if (!data.name) {
      errors.name = "Name is required";
    }

    // Position validation
    if (!data.position) {
      errors.position = "Position is required";
    }

    // Phone validation
    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }

    // Location validation
    if (!data.location) {
      errors.location = "Site location is required";
    }

    // Password validation
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  return (
    <div className="signup-page">
      <form id="signup-form" onSubmit={handleSubmit}>
        <h2>Enter relevant details</h2>

        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your position
            </option>
            <option value="engineer">Engineer</option>
            <option value="admin">Admin</option>
            <option value="surveyor">Surveyor</option>
          </select>
          {errors.position && (
            <p className="error-message">{errors.position}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <div>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter your site location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && (
            <p className="error-message">{errors.location}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>

      <div>
        <img src={SignupImage} alt="sign up page" className="signup-image" />
      </div>
    </div>
  );
}

export default SignUp;
