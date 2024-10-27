import React, { useState } from "react";
// import "./Done.css";
import images from "./images/bg-desktop-dark.jpg";
import x from "./images/icon-cross.svg";
// import { ReactComponent as Sun } from "./images/Sun.svg";
// import { ReactComponent as Moon } from "./images/Moon.svg";

const Done = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim()) {
      const newTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(newTasks);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const clearCompletedTasks = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  };

  const selective = (hold) => {
    const select_work = tasks.filter((task) => task.completed);
  };

  const getFilteredTasks = () => {
    if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    } else if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  };

  return (
    <div>
      <img src={images} alt="no background" className="main-back" />
      <div className="container">
        <h1>TODO</h1>
        <div className="input-section">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {getFilteredTasks().map((task, index) => (
            <li key={index} className="task-item">
              <input type="checkbox" checked={task.completed} />
              <span className={task.completed ? "completed-text" : ""}>
                {task.text}
              </span>

              <div class="delete-button" onClick={() => deleteTask(index)}>
                <img src={x} alt="no delete button" />
              </div>
            </li>
          ))}
        </ul>

        <div className="filter-section">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={clearCompletedTasks}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Done;
