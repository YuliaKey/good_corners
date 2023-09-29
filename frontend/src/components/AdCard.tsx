import Link from "next/link";
import styles from "../styles/AdCard.module.css";

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

const AdCard = ({ id, title, imageUrl, price, link }: AdCardProps) => {
  return (
    <div className={styles.container}>
      <Link className={styles.link} href={`/ad/${id}`}>
        <img className={styles.image} src={imageUrl} />
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          <div>{price} €</div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
