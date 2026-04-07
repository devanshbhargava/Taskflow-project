import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
  e.preventDefault();

  const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  console.log("LOGIN RESPONSE:", data); // 🔍 DEBUG

  // ✅ CHECK BEFORE SAVING
  if (!res.ok || !data.token) {
    alert(data.message || "Login failed");
    return;
  }

  // ✅ STORE TOKEN
  localStorage.setItem("token", data.token);

  alert("Login successful");

  // ✅ REDIRECT (IMPORTANT)
  window.location.href = "/dashboard";
}

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </form>
  );
}


export default Login;