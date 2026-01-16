export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "done" : ""}`}>
      
      <div className="task-left">
        <span
          className="task-check"
          onClick={() => onToggle(task)}
        >
          {task.completed && <div className="check-fill" />}
        </span>

        <div className="task-content">
          <div className="task-title">{task.title}</div>
          {task.due_date && (
            <div className="task-date">Due {task.due_date}</div>
          )}
        </div>
      </div>

      <button
        className="task-delete"
        onClick={() => onDelete(task.id)}
      >
        🗑
      </button>

    </div>
  );
}
