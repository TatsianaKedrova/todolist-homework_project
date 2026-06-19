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
    <div className="min-h-screen bg-slate-50 flex flex-col items-stretch p-4 sm:p-8 antialiased">
      <div className="w-full max-w-none mx-auto">
        <div className="w-full max-w-md bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <AddItemForm
            onAdd={(args) => addNewTodolist(args.title)}
            placeholderText="Add a new todolist"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start w-full">
          {todolistIdsArray.map((todolistId) => (
            <TodolistItem key={todolistId} todolistId={todolistId} />
          ))}
        </div>
      </div>
    </div>
  );
};
