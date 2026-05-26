type Props = {
  title: string;
  actionOnClick?: () => void;
};

export const Button = ({ title, actionOnClick }: Props) => {
  return <button onClick={actionOnClick}>{title}</button>;
};
