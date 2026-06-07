import "./App.css";
import { TodolistItem } from "./components/TodolistItem";
import { useTodolistStore } from "./store.zustand/useTodolistStore";
import { useShallow } from "zustand/react/shallow";

export const App = () => {
  const todolistIdsArray = useTodolistStore(
    useShallow((state) => Object.keys(state.todolists)),
  );
  return (
    <div className="app">
      {todolistIdsArray.length === 0 ? (
        <h2>No todolists. Please add one.</h2>
      ) : (
        todolistIdsArray.map((todolistId) => (
          <TodolistItem title="What to learn" todolistId={todolistId} />
        ))
      )}
    </div>
  );
};
