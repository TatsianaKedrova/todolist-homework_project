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

  //Tailwind classes
  const baseClasses =
    "flex-1 px-4 py-2.5 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium";
  const statusClasses = hasError
    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-400"
    : "border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-3 w-full">
        <input
          className={`${baseClasses} ${statusClasses}`}
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
        <button
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm shadow-blue-100 active:scale-95 transform whitespace-nowrap"
          onClick={handleAddTask}
          onMouseDown={(e) => e.preventDefault()}
        >
          +
        </button>
      </div>

      {hasError && (
        <p
          id="error-message"
          className="text-xs font-semibold text-red-500 pl-1"
        >
          Title is required
        </p>
      )}
    </div>
  );
};
