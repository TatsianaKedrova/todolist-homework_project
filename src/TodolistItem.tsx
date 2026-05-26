import { FilterValues } from "./App";
import "./App.css";
import { Button } from "./Button";

export type TodolistItemProps = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: number) => void;
  changeFilter: (filter: FilterValues) => void;
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
  changeFilter,
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
                <Button title="x" actionOnClick={() => deleteTask(task.id)} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title={"All"} actionOnClick={() => changeFilter("all")} />
        <Button title={"Active"} actionOnClick={() => changeFilter("active")} />
        <Button
          title={"Completed"}
          actionOnClick={() => changeFilter("completed")}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};
