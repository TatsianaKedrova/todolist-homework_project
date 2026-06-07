import { useTodolistStore } from "../store.zustand/useTodolistStore";
import { Button } from "./Button";
import { FullInput } from "./TodolistFullInput";

type TodolistItemProps = {
  todolistId: string;
};

export const TodolistItem = ({ todolistId }: TodolistItemProps) => {
  const deleteAllTasks = useTodolistStore((state) => state.deleteAllTasks);
  const changeFilter = useTodolistStore((state) => state.changeFilter);
  const currentTodolist = useTodolistStore(
    (state) => state.todolists[todolistId],
  );
  const title = currentTodolist?.title || "No title";
  if (!currentTodolist) return null;
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
        <Button
          actionOnClick={() => deleteAllTasks(todolistId)}
          todolistId={todolistId}
        >
          Delete all tasks
        </Button>
      </div>
    </div>
  );
};
