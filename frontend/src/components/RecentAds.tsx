import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import DisplayAds from "./DisplayAds.tsx";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_ALL_ADS = gql`
  query getAllAds {
    getAllAds {
      category {
        id
        name
      }
      createdAt
      description
      id
      imageUrl
      location
      owner
      price
      tags {
        id
        name
      }
      title
    }
  }
`;

const DELETE_AD = gql`
  mutation deleteAd($deleteAdByIdId: Float!) {
    deleteAdById(id: $deleteAdByIdId)
  }
`;

const RecentAds = () => {
  const router = useRouter();
  const { loading, error, data, refetch } = useQuery(GET_ALL_ADS);
  const [deleteAdMutation] = useMutation(DELETE_AD);

  const [recentAds, setRecentAds] = useState<AdCardProps[]>([]);

  console.log("here", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // use of asios
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.get<AdCardProps[]>(
  //         "http://localhost:4000/ad"
  //       );
  //       console.log(
  //         "result",
  //         result.data.map((el) => console.log(el))
  //       );
  //       setRecentAds(result.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const deleteAd = async (adId: number) => {
    try {
      await deleteAdMutation({
        variables: { deleteAdByIdId: adId },
      });
      // Refetch the ads after deletion
      refetch();

      // use of axios
      // await axios.delete(`http://localhost:4000/ad/${adId}`);
      // // Update your component's state to remove the deleted ad from recentAds
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
      // ads={recentAds}
      ads={data.getAllAds}
      title={"Recent Ads"}
      onClickDelete={(adId) => {
        router.push(`/`);
        deleteAd(adId);
      }}
      onClickEdit={handleEditAd}
    />
  );
};

export default RecentAds;
