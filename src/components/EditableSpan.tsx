import { useState } from "react";
import { EditableType } from "../types.ts/Todolist.types";
import { AddItemForm } from "./AddItemForm";
import { useTodolistStore } from "../store.zustand/useTodolistStore";

export const EditableSpan = ({ todolistId, title }: EditableType) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateTitle = useTodolistStore((state) => state.updateTitle);
  const onChangeTitle = (title: string) => {
    updateTitle(todolistId, title);
    setIsEditing(false);
  };

  const switchToEditMode = () => {
    setIsEditing(true);
  };
  return (
    <>
      {isEditing ? (
        <AddItemForm
          placeholderText={"Type new title"}
          initialTitle={title}
          onAdd={(args) => onChangeTitle(args.title)}
        />
      ) : (
        <span onDoubleClick={switchToEditMode}>{title}</span>
      )}
    </>
  );
};
