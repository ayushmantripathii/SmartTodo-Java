import TaskItem from "./TaskItem";

export default function TaskBoard({ tasks, onToggle, onDelete }) {
  return (
    <div className="task-board">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
