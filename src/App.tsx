import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { Task, TodolistItem } from "./components/TodolistItem";
import { FullInput } from "./components/FullInput";

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>("all");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: false },
    { id: 6, title: "RTK query", isDone: false },
  ]);
  const [messages, setMessages] = useState<string[]>([]);
  const addNewMessage = (message: string) => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, message.trim()]);
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

  const deleteTaskFunc = useCallback((taskId: number) => {
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
      />
      <FullInput addNewMessage={addNewMessage} messages={messages} />
    </div>
  );
};
