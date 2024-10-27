import { Outlet } from "react-router-dom";
import React, { useState } from "react";
// import "./Todo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [task, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const successNotification = (successMsg) => toast.success(successMsg);
  const errorNotification = (errorMsg) => toast.error(errorMsg);

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (!newTask) {
      errorNotification("Todo cannot be empty!");
      return;
    }
    if (newTask.trim() !== "") {
      setTasks([...task, newTask]);
      setNewTask("");
    }
    successNotification("New todo added successfully");
  }
  function editTask(index) {
    const newEdit = prompt("Edit your task:", task[index]);
    if (newEdit !== null && newEdit.trim() !== "") {
      const updatedTasks = task.map((element, i) =>
        i === index ? newEdit : element
      );
      setTasks(updatedTasks);
    }
  }

  function deleteTask(index) {
    const updatedTask = task.filter((element, i) => i !== index);
    setTasks(updatedTask);
  }

  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={500} />
      <Outlet />

      <input
        type="text"
        placeholder="Enter a task..."
        value={newTask}
        onChange={handleInputChange}
      />

      <button className="add-button" onClick={addTask} Add>
        Add Task
      </button>

      <ol>
        {task.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <div className="button-house">
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button className="delete-button" onClick={() => editTask(index)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todo;
