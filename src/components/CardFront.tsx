import "../scss/form.scss";
import "../index.css";
import React,{useState} from "react";
import { UserDetails } from "../types/UserDetails";
import { useUser } from "../context/UserContext";


export const CardFront: React.FC = () => {
  const { setUser } = useUser(); // Get the setUser function from the context
  
  const [formData, setFormData] = useState<UserDetails>({
    email: "",
    password: ""
    // name: ""
  });

  const [message, setMessage] = useState(""); // To display success or error messages

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
      const response = await fetch(`https://dreamnote-go.onrender.com/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert state to JSON string
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Login successful! Welcome back!");
        console.log("Success:", result);
        setUser(formData);
      } else {
        const error = await response.json();
        setMessage(`Login failed: ${error.message || "Unknown error"}`);
        console.error("Error:", error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Login failed: ${error.message}`);
        console.error("Request failed:", error);
      } else {
        setMessage("Login failed: An unknown error occurred.");
        console.error("Request failed:", error);
      }
    }
  };

  return (
    <div className="flip-card">
      <div className="title">
        <b>Log in</b>
      </div>
      <form onSubmit={handleSubmit} className="flip-card-form">
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
        <button className="flip-card-btn">Let`s go!</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};
