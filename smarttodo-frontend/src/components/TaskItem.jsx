export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task ${task.completed ? "done" : ""}`}>
      <span onClick={() => onToggle(task)}>
        {task.completed ? "✔️" : "⭕"} {task.title}
        {task.due_date && <small> 📅 {task.due_date}</small>}
      </span>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </div>
  );
}
