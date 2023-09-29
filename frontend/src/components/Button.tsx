type ButtonProps = {
  title: string;
  onClick: () => void;
};

const Button = ({ onClick, title }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
