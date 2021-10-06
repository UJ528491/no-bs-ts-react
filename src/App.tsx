import React, { useCallback, useRef } from "react";
import "./App.css";
import { useTodos } from "./useTodos";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;
const Box: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);
const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, ...rest }) => (
  <button
    {...rest}
    style={{
      fontSize: "xx-large",
      color: "white",
      backgroundColor: "red",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: "Hey there", done: false },
  ]);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    console.log(newTodoRef.current);
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>

      <Heading title="Todos" />
      <UL
        items={todos}
        render={todo => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />

      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add to Do</Button>
      </div>
    </div>
  );
}
export default App;
