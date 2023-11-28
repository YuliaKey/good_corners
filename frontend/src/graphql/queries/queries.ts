// // import { graphql } from "../../gql/";

import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql(`
  query GetAllCategories {
    allCategories {
      id
      name
    }
  }
`);
