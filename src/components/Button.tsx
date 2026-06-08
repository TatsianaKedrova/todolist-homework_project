import React from "react";
import { useTodolistStore } from "../store.zustand/useTodolistStore";

type Props = {
  children: React.ReactNode;
  actionOnClick?: () => void;
  todolistId?: string;
};

export const Button = ({ children, actionOnClick, todolistId }: Props) => {
  const filter = useTodolistStore((state) =>
    todolistId ? state.todolists[todolistId]?.filter || "all" : "all",
  );
  const firstChild = React.Children.toArray(children)[0];

  return (
    <button
      className={
        filter === firstChild.toString().toLowerCase() ? "active-btn" : ""
      }
      onClick={actionOnClick}
    >
      {children}
    </button>
  );
};
