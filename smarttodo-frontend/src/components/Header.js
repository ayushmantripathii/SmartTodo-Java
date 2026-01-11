import "./Header.css";

function Header({ user, theme, setTheme, view }) {
  const pageTitle =
    view === "tasks"
      ? "Tasks"
      : view === "upcoming"
      ? "Upcoming"
      : "Completed";

  return (
    <header className="header">
      <div>
        <h1>{pageTitle}</h1>
        <p>{user.email}</p>
      </div>

      <button
        className="theme-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌞 Light" : "🌙 Dark"}
      </button>
    </header>
  );
}

export default Header;
