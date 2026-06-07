export type FilterValues = "all" | "active" | "completed";
export type Task = {
  title: string;
  isDone: boolean;
  id: string;
};

export type TodolistType = {
  todolistId: string;
  title: string;
  filter: FilterValues;
  tasks: Task[];
};
export type TaskItemProps = {
  task: Task;
};

export type TodolistState = {
  todolists: Record<string, TodolistType>;
  addTodolist: (title: string) => void;
  deleteTodolist: (todolistId: string) => void;
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  addNewTask: (taskTitle: string) => void;
  deleteAllTasks: () => void;
  handleCheckboxChange: (taskId: string, isChecked: boolean) => void;
};
