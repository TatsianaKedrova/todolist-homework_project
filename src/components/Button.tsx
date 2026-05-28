type Props = {
  children: React.ReactNode;
  actionOnClick?: () => void;
};

export const Button = ({ children, actionOnClick }: Props) => {
  return <button onClick={actionOnClick}>{children}</button>;
};
