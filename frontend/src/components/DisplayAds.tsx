import Link from "next/link";
import AdCard, { AdCardProps } from "./AdCard";
import Button from "./Button";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <>
      <h2>{title}</h2>
      <section className="recent-ads">
        {!!ads &&
          ads.map((ad) => (
            <div key={ad.id}>
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
                onCardClick={(event?: React.MouseEvent<HTMLButtonElement>) => {
                  event?.stopPropagation();
                  router.push(`/ad/${ad.id}`);
                }}
              />
            </div>
          ))}
      </section>
    </>
  );
};

export default DisplayAds;
