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
  const triggerError = () => {
    setHasError(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setHasError(false);
    }, 5000);
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
    setHasError(false);
  };
  const handleAddTask = () => {
    if (title.trim() === "") {
      triggerError();
      return;
    }
    setHasError(false);
    addNewTask(title);
    setTitle("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (title.trim() === "") {
        triggerError();
        return;
      }
      addNewTask(title);
      inputRef.current?.blur();
      setTitle("");
      setHasError(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };
  return (
    <div>
      <input
        className={`task-input ${hasError ? "error" : ""}`}
        ref={inputRef}
        type="text"
        placeholder="Type a new message"
        value={title}
        onChange={handleInputChange}
        onBlur={() => {
          setHasError(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }}
        onFocus={() => {
          setHasError(false);
        }}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddTask} onMouseDown={(e) => e.preventDefault()}>
        +
      </button>
      {hasError && <p id="error-message">Title is required</p>}
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
