import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div className="container bg-violet-100 mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2 sm:w-3/4">
      <h1 className="text-xl font-bold text-center mb-8">All Your Tasks</h1>
      {todos.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="my-2">
              <span className={todo.isCompleted ? "line-through" : ""}>
                {todo.text}
              </span>
              <span className="ml-3 text-gray-500">
                {todo.isCompleted ? "(Completed)" : "(Pending)"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
