import { create } from "zustand";
import { FilterValues, TodolistState } from "../types.ts/Todolist.types";
export const useTodolistStore = create<TodolistState>((set) => ({
  tasks: [],
  filter: "all",
  deleteTask: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  changeFilter: (newFilter: FilterValues) => set({ filter: newFilter }),
  addNewTask: (taskTitle: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: crypto.randomUUID(), title: taskTitle, isDone: false },
      ],
    })),
  deleteAllTasks: () => set({ tasks: [] }),
  handleCheckboxChange: (taskId: string, isChecked: boolean) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: isChecked } : task,
      ),
    })),
}));
