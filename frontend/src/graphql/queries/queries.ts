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

export const GET_AD_BY_ID = gql`
  query GetAdById($id: Float!) {
    getAdById(id: $id) {
      id
      title
      price
      description
      owner
      imageUrl
      location
      category {
        id
        name
      }
      createdAt
    }
  }
`;

export const LOGIN = gql`
  query Query($userData: UserInput!) {
    login(userData: $userData)
  }
`;

export const GET_AUTH_INFO = gql`
  query WhoAmI {
    whoAmI {
      isLoggedIn
      email
      role
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      email
      id
    }
  }
`;
