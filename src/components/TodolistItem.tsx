import { useTodolistStore } from "../store.zustand/useTodolistStore";
import { Button } from "./Button";
import { FullInput } from "./FullInput";

type TodolistItemProps = {
  title: string;
  todolistId: string;
};

export const TodolistItem = ({ title, todolistId }: TodolistItemProps) => {
  const deleteAllTasks = useTodolistStore((state) => state.deleteAllTasks);
  const changeFilter = useTodolistStore((state) => state.changeFilter);
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <FullInput todolistId={todolistId} />
      </div>
      <div className="filter-buttons">
        <Button
          todolistId={todolistId}
          actionOnClick={() => changeFilter("all")}
        >
          All
        </Button>
        <Button
          todolistId={todolistId}
          actionOnClick={() => changeFilter("active")}
        >
          Active
        </Button>
        <Button
          todolistId={todolistId}
          actionOnClick={() => changeFilter("completed")}
        >
          Completed
        </Button>
        <Button actionOnClick={deleteAllTasks(todolistId)}>
          Delete all tasks
        </Button>
      </div>
    </div>
  );
};
