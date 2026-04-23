import { useState } from "react";
import { API_URL } from "./service/api"; // ✅ use central API

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      console.log("SIGNUP RESPONSE:", data);

     
      if (!res.ok || !data.token) {
        alert(data.message || "Signup failed");
        return;
      }

      
      localStorage.setItem("token", data.token);

      alert("Signup successful");

      
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      alert("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;