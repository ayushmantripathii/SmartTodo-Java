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
  const [theme, setTheme] = useState("light");

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

  if (!user) {
    return <div className="login">Please login first</div>;
  }

  return (
    <div className={`app ${theme}`}>
      <Sidebar />

      <div className="content">
        <Header user={user} theme={theme} setTheme={setTheme} />

        <AddTask onAdd={addTask} />

        <TaskBoard 
          tasks={tasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
        />
      </div>
    </div>
  );
}

export default App;
