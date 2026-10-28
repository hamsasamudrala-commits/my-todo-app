
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("my-todo-tasks") || "[]");
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("my-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(event) {
    event.preventDefault();
    if (!input.trim()) return;

    setTasks((old) => [
      ...old,
      { id: Date.now(), title: input.trim(), completed: false }
    ]);
    setInput("");
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const remaining = tasks.filter((task) => !task.completed).length;
  const completed = tasks.length - remaining;

  return (
    <main className="page">
      <header className="heading">
        <div className="logo">✓</div>
        <h1>My Tasks</h1>
        <p>Plan your day. Make progress.</p>
      </header>

      <section className="task-card">
        <form className="add-form" onSubmit={addTask}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you need to do?"
            aria-label="New task"
          />
          <button className="add-button" type="submit">+ Add</button>
        </form>

        <div className="counts">
          <span>{remaining} remaining</span>
          <span>{completed} completed</span>
        </div>

        <nav className="filters">
          {["All", "Active", "Completed"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "selected" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id} className={`task ${task.completed ? "done" : ""}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  setTasks((old) =>
                    old.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
              />
              <span className="task-title">{task.title}</span>
              <button
                type="button"
                className="delete"
                aria-label={`Delete ${task.title}`}
                onClick={() =>
                  setTasks((old) => old.filter((t) => t.id !== task.id))
                }
              >
                ×
              </button>
            </li>
          ))}
          {visibleTasks.length === 0 && (
            <li className="empty">No tasks yet. Add your first task!</li>
          )}
        </ul>

        <footer className="footer">
          <span>{tasks.length} total tasks</span>
          <button
            type="button"
            onClick={() => setTasks((old) => old.filter((t) => !t.completed))}
          >
            Clear completed
          </button>
        </footer>
      </section>

      <p className="tagline">Small steps every day lead to big results.</p>
    </main>
  );
}

export default App;
