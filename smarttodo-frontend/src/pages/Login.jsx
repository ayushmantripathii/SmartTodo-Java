import { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Login.css";

export default function Login({ goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  }

  async function handleGoogle() {
   await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: window.location.origin,
  },
});

  }

  return (
    <div className="login-page">
      <div className="liquid-bg" />
      <div className="glass-card">
       <h1 className="logo">Nucleus</h1>
<p className="tagline">Do more, stress less.</p>


        <input
          className="glow-input"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="glow-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <button className="secondary-btn" onClick={goToSignup}>
          Sign Up
        </button>
<div className="divider">or continue with</div>

        <div className="social-row">
          <span className="google-btn" onClick={handleGoogle}>G</span>
        </div>
      </div>
    </div>
  );
}
