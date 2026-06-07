import { useMemo } from "react";
import TaskItem from "./TaskItem";
import { useTodolistStore } from "../store.zustand/useTodolistStore";
import { AddItemForm } from "./AddItemForm";
type TodolistFullInputProps = {
  todolistId: string;
};
export const FullInput = ({ todolistId }: TodolistFullInputProps) => {
  const tasks = useTodolistStore(
    (state) => state.todolists[todolistId]?.tasks || [],
  );
  const filter = useTodolistStore(
    (state) => state.todolists[todolistId]?.filter || "all",
  );
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

  return (
    <div>
      <AddItemForm onAdd={addNewTask} placeholderText="Add a new task" />
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
