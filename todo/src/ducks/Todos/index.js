// 1. imports
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

// 2. action definitions
const ADD_TODO = "todos/ADD_TODO"
const DELETE_TODO = "todos/DELETE_TODO"
const COMPLETED_TODO = "todos/COMPLETED_TODO"

// 3. initial state
const initialState = {
  todos: [],
}

function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: generateId(), input: action.payload, completed: false },
        ],
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }

    case COMPLETED_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.completed = !todo.completed
          }
          return todo
        }),
      }

    default:
      return state
  }
}

// 5. action creators
function makeListItem(input) {
  return {
    type: ADD_TODO,
    payload: input,
  }
}
function deleteListItem(id) {
  return {
    type: DELETE_TODO,
    payload: id,
  }
}
function completeListItem(id) {
  let completed = ADD_TODO.completed
  if (completed === false) {
    return {
      completed: true,
      type: COMPLETED_TODO,
      payload: id,
    }
  } else {
    return {
      completed: false,
      type: COMPLETED_TODO,
      payload: id,
    }
  }
}

// 6. custom hook
export function useTodo() {
  const dispatch = useDispatch()
  const todos = useSelector((app) => app.TodosState.todos)
  const addTodo = (input) => dispatch(makeListItem(input))
  const deleteTodo = (id) => dispatch(deleteListItem(id))
  const completeTodo = (id) => dispatch(completeListItem(id))
  return {
    todos,
    addTodo,
    deleteTodo,
    completeTodo,
  }
}
