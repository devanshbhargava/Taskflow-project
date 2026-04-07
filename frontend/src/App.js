import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashbord";
import ProtectedRoute from "./protectedroutes";
import cors from "cors";

app.use(cors({
  origin: "https://taskflow-project-cj1v-lsghrvlso-devansh6.vercel.app",
  credentials: true
}));

function App() {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;