import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import DisplayAds from "./DisplayAds.tsx";
import { useRouter } from "next/router";

const RecentAds = () => {
  const router = useRouter();
  const [recentAds, setRecentAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:4000/ad"
        );
        console.log(
          "result",
          result.data.map((el) => console.log(el))
        );
        setRecentAds(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteAd = async (adId: number) => {
    try {
      await axios.delete(`http://localhost:4000/ad/${adId}`);
      // Update your component's state to remove the deleted ad from recentAds
      setRecentAds((ads) => ads.filter((ad) => ad.id !== adId));
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleEditAd = (adId: number) => {
    router.push(`/ad/edit/${adId}`);
  };

  return (
    <DisplayAds
      ads={recentAds}
      title="Recent Ads"
      buttonDelete
      buttonEdit
      onClickDelete={(adId) => deleteAd(adId)}
      onClickEdit={handleEditAd}
    />
  );
};

export default RecentAds;
