import "./Sidebar.css";

function Sidebar({ view, setView }) {
  return (
    <>
      <div style={{ padding: "24px 20px", fontWeight: 700, fontSize: 18 }}>
        🧠 Nucleus
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 12px" }}>
        <button className={view === "tasks" ? "nav-item active" : "nav-item"} onClick={() => setView("tasks")}>
          📋 Tasks
        </button>
        <button className={view === "upcoming" ? "nav-item active" : "nav-item"} onClick={() => setView("upcoming")}>
          🗓 Upcoming
        </button>
        <button className={view === "completed" ? "nav-item active" : "nav-item"} onClick={() => setView("completed")}>
          ✅ Completed
        </button>
      </nav>
    </>
  );
}

export default Sidebar;
