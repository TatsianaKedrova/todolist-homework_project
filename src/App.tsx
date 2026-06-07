import "./App.css";
import { TodolistItem } from "./components/TodolistItem";
import { useTodolistStore } from "./store.zustand/useTodolistStore";
import { useShallow } from "zustand/react/shallow";
import { AddItemForm } from "./components/AddItemForm";

export const App = () => {
  const todolistIdsArray = useTodolistStore(
    useShallow((state) => Object.keys(state.todolists)),
  );
  const addNewTodolist = useTodolistStore((state) => state.addTodolist);
  return (
    <div className="app">
      <AddItemForm
        onAdd={addNewTodolist}
        placeholderText="Add a new todolist"
      />
      {todolistIdsArray.length === 0 ? (
        <h2>No todolists are created</h2>
      ) : (
        todolistIdsArray.map((todolistId) => (
          <TodolistItem
            key={todolistId}
            todolistId={todolistId}
          />
        ))
      )}
    </div>
  );
};
