import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/", { replace: true });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default  LoginPage