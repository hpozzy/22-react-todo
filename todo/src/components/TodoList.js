import React, { useState } from "react"
import { useTodo } from "../hooks"
// import { useTodo } from "../ducks/Todos"

function Todos(props) {
  return (
    <div
      onClick={props.onChange}
      style={{ height: "200px", width: "200px" }}
    ></div>
  )
}
export default () => {
  const { todos, addTodo, deleteTodo, completeTodo } = useTodo()
  const [inputText, setInputText] = useState("")
  function handleSubmit(e) {
    e.preventDefault()
    addTodo(inputText)
    setInputText("")
  }
  function handleComp(id) {
    completeTodo(id)
  }

  return (
    <div className="container">
      <div className="wholeBody">
        <h1 className="headerTodo">todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inputArea"
            type="text"
            value={inputText}
            placeholder="What needs to be done?"
            onChange={(e) => setInputText(e.target.value)}
          ></input>
        </form>
      </div>
      {todos.map((item) => (
        <div className="todoInputBody" key={item.id}>
          <input
            className="checkBox"
            type="checkbox"
            onClick={() => handleComp(item.id)}
          />
          <span className={item.completed === true ? "completed" : ""}>
            {item.input}
          </span>
          <button className="deleteButton" onClick={(e) => deleteTodo(item.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  )
}
