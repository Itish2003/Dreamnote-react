import "../scss/form.scss";
import "../index.css";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { UserDetails } from "../types/UserDetails";

export const CardBack: React.FC = () => {
  const { setUser } = useUser(); // Get the setUser function from the context

  const [formData, setFormData] = useState<UserDetails>({
    name: "",
    email: "",
    password: "",
  });

  // const [message, setMessage] = useState(""); // To display success or error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(`https://dreamnote-go.onrender.com/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert state to JSON string
      });

      if (response.ok) {
        const result = await response.json();
        // setMessage("Signup successful! Welcome!");
        console.log("Success:", result);
        // Save user details to global context
        setUser(formData);
      } else {
        const error = await response.json();
        // setMessage(`Signup failed: ${error.message || "Unknown error"}`);
        console.error("Error:", error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // setMessage(`Signup failed: ${error.message}`);
        console.error("Request failed:", error);
      } else {
        // setMessage("Signup failed: An unknown error occurred.");
        console.error("Request failed:", error);
      }
    }
  };

  return (
    <div className="flip-card">
          <div className="title">
            <b>Sign Up</b>
          </div>
          <form onSubmit={handleSubmit} className="flip-card-form">
          <input
              className="flip-card-input"
              name="name"
              placeholder="Name"
              type="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="flip-card-input"
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="flip-card-input"
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="flip-card-btn">Confirm!</button>
          </form>
          {/* {message && <p className="form-message">{message}</p>} */}
        </div>
  )
}
