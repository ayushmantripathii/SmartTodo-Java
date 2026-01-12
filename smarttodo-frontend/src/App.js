import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskBoard from "./components/TaskBoard";

import "./styles/theme.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("tasks");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Load user & tasks
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        fetchTasks();
      }
    };
    loadUser();
  }, []);

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setTasks(data);
  };

  const addTask = async (title, dueDate) => {
    if (!title) return;

    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("tasks").insert([
      { title, due_date: dueDate, user_id: user.id }
    ]);

    fetchTasks();
  };

  const toggleTask = async (task) => {
    await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  // Page filters
  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks.filter(task => {
    if (view === "tasks") return !task.completed;
    if (view === "completed") return task.completed;
    if (view === "upcoming") {
      if (!task.due_date) return false;
      return !task.completed && task.due_date >= today;
    }
    return false;
  });

  if (!user) {
    return <div className="login">Please login first</div>;
  }

  return (
  <div className="app">
    <div className="topbar">
      <div style={{ fontWeight: 700, fontSize: 18 }}>🧠 Nucleus</div>
      <Header user={user} theme={theme} setTheme={setTheme} view={view} />
    </div>

    <div className="shell">
      <div className="nav">
        <Sidebar setView={setView} />
      </div>

      <div className="page">
        <div className="page-inner">
          <AddTask onAdd={addTask} />
          <TaskBoard
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  </div>
);

}

export default App;
