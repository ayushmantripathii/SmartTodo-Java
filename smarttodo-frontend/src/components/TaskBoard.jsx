import TaskItem from "./TaskItem";

export default function TaskBoard({ tasks = [], onToggle, onDelete }) {
  return (
    <div className="task-board">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p style={{ padding: "1rem", color: "#777" }}>
          No tasks yet. Add your first task ✨
        </p>
      )}
    </div>
  );
}
