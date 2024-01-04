type ButtonProps = {
  title: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ onClick, title }: ButtonProps) => {
  return (
    <button className="button button-primary" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
