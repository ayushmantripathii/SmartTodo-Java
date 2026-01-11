import "./Sidebar.css";

function Sidebar({ setView }) {
  return (
    <aside className="sidebar">
      <div className="logo">🧠 Nucleus</div>

      <nav className="menu">
        <button onClick={() => setView("tasks")}>
          📋 <span>Tasks</span>
        </button>

        <button onClick={() => setView("upcoming")}>
          🗓️ <span>Upcoming</span>
        </button>

        <button onClick={() => setView("completed")}>
          ✅ <span>Completed</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
