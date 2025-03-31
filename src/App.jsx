import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const addTask = (taskDescription) => {
    const newTask = {
      id: Date.now(),
      description: taskDescription,
      isCompleted: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  useEffect(() => {
    // Sync tasks to localStorage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Personal Task Manager</h1>
      <div className="card mb-4">
        <div className="card-header">Add a New Task</div>
        <div className="card-body">
          <TaskForm onAddTask={addTask} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Your Tasks</div>
        <div className="card-body">
          <TaskList
            tasks={tasks}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTaskCompletion}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
