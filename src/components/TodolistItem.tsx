import { FilterValues } from "../App";
import { Button } from "./Button";
import TaskItem from "./TaskItem";

export type TodolistItemProps = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: number) => void;
  changeFilter: (filter: FilterValues) => void;
};
export type Task = {
  title: string;
  isDone: boolean;
  id: number;
};

export const TodolistItem = ({
  title,
  tasks,
  date,
  deleteTask,
  changeFilter,
}: TodolistItemProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
          ))}
        </ul>
      )}
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
