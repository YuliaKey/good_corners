import { useRouter } from "next/router";

const CategoryDetails = () => {
  const router = useRouter();
  console.log("here", router);
  return <p>Displaying details of category with id: {router.query.id}</p>;
};

export default CategoryDetails;
