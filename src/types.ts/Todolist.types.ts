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
  todolistId: string;
  task: Task;
};

export interface TodoState {
  todolists: Record<string, TodolistType>;
}
export interface TodoActions {
  addTodolist: (title: string) => void;
  deleteTodolist: (todolistId: string) => void;
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  addNewTask: (todolistId: string, taskTitle: string) => void;
  deleteAllTasks: (todolistId: string) => void;
  handleCheckboxChange: (
    todolistId: string,
    taskId: string,
    isChecked: boolean,
  ) => void;
}

export type TodolistState = TodoState & TodoActions;
