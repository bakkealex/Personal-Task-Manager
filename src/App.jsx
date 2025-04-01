import React, { useState, useEffect, useCallback } from "react";
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

  // Memoize the addTask function to avoid unnecessary re-renders
  const addTask = useCallback((taskDescription) => {
    const newTask = {
      id: Date.now(),
      description: taskDescription,
      isCompleted: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  // Memoize the deleteTask function
  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // Memoize the toggleTaskCompletion function
  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, []);

  // Memoize the saveTask function
  const saveTask = useCallback((taskId, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  }, []);

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
