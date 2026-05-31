import { useTodolistStore } from "../store.zustand/useTodolistStore";
import { TodolistItemProps } from "../types.ts/Todolist.types";
import { Button } from "./Button";
import { FullInput } from "./FullInput";

export const TodolistItem = ({ title }: TodolistItemProps) => {
  const deleteAllTasks = useTodolistStore((state) => state.deleteAllTasks);
  const changeFilter = useTodolistStore((state) => state.changeFilter);

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <FullInput />
      </div>
      <div>
        <Button actionOnClick={() => changeFilter("all")}>All</Button>
        <Button actionOnClick={() => changeFilter("active")}>Active</Button>
        <Button actionOnClick={() => changeFilter("completed")}>
          Completed
        </Button>
        <Button actionOnClick={deleteAllTasks}>Delete all tasks</Button>
      </div>
    </div>
  );
};
