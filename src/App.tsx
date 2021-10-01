import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import "./App.css"

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>
const Box: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
)
const List: React.FunctionComponent<{
  items: string[]
  onClick?: (item: string) => void
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
)

interface Payload {
  text: string
}
interface Todo {
  id: number
  text: string
}
type ActionType =
  | {
      type: "ADD"
      text: string
    }
  | {
      type: "REMOVE"
      id: number
    }

const Incrementer: React.FunctionComponent<{
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}> = ({ value, setValue }) => (
  <button onClick={() => setValue(value + 1)}>Add - {value}</button>
)

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item)
  }, [])

  const [payload, setPayload] = useState<Payload | null>(null)

  useEffect(() => {
    fetch("/data.json")
      .then(resp => resp.json())
      .then(data => {
        setPayload(data)
      })
  })

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ]
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id)
      default:
        throw new Error()
    }
  }, [])

  const newTodoRef = useRef<HTMLInputElement>(null)

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      })
    }
  }, [])
  const [value, setValue] = useState(0)
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={["one", "two", "three"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer value={value} setValue={setValue} />

      <Heading title="Todos" />
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>onAdd</button>
      </div>
    </div>
  )
}
export default App
