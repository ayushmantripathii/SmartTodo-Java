import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskBoard({ tasks, onToggle, onDelete }) {
  return (
    <div className="app-page">
      <div className="app-page-inner">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "done" : ""}`}
          >
            <div className="task-left">
              <div className="task-check" onClick={() => onToggle(task.id)}>
                {task.completed && <div className="check-fill" />}
              </div>

              <div className="task-title">{task.title}</div>
            </div>

          <Button
  size="xs"
  color="red"
  variant="subtle"
  onClick={() => onDelete(task.id)}
>
  Delete
</Button>

          </div>
        ))}
      </div>
    </div>
  );
}
