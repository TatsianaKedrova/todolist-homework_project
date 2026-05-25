import "./App.css";
import { Button } from "./Button";
import { useState } from "react";

export type TodolistItemProps = {
  title: string;
  tasks: Task[];
  date?: string;
};
export type Task = {
  title: string;
  isDone: boolean;
  id: number;
};

export const TodolistItem = ({ title, tasks, date }: TodolistItemProps) => {
  const [tasksList, setTasks] = useState<Array<Task>>(tasks);
  const removeTask = (taskId: number) => {
    setTasks(tasksList.filter((task) => task.id !== taskId));
  };
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasksList.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />{" "}
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title="All" />
        <Button title="Active" />
        <Button title="Completed" />
      </div>
      <div>{date}</div>
    </div>
  );
};
