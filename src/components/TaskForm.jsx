import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskDescription.trim()) {
      onAddTask(taskDescription);
      setTaskDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Enter task description"
      />
      <button type="submit" className="btn btn-primary text-nowrap">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
