import React, { useEffect, useState } from "react";
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
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      inputRef.current?.blur();
      setTitle("");
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
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
