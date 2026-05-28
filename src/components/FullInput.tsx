import { useState } from "react";
import { Task } from "./TodolistItem";
import TaskItem from "./TaskItem";

type FullInputProps = {
  tasks: Task[];
  addNewTask: (taskTile: string) => void;
  deleteTask: (taskId: string) => void;
};

export const FullInput = ({
  tasks,
  addNewTask,
  deleteTask,
}: FullInputProps) => {
  let [title, setTitle] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleAddTask = () => {
    addNewTask(title);
    setTitle("");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewTask(title);
      setTitle("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type a new message"
        value={title}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddTask}>+</button>
      <ul>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
          ))
        )}
      </ul>
    </div>
  );
};
