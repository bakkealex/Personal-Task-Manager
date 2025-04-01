import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Set Edit Task state
  const [editingTask, setEditingTask] = useState(null);

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskDescription) => {
    const newTask = {
      id: Date.now(),
      description: taskDescription,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const saveTask = (taskId, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  };

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
            onEditTask={setEditingTask}
          />
        </div>
      </div>
      <Modal
        show={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onSave={saveTask}
      />
    </div>
  );
}

export default App;
