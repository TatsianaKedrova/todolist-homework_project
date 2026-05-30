import { Button } from "./Button";
import { Task } from "./TodolistItem";

type TaskItemProps = {
  task: Task;
  deleteTask: (taskId: string) => void;
  handleCheckboxChange: (taskId: string, isChecked: boolean) => void;
};

const TaskItem = ({
  task,
  deleteTask,
  handleCheckboxChange,
}: TaskItemProps) => {
  console.log("task status:", task.isDone);
  return (
    <>
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={(event) =>
            handleCheckboxChange(task.id, event.currentTarget.checked)
          }
        />{" "}
        <span>{task.title}</span>
        <Button actionOnClick={() => deleteTask(task.id)}>x</Button>
      </li>
    </>
  );
};

export default TaskItem;
