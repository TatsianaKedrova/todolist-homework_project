import { FilterValues } from "../App";
import { Button } from "./Button";
import { FullInput } from "./FullInput";

export type TodolistItemProps = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  addNewTask: (taskTitle: string) => void;
};
export type Task = {
  title: string;
  isDone: boolean;
  id: string;
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  deleteTask,
  changeFilter,
  addNewTask,
}: TodolistItemProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <FullInput
          addNewTask={addNewTask}
          tasks={tasks}
          deleteTask={deleteTask}
        />
      </div>
      <div>
        <Button title={"All"} actionOnClick={() => changeFilter("all")} />
        <Button title={"Active"} actionOnClick={() => changeFilter("active")} />
        <Button
          title={"Completed"}
          actionOnClick={() => changeFilter("completed")}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};

// {
//   tasks.map((t) => (
//     <li key={t.id}>
//       <input type="checkbox" checked={t.isDone} />
//       <span>{t.title}</span>
//       <button
//         onClick={() => {
//           removeTask(t.id);
//         }}
//       >
//         x
//       </button>
//     </li>
//   ));
// }
