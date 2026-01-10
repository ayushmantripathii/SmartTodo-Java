import ThemeToggle from "./ThemeToggle";

export default function Header({ user, theme, setTheme }) {
  return (
    <header className="header">
      <div>
        <h1>Today</h1>
        <p>{user.email}</p>
      </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
}
