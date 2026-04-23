import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "./service/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

     
      if (!res.ok || !data.token) {
        alert(data.message || "Login failed");
        return;
      }

      
      localStorage.setItem("token", data.token);

      alert("Login successful");

      
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
}

export default Login;