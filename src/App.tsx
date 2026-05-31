import "./App.css";
import { TodolistItem } from "./components/TodolistItem";

export const App = () => {
  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
      />
    </div>
  );
};
