import { create } from "zustand";
import { nanoid } from "nanoid";
import { FilterValues, TodolistState } from "../types.ts/Todolist.types";
export const useTodolistStore = create<TodolistState>((set) => ({
  todolists: {},
  addTodolist: (title: string) =>
    set((state) => {
      const todolistId = nanoid();
      return {
        todolists: {
          ...state.todolists,
          [todolistId]: {
            todolistId,
            title,
            filter: "all",
            tasks: [],
          },
        },
      };
    }),
  deleteTodolist: (todolistId: string) =>
    set((state) => {
      const { [todolistId]: _, ...remaining } = state.todolists;
      return { todolists: remaining };
    }),
  deleteTask: (todolistId: string, taskId: string) =>
    set((state) => {
      const currentTodolist = state.todolists[todolistId];
      return {
        todolists: {
          ...state.todolists,
          [todolistId]: {
            ...currentTodolist,
            tasks: currentTodolist.tasks.filter((task) => task.id !== taskId),
          },
        },
      };
    }),
  deleteAllTasks: (todolistId: string) =>
    set((state) => {
      const currentTodolist = state.todolists[todolistId];
      if (!currentTodolist) return {};
      return {
        todolists: {
          ...state.todolists,
          [todolistId]: {
            ...currentTodolist,
            tasks: [],
          },
        },
      };
    }),
  changeFilter: (newFilter: FilterValues) => set({ filter: newFilter }),
  addNewTask: (taskTitle: string) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: nanoid(), title: taskTitle, isDone: false },
      ],
    })),
  handleCheckboxChange: (taskId: string, isChecked: boolean) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: isChecked } : task,
      ),
    })),
}));
