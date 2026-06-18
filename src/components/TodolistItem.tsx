import { useTodolistStore } from "../store.zustand/useTodolistStore";
import { Button } from "./Button";
import { EditableSpan } from "./EditableSpan";
import { TodolistFullInput } from "./TodolistFullInput";

type TodolistItemProps = {
  todolistId: string;
};

export const TodolistItem = ({ todolistId }: TodolistItemProps) => {
  const deleteAllTasks = useTodolistStore((state) => state.deleteAllTasks);
  const changeFilter = useTodolistStore((state) => state.changeFilter);
  const currentTodolist = useTodolistStore(
    (state) => state.todolists[todolistId],
  );
  const deleteTodolist = useTodolistStore((state) => state.deleteTodolist);
  const title = currentTodolist?.title || "No title";
  if (!currentTodolist) return null;
  return (
    <div>
      <div className="todo-title-container">
        <EditableSpan title={title} todolistId={todolistId} />
        <Button actionOnClick={() => deleteTodolist(todolistId)}>X</Button>
      </div>

      <div>
        <TodolistFullInput todolistId={todolistId} />
      </div>
      <div className="filter-buttons">
        <Button
          todolistId={todolistId}
          actionOnClick={() => changeFilter(todolistId, "all")}
        >
          All
        </Button>
        <Button
          todolistId={todolistId}
          actionOnClick={() => changeFilter(todolistId, "active")}
        >
          Active
        </Button>
        <Button
          todolistId={todolistId}
          actionOnClick={() => changeFilter(todolistId, "completed")}
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
