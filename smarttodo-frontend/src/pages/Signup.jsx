import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Login.css";

export default function Signup({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Account created! Check your email.");
    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="glass-card">
        <h1 className="logo">Nucleus</h1>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleSignup} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <button className="secondary-btn" onClick={goToLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
