import { useEffect, useRef, useState } from "react";
type AddItemArgs = {
  title: string;
  todolistId?: string;
};
type AddItemFormProps = {
  initialTitle?: string;
  onAdd: (args: AddItemArgs) => void;
  placeholderText: string;
  onBlurAction?: () => void;
};
export const AddItemForm = ({
  initialTitle = "",
  onAdd,
  placeholderText,
  onBlurAction,
}: AddItemFormProps) => {
  const [inputValue, setInputValue] = useState<string>(initialTitle);
  let [hasError, setHasError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const triggerError = () => {
    setHasError(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setHasError(false);
    }, 5000);
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setHasError(false);
  };
  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      triggerError();
      return;
    }
    setHasError(false);
    onAdd({ title: inputValue });
    setInputValue("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue.trim() === "") {
        triggerError();
        return;
      }
      onAdd({ title: inputValue });
      inputRef.current?.blur();
      setInputValue("");
      setHasError(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };
  return (
    <>
      <input
        className={`task-input ${hasError ? "error" : ""}`}
        ref={inputRef}
        type="text"
        placeholder={placeholderText}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={
          onBlurAction
            ? onBlurAction
            : () => {
                setHasError(false);
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
              }
        }
        onFocus={() => {
          setHasError(false);
        }}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button onClick={handleAddTask} onMouseDown={(e) => e.preventDefault()}>
        +
      </button>
      {hasError && <p id="error-message">Title is required</p>}
    </>
  );
};
