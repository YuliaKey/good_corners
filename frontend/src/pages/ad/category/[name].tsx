import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AdCardProps } from "@/components/AdCard";
import DisplayAds from "@/components/DisplayAds.tsx";

const SearchByCategory = () => {
  const [searchedAds, setSearchedAds] = useState<AdCardProps[]>([]);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          `http://localhost:4000/ad?category=${router.query.name}`
        );
        console.log(result.data);
        setSearchedAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [router.query.name]);
  return (
    <>
      {searchedAds.length > 0 ? (
        <DisplayAds
          ads={searchedAds}
          title={`Displaying results for category : ${router.query.name}`}
        />
      ) : (
        <p>No ads in category {router.query.name} yet</p>
      )}
    </>
  );
};

export default SearchByCategory;
