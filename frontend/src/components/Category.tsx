import Link from "next/link";

export type CategoryType = {
  id: number;
  name: string;
  onClick: (category: string) => void;
};

const Category = ({ name, onClick }: CategoryType) => {
  return (
    <Link
      className="category-navigation-link"
      style={{ cursor: "pointer" }}
      href={`/ad/category/${name}`}
      onClick={() => onClick}
    >
      {name}
    </Link>
  );
};

export default Category;
