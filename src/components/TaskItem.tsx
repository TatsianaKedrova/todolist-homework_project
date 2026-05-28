import { Button } from "./Button";
import { Task } from "./TodolistItem";

type TaskItemProps = {
  task: Task;
  deleteTask: (taskId: string) => void;
};

const TaskItem = ({ task, deleteTask }: TaskItemProps) => {
  return (
    <>
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />{" "}
        <span>{task.title}</span>
        <Button title="x" actionOnClick={() => deleteTask(task.id)} />
      </li>
    </>
  );
};

export default TaskItem;
