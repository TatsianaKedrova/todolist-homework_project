import React from "react";
import { useTodolistStore } from "../store.zustand/useTodolistStore";

type Props = {
  children: React.ReactNode;
  actionOnClick?: () => void;
};

export const Button = ({ children, actionOnClick }: Props) => {
  const filter = useTodolistStore((state) => state.filter);
  const firstChild = React.Children.toArray(children)[0];

  return (
    <button
      className={filter === firstChild.toString().toLowerCase() ? "active-btn" : ""}
      onClick={actionOnClick}
    >
      {children}
    </button>
  );
};
