import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const submit = () => {
    if (!title.trim()) return;
    onAdd(title, dueDate);
    setTitle("");
    setDueDate("");
  };

  return (
    <div className="add-task">
      <input
        placeholder="What needs your focus today?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button onClick={submit}>Add Task ✨</button>
    </div>
  );
}
