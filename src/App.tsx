import React, { useCallback, useRef } from "react";
import "./App.css";
import {
  TodosProvider,
  useTodos,
  useAddTodo,
  useRemoveTodo,
  useTodosManager,
} from "./useTodos";

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
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}
const initialTodos = [{ id: 0, text: "Hey there useContext", done: false }];

function App() {
  const { todos } = useTodosManager(initialTodos);
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();
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
        itemClick={item => alert(item.id)}
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

const JustShowTodos = () => {
  const { todos } = useTodosManager(initialTodos);
  return (
    <UL items={todos} itemClick={() => {}} render={todo => <>{todo.text}</>} />
  );
};

const AppWrapper = () => (
  <TodosProvider initialTodos={[]}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustShowTodos />
    </div>
  </TodosProvider>
);

export default AppWrapper;
