import { useEffect, useMemo, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { useTodolistStore } from "../store.zustand/useTodolistStore";

export const FullInput = () => {
  let [title, setTitle] = useState<string>("");
  let [hasError, setHasError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tasks = useTodolistStore((state) => state.tasks);
  const filter = useTodolistStore((state) => state.filter);
  const addNewTask = useTodolistStore((state) => state.addNewTask);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  timeoutRef.current = window.setTimeout(() => {
    setHasError(false);
  }, 5000);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const isInputEmpty = () => {
    const isEmpty = title.trim() === "";
    setHasError(isEmpty);
    return isEmpty;
  };
  const handleAddTask = () => {
    if (title.trim() === "") {
      setHasError(true);

      // Clear any older running timer so they don't fight each other
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setHasError(false); // Turn off the error state after 5000ms
      }, 5000);

      return;
    }
    addNewTask(title);
    setTitle("");
    setHasError(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isInputEmpty()) return;
    if (event.key === "Enter") {
      addNewTask(title);
      inputRef.current?.blur();
      setTitle("");
    }
  };

  return (
    <div>
      {hasError && <p id="error-message">Title is required</p>}
      <input
        className={hasError ? "error" : ""}
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
