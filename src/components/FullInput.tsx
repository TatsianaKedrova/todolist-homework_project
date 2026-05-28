import { useState } from "react";

type FullInputProps = {
  messages: string[];
  addNewMessage: (message: string) => void;
};

export const FullInput = ({ messages, addNewMessage }: FullInputProps) => {
  let [title, setTitle] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleAddMessage = () => {
    addNewMessage(title);
    setTitle("");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewMessage(title); // Trigger the send action
      setTitle("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type a new message"
        value={title}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddMessage}>+</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};
