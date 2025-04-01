import React from "react";
import TaskItem from "./TaskItem";

const TaskList = React.memo(
  ({ tasks, onDeleteTask, onToggleTask, onEditTask }) => {
    return (
      <div>
        {tasks.length === 0 ? (
          <p>No tasks available. Please add a new task.</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onToggle={onToggleTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    );
  }
);

export default TaskList;
