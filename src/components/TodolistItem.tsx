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
  handleCheckboxChange: (
    taskId: string,
    isChecked: boolean,
  ) => void;
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
  handleCheckboxChange,
}: TodolistItemProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <FullInput
          addNewTask={addNewTask}
          tasks={tasks}
          deleteTask={deleteTask}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div>
        <Button actionOnClick={() => changeFilter("all")}>All</Button>
        <Button actionOnClick={() => changeFilter("active")}>Active</Button>
        <Button actionOnClick={() => changeFilter("completed")}>
          Completed
        </Button>
        <Button actionOnClick={deleteAllTasks}>Delete all tasks</Button>
      </div>
      <div>{date}</div>
    </div>
  );
};
