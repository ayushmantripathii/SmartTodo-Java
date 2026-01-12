import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const submit = () => {
    onAdd(title, dueDate);
    setTitle("");
    setDueDate("");
  };

  return (
  <div className="task-input-wrapper">
    {/* existing AddTask content */}
  </div>
);

}
