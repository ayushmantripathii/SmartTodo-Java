import { supabase } from "../supabaseClient";
import "./Header.css";

export default function Header() {
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="header">
      <h2>Nucleus Tasks</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
