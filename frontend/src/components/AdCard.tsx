import Link from "next/link";
import styles from "../styles/AdCard.module.css";
import Button from "./Button";
import Image from "next/image";

export type AdCardProps = {
  id: number;
  link: string;
  imageUrl: string;
  title: string;
  price: number;
  description: string;
  owner: string;
  location: string;
  category: {
    id: number;
    name: string;
  };
  createdAt: Date;
};

type AdCardComponentProps = AdCardProps & {
  onClickDelete?: (adId: number) => void;
  onClickEdit?: (adId: number) => void;
};

const AdCard = ({
  id,
  title,
  imageUrl,
  price,
  onClickDelete,
  onClickEdit,
}: AdCardComponentProps) => {
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the event from reaching the parent Link
    onClickEdit && onClickEdit(id);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the event from reaching the parent Link
    onClickDelete && onClickDelete(id);
  };

  return (
    <div className={styles.container}>
      <Link className={styles.link} href={`/ad/${id}`}>
        <img alt="ad-card-image" className={styles.image} src={imageUrl} />
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          <div>{price} €</div>
        </div>
        <div className="flex">
          {onClickEdit ? (
            <Button title="Modifier" onClick={() => handleEditClick} />
          ) : null}
          {onClickDelete ? (
            <Button title="Supprimer" onClick={() => handleDeleteClick} />
          ) : null}
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
