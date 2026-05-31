export type FilterValues = "all" | "active" | "completed";

export type TodolistItemProps = {
  title: string;
};
export type TaskItemProps = {
  task: Task;
};

export type TodolistState = {
  tasks: Task[];
  filter: FilterValues;
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  addNewTask: (taskTitle: string) => void;
  deleteAllTasks: () => void;
  handleCheckboxChange: (taskId: string, isChecked: boolean) => void;
};
export type Task = {
  title: string;
  isDone: boolean;
  id: string;
};
