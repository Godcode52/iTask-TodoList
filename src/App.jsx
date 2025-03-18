import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [showFinished, setShowFinished] = useState(true);

 
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!todo) return;
    const newTodoItem = { id: Date.now(), text: todo, isCompleted: false };
    setTodos([...todos, newTodoItem]);
    setTodo("");
  };

  const handleCheck = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route
          path="/"
          element={
            <div className="container bg-violet-100 mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2 sm:w-3/4">
              <h1 className="text-xl font-bold text-center mb-8">
                iTask - Manage Your Todos at One Place
              </h1>
              <div className="addtodo">
                <h2 className="text-lg font-bold my-3">Add a Todo</h2>
                <input
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo}
                  type="text"
                  placeholder="Enter your todo"
                  className="border border-slate-400 rounded-md p-2 mr-3 md:w-[90%] outline-none mb-5 sm:w-full"
                  onKeyUp={(e) => e.key === "Enter" && handleAdd()}
                />
                <button
                  disabled={!todo}
                  onClick={handleAdd}
                  className="disabled:cursor-not-allowed bg-violet-800 cursor-pointer hover:bg-violet-950 text-white px-3 py-2 rounded-md"
                >
                  Add
                </button>
              </div>

              <input
                onChange={() => setShowFinished(!showFinished)}
                checked={showFinished}
                type="checkbox"
                className="mb-8 mr-3"
              />
              Show Finished Todos

              <div className="h-[1px] bg-black opacity-20 w-3/4 mx-auto"></div>
              <h2 className="text-lg font-bold">Your Todos</h2>

              <div className="todos">
                {todos.length === 0 && "No Todos to display"}
                {todos.map((todo) =>
                  showFinished || !todo.isCompleted ? (
                    <div key={todo.id} className="todo flex-wrap md:flex md:justify-between items-start gap-3 my-3">
                      <div className="flex items-center gap-3">
                        <input
                          onChange={() => handleCheck(todo.id)}
                          type="checkbox"
                          checked={todo.isCompleted}
                        />
                        <div className="flex-grow">
                          {editing === todo.id ? (
                            <input
                              value={newTodo}
                              onChange={(e) => setNewTodo(e.target.value)}
                              type="text"
                              className="border border-slate-400 rounded-md p-2 mr-3"
                            />
                          ) : (
                            <div className={todo.isCompleted ? "line-through" : ""}>
                              {todo.text}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-start md:ml-auto">
                        {editing === todo.id ? (
                          <button
                            onClick={() => {
                              setTodos(todos.map((t) =>
                                t.id === todo.id ? { ...t, text: newTodo } : t
                              ));
                              setEditing(null);
                            }}
                            className="bg-violet-800 cursor-pointer mx-1 hover:bg-violet-950 text-white px-3 py-2 rounded-md"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditing(todo.id)}
                            className="bg-violet-800 cursor-pointer mx-1 hover:bg-violet-950 text-white px-3 py-2 rounded-md"
                          >
                            <FaEdit />
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDelete(e, todo.id)}
                          className="bg-violet-800 cursor-pointer mx-1 hover:bg-violet-950 text-white px-3 py-2 rounded-md"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          }
        />


        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
