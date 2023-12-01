import Link from "next/link";
import AdCard, { AdCardProps } from "./AdCard";
import Button from "./Button";

type DisplayAdsType = {
  ads: AdCardProps[];
  title: string;
  onClickDelete?: (adId: number) => void;
  onClickEdit?: (adId: number) => void;
};

const DisplayAds = ({
  ads,
  title,
  onClickDelete,
  onClickEdit,
}: DisplayAdsType) => {
  return (
    <>
      <h2>{title}</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <Link href={`/ad/${ad.id}`}>
              <AdCard
                id={ad.id}
                imageUrl={ad.imageUrl}
                link={ad.link}
                title={ad.title}
                price={ad.price}
                description={ad.description}
                owner={ad.owner}
                location={ad.location}
                category={ad.category}
                createdAt={ad.createdAt}
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
              />
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default DisplayAds;
