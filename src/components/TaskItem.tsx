import { useTodolistStore } from "../store.zustand/useTodolistStore";
import { TaskItemProps } from "../types.ts/Todolist.types";
import { Button } from "./Button";

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
      <span>{task.title}</span>
      <Button actionOnClick={() => deleteTask(todolistId, task.id)}>x</Button>
    </li>
  );
};

export default TaskItem;
