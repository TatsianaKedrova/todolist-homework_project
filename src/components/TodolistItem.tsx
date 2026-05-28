import { FilterValues } from "../App";
import { Button } from "./Button";
import { FullInput } from "./FullInput";

export type TodolistItemProps = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  addNewTask: (taskTitle: string) => void;
  deleteAllTasks: () => void;
};
export type Task = {
  title: string;
  isDone: boolean;
  id: string;
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  deleteTask,
  changeFilter,
  addNewTask,
  deleteAllTasks,
}: TodolistItemProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <FullInput
          addNewTask={addNewTask}
          tasks={tasks}
          deleteTask={deleteTask}
        />
      </div>
      <div>
        <Button title={"All"} actionOnClick={() => changeFilter("all")} />
        <Button title={"Active"} actionOnClick={() => changeFilter("active")} />
        <Button
          title={"Completed"}
          actionOnClick={() => changeFilter("completed")}
        />
        <Button title="Delete all tasks" actionOnClick={deleteAllTasks} />
      </div>
      <div>{date}</div>
    </div>
  );
};
