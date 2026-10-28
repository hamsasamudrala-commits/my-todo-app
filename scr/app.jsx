import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      },
    ]);

    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-card">
        <h1>My To-Do List</h1>
        <p className="subtitle">
          Plan your day, one task at a time.
        </p>

        <form onSubmit={addTask} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a new task..."
            aria-label="New task"
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="task-summary">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedCount}</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet!</p>
            <p>Add your first task above.</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${
                  task.completed ? "completed" : ""
                }`}
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.text}</span>
                </label>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {tasks.length > 0 && (
          <button
            className="clear-button"
            onClick={() => setTasks([])}
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
