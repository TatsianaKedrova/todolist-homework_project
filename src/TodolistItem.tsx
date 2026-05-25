import "./App.css";
import { Button } from "./Button";

export type TodolistItemProps = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: number) => void;
};
export type Task = {
  title: string;
  isDone: boolean;
  id: number;
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  deleteTask,
}: TodolistItemProps) => {
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
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />{" "}
                <span>{task.title}</span>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  x
                </button>
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
