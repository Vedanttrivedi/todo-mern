import { useEffect, useState } from "react";
import "./homestyle.css";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log("error occurred " + error));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/todos/delete/${id}`, { method: "DELETE" })
      .then(() => getData())
      .catch((err) => console.log(err));
  };

  const updateTask = (id, text) => {
    const newText = prompt("Enter updated task:", text);
    if (newText) {
      fetch(`http://localhost:3000/todos/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      })
        .then(() => getData())
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <center>
        <h1 style={{color:"orangered",fontFamily:"cursive",fontSize:"2em"}}>Vedant 's Todos</h1>
        <ul className="all-todos">
          {todos.map((task) => (
            <div className="one-todo" key={task._id}>
              <li>
                <div className="task-info">
                  <p>{task.text}</p>
                  <div className="buttons">
                    <button
                      className="update-button"
                      onClick={() => updateTask(task._id, task.text)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
              <hr />
            </div>
          ))}
        </ul>
      </center>
    </>
  );
};

export default Home;
