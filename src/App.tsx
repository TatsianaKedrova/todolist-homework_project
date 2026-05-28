import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { Task, TodolistItem } from "./components/TodolistItem";

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const addNewTask = (taskTitle: string) => {
    if (!taskTitle.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: taskTitle.trim(), isDone: false },
    ]);
  };
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.isDone);
      case "completed":
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const deleteTaskFunc = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  }, []);
  const changeFilter = useCallback(
    (filter: FilterValues) => {
      setFilter(filter);
    },
    [filter],
  );
  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        deleteTask={deleteTaskFunc}
        changeFilter={changeFilter}
        addNewTask={addNewTask}
      />
    </div>
  );
};
