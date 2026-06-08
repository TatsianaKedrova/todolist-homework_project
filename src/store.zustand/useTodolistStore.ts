import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import { FilterValues, TodolistState } from "../types.ts/Todolist.types";
export const useTodolistStore = create<TodolistState>()(
  persist(
    immer((set) => ({
      todolists: {},
      addTodolist: (title: string) =>
        set((state) => {
          const todolistId = nanoid();
          state.todolists[todolistId] = {
            todolistId,
            title,
            filter: "all",
            tasks: [],
          };
        }),
      deleteTodolist: (todolistId: string) =>
        set((state) => {
          delete state.todolists[todolistId];
        }),
      deleteTask: (todolistId: string, taskId: string) =>
        set((state) => {
          const currentTodolist = state.todolists[todolistId];
          if (!currentTodolist) return;
          currentTodolist.tasks = currentTodolist.tasks.filter(
            (task) => task.id !== taskId,
          );
        }),
      deleteAllTasks: (todolistId: string) =>
        set((state) => {
          const currentTodolist = state.todolists[todolistId];
          if (!currentTodolist) return;
          currentTodolist.tasks = [];
        }),
      changeFilter: (todolistId: string, newFilter: FilterValues) =>
        set((state) => {
          state.todolists[todolistId].filter = newFilter;
        }),
      addNewTask: (todolistId: string, taskTitle: string) =>
        set((state) => {
          const todolist = state.todolists[todolistId];
          if (!todolist) return;
          const newTask = {
            id: nanoid(),
            title: taskTitle,
            isDone: false,
          };
          todolist.tasks.push(newTask);
        }),
      handleCheckboxChange: (todolistId, taskId: string, isChecked: boolean) =>
        set((state) => {
          const currentTodolist = state.todolists[todolistId];
          if (!currentTodolist) return;
          const task = currentTodolist.tasks.find((task) => task.id === taskId);
          if (task) task.isDone = isChecked;
        }),
    })),

    { name: "todo-app-storage" },
  ),
);
