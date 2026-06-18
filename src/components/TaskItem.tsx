import { useTodolistStore } from "../store.zustand/useTodolistStore";
import { TaskItemProps } from "../types.ts/Todolist.types";
import { Button } from "./Button";
import { EditableSpan } from "./EditableSpan";

const TaskItem = ({ todolistId, task }: TaskItemProps) => {
  const deleteTask = useTodolistStore((state) => state.deleteTask);
  const handleCheckboxChange = useTodolistStore(
    (state) => state.handleCheckboxChange,
  );
  return (
    <li key={task.id} className={task.isDone ? "is-done" : ""}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={(event) =>
          handleCheckboxChange(todolistId, task.id, event.currentTarget.checked)
        }
      />{" "}
      <EditableSpan
        title={task.title}
        todolistId={todolistId}
        taskId={task.id}
      />
      <Button actionOnClick={() => deleteTask(todolistId, task.id)}>x</Button>
    </li>
  );
};

export default TaskItem;
