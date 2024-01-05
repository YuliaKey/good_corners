import { useState, useEffect } from "react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AdCardProps } from "@/components/AdCard";
import { useRouter } from "next/router";
import { CategoryType } from "@/components/Category";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AD_BY_ID, GET_ALL_CATEGORIES } from "@/graphql/queries/queries";
import { UPDATE_AD } from "@/graphql/mutations/mutations";

type Inputs = {
  title: string;
  price: number;
  description: string;
  owner: string;
  imageUrl: string;
  location: string;
  category: number;
};

const EditAd = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
  const { data: adData } = useQuery(GET_AD_BY_ID, {
    variables: { id: parseInt(router.query.id as string) },
  });
  const [updateAd] = useMutation(UPDATE_AD);

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [ad, setAd] = useState<AdCardProps>();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    if (data) {
      setCategories(data.allCategories);
    }

    if (router.query.id && adData && adData.getAdById) {
      setAd(adData.getAdById);
    }
    // fetch categories using axios
    // const fetchCategories = async () => {
    //   try {
    //     const result = await axios.get<CategoryType[]>(
    //       "http://localhost:4000/category"
    //     );
    //     setCategories(result.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchCategories();

    // fetchAd using axios
    //   const fetchAd = async () => {
    //     try {
    //       const result = await axios.get<AdCardProps>(
    //         `http://localhost:4000/ad/${router.query.id}`
    //       );
    //       setAd(result.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    //   if (router.query.id) {
    //     fetchAd();
    //   }
  }, [adData, data, router.query.id, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // use axios to update ad
      // const result = await axios.put("http://localhost:4000/ad", {
      //   idToEdit: router.query.id,
      //   newAd: data,
      // });

      // Parse the "price" field to a number
      data.price = Number(data.price);

      // Ensure the "category" field is a number
      data.category = Number(data.category);

      console.log("form data", data);
      await updateAd({
        variables: {
          adData: data,
          updateAdId: parseInt(router.query.id as string),
        },
      });
      console.log(adData, data);
      router.push("/");
      toast.success("Ad updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (ad === undefined) {
    return "loading";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre de l&apos;annonce: <br />
        <input
          defaultValue={ad?.title}
          className="text-field"
          {...register("title")}
        />
      </label>
      <br />
      <label>
        Prix: <br />
        <input
          defaultValue={ad?.price}
          className="text-field"
          {...register("price", { valueAsNumber: true })}
        />
      </label>
      <br />
      <label>
        Description: <br />
        <input
          defaultValue={ad?.description}
          className="text-field"
          {...register("description")}
        />
      </label>
      <br />
      <label>
        Url de l&apos;image: <br />
        <input
          className="text-field"
          defaultValue={ad?.imageUrl}
          {...register("imageUrl")}
        />
      </label>
      <br />
      <label>
        Ville: <br />
        <input
          defaultValue={ad?.location}
          className="text-field"
          {...register("location")}
        />
      </label>
      <br />
      <select
        defaultValue={ad?.category.id}
        {...register("category", { valueAsNumber: true })}
      >
        {categories.map((category) => (
          <option
            // selected={category.id == ad?.category?.id}
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
      <br />
      <br />

      <input className="button" type="submit" />
    </form>
  );
};

export default EditAd;
