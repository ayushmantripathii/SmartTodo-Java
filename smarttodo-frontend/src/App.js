import { Box } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box flex={1} p={4}>
          <AddTask onAdd={addTask} />
          <TaskBoard tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </Box>
      </Box>
    </>
  );
}

export default App;
