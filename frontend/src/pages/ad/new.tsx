import { CategoryType } from "@/components/Category";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  price: number;
  description: string;
  location: string;
  owner: string;
  imageUrl: string;
  category: number;
};

const NewAd = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      // Parse the "price" field to a number
      data.price = Number(data.price);

      // Ensure the "category" field is a number
      data.category = Number(data.category);
      // Make a POST request to the server with form data
      const result = await axios.post("http://localhost:4000/ad", data);
      console.log("result", result);
      reset();
      router.push("/");
      toast.success(result.data, {
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
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Error submitting form:", err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get<CategoryType[]>(
          "http://localhost:4000/category"
        );
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <form
      // onSubmit={(e) => {
      //   // prevent browser from reloading the page;
      //   e.preventDefault();

      //   //Read the form data
      //   const form = e.target;
      //   const formData = new FormData(form as HTMLFormElement);

      //   const formJson = Object.fromEntries(formData.entries());
      //   console.log(formJson);
      //   axios.post("http://localhost:4000/ad", formJson)
      // }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label>
          Titre de l&apos;annonce : <br />
          <input
            className="text-field"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
        </label>
      </div>
      <div>
        <label>
          Prix : <br />
          <input
            className="text-field"
            {...register("price", { required: true })}
          />
          {errors.price && <span>This field is required</span>}
        </label>
      </div>
      <div>
        <label>
          Description : <br />
          <input
            className="text-field"
            {...register("description", { required: true, maxLength: 200 })}
          />
          {errors.description && <span>This field is required</span>}
        </label>
      </div>
      <div>
        <label>
          Ville : <br />
          <input
            className="text-field"
            {...register("location", { required: true })}
          />
          {errors.location && <span>This field is required</span>}
        </label>
      </div>
      <div>
        <label>
          Author : <br />
          <input
            className="text-field"
            {...register("owner", { required: true })}
          />
          {errors.owner && <span>This field is required</span>}
        </label>
      </div>
      <div>
        <label>
          Image : <br />
          <input className="text-field" {...register("imageUrl")} />
        </label>
      </div>
      <select {...register("category", { required: true })}>
        {categories.map((el) => (
          <option value={el.id} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      {errors.category && <span>This field is required</span>}

      <button className="button">Submit</button>
    </form>
  );
};

export default NewAd;
