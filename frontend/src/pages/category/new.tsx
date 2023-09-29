import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

const NewCategory = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Make a POST request to the server with form data
      await axios.post("http://localhost:4000/category", data);

      console.log("Form submitted successfully", data);
      reset();
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Nom de la catégorie : <br />
          <input
            className="text-field"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </label>
      </div>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewCategory;
