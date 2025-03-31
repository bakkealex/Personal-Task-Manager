import React from "react";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task-item mb-2 ${task.isCompleted ? "text-muted" : ""}`}
      style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}
    >
      <span>{task.description}</span>
      <div className="float-end">
        <button
          className={`btn btn-${
            task.isCompleted ? "secondary" : "success"
          } btn-sm me-2`}
          onClick={() => onToggle(task.id)}
        >
          {task.isCompleted ? "Undo" : "Done"}
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
