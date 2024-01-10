import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css"; // Create this CSS file for styling

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dev-gallery-qwds.onrender.com/login",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      // Handle login success (e.g., redirect, store token)
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
