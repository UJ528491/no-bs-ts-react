import React, { useCallback, useRef } from "react";
import "./App.css";
import {
  TodosProvider,
  useTodos,
  useAddTodo,
  useRemoveTodo,
  useTodosManager,
} from "./useTodos";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { addTodo, removeTodo } from "./store";
import { selectTodos } from "./store";

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
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current.value));
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
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
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
  const todos = useSelector(selectTodos);
  return (
    <UL items={todos} itemClick={() => {}} render={todo => <>{todo.text}</>} />
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustShowTodos />
    </div>
  </Provider>
);

export default AppWrapper;
