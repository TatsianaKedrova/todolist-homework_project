import React, { useEffect, useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import { useTodolistStore } from "../store.zustand/useTodolistStore";

export const FullInput = () => {
  let [title, setTitle] = useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const tasks = useTodolistStore((state) => state.tasks);
  const filter = useTodolistStore((state) => state.filter);
  const addNewTask = useTodolistStore((state) => state.addNewTask);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.isDone);
      case "completed":
        return tasks.filter((t) => t.isDone);
      default:
        return tasks;
    }
  }, [tasks, filter]);
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
        {filteredTasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </ul>
    </div>
  );
};
