import { useState } from "react";
import "./App.css";
import { Task, TodolistItem } from "./TodolistItem";

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: false },
    { id: 6, title: "RTK query", isDone: false },
  ]);
  const deleteTaskFunc = (taskId: number) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };
  // console.log("tasks: ", tasks);
  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={tasks}
        deleteTask={deleteTaskFunc}
      />
    </div>
  );
};
