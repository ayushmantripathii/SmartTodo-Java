import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./pages/MainLayout";

function App() {
  const [session, setSession] = useState(null);
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading…</div>;
  }

  // Always start on auth screen (your requirement)
  if (!session) {
    return page === "signup" ? (
      <Signup goToLogin={() => setPage("login")} />
    ) : (
      <Login goToSignup={() => setPage("signup")} />
    );
  }

  return <MainLayout />;
}

export default App;
