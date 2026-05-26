type FullInputProps = {
  message: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FullInput = ({ message, handleInputChange }: FullInputProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Type a new message"
        value={message}
        onChange={handleInputChange}
      />
      <button>+</button>
    </div>
  );
};
